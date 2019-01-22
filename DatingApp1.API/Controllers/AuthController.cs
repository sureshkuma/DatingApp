using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp1.API.Data;
using DatingApp1.API.DTOS;
using DatingApp1.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp1.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
       private readonly IAuthRepositroy _repo;
       private readonly IConfiguration _Config;
        public AuthController(IAuthRepositroy repo, IConfiguration config)
        {
            _repo = repo;
            _Config = config;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userforregisterdto)
        {
            userforregisterdto.Username = userforregisterdto.Username.ToLower();

            if(await _repo.UserExists(userforregisterdto.Username))
                return BadRequest("The User is already Exsists");

                var usertocreate = new User {
                    Username = userforregisterdto.Username
                };

                var createduser = await _repo.Register(usertocreate,userforregisterdto.Password);
                return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userfrmrepo = await _repo.Login(userForLoginDto.Username.ToLower(),userForLoginDto.Password);

            if(userfrmrepo == null)
            return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userfrmrepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userfrmrepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            var TokenDescripator = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var Tokenhandler = new JwtSecurityTokenHandler();

            var token= Tokenhandler.CreateToken(TokenDescripator);

            return Ok(new {
                token = Tokenhandler.WriteToken(token)
            });
        }
    }
}