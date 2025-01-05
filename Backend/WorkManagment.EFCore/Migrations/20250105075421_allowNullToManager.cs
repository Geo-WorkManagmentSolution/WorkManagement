using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class allowNullToManager : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ManagerName",
                table: "LeaveUpdateDetails",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "5c3f0105-8f22-40fe-ac50-aa32920d2922", "AQAAAAIAAYagAAAAEPw7ZM9I433BiDHCBWI4LLvWqQkpSG/YiYzU6XH7nazQ84M3ovtp6Igg79GbHbe2cw==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ManagerName",
                table: "LeaveUpdateDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e0f01ce8-c7a8-4b00-8306-97904418b7b4", "AQAAAAIAAYagAAAAEGSWyGWB/xZRys8OjekOntSR3mkwINFYDsBsIcnd5EYJCIq6J9FcLv2ZnXf/hxDhrA==" });
        }
    }
}
