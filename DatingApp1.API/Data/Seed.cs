using System.Collections.Generic;
using DatingApp1.API.Models;
using Newtonsoft.Json;

namespace DatingApp1.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers() {
            var userdata = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userdata);

            foreach(var user in users){
                byte[] passwordhash,passwordsalt;
                 CreatePasswordHash("password", out passwordhash, out passwordsalt);
            user.PasswordHash =passwordhash;
            user.PasswordSalt = passwordsalt;
            user.Username = user.Username.ToLower();

            _context.users.Add(user);
            }

            _context.SaveChanges();
        }
         private void CreatePasswordHash(string password, out byte[] passwordhash, out byte[] passwordsalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordsalt = hmac.Key;
                passwordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }
    }
}