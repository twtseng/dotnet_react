using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Microsoft.AspNetCore.SignalR;
using dotnet_react.Controllers;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;

namespace dotnet_react.Models
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
            if (!PlayerWins.ContainsKey(user.Email))
            {
                PlayerWins[user.Email] = new List<string>();
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
                PlayerWins[user.Email].Add($"{Num1} + {Num2} = {answer}");
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


        class MathGamePayload 
        {
            public string Method { get; set; }
            public string Param1 { get; set; }
        }
        public override async Task HandlePayload(SignalRHub _signalRHub, string accessToken, string payloadString)
        {
            MathGamePayload payload = JsonConvert.DeserializeObject<MathGamePayload>(payloadString);
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(accessToken);
            ApplicationUser appUser = await _signalRHub._manager.FindByIdAsync(token.Subject);
            switch (payload.Method)
            {
                case "ResetGame":
                    _signalRHub._logger.LogInformation($"MathRace ResetGame ({accessToken})");
                    this.ResetGame();
                    this.Status = $"{appUser.Email} reset the game";
                    this.AddPlayer(appUser);
                    await _signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
                    break;
                case "CheckAnswer":
                    _signalRHub._logger.LogInformation($"MathRace CheckAnswer ({payload.Param1} {accessToken})");
                    if (this.CheckAnswer(appUser, int.Parse(payload.Param1)))
                    {
                        await _signalRHub.Clients.Caller.SendAsync("AnswerRight", payload.Param1);
                        await _signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
                    }
                    else
                    {
                        await _signalRHub.Clients.Caller.SendAsync("AnswerWrong", payload.Param1);
                    }
                    break;  
                case "AddPlayer":
                    _signalRHub._logger.LogInformation($"MathRace AddPlayer ({accessToken})");
                    this.AddPlayer(appUser);
                    await this.JoinGroup(_signalRHub);
                    _signalRHub._logger.LogInformation($"AddPlayer ({appUser.Email})");

                    await _signalRHub.Clients.Group(this.HubGroupId).SendAsync("GameJson", this.GetGameJson());
                    break;       
                default:
                    _signalRHub._logger.LogInformation($"MathRace UNKNOWN METEHOD({payload.Method})");
                    break;
            }
        }
    }
}
