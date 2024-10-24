using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class fixedDesignation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeReportToId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeReportToId",
                table: "Employees",
                column: "EmployeeReportToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Employees_EmployeeReportToId",
                table: "Employees",
                column: "EmployeeReportToId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Employees_EmployeeReportToId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeReportToId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeReportToId",
                table: "Employees");
        }
    }
}
