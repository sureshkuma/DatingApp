using System;
using System.Threading.Tasks;
using DatingApp1.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp1.API.Data
{
    public class AuthRespository : IAuthRepositroy
    {
        private readonly DataContext _context;
        public AuthRespository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
          var user = await _context.users.FirstOrDefaultAsync(x =>x.Username == username);

          if(user == null)
            return null;

            if(!VerifyPaaswordHash(password, user.PasswordHash,user.PasswordSalt))
            return null;

            return user;
        }

        private bool VerifyPaaswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
           using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedhash= hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i=0;i<computedhash.Length;i++){
                    if(computedhash[i]!= passwordHash[i])
                    return false;
                }

            }
            return true;
        }

        public  async Task<User> Register(User user, string password)
        {
            byte[] passwordhash, passwordsalt;
            CreatePasswordHash(password, out passwordhash, out passwordsalt);
            user.PasswordHash =passwordhash;
            user.PasswordSalt = passwordsalt;
            await _context.users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordhash, out byte[] passwordsalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordsalt = hmac.Key;
                passwordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.users.AnyAsync(x => x.Username == username))
            return true;

            return false;
        }
    }
}