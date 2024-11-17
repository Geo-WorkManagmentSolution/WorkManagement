using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addaddresstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "State",
                table: "EmployeeAddresses",
                newName: "UserState");

            migrationBuilder.RenameColumn(
                name: "PinCode",
                table: "EmployeeAddresses",
                newName: "UserAddressPinCode");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "EmployeeAddresses",
                newName: "UserCountry");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "EmployeeAddresses",
                newName: "UserCity");

            migrationBuilder.RenameColumn(
                name: "AddressLine2",
                table: "EmployeeAddresses",
                newName: "UserAddressLine2");

            migrationBuilder.RenameColumn(
                name: "AddressLine1",
                table: "EmployeeAddresses",
                newName: "UserAddressLine1");

            migrationBuilder.AddColumn<string>(
                name: "MailingAddressLine1",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MailingAddressLine2",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "MailingAddressPinCode",
                table: "EmployeeAddresses",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MailingCity",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MailingCountry",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MailingState",
                table: "EmployeeAddresses",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MailingAddressLine1",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "MailingAddressLine2",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "MailingAddressPinCode",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "MailingCity",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "MailingCountry",
                table: "EmployeeAddresses");

            migrationBuilder.DropColumn(
                name: "MailingState",
                table: "EmployeeAddresses");

            migrationBuilder.RenameColumn(
                name: "UserState",
                table: "EmployeeAddresses",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "UserCountry",
                table: "EmployeeAddresses",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "UserCity",
                table: "EmployeeAddresses",
                newName: "City");

            migrationBuilder.RenameColumn(
                name: "UserAddressPinCode",
                table: "EmployeeAddresses",
                newName: "PinCode");

            migrationBuilder.RenameColumn(
                name: "UserAddressLine2",
                table: "EmployeeAddresses",
                newName: "AddressLine2");

            migrationBuilder.RenameColumn(
                name: "UserAddressLine1",
                table: "EmployeeAddresses",
                newName: "AddressLine1");
        }
    }
}
