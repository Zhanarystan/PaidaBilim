using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly DataContext _context;
        public CourseController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Course>> GetCourses()
        {
            var courses = await _context.Courses.Include(s=>s.Creator).ToListAsync();
            
            return courses;
        }

        [HttpGet("{id}")]
        public async Task<Course> GetCourse(int id)
        {
            Course course = await _context.Courses.Include(c => c.LearningSkills)
                .Include(c => c.Requirements).SingleOrDefaultAsync();
            course.Creator = await _context.Users.FindAsync(course.CreatorId);
            course.Language = await _context.Languages.FindAsync(course.LanguageId);
            return course;
        }

        [HttpPost("delete/{id}")]
        public async Task<int> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return id;
        }

        [HttpPost("create")]
        public async Task<Course> CreateCourse(Course course)
        {
            var user = await _context.Users.FindAsync(course.CreatorId);
            var language = await _context.Languages.FindAsync(course.LanguageId);
            if(user!=null)
            {
                course.Creator = user;
                course.Language = language;
            }


            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return course;
        }

        [HttpPost("update")]
        public async Task<Course> UpdateCourse(Course course)
        {
            
            _context.Courses.Update(course);
            await _context.SaveChangesAsync(); 
            
            return course;
        }

        [HttpGet("{id}/skills")]
        public async Task<IEnumerable<LearningSkill>> GetLearningSkills (int id)
        {
            Course course = await _context.Courses.Include(c => c.LearningSkills).SingleOrDefaultAsync();
            IEnumerable<LearningSkill> skills = course.LearningSkills; 
            return skills;
        }

        [HttpPost("create_skill")]
        public async Task<LearningSkill> CreateLearningSkill(LearningSkill skill)
        {
            Course course = await _context.Courses.FindAsync(skill.CourseId);
            course.LearningSkills.Add(skill);
            _context.Courses.Update(course);
            
            await _context.SaveChangesAsync();

            return skill;
        }

        [HttpPost("create_requirement")]
        public async Task<Requirement> CreateRequirement(Requirement requirement)
        {
            Course course = await _context.Courses.FindAsync(requirement.CourseId);
            course.Requirements.Add(requirement);
            _context.Courses.Update(course);
            
            await _context.SaveChangesAsync();

            return requirement;
        }
    }
}