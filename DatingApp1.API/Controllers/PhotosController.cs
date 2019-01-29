using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp1.API.Data;
using DatingApp1.API.DTOS;
using DatingApp1.API.Helper;
using DatingApp1.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp1.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepositroy _repo; 
        
         private readonly IMapper _mapper; 
          private readonly IOptions<CloudinarySettings> _cloudcnfig; 

          private readonly Cloudinary _cloudinary;
           
        public PhotosController(IDatingRepositroy repo, IMapper mapper, IOptions<CloudinarySettings> cloudcnfig)
        {
           _repo = repo;
           _mapper = mapper;
           _cloudcnfig = cloudcnfig;

            
            Account acc = new Account(
               _cloudcnfig.Value.CloudName,
               _cloudcnfig.Value.ApiKey,
               _cloudcnfig.Value.ApiSecret
           );

           _cloudinary = new Cloudinary(acc);

        }

        [HttpGet("{id}", Name= "GetPhoto")]
        public async Task<IActionResult> getphotos(int id){

          var photofromdb = await _repo.GetPhoto(id);

          var photo = _mapper.Map<PhotoForRetuenDto>(photofromdb);
          return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> Uploadimages(int userId, [FromForm]PhotoForCreationDto photocrtdto)
        {

             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) ) {
                return Unauthorized();
            }

            var userfromdb = await _repo.Getuser(userId);
            var file = photocrtdto.file;

            var uploadresulrt = new ImageUploadResult();

            if(file.Length > 0) {

                using( var stream = file.OpenReadStream()) {

                    var uploadparms = new ImageUploadParams {
                        File = new FileDescription(file.Name,stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadresulrt = _cloudinary.Upload(uploadparms);

                }
            }

            photocrtdto.Url = uploadresulrt.Uri.ToString();
            photocrtdto.PublicId = uploadresulrt.PublicId;

            var photo = _mapper.Map<Photo>(photocrtdto);

            if(!userfromdb.Photos.Any(u => u.IsMain)) {
                photo.IsMain = true;
            }
            userfromdb.Photos.Add(photo);

            if(await _repo.SaveAll()) {

                var phottoreturn = _mapper.Map<PhotoForRetuenDto>(photo);
                return CreatedAtRoute("GetPhoto", new {id = photo.Id},phottoreturn);
            }

            return BadRequest("could not added the photo");

        }

        [HttpPost("{id}/SetMain")]
        public async Task<IActionResult> SetMainPhoto(int userId,int id)
        {

             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) ) {
                return Unauthorized();
            }

            var user = await _repo.Getuser(userId);

            if(!user.Photos.Any(p =>p.Id == id)){
                return Unauthorized();
            }
             var photofromdb = await _repo.GetPhoto(id);

             if(photofromdb.IsMain) {
                 return BadRequest("This is already the main photo");
             }

           var mainphtfrmdb = await _repo.SetMainPhoto(userId);
           mainphtfrmdb.IsMain = false;

           photofromdb.IsMain = true;

            if( await _repo.SaveAll()) {
                return NoContent();
            }

            return BadRequest("Could not set photo to main");
             
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Delete(int userId, int id) 
        {
             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) ) {
                return Unauthorized();
            }

            var user = await _repo.Getuser(userId);

            if(!user.Photos.Any(p =>p.Id == id)){
                return Unauthorized();
            }
             var photofromdb = await _repo.GetPhoto(id);

             if(photofromdb.IsMain) {
                 return BadRequest("You Cannot Delete your main photo");
             }

             if(photofromdb.PublicId!=null){

                 var deleteparams = new DeletionParams(photofromdb.PublicId);
                 var result = _cloudinary.Destroy(deleteparams);
                 
                 if(result.Result == "ok") {
                     _repo.Delete(photofromdb);
                 }
             }
             if(photofromdb.PublicId==null){

                _repo.Delete(photofromdb);
             }

             if(await _repo.SaveAll()) {
                 return Ok();
             }

             return BadRequest("Failed to delete the photo");
        }
    }
}