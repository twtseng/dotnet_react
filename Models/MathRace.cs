using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace dotnet_react.Models
{
    public class MathRace
    {
        /*
        Game where people race to finish 10 problems before the other players
        */
        public MathRace()
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
    }
}
