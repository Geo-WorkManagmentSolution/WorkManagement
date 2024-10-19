using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class fixingAllEmpdetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeAddresses_EmployeeAddressId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeIdentityInfos_EmployeeIdentityInfoId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeWorkInformations_EmployeeWorkInformationId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeAddressId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeIdentityInfoId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeWorkInformationId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeAddressId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeIdentityInfoId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeWorkInformationId",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "EmployeeWorkInformations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "EmployeeIdentityInfos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "EmployeeAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWorkInformations_EmployeeId",
                table: "EmployeeWorkInformations",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeIdentityInfos_EmployeeId",
                table: "EmployeeIdentityInfos",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");

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

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeIdentityInfos_Employees_EmployeeId",
                table: "EmployeeIdentityInfos",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeWorkInformations_Employees_EmployeeId",
                table: "EmployeeWorkInformations",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeAddresses_Employees_EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeIdentityInfos_Employees_EmployeeId",
                table: "EmployeeIdentityInfos");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeWorkInformations_Employees_EmployeeId",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeWorkInformations_EmployeeId",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeIdentityInfos_EmployeeId",
                table: "EmployeeIdentityInfos");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeAddresses_EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "EmployeeIdentityInfos");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeAddressId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeIdentityInfoId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeWorkInformationId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeAddressId",
                table: "Employees",
                column: "EmployeeAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeIdentityInfoId",
                table: "Employees",
                column: "EmployeeIdentityInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeWorkInformationId",
                table: "Employees",
                column: "EmployeeWorkInformationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeAddresses_EmployeeAddressId",
                table: "Employees",
                column: "EmployeeAddressId",
                principalTable: "EmployeeAddresses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeIdentityInfos_EmployeeIdentityInfoId",
                table: "Employees",
                column: "EmployeeIdentityInfoId",
                principalTable: "EmployeeIdentityInfos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeWorkInformations_EmployeeWorkInformationId",
                table: "Employees",
                column: "EmployeeWorkInformationId",
                principalTable: "EmployeeWorkInformations",
                principalColumn: "Id");
        }
    }
}
