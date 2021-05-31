using System;
using API.Entities;

namespace API.Entities
{
    public class Enrollment
    {
        public int Id { get; set; }
        
        public AppUser User { get; set; }
        public int UserId { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }
        public double Price { get; set; }
        public DateTime PurchasedDate { get; set; } = DateTime.Now;
    }
}