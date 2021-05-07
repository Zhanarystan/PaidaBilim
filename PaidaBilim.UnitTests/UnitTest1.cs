using API.Controllers;
using API.Data;
using API.DTO;
using API.Entities;
using FakeItEasy;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace PaidaBilim.UnitTests
{
    public class UnitTest1
    {
        
        [Fact]
        public async Task Categories_Count()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var categoryController = new CategoryController(dbContext);
            //Act
            var categories = categoryController.GetCategories().Result;

            //Assert
            Assert.Equal(18, categories.Count());
        }

        [Fact]
        public async Task Category_Create_Response()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var categoryController = new CategoryController(dbContext);
            //Act
            var categoryForAdding = new Category()
            {
                CategoryName = "New Category"
            };
            var categoryResponse = categoryController.CreateCategory(categoryForAdding).Result;

            //Assert
            Assert.Equal(categoryResponse.CategoryName, categoryForAdding.CategoryName);

            int deletingId = categoryResponse.Id;

            var categoryResponse1 = categoryController.DeleteCategory(deletingId).Result;

            //Assert
            Assert.Equal(categoryResponse1, deletingId);
        }

        [Fact]
        public async Task Category_Get_Response()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var categoryController = new CategoryController(dbContext);
            //Act
            var categoryForAdding = new Category()
            {
                CategoryName = "New Category"
            };
            var categoryResponse = categoryController.GetCategory(1).Result;

            //Assert
            Assert.NotNull(categoryResponse);
        }

        [Fact]
        public async Task Category_Is_Null()
        {
            //Arrange 
            var dbContext = await GetDataContext();
            var controller = new CategoryController(dbContext);

            //Act
            var nullData = controller.GetCategory(0).Result;

            //Assert
            Assert.Null(nullData);
        }

        [Fact]
        public async Task Type_Of_Method_In_CategoryController()
        {
            //Arrange 
            var dbContext = await GetDataContext();
            var controller = new CategoryController(dbContext);

            //Act
            var response = controller.GetCategories();

            //Assert
            Assert.IsType(typeof(Task<IEnumerable<Category>>), response);
        }

        [Fact]
        public async Task Category_Update_Response()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var categoryController = new CategoryController(dbContext);
            //Act
            var category = categoryController.GetCategory(2).Result;
            category.CategoryName = "Updated category";
            var categoryResponse = categoryController.UpdateCategory(category).Result;

            //Assert
            Assert.Equal(categoryResponse.CategoryName,"Updated category");
        }


        [Fact]
        public async Task Language_Count()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var controller = new LanguageController(dbContext);
            //Act
            var languages= controller.GetLanguages().Result;

            //Assert
            Assert.Equal(10, languages.Count());
        }

        [Fact]
        public async Task Language_Create_Response()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var controller = new LanguageController(dbContext);
            //Act
            var langForAdding = new Language()
            {
                Lang = "New Lang"
            };
            var response = controller.CreateLanguage(langForAdding).Result;

            //Assert
            Assert.Equal(response.Lang, langForAdding.Lang);

            int deletingId = response.Id;

            var langResponse1 = controller.DeleteLanguage(deletingId).Result;

            //Assert
            Assert.Equal(langResponse1, deletingId);
        }

        [Fact]
        public async Task Language_Get_Response()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var controller = new LanguageController(dbContext);
            //Act

            var response = controller.GetLanguage(1).Result;

            //Assert
            Assert.NotNull(response);
        }

        [Fact]
        public async Task Language_Is_Null()
        {
            //Arrange 
            var dbContext = await GetDataContext();
            var controller = new LanguageController(dbContext);

            //Act
            var nullData = controller.GetLanguage(0).Result;

            //Assert
            Assert.Null(nullData);
        }

        [Fact]
        public async Task Type_Of_Method_In_LanguageController()
        {
            //Arrange 
            var dbContext = await GetDataContext();
            var controller = new LanguageController(dbContext);

            //Act
            var response = controller.GetLanguages();

            //Assert
            Assert.IsType(typeof(Task<IEnumerable<Language>>), response);
        }

        [Fact]
        public async Task Language_Update_Response()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var controller = new LanguageController(dbContext);
            //Act
            var lang = controller.GetLanguage(2).Result;
            lang.Lang= "Updated language";
            var response = controller.UpdateLanguage(lang).Result;

            //Assert
            Assert.Equal(response.Lang, "Updated language");
        }

        [Fact]
        public async Task Subcategory_Count()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var controller = new SubCategoryController(dbContext);
            //Act
            var subcategories = controller.GetCategories().Result;

            //Assert
            Assert.Equal(4, subcategories.Count());
        }

        [Fact]
        public async Task Subcategory_Create_Response()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var controller = new SubCategoryController(dbContext);
            //Act
            var subcategoryForAdding = new SubCategoryDTO()
            {
                SubCategoryName = "New Subcategory",
                CategoryId = 8
            };
            var response = controller.CreateSubCategory(subcategoryForAdding).Result;

            //Assert
            Assert.Equal(response.SubCategoryName, subcategoryForAdding.SubCategoryName);

            int deletingId = response.Id;

            var subcategoryResponse1 = controller.DeleteSubCategory(deletingId).Result;

            //Assert
            Assert.Equal(subcategoryResponse1, deletingId);
        }


        [Fact]
        public async Task Subcategory_Get_Response()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var controller = new SubCategoryController(dbContext);
            //Act

            var response = controller.GetSubCategory(1).Result;

            //Assert
            Assert.NotNull(response);
        }


        [Fact]
        public async Task Type_Of_Method_In_SubCategoryController()
        {
            //Arrange 
            var dbContext = await GetDataContext();
            var controller = new SubCategoryController(dbContext);

            //Act
            var response = controller.GetCategories();

            //Assert
            Assert.IsType(typeof(Task<IEnumerable<SubCategory>>), response);
        }

        [Fact]
        public async Task Subcategory_Update_Response()
        {
            //Arrange
            var dbContext = await GetDataContext();
            var controller = new SubCategoryController(dbContext);
            //Act
            var subc = controller.GetSubCategory(2).Result;
            subc.SubCategoryName = "Updated subcategory";
            var response = controller.UpdateSubCategory(subc).Result;

            //Assert
            Assert.Equal(response.SubCategoryName, "Updated subcategory");
        }

        private async Task<DataContext> GetDataContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseSqlite("Data source=paidabilim.db")
                .Options;
            
            var dataContext = new DataContext(options);
            dataContext.Database.EnsureCreated();
            if (await dataContext.Categories.CountAsync() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    dataContext.Categories.Add(new Category()
                    {
                        Id = i,
                        CategoryName = $"Category{i}"
                    });
                    await dataContext.SaveChangesAsync();
                }
            }

            if (await dataContext.Languages.CountAsync() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    dataContext.Languages.Add(new Language()
                    {
                        Id = i,
                        Lang = $"Language{i}"
                    });
                    await dataContext.SaveChangesAsync();
                }
            }

            if(await dataContext.Subcategories.CountAsync() <= 0)
            {
                dataContext.Subcategories.Add(new SubCategory()
                {
                    Id = 1,
                    SubCategoryName = "Subcategory 1 with category 1",
                    Category = await dataContext.Categories.FindAsync(1),
                    CategoryId = 1,
                });
                await dataContext.SaveChangesAsync();
                dataContext.Subcategories.Add(new SubCategory()
                {
                    Id = 2,
                    SubCategoryName = "Subcategory 2 with category 1",
                    Category = await dataContext.Categories.FindAsync(1),
                    CategoryId = 1,
                });
                await dataContext.SaveChangesAsync();
                dataContext.Subcategories.Add(new SubCategory()
                {
                    Id = 3,
                    SubCategoryName = "Subcategory 3 with category 2",
                    Category = await dataContext.Categories.FindAsync(2),
                    CategoryId = 2,
                });
                await dataContext.SaveChangesAsync();
                dataContext.Subcategories.Add(new SubCategory()
                {
                    Id = 4,
                    SubCategoryName = "Subcategory 4 with category 7",
                    Category = await dataContext.Categories.FindAsync(7),
                    CategoryId = 7,
                });
                await dataContext.SaveChangesAsync();
            }
            return dataContext;
        }

    }
}
