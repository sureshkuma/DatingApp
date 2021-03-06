using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DatingApp1.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Username {get;set;}
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public string Gender {get;set;}

        public DateTime DateofBirth {get;set;}
 
        public DateTime Created {get;set;}

        public string KnownAs {get;set;}

        public DateTime LastActive {get;set;}
        public string Introduction {get;set;}
        public string LookingFor {get;set;}
        public string Interests {get;set;}

        public string City {get;set;}

        public string Country {get;set;}

        public ICollection<Photo> Photos {get;set;}

        public ICollection<Likes> Likees {get;set;}

        public ICollection<Likes> Likers {get;set;}

        public ICollection<Messages> MessagesSent {get;set;}

        public ICollection<Messages> MessagesRcvd {get;set;}
    }
}