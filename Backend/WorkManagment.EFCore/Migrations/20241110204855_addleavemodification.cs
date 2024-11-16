using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addleavemodification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeDefaultLeave_Employees_EmployeeId",
                table: "EmployeeDefaultLeave");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeDefaultLeave_EmployeeId",
                table: "EmployeeDefaultLeave");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "EmployeeDefaultLeave");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "EmployeeDefaultLeave");

            migrationBuilder.DropColumn(
                name: "RemainingLeaves",
                table: "EmployeeDefaultLeave");

            migrationBuilder.CreateTable(
                name: "EmployeeLeaveSummary",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    RemainingLeaves = table.Column<double>(type: "float", nullable: false),
                    EmployeeLeaveTypeId = table.Column<int>(type: "int", nullable: true),
                    TotalLeaves = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeLeaveSummary", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeLeaveSummary_EmployeeLeaveType_EmployeeLeaveTypeId",
                        column: x => x.EmployeeLeaveTypeId,
                        principalTable: "EmployeeLeaveType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLeaveSummary_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaveSummary_EmployeeId",
                table: "EmployeeLeaveSummary",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaveSummary_EmployeeLeaveTypeId",
                table: "EmployeeLeaveSummary",
                column: "EmployeeLeaveTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeLeaveSummary");

            migrationBuilder.DeleteData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "EmployeeDefaultLeave",
                type: "nvarchar(34)",
                maxLength: 34,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "EmployeeDefaultLeave",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "RemainingLeaves",
                table: "EmployeeDefaultLeave",
                type: "float",
                nullable: true);

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
                name: "IX_EmployeeDefaultLeave_EmployeeId",
                table: "EmployeeDefaultLeave",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeDefaultLeave_Employees_EmployeeId",
                table: "EmployeeDefaultLeave",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
