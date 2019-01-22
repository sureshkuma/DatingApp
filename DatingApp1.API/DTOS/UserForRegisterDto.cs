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
    }
}