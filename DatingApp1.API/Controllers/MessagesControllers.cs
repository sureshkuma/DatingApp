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
    [Route("api/users/{userid}/messages")]
    [ApiController]
    public class MessagesControllers : ControllerBase
    {
        private readonly IMapper _mapper;
       
       private readonly IDatingRepositroy _repo;
        public MessagesControllers(IDatingRepositroy repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;

        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> getMessage(int userId,int id) 
        {

           if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) ) {
                return Unauthorized();
            }

            var messsgefromrepo = await _repo.GetMessage(id);

            if(messsgefromrepo == null)
                return NotFound();
            
            return Ok(messsgefromrepo);            
        }

        [HttpGet("thread/{RecipaintId}")]
        public async Task<IActionResult> GetMessageThead(int userid, int RecipaintId) 
        {
             if(userid!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

             var msgtofromrepo =  await _repo.GetMessageThread(userid,RecipaintId);
            var message =  _mapper.Map<IEnumerable<MessageToReturnDto>>(msgtofromrepo);
            return Ok(message);
        }

        [HttpGet] 
        public async Task<IActionResult> GetMessageForUser (int UserId, [FromQuery]MessageParams msgparams) 
        {
             if(UserId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
                 msgparams.UserId = UserId;
                var msgfrmrepo =await _repo.GetMessageForUser(msgparams);

                 if(msgfrmrepo == null) 
                    return NotFound();

               // var msgtoreturn = _mapper.Map<MessageToReturnDto>(msgfrmrepo);
               var msgtoreturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(msgfrmrepo);

               Response.AddPagination(msgfrmrepo.currentpage, msgfrmrepo.Pagesize, 
               msgfrmrepo.Totalitems, msgfrmrepo.TotalPages);

               return Ok(msgtoreturn);

        }

        [HttpPost]
        public async Task<IActionResult> CreateMessge(int UserId, MessagesForDto msgfrdto)
        {
            var sender = await _repo.Getuser(UserId);
            if(sender.Id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

                msgfrdto.SenderId = UserId;

              var recipient = await _repo.Getuser(msgfrdto.RecipaintId);

              if(recipient == null) {
                  return BadRequest("the user doesn't exsist");
              }

              var msgfrommap =  _mapper.Map<Messages>(msgfrdto);

              _repo.Add(msgfrommap);
              if( await _repo.SaveAll()) 
              {
                   var mesgtoreturn = _mapper.Map<MessageToReturnDto>(msgfrommap);
                    return CreatedAtRoute("GetMessage",new {id = msgfrommap.Id}, mesgtoreturn);
              }
                throw new Exception("Creating the message failed on save");
        }
    }
}