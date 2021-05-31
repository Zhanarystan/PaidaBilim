using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("videos")]
    public class Video
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string PosterUrl { get; set; }
        public int CourseId { get; set; }
    }
}