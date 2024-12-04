using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class AddFilePathToEmployeeDocuments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "EmployeeDocuments",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "EmployeeDocuments");
        }
    }
}
