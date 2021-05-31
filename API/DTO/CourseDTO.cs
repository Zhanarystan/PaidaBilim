namespace API.DTO
{
    public class CourseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public string CreatorEmail { get; set; }
        public int LanguageId { get; set; }
        public string Description { get; set; }
    }
}