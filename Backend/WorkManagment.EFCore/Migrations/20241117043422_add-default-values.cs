using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class adddefaultvalues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                columns: new[] { "Id", "EmployeeLeaveTypeId", "IsDeleted", "TotalLeaves" },
                values: new object[,]
                {
                    { 1, 1, false, 5 },
                    { 2, 2, false, 5 },
                    { 3, 3, false, 5 },
                    { 4, 4, false, 5 },
                    { 5, 5, false, 5 },
                    { 6, 6, false, 5 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.DeleteData(
                table: "EmployeeHolidays",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "EmployeeHolidays",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "EmployeeHolidays",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "EmployeeHolidays",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "EmployeeHolidays",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "EmployeeHolidays",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "EmployeeHolidays",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "EmployeeLeaveType",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "EmployeeLeaveType",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "EmployeeLeaveType",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "EmployeeLeaveType",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "EmployeeLeaveType",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "EmployeeLeaveType",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
