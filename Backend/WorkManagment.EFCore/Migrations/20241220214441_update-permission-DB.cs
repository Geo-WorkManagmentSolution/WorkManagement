using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class updatepermissionDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "a1297d9f-178c-4e5f-9692-24f810fc1c73", "AQAAAAIAAYagAAAAEFGSbzQRDfxTF6rtYEcJmW3wLR5WUrUmPaM2WCYDm5CpXIuCu6WpRs3js0ROWGdykQ==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "78208e0f-0ff8-4aa1-8e1c-dc332b331119", "AQAAAAIAAYagAAAAEBqIwYF4moK8/wMAkaJjjC21/7fwc3VFCbWVdGHVNZpF/yr0kADkXMbG5hueXwixZg==" });
        }
    }
}
