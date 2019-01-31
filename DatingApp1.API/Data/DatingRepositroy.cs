using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp1.API.Helper;
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

        public async Task<PageList<User>> GetAllusers(UserParams userparams)
        {
          var users =  _context.users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();

           users = users.Where(p => p.Id != userparams.UserId);
           users = users.Where(g =>g.Gender == userparams.Gender);

           if(userparams.Likers) {

          var userlikes =   await  GetUserLikes(userparams.UserId, userparams.Likers);
                 users = users.Where(u => userlikes.Contains(u.Id));
           }
           if(userparams.Likees) {
               var userlikes =   await  GetUserLikes(userparams.UserId, userparams.Likers);
                 users = users.Where(u => userlikes.Contains(u.Id));
           }

           if(userparams.MinAge!=18 || userparams.MaxAge!=99) {
               var mindob = DateTime.Now.AddYears(-userparams.MaxAge -1);
               var maxdob = DateTime.Now.AddYears(-userparams.MinAge);

                users = users.Where(u => u.DateofBirth >= mindob && u.DateofBirth <= maxdob);
           }
           if(!string.IsNullOrEmpty(userparams.OrderBy)) {

               switch(userparams.OrderBy) {
                   case "created":

                    users = users.OrderByDescending(u => u.Created);
                    break;
                    default:
                    users =users.OrderByDescending(u => u.LastActive);
                    break;

               }
           }

          return await PageList<User>.CreatAsync(users, userparams.MyProperty,userparams.PageNumber);
        }

        public async Task<Likes> GetLikes(int Userid, int recipaintid)
        {
          return   await  _context.likes.FirstOrDefaultAsync(u => u.LikerId == Userid && u.LikeeId == recipaintid);
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

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool Likers) {
            var user = await _context.users.
            Include(u => u.Likers).
            Include(u => u.Likees).
            FirstOrDefaultAsync(u => u.Id == id);

            if(Likers) {
               return  user.Likers.Where(u => u.LikeeId == id).Select(u => u.LikerId);
            }
            else {
               return user.Likees.Where(u => u.LikerId == id).Select(u => u.LikeeId);
            }
        }
    }
}