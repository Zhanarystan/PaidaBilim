using System;
using System.IO;
using System.Net.Http.Headers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {

        private readonly DataContext _context;
        public UploadController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("upload_image/{courseId}"), DisableRequestSizeLimit]
        public IActionResult UploadImage(int courseId)
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if(file.Length>0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    Course course = _context.Courses.Find(courseId);
                    course.Image = dbPath;
                    _context.Courses.Update(course);
                    _context.SaveChanges();
                    
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return StatusCode(500, $"Internal server error: {e}");
            }
        }      

        [HttpPost("upload_video/{courseId}"), DisableRequestSizeLimit]
        public IActionResult UploadVideo(int courseId)
        {
            try
            {
                var file = Request.Form.Files[0];
                var file1 = Request.Form.Files[1]; //for posters

                var folderName = Path.Combine("Resources", "Videos");
                var folderName1 = Path.Combine("Resources", "Posters"); //for posters

                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var pathToSave1 = Path.Combine(Directory.GetCurrentDirectory(), folderName1); //for posters

                if(file.Length>0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fileName1 = ContentDispositionHeaderValue.Parse(file1.ContentDisposition).FileName.Trim('"');//for posters
                    
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var fullPath1 = Path.Combine(pathToSave1, fileName1); //for posters
                    
                    var dbPath = Path.Combine(folderName, fileName);
                    var dbPath1 = Path.Combine(folderName1, fileName1); //for posters

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    using (var stream1 = new FileStream(fullPath1, FileMode.Create))  //for posters
                    {
                        file1.CopyTo(stream1);
                    }


                    Video video = new Video()
                    {
                        Title = Request.Form["title"],
                        Url = dbPath,
                        PosterUrl = dbPath1,
                        CourseId = courseId
                    };

                    Course course = _context.Courses.Find(courseId);
                    course.Videos.Add(video);
                    _context.Courses.Update(course);
                    _context.SaveChanges();
                    // return Ok(new { dbPath });
                    return Ok(video);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return StatusCode(500, $"Internal server error: {e}");
            }
        }  
    }
}