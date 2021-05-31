using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DataContext()
        {

        }

        public DbSet<AppUser> Users { get; set; }

        public virtual DbSet<Category> Categories {get;set;}
        public virtual DbSet<SubCategory> Subcategories {get;set;}
        public virtual DbSet<Language> Languages {get;set;}
        public virtual DbSet<Course> Courses {get;set;}

        public virtual DbSet<Enrollment> Enrolls {get;set;}

        
    }
}