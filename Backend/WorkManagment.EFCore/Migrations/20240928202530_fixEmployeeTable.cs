using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class fixEmployeeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeePersonalDetails_EmployeeWorkInformationId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "EmployeePersonalDetails");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "EmployeePersonalDetails");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "EmployeePersonalDetails");

            migrationBuilder.RenameColumn(
                name: "EmployeeWorkInformationId",
                table: "Employees",
                newName: "EmployeePersonalDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_EmployeeWorkInformationId",
                table: "Employees",
                newName: "IX_Employees_EmployeePersonalDetailsId");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Position",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeePersonalDetails_EmployeePersonalDetailsId",
                table: "Employees",
                column: "EmployeePersonalDetailsId",
                principalTable: "EmployeePersonalDetails",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeePersonalDetails_EmployeePersonalDetailsId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Position",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "EmployeePersonalDetailsId",
                table: "Employees",
                newName: "EmployeeWorkInformationId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_EmployeePersonalDetailsId",
                table: "Employees",
                newName: "IX_Employees_EmployeeWorkInformationId");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "EmployeePersonalDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "EmployeePersonalDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "EmployeePersonalDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeePersonalDetails_EmployeeWorkInformationId",
                table: "Employees",
                column: "EmployeeWorkInformationId",
                principalTable: "EmployeePersonalDetails",
                principalColumn: "Id");
        }
    }
}
