using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class updateemployeetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeIdentityInfos_EmployeeIdentityInfosId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "EmployeeIdentityInfosId",
                table: "Employees",
                newName: "EmployeeIdentityInfoId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_EmployeeIdentityInfosId",
                table: "Employees",
                newName: "IX_Employees_EmployeeIdentityInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeIdentityInfos_EmployeeIdentityInfoId",
                table: "Employees",
                column: "EmployeeIdentityInfoId",
                principalTable: "EmployeeIdentityInfos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeIdentityInfos_EmployeeIdentityInfoId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "EmployeeIdentityInfoId",
                table: "Employees",
                newName: "EmployeeIdentityInfosId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_EmployeeIdentityInfoId",
                table: "Employees",
                newName: "IX_Employees_EmployeeIdentityInfosId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeIdentityInfos_EmployeeIdentityInfosId",
                table: "Employees",
                column: "EmployeeIdentityInfosId",
                principalTable: "EmployeeIdentityInfos",
                principalColumn: "Id");
        }
    }
}
