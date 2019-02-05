using System;

namespace DatingApp1.API.Models
{
    public class Messages
    {
        public int Id {get;set;}

        public int SenderId {get;set;}

        public User Sender {get;set;}

        public int RecipaintId {get;set;}

        public User Recipaint {get;set;}

        public string content {get;set;}

        public bool IsRead {get;set;}
        public DateTime? DateRead {get;set;}

        public DateTime MessageSent {get;set;}

        public bool SenderDeleted{get;set;}

        public bool RecipaintDeleted {get;set;}
    }
}