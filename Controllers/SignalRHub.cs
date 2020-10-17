using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using dotnet_react.Models;
using dotnet_react.Models.HubGroups;
using Newtonsoft.Json;

namespace dotnet_react.Controllers
{
    public class SignalRHub : Hub
    {
       
      
        HubGroupManager _hubGroupManager;
        public UserManager<dotnet_react.Models.ApplicationUser> UserManager { get; private set; }
        public ILogger<SignalRHub> Logger { get; private set; }

        public SignalRHub(
            ILogger<SignalRHub> logger,
            UserManager<dotnet_react.Models.ApplicationUser> userManager,
            HubGroupManager appData
        )
        {
            Logger = logger;
            UserManager = userManager;
            _hubGroupManager = appData;
        }

        public async Task CallAction(string accessToken, string hubGroupId, string payloadString)
        {
            Logger.LogInformation($"SignalRHub.CallAction groupId=[{hubGroupId}] payload=[{payloadString}]");
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(accessToken);
            ApplicationUser appUser = await UserManager.FindByIdAsync(token.Subject);
            HubPayload hubPayload = JsonConvert.DeserializeObject<HubPayload>(payloadString);
            
            await _hubGroupManager.CallAction(this, appUser, hubGroupId, hubPayload);
        }
    }
}
