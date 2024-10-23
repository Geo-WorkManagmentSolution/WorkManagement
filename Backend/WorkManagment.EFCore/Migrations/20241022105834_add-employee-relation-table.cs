using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addemployeerelationtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeAddresses_EmployeeAddressesId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "EmployeeAddressesId",
                table: "Employees",
                newName: "EmployeeDesignationId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_EmployeeAddressesId",
                table: "Employees",
                newName: "IX_Employees_EmployeeDesignationId");

            migrationBuilder.AddColumn<DateTime>(
                name: "ConfirmationDate",
                table: "EmployeeWorkInformations",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPreviousExperience",
                table: "EmployeeWorkInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "AlternateEmail",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DegreeCertificateDate",
                table: "EmployeeEducationDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "EmployeeAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EmployeeDesignations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDesignations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeRelationshipDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    RelationshipType = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeRelationshipDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeRelationshipDetails_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeInsuranceDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    EmployeeDesignationId = table.Column<int>(type: "int", nullable: true),
                    SerialNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfJoining = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Age = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GrossSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalSIWider = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Comprehensive = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Risk = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeInsuranceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeInsuranceDetails_EmployeeDesignations_EmployeeDesignationId",
                        column: x => x.EmployeeDesignationId,
                        principalTable: "EmployeeDesignations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeInsuranceDetails_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeAddresses_EmployeeId",
                table: "EmployeeAddresses",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInsuranceDetails_EmployeeDesignationId",
                table: "EmployeeInsuranceDetails",
                column: "EmployeeDesignationId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInsuranceDetails_EmployeeId",
                table: "EmployeeInsuranceDetails",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeRelationshipDetails_EmployeeId",
                table: "EmployeeRelationshipDetails",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeAddresses_Employees_EmployeeId",
                table: "EmployeeAddresses",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeDesignations_EmployeeDesignationId",
                table: "Employees",
                column: "EmployeeDesignationId",
                principalTable: "EmployeeDesignations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeAddresses_Employees_EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeDesignations_EmployeeDesignationId",
                table: "Employees");

            migrationBuilder.DropTable(
                name: "EmployeeInsuranceDetails");

            migrationBuilder.DropTable(
                name: "EmployeeRelationshipDetails");

            migrationBuilder.DropTable(
                name: "EmployeeDesignations");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeAddresses_EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "ConfirmationDate",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropColumn(
                name: "TotalPreviousExperience",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropColumn(
                name: "AlternateEmail",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DegreeCertificateDate",
                table: "EmployeeEducationDetails");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.RenameColumn(
                name: "EmployeeDesignationId",
                table: "Employees",
                newName: "EmployeeAddressesId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_EmployeeDesignationId",
                table: "Employees",
                newName: "IX_Employees_EmployeeAddressesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeAddresses_EmployeeAddressesId",
                table: "Employees",
                column: "EmployeeAddressesId",
                principalTable: "EmployeeAddresses",
                principalColumn: "Id");
        }
    }
}
