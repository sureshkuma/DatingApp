using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp1.API.Models;

namespace DatingApp1.API.Data
{
    public interface IDatingRepositroy
    {
         void Add<T>(T entity) where T: class;

         void Delete<T>(T entity) where T: class;

         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetAllusers();

         Task<User> Getuser(int id);
    }
}