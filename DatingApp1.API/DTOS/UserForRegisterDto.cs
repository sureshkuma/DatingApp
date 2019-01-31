using System;
using System.ComponentModel.DataAnnotations;
namespace DatingApp1.API.DTOS
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8,MinimumLength=4, ErrorMessage = "You Must specify the password between 4 and 8 characters")]
        public string Password { get; set; }

        public string Gender {get;set;}

        public string KnownAs {get;set;}

        public DateTime DateofBirth {get;set;}

        public string city {get;set;}

        public string country {get;set;}

        public DateTime Created {get;set;}

        public DateTime LastActive {get;set;}

        public UserForRegisterDto() {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}