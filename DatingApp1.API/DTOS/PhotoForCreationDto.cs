using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp1.API.DTOS
{
    public class PhotoForCreationDto
    {
        public string Url {get;set;}

        public IFormFile file {get;set;}

        public string Descripation {get;set;}

        public string PublicId {get;set;}

        public DateTime DateAdded {get;set;}

        public PhotoForCreationDto() {
            DateAdded = DateTime.Now;
        }
    }
}