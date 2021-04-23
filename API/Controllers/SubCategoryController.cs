using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoryController : ControllerBase
    {
        private readonly DataContext _context;
        public SubCategoryController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<SubCategory>> GetCategories()
        {
            var categories = await _context.Subcategories.Include(s=>s.Category).ToListAsync();
            return categories;
        }

        [HttpGet("{id}")]
        public async Task<SubCategory> GetSubCategory(int id)
        {
            var subcategory = await _context.Subcategories.FindAsync(id);
            subcategory.Category = await _context.Categories.FindAsync(subcategory.CategoryId);
            return subcategory;
        }

        [HttpPost("delete/{id}")]
        public async Task<int> DeleteSubCategory(int id)
        {
            var subcategory = await _context.Subcategories.FindAsync(id);
            _context.Subcategories.Remove(subcategory);
            await _context.SaveChangesAsync();
            return id;
        }

        [HttpPost("create")]
        public async Task<SubCategory> CreateSubCategory(SubCategoryDTO subcategoryDTO)
        {
            Category category = await _context.Categories.FindAsync(subcategoryDTO.CategoryId);
            if(category != null)
            {   
                var subcategory = new SubCategory()
                {
                    SubCategoryName = subcategoryDTO.SubCategoryName,
                    Category = category,
                    CategoryId = subcategoryDTO.CategoryId
                };

                _context.Subcategories.Add(subcategory);
               
                await _context.SaveChangesAsync();

                return subcategory;
            }

            return null;
        }

        [HttpPost("update")]
        public async Task<SubCategory> UpdateSubCategory(SubCategory subcategory)
        {
            Category category = await _context.Categories.FindAsync(subcategory.CategoryId);
            
            if(category != null)
            {   
                subcategory.Category = category;
            }

            _context.Subcategories.Update(subcategory);
            await _context.SaveChangesAsync(); 
            
            return subcategory;
        }

    }
}