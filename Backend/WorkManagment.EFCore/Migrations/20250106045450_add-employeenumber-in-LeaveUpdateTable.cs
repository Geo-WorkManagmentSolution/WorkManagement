using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addemployeenumberinLeaveUpdateTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeNumber",
                table: "LeaveUpdateDetails",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ba26515a-2200-43af-a1f8-ef2d3fafbeba", "AQAAAAIAAYagAAAAEJmPn/8tfM6CWYpDuh+XarnI5Th65aRXIB88jOJp1rfeGGK0aMKgdws99Xe7211rGg==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeNumber",
                table: "LeaveUpdateDetails");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "5c3f0105-8f22-40fe-ac50-aa32920d2922", "AQAAAAIAAYagAAAAEPw7ZM9I433BiDHCBWI4LLvWqQkpSG/YiYzU6XH7nazQ84M3ovtp6Igg79GbHbe2cw==" });
        }
    }
}
