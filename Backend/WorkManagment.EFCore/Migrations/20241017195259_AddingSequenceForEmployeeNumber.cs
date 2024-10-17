using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class AddingSequenceForEmployeeNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeDocuments_Employees_EmployeeId",
                table: "EmployeeDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeEducationDetails_Employees_EmployeeId",
                table: "EmployeeEducationDetails");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeNumber",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValueSql: "NEXT VALUE FOR EmployeeNumber",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeEducationDetails",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeDocuments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeDocuments_Employees_EmployeeId",
                table: "EmployeeDocuments",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeEducationDetails_Employees_EmployeeId",
                table: "EmployeeEducationDetails",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeDocuments_Employees_EmployeeId",
                table: "EmployeeDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeEducationDetails_Employees_EmployeeId",
                table: "EmployeeEducationDetails");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeNumber",
                table: "Employees",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValueSql: "NEXT VALUE FOR EmployeeNumber");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeEducationDetails",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeDocuments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeDocuments_Employees_EmployeeId",
                table: "EmployeeDocuments",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeEducationDetails_Employees_EmployeeId",
                table: "EmployeeEducationDetails",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
