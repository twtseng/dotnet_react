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
        public override async Task JoinGroup(SignalRHub signalRHub, ApplicationUser appUser)
        {
            await base.JoinGroup(signalRHub, appUser);
            if (!PlayerWins.ContainsKey(appUser.UserName))
            {
                PlayerWins[appUser.UserName] = new List<string>();
            }
            await signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
        }
        public  override async Task UnjoinGroup(SignalRHub signalRHub, ApplicationUser appUser)
        {
            await base.UnjoinGroup(signalRHub, appUser);
            if (PlayerWins.ContainsKey(appUser.UserName))
            {
                PlayerWins.Remove(appUser.UserName);
            }
            await signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
        }
        public int Num1 { get; private set; }
        public int Num2 { get; private set; }
        public string Status { get; set;}
        public bool GameOver { get; set; }

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
                if (PlayerWins[user.UserName].Count >= 10)
                {
                    this.GameOver = true;
                    this.Status += $" {user.Email} WINS THE GAME!";
                }
                else
                {
                    GenerateNewProblem();
                }
                return true;
            } else {
                return false;
            }
        }
        public void ResetGame()
        {
            PlayerWins.Clear();
            this.GameOver = false;
        }
        public string GetGameJson()
        {
            return JsonConvert.SerializeObject(this);
        }

        public override bool CanJoin()
        {
            // This game accepts unlimited participants
            return true;
        }
        public override async Task CallAction(SignalRHub signalRHub, ApplicationUser appUser, string hubGroupId, HubPayload hubPayload)
        {
            switch (hubPayload.Method)
            {
                case "ResetGame":
                    signalRHub.Logger.LogInformation($"MathRace ResetGame {appUser.UserName}");
                    this.ResetGame();
                    this.Status = $"{appUser.UserName} reset the game";
                    await this.JoinGroup(signalRHub, appUser);
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
                    await this.JoinGroup(signalRHub, appUser);
                    //await this.JoinGroup(_signalRHub);
                    signalRHub.Logger.LogInformation($"AddPlayer ({appUser.UserName})");

                    await signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
                    break;
                case "RemovePlayer":
                    signalRHub.Logger.LogInformation($"MathRace RemovePlayer");
                    await this.UnjoinGroup(signalRHub, appUser);
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
