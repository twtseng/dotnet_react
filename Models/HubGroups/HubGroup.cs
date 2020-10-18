using System;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using Microsoft.AspNetCore.SignalR;
using dotnet_react.Controllers;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace dotnet_react.Models.HubGroups
{
    /// <summary>
    /// Base class representing all SignalR clients that are sharing the same Chat, Game, or App
    /// The clients will listen for HubGroupId to receive messages
    /// </summary>
    public abstract class HubGroup
    {
        public List<ApplicationUser> ApplicationUsers { get; private set; }
        public HubGroup()
        {
            this.HubGroupId = System.Guid.NewGuid().ToString();
            this.ApplicationUsers = new List<ApplicationUser>();
        }
        public string HubGroupId { get; protected set; }

        public virtual async Task JoinGroup(SignalRHub signalRHub, ApplicationUser appUser)
        {
            if (!this.ApplicationUsers.Contains(appUser))
            {
                this.ApplicationUsers.Add(appUser);
                await signalRHub.Groups.AddToGroupAsync(signalRHub.Context.ConnectionId, this.HubGroupId);
            }
        }
        public virtual async Task UnjoinGroup(SignalRHub signalRHub, ApplicationUser appUser)
        {
            if (this.ApplicationUsers.Contains(appUser))
            {
                this.ApplicationUsers.Remove(appUser);
                await signalRHub.Groups.RemoveFromGroupAsync(signalRHub.Context.ConnectionId, this.HubGroupId);
            }
        }
        public abstract Task CallAction(SignalRHub signalRHub, ApplicationUser appUser, string hubGroupId, HubPayload hubPayload);
        /// <summary>
        /// True if a game/chat can accept more participants
        /// </summary>
        public abstract bool CanJoin();
    }
}
