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
    public class LanguageController : ControllerBase
    {
        private readonly DataContext _context;
        public LanguageController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Language>> GetLanguages()
        {
            var languages = await _context.Languages.ToListAsync();
            return languages;
        }

        [HttpGet("{id}")]
        public async Task<Language> GetLanguage(int id)
        {
            var language = await _context.Languages.FindAsync(id);
            return language;
        }

        [HttpPost("delete/{id}")]
        public async Task<int> DeleteLanguage(int id)
        {
            var language = await _context.Languages.FindAsync(id);
            _context.Languages.Remove(language);
            await _context.SaveChangesAsync();
            return id;
        }

        [HttpPost("create")]
        public async Task<Language> CreateLanguage(Language language)
        {
            _context.Languages.Add(language);
            await _context.SaveChangesAsync();

            return language;
        }

        [HttpPost("update")]
        public async Task<Language> UpdateLanguage(Language language)
        {
            _context.Languages.Update(language);
           await _context.SaveChangesAsync(); 
            
            return language;
        }
    }
}