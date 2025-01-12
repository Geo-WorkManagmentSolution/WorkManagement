using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class leaveTable : Migration
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
                    ManagerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeNumber = table.Column<int>(type: "int", nullable: true),
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
        }
    }
}
