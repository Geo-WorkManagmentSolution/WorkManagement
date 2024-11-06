using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class updatesalaryinfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_EmployeeAddresses_Employees_EmployeeId",
            //    table: "EmployeeAddresses");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_EmployeeIdentityInfos_Employees_EmployeeId",
            //    table: "EmployeeIdentityInfos");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_EmployeeInsuranceDetails_Employees_EmployeeId",
            //    table: "EmployeeInsuranceDetails");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_EmployeePersonalDetails_Employees_EmployeeId",
            //    table: "EmployeePersonalDetails");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_EmployeeWorkInformations_Employees_EmployeeId",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropIndex(
            //    name: "IX_EmployeeWorkInformations_EmployeeId",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropIndex(
            //    name: "IX_EmployeePersonalDetails_EmployeeId",
            //    table: "EmployeePersonalDetails");

            //migrationBuilder.DropIndex(
            //    name: "IX_EmployeeInsuranceDetails_EmployeeId",
            //    table: "EmployeeInsuranceDetails");

            //migrationBuilder.DropIndex(
            //    name: "IX_EmployeeIdentityInfos_EmployeeId",
            //    table: "EmployeeIdentityInfos");

            //migrationBuilder.DropIndex(
            //    name: "IX_EmployeeAddresses_EmployeeId",
            //    table: "EmployeeAddresses");

            //migrationBuilder.DropColumn(
            //    name: "EmployeeId",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropColumn(
            //    name: "EmployeeId",
            //    table: "EmployeePersonalDetails");

            //migrationBuilder.DropColumn(
            //    name: "EmployeeId",
                //table: "EmployeeInsuranceDetails");

            //migrationBuilder.DropColumn(
            //    name: "EmployeeId",
            //    table: "EmployeeIdentityInfos");

            //migrationBuilder.DropColumn(
            //    name: "EmployeeId",
            //    table: "EmployeeAddresses");

            migrationBuilder.AddColumn<decimal>(
                name: "Basic",
                table: "EmployeeWorkInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Bonus",
                table: "EmployeeWorkInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ESI",
                table: "EmployeeWorkInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Gratuity",
                table: "EmployeeWorkInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "HRAllowances",
                table: "EmployeeWorkInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PF",
                table: "EmployeeWorkInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PT",
                table: "EmployeeWorkInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeeAddressesId",
            //    table: "Employees",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeeIdentityInfosId",
            //    table: "Employees",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeeInsuranceDetailsId",
            //    table: "Employees",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeePersonalDetailsId",
            //    table: "Employees",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeeWorkInformationId",
            //    table: "Employees",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.CreateIndex(
            //    name: "IX_Employees_EmployeeAddressesId",
            //    table: "Employees",
            //    column: "EmployeeAddressesId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Employees_EmployeeIdentityInfosId",
            //    table: "Employees",
            //    column: "EmployeeIdentityInfosId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Employees_EmployeeInsuranceDetailsId",
            //    table: "Employees",
            //    column: "EmployeeInsuranceDetailsId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Employees_EmployeePersonalDetailsId",
            //    table: "Employees",
            //    column: "EmployeePersonalDetailsId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Employees_EmployeeWorkInformationId",
            //    table: "Employees",
            //    column: "EmployeeWorkInformationId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Employees_EmployeeAddresses_EmployeeAddressesId",
            //    table: "Employees",
            //    column: "EmployeeAddressesId",
            //    principalTable: "EmployeeAddresses",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Employees_EmployeeIdentityInfos_EmployeeIdentityInfosId",
            //    table: "Employees",
            //    column: "EmployeeIdentityInfosId",
            //    principalTable: "EmployeeIdentityInfos",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Employees_EmployeeInsuranceDetails_EmployeeInsuranceDetailsId",
            //    table: "Employees",
            //    column: "EmployeeInsuranceDetailsId",
            //    principalTable: "EmployeeInsuranceDetails",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Employees_EmployeePersonalDetails_EmployeePersonalDetailsId",
            //    table: "Employees",
            //    column: "EmployeePersonalDetailsId",
            //    principalTable: "EmployeePersonalDetails",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Employees_EmployeeWorkInformations_EmployeeWorkInformationId",
            //    table: "Employees",
            //    column: "EmployeeWorkInformationId",
            //    principalTable: "EmployeeWorkInformations",
            //    principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Employees_EmployeeAddresses_EmployeeAddressesId",
            //    table: "Employees");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Employees_EmployeeIdentityInfos_EmployeeIdentityInfosId",
            //    table: "Employees");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Employees_EmployeeInsuranceDetails_EmployeeInsuranceDetailsId",
            //    table: "Employees");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Employees_EmployeePersonalDetails_EmployeePersonalDetailsId",
            //    table: "Employees");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Employees_EmployeeWorkInformations_EmployeeWorkInformationId",
            //    table: "Employees");

            //migrationBuilder.DropIndex(
            //    name: "IX_Employees_EmployeeAddressesId",
            //    table: "Employees");

            //migrationBuilder.DropIndex(
            //    name: "IX_Employees_EmployeeIdentityInfosId",
            //    table: "Employees");

            //migrationBuilder.DropIndex(
            //    name: "IX_Employees_EmployeeInsuranceDetailsId",
            //    table: "Employees");

            //migrationBuilder.DropIndex(
            //    name: "IX_Employees_EmployeePersonalDetailsId",
            //    table: "Employees");

            //migrationBuilder.DropIndex(
            //    name: "IX_Employees_EmployeeWorkInformationId",
            //    table: "Employees");

            //migrationBuilder.DropColumn(
            //    name: "Basic",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropColumn(
            //    name: "Bonus",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropColumn(
            //    name: "ESI",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropColumn(
            //    name: "Gratuity",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropColumn(
            //    name: "HRAllowances",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropColumn(
            //    name: "PF",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropColumn(
            //    name: "PT",
            //    table: "EmployeeWorkInformations");

            //migrationBuilder.DropColumn(
            //    name: "EmployeeAddressesId",
            //    table: "Employees");

            //migrationBuilder.DropColumn(
            //    name: "EmployeeIdentityInfosId",
            //    table: "Employees");

            //migrationBuilder.DropColumn(
            //    name: "EmployeeInsuranceDetailsId",
            //    table: "Employees");

            //migrationBuilder.DropColumn(
            //    name: "EmployeePersonalDetailsId",
            //    table: "Employees");

            //migrationBuilder.DropColumn(
            //    name: "EmployeeWorkInformationId",
            //    table: "Employees");

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeeId",
            //    table: "EmployeeWorkInformations",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeeId",
            //    table: "EmployeePersonalDetails",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeeId",
            //    table: "EmployeeInsuranceDetails",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeeId",
            //    table: "EmployeeIdentityInfos",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.AddColumn<int>(
            //    name: "EmployeeId",
            //    table: "EmployeeAddresses",
            //    type: "int",
            //    nullable: true);

            //migrationBuilder.CreateIndex(
            //    name: "IX_EmployeeWorkInformations_EmployeeId",
            //    table: "EmployeeWorkInformations",
            //    column: "EmployeeId",
            //    unique: true,
            //    filter: "[EmployeeId] IS NOT NULL");

            //migrationBuilder.CreateIndex(
            //    name: "IX_EmployeePersonalDetails_EmployeeId",
            //    table: "EmployeePersonalDetails",
            //    column: "EmployeeId",
            //    unique: true,
            //    filter: "[EmployeeId] IS NOT NULL");

            //migrationBuilder.CreateIndex(
            //    name: "IX_EmployeeInsuranceDetails_EmployeeId",
            //    table: "EmployeeInsuranceDetails",
            //    column: "EmployeeId",
            //    unique: true,
            //    filter: "[EmployeeId] IS NOT NULL");

            //migrationBuilder.CreateIndex(
            //    name: "IX_EmployeeIdentityInfos_EmployeeId",
            //    table: "EmployeeIdentityInfos",
            //    column: "EmployeeId",
            //    unique: true,
            //    filter: "[EmployeeId] IS NOT NULL");

            //migrationBuilder.CreateIndex(
            //    name: "IX_EmployeeAddresses_EmployeeId",
            //    table: "EmployeeAddresses",
            //    column: "EmployeeId",
            //    unique: true,
            //    filter: "[EmployeeId] IS NOT NULL");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_EmployeeAddresses_Employees_EmployeeId",
            //    table: "EmployeeAddresses",
            //    column: "EmployeeId",
            //    principalTable: "Employees",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_EmployeeIdentityInfos_Employees_EmployeeId",
            //    table: "EmployeeIdentityInfos",
            //    column: "EmployeeId",
            //    principalTable: "Employees",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_EmployeeInsuranceDetails_Employees_EmployeeId",
            //    table: "EmployeeInsuranceDetails",
            //    column: "EmployeeId",
            //    principalTable: "Employees",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_EmployeePersonalDetails_Employees_EmployeeId",
            //    table: "EmployeePersonalDetails",
            //    column: "EmployeeId",
            //    principalTable: "Employees",
            //    principalColumn: "Id");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_EmployeeWorkInformations_Employees_EmployeeId",
            //    table: "EmployeeWorkInformations",
            //    column: "EmployeeId",
            //    principalTable: "Employees",
            //    principalColumn: "Id");
        }
    }
}
