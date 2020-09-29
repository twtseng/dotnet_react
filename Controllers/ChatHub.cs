
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using dotnet_react.Models;

namespace dotnet_react.Controllers
{
    public class ChatHub : Hub
    {
        ILogger<ChatHub> _logger;
        UserManager<dotnet_react.Models.ApplicationUser> _manager;
        public ChatHub(
            ILogger<ChatHub> logger,
            UserManager<dotnet_react.Models.ApplicationUser> userManager
        )
        {
            _logger = logger;
            _manager = userManager;
        }
        public async Task SendMessage(string user, string message, string accessToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(accessToken);
            ApplicationUser appUser = await _manager.FindByIdAsync(token.Subject);
            _logger.LogInformation($"ChatHub.SendMessage(user: '{user}', message: '{message}')");
            await Clients.All.SendAsync("SendMessage", user, message);
        }
        public Task SendConnectionId(string connectionId)
        {
            _logger.LogInformation($"ChatHub.sendConnectionId(connectionId: '{connectionId}' Context.User:{Context.User})");
            return Clients.All.SendAsync("sendConnectionId", connectionId);
        }
    }
}
