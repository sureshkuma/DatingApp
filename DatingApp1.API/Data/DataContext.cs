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
    }

}