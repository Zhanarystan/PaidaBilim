using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("LearningSkills")]
    public class LearningSkill
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int CourseId { get; set; }
    }
}