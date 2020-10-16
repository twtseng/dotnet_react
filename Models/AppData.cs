using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnet_react.Controllers;

namespace dotnet_react.Models
{
    public class AppData
    {
        public List<HubGroup> HubGroups { get; set; }
        public AppData()
        {
            this.HubGroups = new List<HubGroup>();
            this.HubGroups.Add(new MathRace());
        }
        public async Task HandlePayload(SignalRHub signalRHub, string groupId, string accessToken, string payload)
        {
            foreach(HubGroup group in this.HubGroups)
            {
                if (groupId == group.HubGroupId)
                {
                    await group.HandlePayload(signalRHub, accessToken, payload);
                }
            }
        }
    }
}
