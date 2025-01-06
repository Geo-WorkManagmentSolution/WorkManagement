using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addLeaveUpdateTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JobLevelLeaveType",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LeaveUpdateDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    ManagerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: true),
                    IsApprovedByDepartmentHead = table.Column<bool>(type: "bit", nullable: false),
                    IsApprovedByHRHead = table.Column<bool>(type: "bit", nullable: false),
                    JobLevelLeaveType = table.Column<int>(type: "int", nullable: true),
                    useDefultLeaves = table.Column<bool>(type: "bit", nullable: true),
                    EmployeeLeaveSummaryId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeLeaveUpdateTableId = table.Column<int>(type: "int", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveUpdateDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveUpdateDetails_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UpdateLeaveSummury",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    RemainingLeaves = table.Column<double>(type: "float", nullable: false),
                    EmployeeLeaveTypeId = table.Column<int>(type: "int", nullable: true),
                    TotalLeaves = table.Column<int>(type: "int", nullable: false),
                    EmployeeLeaveUpdateTableId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UpdateLeaveSummury", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UpdateLeaveSummury_EmployeeLeaveType_EmployeeLeaveTypeId",
                        column: x => x.EmployeeLeaveTypeId,
                        principalTable: "EmployeeLeaveType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UpdateLeaveSummury_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UpdateLeaveSummury_LeaveUpdateDetails_EmployeeLeaveUpdateTableId",
                        column: x => x.EmployeeLeaveUpdateTableId,
                        principalTable: "LeaveUpdateDetails",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e0f01ce8-c7a8-4b00-8306-97904418b7b4", "AQAAAAIAAYagAAAAEGSWyGWB/xZRys8OjekOntSR3mkwINFYDsBsIcnd5EYJCIq6J9FcLv2ZnXf/hxDhrA==" });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveUpdateDetails_EmployeeId",
                table: "LeaveUpdateDetails",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_UpdateLeaveSummury_EmployeeId",
                table: "UpdateLeaveSummury",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_UpdateLeaveSummury_EmployeeLeaveTypeId",
                table: "UpdateLeaveSummury",
                column: "EmployeeLeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_UpdateLeaveSummury_EmployeeLeaveUpdateTableId",
                table: "UpdateLeaveSummury",
                column: "EmployeeLeaveUpdateTableId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UpdateLeaveSummury");

            migrationBuilder.DropTable(
                name: "LeaveUpdateDetails");

            migrationBuilder.DropColumn(
                name: "JobLevelLeaveType",
                table: "Employees");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "69240a48-5d5d-4a6f-bfa9-ece75bdaa688", "AQAAAAIAAYagAAAAEL3aARMRGY91oRBjtny81p/fbcQpVVr63srrcf8a/1Y0l0bK0MWEbTna7akN5RQ6kA==" });
        }
    }
}
