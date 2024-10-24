using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addsite1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeWorkInformations_Site_SiteId",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Site",
                table: "Site");

            migrationBuilder.RenameTable(
                name: "Site",
                newName: "Sites");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sites",
                table: "Sites",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeWorkInformations_Sites_SiteId",
                table: "EmployeeWorkInformations",
                column: "SiteId",
                principalTable: "Sites",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeWorkInformations_Sites_SiteId",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sites",
                table: "Sites");

            migrationBuilder.RenameTable(
                name: "Sites",
                newName: "Site");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Site",
                table: "Site",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeWorkInformations_Site_SiteId",
                table: "EmployeeWorkInformations",
                column: "SiteId",
                principalTable: "Site",
                principalColumn: "Id");
        }
    }
}
