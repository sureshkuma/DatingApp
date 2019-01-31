using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp1.API.Data;
using DatingApp1.API.DTOS;
using DatingApp1.API.Helper;
using DatingApp1.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp1.API.Controllers
{ 
    [ServiceFilter(typeof(LogUserActivity))]
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
         public async Task<IActionResult> GetAllUsers([FromQuery]UserParams userparams)
          {
              var currentuserid = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
              var userfromrepo = await _context.Getuser(currentuserid);
              userparams.UserId = currentuserid;

              if(string.IsNullOrEmpty(userparams.Gender)) {
                  
                  userparams.Gender = userfromrepo.Gender == "male" ? "female": "male";
              }
                var users = await _context.GetAllusers(userparams);
                
                var usertortun =    _mapper.Map<IEnumerable<UserForListDto>>(users);
                Response.AddPagination(users.currentpage, users.Pagesize,users.TotalPages,users.Totalitems);
                return Ok(usertortun);
         }

         [HttpGet("{id}", Name = "GetUSer")]
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

        [HttpPost("{id}/like/{recipientId}")]
         public async Task<IActionResult> LikeUser(int id, int recipientId) 
         {

             if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
             return Unauthorized();
            var like = await _context.GetLikes(id,recipientId);

            if(like!=null) {
                return BadRequest("you already liked the profile");
            }
            if(await _context.Getuser(recipientId) == null) {
                return NotFound();
            }

            like = new Likes {
                LikerId = id,
                LikeeId = recipientId
            };

            _context.Add<Likes>(like);

            if(await _context.SaveAll()) 
                    return Ok();

                    return BadRequest("Failed to like user");
            

         }
    }
}