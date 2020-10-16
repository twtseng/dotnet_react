using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Microsoft.AspNetCore.SignalR;
using dotnet_react.Controllers;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace dotnet_react.Models
{
    /// <summary>
    /// Base class representing all SignalR clients that are sharing the same Chat, Game, or App
    /// The clients will listen for HubGroupId to receive messages
    /// </summary>
    public abstract class HubGroup
    {
        public HubGroup()
        {
            this.HubGroupId = System.Guid.NewGuid().ToString();
        }
        public string HubGroupId { get; protected set; }

        public abstract Task HandlePayload(SignalRHub signalRHub, string accessToken, string payload);
        public async Task JoinGroup(SignalRHub signalRHub)
        {
             signalRHub._logger.LogInformation($"HubGroup.JoinGroup ({this.HubGroupId})");
            await signalRHub.Groups.AddToGroupAsync(signalRHub.Context.ConnectionId, this.HubGroupId);
        }
    }
}
