using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addtableJobLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "JobLevelLeaveType",
                table: "EmployeeDefaultLeave",
                newName: "JobLevelLeaveId");

            migrationBuilder.CreateTable(
                name: "JobLevelLeave",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobLevel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobLevelLeave", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDefaultLeave_JobLevelLeaveId",
                table: "EmployeeDefaultLeave",
                column: "JobLevelLeaveId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeDefaultLeave_JobLevelLeave_JobLevelLeaveId",
                table: "EmployeeDefaultLeave",
                column: "JobLevelLeaveId",
                principalTable: "JobLevelLeave",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeDefaultLeave_JobLevelLeave_JobLevelLeaveId",
                table: "EmployeeDefaultLeave");

            migrationBuilder.DropTable(
                name: "JobLevelLeave");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeDefaultLeave_JobLevelLeaveId",
                table: "EmployeeDefaultLeave");

            migrationBuilder.RenameColumn(
                name: "JobLevelLeaveId",
                table: "EmployeeDefaultLeave",
                newName: "JobLevelLeaveType");
        }
    }
}
