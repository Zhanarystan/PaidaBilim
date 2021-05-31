using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public int StudentAmount { get; set; } = 0;
        public AppUser Creator { get; set; }
        public int? CreatorId { get; set; }
        public Language Language { get; set; }
        public int? LanguageId { get; set; }
        public SubCategory SubCategory { get; set; }
        public int? SubCategoryId { get; set; }
        public ICollection<LearningSkill> LearningSkills { get; set; } = new List<LearningSkill>();
        public ICollection<Requirement> Requirements { get; set; } = new List<Requirement>();
        public ICollection<Video> Videos { get; set; } = new List<Video>();
        public string Description { get; set; }
        public DateTime PostedDate { get; set; } = DateTime.Now;
    }
}