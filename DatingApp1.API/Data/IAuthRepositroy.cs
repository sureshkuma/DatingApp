using System.Threading.Tasks;
using DatingApp1.API.Models;

namespace DatingApp1.API.Data
{
    public interface IAuthRepositroy
    {
         Task<User> Register(User user,string password);

         Task<User> Login(string username,string password);

         Task<bool> UserExists(string username);
    }
}