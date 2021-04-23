using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Requirements")]
    public class Requirement
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int CourseId { get; set; }
    }
}