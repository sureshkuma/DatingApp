namespace DatingApp1.API.Helper
{
    public class UserParams
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

        public string Gender {get;set;}

        public int MaxAge {get;set;} = 99;
        public int MinAge {get;set;} = 18;

        public string OrderBy {get;set;}
        
        public bool Likers {get;set;}

        public bool Likees {get;set;}
    }
}