using System.ComponentModel.DataAnnotations;

namespace DatingApp1.API.Models
{
   public class Value
    {
        [Key]
        public int Id {get ;set;}

        public string value {get;set;}
    }
}