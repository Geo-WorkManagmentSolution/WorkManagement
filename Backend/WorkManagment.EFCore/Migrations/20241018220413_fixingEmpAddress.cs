using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class fixingEmpAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressLine1",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "AddressLine2",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "City",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "PinCode",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "State",
                table: "EmployeeAddresses");

            migrationBuilder.AddColumn<int>(
                name: "MailingAddressId",
                table: "EmployeeAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserAddressId",
                table: "EmployeeAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "useUserAddressForMailing",
                table: "EmployeeAddresses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "UserAddress",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AddressLine1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressLine2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PinCode = table.Column<long>(type: "bigint", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAddress", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeAddresses_MailingAddressId",
                table: "EmployeeAddresses",
                column: "MailingAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeAddresses_UserAddressId",
                table: "EmployeeAddresses",
                column: "UserAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeAddresses_UserAddress_MailingAddressId",
                table: "EmployeeAddresses",
                column: "MailingAddressId",
                principalTable: "UserAddress",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeAddresses_UserAddress_UserAddressId",
                table: "EmployeeAddresses",
                column: "UserAddressId",
                principalTable: "UserAddress",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeAddresses_UserAddress_MailingAddressId",
                table: "EmployeeAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeAddresses_UserAddress_UserAddressId",
                table: "EmployeeAddresses");

            migrationBuilder.DropTable(
                name: "UserAddress");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeAddresses_MailingAddressId",
                table: "EmployeeAddresses");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeAddresses_UserAddressId",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "MailingAddressId",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "UserAddressId",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "useUserAddressForMailing",
                table: "EmployeeAddresses");

            migrationBuilder.AddColumn<string>(
                name: "AddressLine1",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddressLine2",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "PinCode",
                table: "EmployeeAddresses",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
