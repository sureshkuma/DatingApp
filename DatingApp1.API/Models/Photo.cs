using System;

namespace DatingApp1.API.Models
{
    public class Photo
    {
        public int Id {get;set;}

        public string Url {get;set;}

        public string Descripation {get;set;}

        public DateTime Created {get;set;}

        public bool IsMain {get;set;}

        public User user {get;set;}

        public int UserId {get;set;}

    }
}