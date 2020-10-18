using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnet_react.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace dotnet_react.Models.HubGroups
{
    public class HubGroupManager
    {
        public List<HubGroup> HubGroups { get; set; }
        public HubGroupManager()
        {
            this.HubGroups = new List<HubGroup>();
            this.HubGroups.Add(new MathRace());
            this.HubGroups.Add(new MathRace());
            this.HubGroups.Add(new MathRace());
        }
        public string GetHubGroupsJson()
        {
            return JsonConvert.SerializeObject(
                this.HubGroups.Select(x => new { 
                    x.HubGroupId, 
                    ClassName=x.GetType().Name, 
                    CanJoin = x.CanJoin(), 
                    NumUsers=x.ApplicationUsers.Keys.Count,
                    Players = x.ApplicationUsers.Values.Select(x => x.UserName).ToList()
                    }));
        }
        public async Task CallAction(SignalRHub signalRHub, ApplicationUser appUser, string hubGroupId, HubPayload hubPayload)
        {
            // If hubGroupId is blank, this is a global action (not group specific)
            if (string.IsNullOrWhiteSpace(hubGroupId))
            {
                switch (hubPayload.Method) {
                    case "JoinGroup":
                        signalRHub.Logger.LogInformation($"HubGroupManager.JoinGroup ({hubPayload.Param1})");
                        HubGroup groupToJoin = this.HubGroups.Where(x => x.HubGroupId == hubPayload.Param1).FirstOrDefault();
                        if (groupToJoin != null)
                        {
                            await groupToJoin.JoinGroup(signalRHub, appUser);
                        }
                        break;
                    case "UnjoinGroup":
                        signalRHub.Logger.LogInformation($"HubGroupManager.UnjoinGroup ({hubPayload.Param1})");
                        HubGroup groupToUnjoin = this.HubGroups.Where(x => x.HubGroupId == hubPayload.Param1).FirstOrDefault();
                        if (groupToUnjoin != null)
                        {
                            await groupToUnjoin.UnjoinGroup(signalRHub, appUser);
                        }
                        break;
                    case "GetHubGroups":
                        signalRHub.Logger.LogInformation($"HubGroupManager.GetHubGroups ({hubPayload.Param1})");
                        await signalRHub.Clients.Caller.SendAsync("HubGroups", this.GetHubGroupsJson());
                        break;
                }
            }
            else // Handle group (chatroom or game) specific action
            {
                foreach(HubGroup group in this.HubGroups)
                {
                    if (hubGroupId == group.HubGroupId)
                    {
                        await group.CallAction(signalRHub, appUser, hubGroupId, hubPayload);
                    }
                }
            }
        }
    }
}
