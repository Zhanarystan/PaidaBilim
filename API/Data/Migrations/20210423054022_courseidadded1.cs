using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class courseidadded1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LearningSkill_Courses_CourseId",
                table: "LearningSkill");

            migrationBuilder.DropForeignKey(
                name: "FK_Requirement_Courses_CourseId",
                table: "Requirement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Requirement",
                table: "Requirement");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LearningSkill",
                table: "LearningSkill");

            migrationBuilder.RenameTable(
                name: "Requirement",
                newName: "Requirements");

            migrationBuilder.RenameTable(
                name: "LearningSkill",
                newName: "LearningSkills");

            migrationBuilder.RenameIndex(
                name: "IX_Requirement_CourseId",
                table: "Requirements",
                newName: "IX_Requirements_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_LearningSkill_CourseId",
                table: "LearningSkills",
                newName: "IX_LearningSkills_CourseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Requirements",
                table: "Requirements",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LearningSkills",
                table: "LearningSkills",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningSkills_Courses_CourseId",
                table: "LearningSkills",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Requirements_Courses_CourseId",
                table: "Requirements",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LearningSkills_Courses_CourseId",
                table: "LearningSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_Requirements_Courses_CourseId",
                table: "Requirements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Requirements",
                table: "Requirements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LearningSkills",
                table: "LearningSkills");

            migrationBuilder.RenameTable(
                name: "Requirements",
                newName: "Requirement");

            migrationBuilder.RenameTable(
                name: "LearningSkills",
                newName: "LearningSkill");

            migrationBuilder.RenameIndex(
                name: "IX_Requirements_CourseId",
                table: "Requirement",
                newName: "IX_Requirement_CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_LearningSkills_CourseId",
                table: "LearningSkill",
                newName: "IX_LearningSkill_CourseId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Requirement",
                table: "Requirement",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LearningSkill",
                table: "LearningSkill",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningSkill_Courses_CourseId",
                table: "LearningSkill",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Requirement_Courses_CourseId",
                table: "Requirement",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
