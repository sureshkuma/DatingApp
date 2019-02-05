using System;

namespace DatingApp1.API.DTOS
{
    public class MessagesForDto
    {
     public int SenderId {get;set;}

     public int RecipaintId {get;set;}   

     public string Content {get;set;} 

     public DateTime MessageSent {get;set;}

     public MessagesForDto() {
         MessageSent = DateTime.Now;
     }
    }
}