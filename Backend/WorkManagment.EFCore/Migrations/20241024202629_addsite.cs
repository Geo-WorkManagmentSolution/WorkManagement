using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addsite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Site",
                table: "EmployeeWorkInformations");

            migrationBuilder.AddColumn<int>(
                name: "SiteId",
                table: "EmployeeWorkInformations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Site",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Site", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWorkInformations_SiteId",
                table: "EmployeeWorkInformations",
                column: "SiteId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeWorkInformations_Site_SiteId",
                table: "EmployeeWorkInformations",
                column: "SiteId",
                principalTable: "Site",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeWorkInformations_Site_SiteId",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropTable(
                name: "Site");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeWorkInformations_SiteId",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropColumn(
                name: "SiteId",
                table: "EmployeeWorkInformations");

            migrationBuilder.AddColumn<string>(
                name: "Site",
                table: "EmployeeWorkInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
