using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Data.Common;
using System.Data.SqlClient;
using System.DirectoryServices.AccountManagement;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace PaidaBilim.Tests
{
    [TestClass]
    public class UnitTest1
    {
        private readonly DbContextOptions DbContextOptions;
        private readonly DataContext _context;

        

        [TestMethod]
        public void Typeof_Category()
        {
            var controller = new CategoryController(_context);
            var result = controller.GetCategory(1);

            Assert.IsInstanceOfType(result, typeof(Task<Category>));
        }

        [TestMethod]
        public void IsNot_Null_Categories()
        {
            var controller = new CategoryController(_context);
            var result = controller.GetCategories();

            Assert.IsNotNull(result);
        }

        /*
        [TestMethod]
        public void Not_Found_Response_On_Deleting_Category()
        {
            var controller = new CategoryController(_context);
            var result = controller.DeleteCategory(0).Result;

            Assert.IsInstanceOfType(result, typeof(IActionResult));
            Assert.AreEqual();
        }*/
    }
}
