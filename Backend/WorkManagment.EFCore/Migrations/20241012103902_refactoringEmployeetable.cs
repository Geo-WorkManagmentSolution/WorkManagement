using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class refactoringEmployeetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AlternateNumber",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepartmentName",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeAddressId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeEducationDetailIds",
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

            migrationBuilder.AddColumn<string>(
                name: "MotherName",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "RelationWithEmployee",
                table: "EmployeePersonalDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "bloodGroup",
                table: "EmployeePersonalDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EmployeeAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddressLine1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressLine2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PinCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeAddresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeEducationDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PassingYear = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    University = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    grade = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeEducationDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeEducationDetails_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeIdentityInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankAccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Branch = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IFSC = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountHolderName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PAN = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProvidentFundNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeStateInsuranceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BiometricCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeIdentityInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeWorkInformations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SalaryType = table.Column<int>(type: "int", nullable: false),
                    HireDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Salary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Site = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bond = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PreviousDateOfJoiningInGDR = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PreviousDateOfLeavingInGDR = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GRPHead = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeWorkInformations", x => x.Id);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEducationDetails_EmployeeId",
                table: "EmployeeEducationDetails",
                column: "EmployeeId");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropTable(
                name: "EmployeeAddresses");

            migrationBuilder.DropTable(
                name: "EmployeeEducationDetails");

            migrationBuilder.DropTable(
                name: "EmployeeIdentityInfos");

            migrationBuilder.DropTable(
                name: "EmployeeWorkInformations");

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
                name: "AlternateNumber",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DepartmentName",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeAddressId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeEducationDetailIds",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeIdentityInfoId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeWorkInformationId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "MotherName",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Surname",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "RelationWithEmployee",
                table: "EmployeePersonalDetails");

            migrationBuilder.DropColumn(
                name: "bloodGroup",
                table: "EmployeePersonalDetails");
        }
    }
}
