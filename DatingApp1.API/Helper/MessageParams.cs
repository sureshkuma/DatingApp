namespace DatingApp1.API.Helper
{
    public class MessageParams
    {
        private const int Maxcountsize = 50;
        public int PageNumber {get;set;} =1;

        private int PageSize = 10;
        public int MyProperty
        {
            get { return PageSize;}
            set { PageSize = (value > Maxcountsize)? Maxcountsize: value;}
        }

        public int UserId {get;set;}

        public string MessageContainer {get;set;} = "Unread";
    }
}