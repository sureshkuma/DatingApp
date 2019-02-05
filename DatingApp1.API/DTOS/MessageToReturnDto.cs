using System;

namespace DatingApp1.API.DTOS
{
    public class MessageToReturnDto
    {
         public int Id {get;set;}

        public int SenderId {get;set;}

        public string SenderPhotoUrl {get;set;}

        public string SenderKnownAs {get;set;}

        public int RecipaintId {get;set;}

        public string RecipaintPhotoUrl {get;set;}

        public string RecipaintKnownAs {get;set;}

        public string content {get;set;}

        public bool IsRead {get;set;}
        public DateTime? DateRead {get;set;}

        public DateTime MessageSent {get;set;}
    }
}