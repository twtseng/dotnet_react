
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
        ILogger<SignalRHub> _logger;
        UserManager<dotnet_react.Models.ApplicationUser> _manager;
        MathRace _mathRace;
        public SignalRHub(
            ILogger<SignalRHub> logger,
            UserManager<dotnet_react.Models.ApplicationUser> userManager,
            MathRace mathRace
        )
        {
            _logger = logger;
            _manager = userManager;
            _mathRace = mathRace;
        }
        public async Task ResetGame(string accessToken)
        {
            _logger.LogInformation($"ResetGame ({accessToken}");
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(accessToken);
            ApplicationUser appUser = await _manager.FindByIdAsync(token.Subject);
            _mathRace.ResetGame();
            _mathRace.Status = $"{appUser.Email} reset the game";
            _mathRace.AddPlayer(appUser);
            await Clients.All.SendAsync("GameJson", _mathRace.GetGameJson());
        }
        public async Task CheckAnswer(string accessToken, string answer)
        {
            _logger.LogInformation($"CheckAnswer ({answer} {accessToken})");
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(accessToken);
            ApplicationUser appUser = await _manager.FindByIdAsync(token.Subject);
            if (_mathRace.CheckAnswer(appUser, int.Parse(answer)))
            {
                await Clients.Caller.SendAsync("AnswerRight", answer);
                await Clients.All.SendAsync("GameJson", _mathRace.GetGameJson());
            }
            else
            {
                await Clients.Caller.SendAsync("AnswerWrong", answer);
            }
        }
        
        public async Task AddPlayer(string accessToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(accessToken);
            ApplicationUser appUser = await _manager.FindByIdAsync(token.Subject);
            _mathRace.AddPlayer(appUser);
            _logger.LogInformation($"AddPlayer ({appUser.Email})");
            await Clients.All.SendAsync("GameJson", _mathRace.GetGameJson());
        }
    }
}
