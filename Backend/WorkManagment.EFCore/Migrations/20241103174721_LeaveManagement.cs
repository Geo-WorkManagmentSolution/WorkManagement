using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class LeaveManagement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeWorkInformations_Employees_EmployeeId",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeWorkInformations_EmployeeId",
                table: "EmployeeWorkInformations");

            migrationBuilder.DropIndex(
                name: "IX_EmployeePersonalDetails_EmployeeId",
                table: "EmployeePersonalDetails");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeInsuranceDetails_EmployeeId",
                table: "EmployeeInsuranceDetails");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeAddresses_EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeAddressesId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeInsuranceDetailsId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeePersonalDetailsId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeWorkInformationId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EmployeeHolidays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsFloater = table.Column<bool>(type: "bit", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeHolidays", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeLeaveType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeLeaveType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeDefaultLeave",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeLeaveTypeId = table.Column<int>(type: "int", nullable: true),
                    TotalLeaves = table.Column<int>(type: "int", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(34)", maxLength: 34, nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    RemainingLeaves = table.Column<double>(type: "float", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDefaultLeave", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeDefaultLeave_EmployeeLeaveType_EmployeeLeaveTypeId",
                        column: x => x.EmployeeLeaveTypeId,
                        principalTable: "EmployeeLeaveType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeDefaultLeave_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeLeaves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LeaveDays = table.Column<double>(type: "float", nullable: false),
                    EmployeeLeaveTypeId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeLeaves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeLeaves_EmployeeLeaveType_EmployeeLeaveTypeId",
                        column: x => x.EmployeeLeaveTypeId,
                        principalTable: "EmployeeLeaveType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLeaves_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "EmployeeHolidays",
                columns: new[] { "Id", "EndDate", "IsDeleted", "IsFloater", "Name", "StartDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "New Year's Day", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Republic Day", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, new DateTime(2024, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), false, true, "Holi", new DateTime(2024, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, new DateTime(2024, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Independence Day", new DateTime(2024, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, new DateTime(2024, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Dussehra", new DateTime(2024, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, new DateTime(2024, 10, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Diwali", new DateTime(2024, 10, 31, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, new DateTime(2024, 12, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Christmas", new DateTime(2024, 12, 25, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "EmployeeLeaveType",
                columns: new[] { "Id", "IsDeleted", "IsPaid", "Name" },
                values: new object[,]
                {
                    { 1, false, true, "Privilege Leave" },
                    { 2, false, true, "Sick Leave" },
                    { 3, false, true, "Casual Leave" },
                    { 4, false, true, "Maternity Leave" },
                    { 5, false, true, "Bereavement Leave" },
                    { 6, false, true, "Compensatory Leave" }
                });

            migrationBuilder.InsertData(
                table: "EmployeeDefaultLeave",
                columns: new[] { "Id", "Discriminator", "EmployeeLeaveTypeId", "IsDeleted", "TotalLeaves" },
                values: new object[,]
                {
                    { 1, "EmployeeDefaultLeaveSummary", 1, false, 5 },
                    { 2, "EmployeeDefaultLeaveSummary", 2, false, 5 },
                    { 3, "EmployeeDefaultLeaveSummary", 3, false, 5 },
                    { 4, "EmployeeDefaultLeaveSummary", 4, false, 5 },
                    { 5, "EmployeeDefaultLeaveSummary", 5, false, 5 },
                    { 6, "EmployeeDefaultLeaveSummary", 6, false, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeAddressesId",
                table: "Employees",
                column: "EmployeeAddressesId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeInsuranceDetailsId",
                table: "Employees",
                column: "EmployeeInsuranceDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeePersonalDetailsId",
                table: "Employees",
                column: "EmployeePersonalDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeWorkInformationId",
                table: "Employees",
                column: "EmployeeWorkInformationId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePersonalDetails_EmployeeId",
                table: "EmployeePersonalDetails",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInsuranceDetails_EmployeeId",
                table: "EmployeeInsuranceDetails",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeAddresses_EmployeeId",
                table: "EmployeeAddresses",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDefaultLeave_EmployeeId",
                table: "EmployeeDefaultLeave",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDefaultLeave_EmployeeLeaveTypeId",
                table: "EmployeeDefaultLeave",
                column: "EmployeeLeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaves_EmployeeId",
                table: "EmployeeLeaves",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaves_EmployeeLeaveTypeId",
                table: "EmployeeLeaves",
                column: "EmployeeLeaveTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeAddresses_EmployeeAddressesId",
                table: "Employees",
                column: "EmployeeAddressesId",
                principalTable: "EmployeeAddresses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeeInsuranceDetails_EmployeeInsuranceDetailsId",
                table: "Employees",
                column: "EmployeeInsuranceDetailsId",
                principalTable: "EmployeeInsuranceDetails",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_EmployeePersonalDetails_EmployeePersonalDetailsId",
                table: "Employees",
                column: "EmployeePersonalDetailsId",
                principalTable: "EmployeePersonalDetails",
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
                name: "FK_Employees_EmployeeAddresses_EmployeeAddressesId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeInsuranceDetails_EmployeeInsuranceDetailsId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeePersonalDetails_EmployeePersonalDetailsId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_EmployeeWorkInformations_EmployeeWorkInformationId",
                table: "Employees");

            migrationBuilder.DropTable(
                name: "EmployeeDefaultLeave");

            migrationBuilder.DropTable(
                name: "EmployeeHolidays");

            migrationBuilder.DropTable(
                name: "EmployeeLeaves");

            migrationBuilder.DropTable(
                name: "EmployeeLeaveType");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeAddressesId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeInsuranceDetailsId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeePersonalDetailsId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployeeWorkInformationId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_EmployeePersonalDetails_EmployeeId",
                table: "EmployeePersonalDetails");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeInsuranceDetails_EmployeeId",
                table: "EmployeeInsuranceDetails");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeAddresses_EmployeeId",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "EmployeeAddressesId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeInsuranceDetailsId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeePersonalDetailsId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmployeeWorkInformationId",
                table: "Employees");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWorkInformations_EmployeeId",
                table: "EmployeeWorkInformations",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePersonalDetails_EmployeeId",
                table: "EmployeePersonalDetails",
                column: "EmployeeId",
                unique: true,
                filter: "[EmployeeId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInsuranceDetails_EmployeeId",
                table: "EmployeeInsuranceDetails",
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
                name: "FK_EmployeeWorkInformations_Employees_EmployeeId",
                table: "EmployeeWorkInformations",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
