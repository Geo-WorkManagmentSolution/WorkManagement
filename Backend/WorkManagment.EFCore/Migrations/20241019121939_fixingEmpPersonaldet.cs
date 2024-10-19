using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class fixingEmpPersonaldet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeePersonalDetails_EmployeePersonalDetailsId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeePersonalDetailsId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeePersonalDetailsId",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "EmployeePersonalDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePersonalDetails_EmployeeId",
                table: "EmployeePersonalDetails",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePersonalDetails_Employees_EmployeeId",
                table: "EmployeePersonalDetails",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePersonalDetails_Employees_EmployeeId",
                table: "EmployeePersonalDetails");

            migrationBuilder.DropIndex(
                name: "IX_EmployeePersonalDetails_EmployeeId",
                table: "EmployeePersonalDetails");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "EmployeePersonalDetails");

            migrationBuilder.AddColumn<int>(
                name: "EmployeePersonalDetailsId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeePersonalDetailsId",
                table: "Employees",
                column: "EmployeePersonalDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeePersonalDetails_EmployeePersonalDetailsId",
                table: "Employees",
                column: "EmployeePersonalDetailsId",
                principalTable: "EmployeePersonalDetails",
                principalColumn: "Id");
        }
    }
}
