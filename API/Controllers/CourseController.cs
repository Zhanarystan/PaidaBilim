using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
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
           
            var courses = await _context.Courses.Include(s => s.Creator).OrderByDescending(s => s.PostedDate).ToListAsync();
            return courses;
        }

        [HttpGet("my_posted_courses/{email}")]
        public async Task<IEnumerable<Course>> GetMyPostedCourses(string email)
        {
            AppUser user =  await _context.Users.Where(c => c.Email == email).SingleOrDefaultAsync();

            var courses = await _context.Courses.Where(c => c.CreatorId == user.Id).Include(s => s.Creator)
                    .Include(s => s.Language)
                    .Include(s => s.SubCategory)
                    .OrderByDescending(s => s.PostedDate)
                    .ToListAsync();

            return courses;
        }

        [HttpGet("newest_courses")]
        public async Task<IEnumerable<Course>> GetNewestCourses()
        {
           
            var courses = await _context.Courses.Include(s => s.Creator).OrderByDescending(s => s.PostedDate).Take(8).ToListAsync();
            return courses;
        }

        [HttpGet("{id}")]
        public async Task<Course> GetCourse(int id)
        {
            Course course = await _context.Courses.Include(c => c.LearningSkills)
                .Include(c => c.Requirements).Include(c => c.Videos).Where(c => c.Id == id).SingleOrDefaultAsync();
                
            course.Creator = await _context.Users.FindAsync(course.CreatorId);
            course.Language = await _context.Languages.FindAsync(course.LanguageId);
            course.SubCategory = await _context.Subcategories.Include(c => c.Category).Where(c => c.Id == course.SubCategoryId).SingleOrDefaultAsync();
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
            var subCategory = await _context.Subcategories.FindAsync(course.SubCategoryId);
            
            course.Creator = user;
            course.Language = language;
            course.SubCategory = subCategory;

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

        [HttpPost("enroll_course")]
        public async Task<Course> EnrollToCourse(Enrollment enroll)
        {
            AppUser user = await _context.Users.FindAsync(enroll.UserId);
            Course course = await _context.Courses.FindAsync(enroll.CourseId);

            course.StudentAmount = course.StudentAmount+1;
            _context.Courses.Update(course);
            enroll.User = user;
            enroll.Course = course;
            _context.Enrolls.Add(enroll);            
            await _context.SaveChangesAsync();
            return course;
        }

        [HttpPost("get_enrollment")]
        public async Task<ActionResult<Enrollment>> getEnrollment(Enrollment e)
        {
            if(e.UserId==null || e.CourseId==null){
                return null;
            }
            Enrollment enrollment = await _context.Enrolls
                                    .Where(s => s.UserId==e.UserId && s.CourseId==e.CourseId).SingleOrDefaultAsync();
            if(enrollment!=null){
                return enrollment;
            }
            return null;
        }

        [HttpGet("my_courses/{userId}")]
        public async Task<ActionResult<IEnumerable<Enrollment>>> getMyCourses(int userId)
        {

            IEnumerable<Enrollment> e = await _context.Enrolls.Where(s => s.UserId == userId).Include(s => s.Course).ToListAsync();
            if(e.Count()!=0)
            {
                return Ok(e);
            }
            return null;
        }

        [HttpGet("search_by_category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Course>>> SearchByCategory(int categoryId)
        {
            var subcategories = await _context.Subcategories.Where(s => s.CategoryId == categoryId).ToListAsync();
            IEnumerable<Course> courses = await _context.Courses.Where(s => subcategories.Contains(s.SubCategory))
                    .Include(s => s.Language).ToListAsync();
            
            return Ok(courses);
        } 

        [HttpPost("filter")]
        public async Task<ActionResult<IEnumerable<Course>>> Filter(SearchProperties sp)
        {
            var subcategories = await _context.Subcategories.Where(s => s.CategoryId == sp.CategoryId).ToListAsync();

            var courses = await _context.Courses.Where(s => subcategories.Contains(s.SubCategory))
                    .Include(s => s.Language).ToListAsync();
            
            if(sp.SubCategoryId!=0)
            {
                courses = courses.Where(s => s.SubCategoryId == sp.SubCategoryId).ToList();
            }

            if(sp.LanguageId!=0)
            {
                courses = courses.Where(s => s.LanguageId == sp.LanguageId).ToList();
            }
            return Ok(courses);
        }
        
    }
}