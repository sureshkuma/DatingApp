using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp1.API.Helper;
using DatingApp1.API.Models;

namespace DatingApp1.API.Data
{
    public interface IDatingRepositroy
    {
         void Add<T>(T entity) where T: class;

         void Delete<T>(T entity) where T: class;

         Task<bool> SaveAll();

         Task<PageList<User>> GetAllusers(UserParams userparams);

         Task<User> Getuser(int id);

         Task<Photo> GetPhoto(int id);

         Task<Photo> SetMainPhoto(int userid);

         Task<Likes> GetLikes (int Userid, int recipaintid);
    }
}