using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addCatagory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("611c6e4c-c1fc-49a4-847e-fb9608f460c0"));

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "69240a48-5d5d-4a6f-bfa9-ece75bdaa688", "AQAAAAIAAYagAAAAEL3aARMRGY91oRBjtny81p/fbcQpVVr63srrcf8a/1Y0l0bK0MWEbTna7akN5RQ6kA==" });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 2,
                column: "Description",
                value: "Add Project");

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Description",
                value: "Delete Project");

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 4,
                column: "Description",
                value: "Update Project");

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "View Project", "ProjectModule_View", 33 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Project Task", "ProjectModule_Task", 34 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Project Employees", "ProjectModule_Employee", 35 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Add Employee", "EmployeeModule_Add", 2, 1 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Updated Employee", "EmployeeModule_Update", 2, 2 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Delete Employee", "EmployeeModule_Delete", 2, 3 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "View Employee", "EmployeeModule_View", 2, 30 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Employee Salary Update", "EmployeeModule_Salary_Update", 2, 4 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "View Employee Salary History", "EmployeeModule_Salary_History_View", 2, 31 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Employee Salary Approve/Reject", "EmployeeModule_Salary_Approve_Reject", 2, 32 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Employee Leave Update", "EmployeeModule_Leave_Update", 2, 5 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Employee Dashboard", "EmployeeModule_Dashboard", 2, 6 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "IntegrationModule_UploadCSV", "IntegrationModule_UploadCSV", 3, 29 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Add Leaves", "LeaveModule_Add", 4, 17 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Delete Leaves", "LeaveModule_Delete", 4, 18 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Update Leaves", "LeaveModule_Update", 4, 19 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Approve/Reject Leaves", "LeaveModule_Approvals", 4, 20 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Leave History Dashboard", "LeaveModule_Employee_LeaveHistory", 4, 21 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Update Dropdown values", "SettingModule_DropDownSettings_Update", 5, 22 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Update Default Leaves", "SettingModule_DefaultLeaves_Update", 5, 23 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 25,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Update Public Holidays", "SettingModule_Holidays_Update", 5, 27 });

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 1,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 2,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 3,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 4,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 5,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 6,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 7,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 8,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 9,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 10,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 11,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 12,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 13,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 14,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 15,
                column: "RoleId",
                value: new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"));

            migrationBuilder.InsertData(
                table: "RolePermissions",
                columns: new[] { "Id", "IsDeleted", "PermissionActionId", "RoleId" },
                values: new object[,]
                {
                    { 16, false, 16, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 17, false, 17, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 18, false, 18, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 19, false, 19, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 20, false, 20, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 21, false, 21, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 22, false, 22, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 23, false, 23, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 24, false, 24, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 25, false, 25, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 26, false, 1, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 27, false, 2, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 28, false, 3, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 29, false, 4, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 30, false, 5, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 31, false, 6, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 32, false, 7, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 33, false, 8, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 34, false, 9, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 35, false, 10, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 36, false, 11, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 37, false, 12, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 38, false, 13, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 39, false, 14, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 40, false, 15, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 41, false, 16, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 42, false, 17, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 43, false, 18, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 44, false, 19, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 45, false, 20, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 46, false, 21, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 47, false, 22, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 48, false, 23, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 49, false, 24, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") },
                    { 50, false, 25, new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { new Guid("611c6e4c-c1fc-49a4-847e-fb9608f460c0"), null, "SuperUser", "SUPERUSER" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "c209a901-e315-4d8e-b46b-92de9e972b8a", "AQAAAAIAAYagAAAAEN5heEDTdGRJQLgtFgqKwflGVxFwOXjYOYPvp4mvW3TZfgr8NPc0YuGHzXsYpzULOg==" });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 2,
                column: "Description",
                value: "Project Add");

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 3,
                column: "Description",
                value: "Project Delete");

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 4,
                column: "Description",
                value: "Project Update");

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Add Employees to Project", "ProjectModule_Employee_Add", 10 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Delete Employees to Project", "ProjectModule_Employee_Delete", 7 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Update Employees to Project", "ProjectModule_Employee_Update", 9 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Add Tasks to Project", "ProjectModule_Link_Add", 1, 8 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Delete Tasks to Project", "ProjectModule_Link_Delete", 1, 8 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Update Tasks to Project", "ProjectModule_Link_Update", 1, 8 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Add Leaves", "LeaveModule_Add", 4, 17 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Delete Leaves", "LeaveModule_Delete", 4, 18 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Update Leaves", "LeaveModule_Update", 4, 19 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Approve/Reject Leaves", "LeaveModule_Approvals", 4, 20 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Leave History Dashboard", "LeaveModule_Employee_LeaveHistory", 4, 21 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Update Dropdown values", "SettingModule_DropDownSettings", 5, 22 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Add Leave Types", "SettingModule_LeaveType_Add", 5, 23 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Update Leave Types", "SettingModule_LeaveType_Update", 5, 24 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Delete Leave Types", "SettingModule_LeaveType_Delete", 5, 25 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Add Public Holidays", "SettingModule_Holidays_Add", 5, 26 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 21,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Update Public Holidays", "SettingModule_Holidays_Update", 5, 27 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 22,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Delete Public Holidays", "SettingModule_Holidays_Delete", 5, 28 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 23,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Add Employee", "EmployeeModule_Add", 2, 1 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 24,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Updated Employee", "EmployeeModule_Update", 2, 2 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 25,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Delete Employee", "EmployeeModule_Delete", 2, 3 });

            migrationBuilder.InsertData(
                table: "PermissionActions",
                columns: new[] { "Id", "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[,]
                {
                    { 26, "Employee Salary Update", "EmployeeModule_Salary_Update", 2, 4 },
                    { 27, "Employee Leave Update", "EmployeeModule_Leave_Update", 2, 5 },
                    { 28, "Employee Dashboard", "EmployeeModule_Dashboard", 2, 6 },
                    { 29, "IntegrationModule_UploadCSV", "IntegrationModule_UploadCSV", 3, 29 }
                });

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 1,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 2,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 3,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 4,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 5,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 6,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 7,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 8,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 9,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 10,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 11,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 12,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 13,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 14,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));

            migrationBuilder.UpdateData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 15,
                column: "RoleId",
                value: new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"));
        }
    }
}
