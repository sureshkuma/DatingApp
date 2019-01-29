using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp1.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp1.API.Data
{
    public class DatingRepositroy : IDatingRepositroy
    {   
        private readonly DataContext _context;
        public DatingRepositroy(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
           _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
           _context.Remove(entity);
        }

        public async Task<IEnumerable<User>> GetAllusers()
        {
          var users = await  _context.users.Include(p => p.Photos).ToListAsync();
          return users;
        }

        public async  Task<Photo> GetPhoto(int id)
        {
           var photofromdb = await _context.photos.FirstOrDefaultAsync(p => p.Id == id);

           return photofromdb;
        }

        public async Task<User> Getuser(int id)
        {
          var user = await  _context.users.Include(p => p.Photos).FirstOrDefaultAsync(u =>u.Id == id);
          return user;
        }

        public async Task<bool> SaveAll()
        {
           return await _context.SaveChangesAsync()>0;
        }

        public async Task<Photo> SetMainPhoto(int userid)
        {
            var mainphoto = await _context.photos.Where(u => u.UserId == userid).FirstOrDefaultAsync(i => i.IsMain);
            return mainphoto;
        }
    }
}