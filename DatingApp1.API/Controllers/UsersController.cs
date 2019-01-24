using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp1.API.Data;
using DatingApp1.API.DTOS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp1.API.Controllers
{ 
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepositroy _context;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepositroy context, IMapper mapper)
        {
         _context = context;
         _mapper = mapper;
         }

         [HttpGet]
         public async Task<IActionResult> GetAllUsers() {
                var users = await _context.GetAllusers();
                var usertortun =    _mapper.Map<IEnumerable<UserForListDto>>(users);
                return Ok(usertortun);
         }

         [HttpGet("{id}")]
         public async Task<IActionResult> GetUser(int id){
             var user = await _context.Getuser(id);
             var usrtgn = _mapper.Map<UserForDetaildto>(user);
             return Ok(usrtgn);
         }

        [HttpPut("{id}")]
         public async Task<IActionResult> Update(int id, UserUpdatedto usertortun)  {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) ) {
                return Unauthorized();
            }

            var userfromdb = await _context.Getuser(id);
            _mapper.Map(usertortun,userfromdb);

            if(await _context.SaveAll())
            return NoContent();

            throw new Exception($"Upadating user {id} failed on save");
            
         }
    }
}