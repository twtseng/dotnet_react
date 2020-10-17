using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Microsoft.AspNetCore.SignalR;
using dotnet_react.Controllers;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;

namespace dotnet_react.Models.HubGroups
{
    public class MathRace : HubGroup
    {
        /*
        Game where people race to finish 10 problems before the other players
        */
        public MathRace() : base()
        {
            PlayerWins = new Dictionary<string, List<string>>();
            GenerateNewProblem();
        }


        /*
        Dictionary of players and how many questions they answered first
        Example: "Joe" : ["1+1=2","2+2=4"]
        */ 
        public Dictionary<string, List<string>> PlayerWins { get; set; }
        public void AddPlayer(ApplicationUser user)
        {
            if (!PlayerWins.ContainsKey(user.UserName))
            {
                PlayerWins[user.UserName] = new List<string>();
            }
        }
        public void RemovePlayer(ApplicationUser user)
        {
            if (PlayerWins.ContainsKey(user.UserName))
            {
                PlayerWins.Remove(user.UserName);
            }
        }
        public int Num1 { get; private set; }
        public int Num2 { get; private set; }
        public string Status { get; set;}

        public void GenerateNewProblem()
        {
            Random rand = new Random();
            this.Num1 = rand.Next(10);
            this.Num2 = rand.Next(10);
        }
        public bool CheckAnswer(ApplicationUser user, int answer)
        {
            if (answer == Num1 + Num2)
            {
                this.Status = $"{user.Email} got the last question right! ({this.Num1} + {this.Num2} = {answer})";
                PlayerWins[user.UserName].Add($"{Num1} + {Num2} = {answer}");
                GenerateNewProblem();
                return true;
            } else {
                return false;
            }
        }
        public void ResetGame()
        {
            PlayerWins.Clear();
        }
        public string GetGameJson()
        {
            return JsonConvert.SerializeObject(this);
        }

        public override async Task CallAction(SignalRHub signalRHub, ApplicationUser appUser, string hubGroupId, HubPayload hubPayload)
        {
            switch (hubPayload.Method)
            {
                case "ResetGame":
                    signalRHub.Logger.LogInformation($"MathRace ResetGame {appUser.UserName}");
                    this.ResetGame();
                    this.Status = $"{appUser.UserName} reset the game";
                    this.AddPlayer(appUser);
                    await signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
                    break;
                case "CheckAnswer":
                    signalRHub.Logger.LogInformation($"MathRace CheckAnswer ({hubPayload.Param1} {appUser.UserName})");
                    if (this.CheckAnswer(appUser, int.Parse(hubPayload.Param1)))
                    {
                        await signalRHub.Clients.Caller.SendAsync("AnswerRight", hubPayload.Param1);
                        await signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
                    }
                    else
                    {
                        await signalRHub.Clients.Caller.SendAsync("AnswerWrong", hubPayload.Param1);
                    }
                    break;  
                case "AddPlayer":
                    signalRHub.Logger.LogInformation($"MathRace AddPlayer");
                    this.AddPlayer(appUser);
                    //await this.JoinGroup(_signalRHub);
                    signalRHub.Logger.LogInformation($"AddPlayer ({appUser.UserName})");

                    await signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
                    break;
                case "RemovePlayer":
                    signalRHub.Logger.LogInformation($"MathRace RemovePlayer");
                    this.RemovePlayer(appUser);
                    signalRHub.Logger.LogInformation($"RemovePlayer ({appUser.UserName})");

                    await signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
                    break;           
                default:
                    signalRHub.Logger.LogInformation($"MathRace UNKNOWN METHOD({hubPayload.Method})");
                    break;
            }
        }
    }
}
