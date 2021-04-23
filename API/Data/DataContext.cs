using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<AppUser> Users { get; set; }

        public DbSet<Category> Categories {get;set;}
        public DbSet<SubCategory> Subcategories {get;set;}
        public DbSet<Language> Languages {get;set;}
        public DbSet<Course> Courses {get;set;}

        
    }
}