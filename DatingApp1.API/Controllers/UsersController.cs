using System.Collections.Generic;
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
    }
}