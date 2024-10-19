using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class fixingAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeAddresses_Employees_EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeAddresses_EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.RenameColumn(
                name: "useUserAddressForMailing",
                table: "EmployeeAddresses",
                newName: "UserAddressForMailing");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeAddressesId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeAddressesId",
                table: "Employees",
                column: "EmployeeAddressesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeAddresses_EmployeeAddressesId",
                table: "Employees",
                column: "EmployeeAddressesId",
                principalTable: "EmployeeAddresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeAddresses_EmployeeAddressesId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeAddressesId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeAddressesId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "UserAddressForMailing",
                table: "EmployeeAddresses",
                newName: "useUserAddressForMailing");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "EmployeeAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeAddresses_EmployeeId",
                table: "EmployeeAddresses",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeAddresses_Employees_EmployeeId",
                table: "EmployeeAddresses",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
