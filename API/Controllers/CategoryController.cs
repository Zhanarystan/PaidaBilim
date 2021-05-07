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
    public class CategoryController : ControllerBase
    {
        private readonly DataContext _context;
        public CategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            
            return categories;
        }

        [HttpGet("{id}")]
        public async Task<Category> GetCategory(int id)
        {
            Category category = await _context.Categories.FindAsync(id);
            return category;
        }

        [HttpPost("delete/{id}")]
        public async Task<int> DeleteCategory(int id)
        {
            
            var category = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return id;
        }

        [HttpPost("create")]
        public async Task<Category> CreateCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }

        [HttpPost("update")]
        public async Task<Category> UpdateCategory(Category category)
        {
            _context.Categories.Update(category);
           await _context.SaveChangesAsync(); 
            
            return category;
        }
    }
}