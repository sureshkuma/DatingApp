using DatingApp1.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp1.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
            
        }

        public DbSet<Value> values {get ;set;}

        public DbSet<User> users {get;set;}

       public DbSet<Photo> photos {get;set;}

       public DbSet<Likes> likes {get;set;}

       protected override void OnModelCreating(ModelBuilder bulider){
           bulider.Entity<Likes>()
                .HasKey(k => new {k.LikerId, k.LikeeId});

                bulider.Entity<Likes>()
                  .HasOne(u => u.Likee)
                  .WithMany(u => u.Likers)
                  .HasForeignKey(u => u.LikeeId)
                  .OnDelete(DeleteBehavior.Restrict);

                  bulider.Entity<Likes>()
                    .HasOne(u => u.Liker)
                    .WithMany(u => u.Likees)
                    .HasForeignKey(u => u.LikerId)
                    .OnDelete(DeleteBehavior.Restrict);
       }
    }

}