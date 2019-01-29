using System;

namespace DatingApp1.API.DTOS
{
    public class PhotosForDetailedDto
    {
        public int Id {get;set;}

        public string Url {get;set;}

        public string Descripation {get;set;}

        public DateTime Created {get;set;}

        public bool IsMain {get;set;}
    }
}