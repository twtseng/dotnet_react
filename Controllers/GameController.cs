using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnet_react.Models;
using dotnet_react.Data;

namespace dotnet_react.Controllers
{
    [ApiController]
    [Route("[controller]")] 
    public class GameController
    {
        private readonly ILogger<GameController> _logger;
        private readonly ApplicationDbContext _dbContext;
        
        public GameController(ILogger<GameController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }
        [HttpGet("GetPoliteGameQuestions")]
        public async Task<IEnumerable<PoliteGameQuestion>> GetPoliteGameQuestions()
        {
            return await _dbContext.PoliteGameQuestions.ToListAsync();
        }        
    }
}
