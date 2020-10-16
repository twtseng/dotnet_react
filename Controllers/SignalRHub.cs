using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using dotnet_react.Models;

namespace dotnet_react.Controllers
{
    public class SignalRHub : Hub
    {
        public ILogger<SignalRHub> _logger;
        public UserManager<dotnet_react.Models.ApplicationUser> _manager;
      
        AppData _appData;
        public SignalRHub(
            ILogger<SignalRHub> logger,
            UserManager<dotnet_react.Models.ApplicationUser> userManager,
            AppData appData
        )
        {
            _logger = logger;
            _manager = userManager;
            _appData = appData;
        }
        public async Task GetGroupId()
        {
            _logger.LogInformation($"SignalRHub.GetGroupId");
            await Clients.All.SendAsync("GroupId", _appData.HubGroups[0].HubGroupId);
        }
        public async Task GroupMethod(string accessToken, string hubGroupId, string payload)
        {
            _logger.LogInformation($"SignalRHub.GroupMethod hubGroupId={hubGroupId} payload={payload}");
            
            await _appData.HandlePayload(this, hubGroupId, accessToken, payload);
        }
        // public async Task ResetGame(string accessToken)
        // {
        //     _logger.LogInformation($"ResetGame ({accessToken}");
        //     var handler = new JwtSecurityTokenHandler();
        //     var token = handler.ReadJwtToken(accessToken);
        //     ApplicationUser appUser = await _manager.FindByIdAsync(token.Subject);
        //     _mathRace.ResetGame();
        //     _mathRace.Status = $"{appUser.Email} reset the game";
        //     _mathRace.AddPlayer(appUser);
        //     await Clients.All.SendAsync("GameJson", _mathRace.GetGameJson());
        // }
        // public async Task CheckAnswer(string accessToken, string answer)
        // {
        //     _logger.LogInformation($"CheckAnswer ({answer} {accessToken})");
        //     var handler = new JwtSecurityTokenHandler();
        //     var token = handler.ReadJwtToken(accessToken);
        //     ApplicationUser appUser = await _manager.FindByIdAsync(token.Subject);
        //     if (_mathRace.CheckAnswer(appUser, int.Parse(answer)))
        //     {
        //         await Clients.Caller.SendAsync("AnswerRight", answer);
        //         await Clients.All.SendAsync("GameJson", _mathRace.GetGameJson());
        //     }
        //     else
        //     {
        //         await Clients.Caller.SendAsync("AnswerWrong", answer);
        //     }
        // }
        
        // public async Task AddPlayer(string accessToken)
        // {
        //     var handler = new JwtSecurityTokenHandler();
        //     var token = handler.ReadJwtToken(accessToken);
        //     ApplicationUser appUser = await _manager.FindByIdAsync(token.Subject);
        //     _mathRace.AddPlayer(appUser);
        //     _logger.LogInformation($"AddPlayer ({appUser.Email})");
        //     await Clients.All.SendAsync("GameJson", _mathRace.GetGameJson());
        // }
    }
}
