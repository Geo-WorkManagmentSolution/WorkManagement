using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class permissionAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Project Module Dashboard", "ProjectModule_Dashboard", 1, 10 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Project Module Add", "ProjectModule_Add", 1, 7 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Project Module Delete", "ProjectModule_Delete", 1, 9 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Project Module Update", "ProjectModule_Update", 1, 8 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Project Module Employee Add", "ProjectModule_Employee_Add", 10 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Project Module Employee Delete", "ProjectModule_Employee_Delete" });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Project Module Employee Update", "ProjectModule_Employee_Update", 9 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Project Link Add", "ProjectModule_Link_Add", 8 });

            migrationBuilder.InsertData(
                table: "PermissionActions",
                columns: new[] { "Id", "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[,]
                {
                    { 9, "Project Link Delete", "ProjectModule_Link_Delete", 1, 8 },
                    { 10, "Project Link Update", "ProjectModule_Link_Update", 1, 8 },
                    { 23, "EmployeeModule_Add", "EmployeeModule_Add", 2, 1 },
                    { 24, "EmployeeModule_Update", "EmployeeModule_Update", 2, 2 },
                    { 25, "EmployeeModule_Delete", "EmployeeModule_Delete", 2, 3 },
                    { 26, "EmployeeModule_Salary_Update", "EmployeeModule_Salary_Update", 2, 4 },
                    { 27, "EmployeeModule_Leave_Update", "EmployeeModule_Leave_Update", 2, 5 },
                    { 28, "EmployeeModule_Dashboard", "EmployeeModule_Dashboard", 2, 6 },
                    { 29, "IntegrationModule_UploadCSV", "IntegrationModule_UploadCSV", 3, 29 }
                });

            migrationBuilder.InsertData(
                table: "PermissionCategories",
                columns: new[] { "Id", "Description", "Name", "Value" },
                values: new object[,]
                {
                    { 4, "Leave Module", "LeaveModule", 4 },
                    { 5, "Setting Module", "SettingModule", 5 }
                });

            migrationBuilder.InsertData(
                table: "RolePermissions",
                columns: new[] { "Id", "IsDeleted", "PermissionActionId", "RoleId" },
                values: new object[,]
                {
                    { 1, false, 1, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 2, false, 2, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 3, false, 3, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 4, false, 4, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 5, false, 5, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 6, false, 6, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 7, false, 7, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 8, false, 8, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") }
                });

            migrationBuilder.InsertData(
                table: "PermissionActions",
                columns: new[] { "Id", "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[,]
                {
                    { 11, "LeaveModule_Add", "LeaveModule_Add", 4, 17 },
                    { 12, "LeaveModule_Delete", "LeaveModule_Delete", 4, 18 },
                    { 13, "LeaveModule_Update", "LeaveModule_Update", 4, 19 },
                    { 14, "LeaveModule_Approvals", "LeaveModule_Approvals", 4, 20 },
                    { 15, "LeaveModule_Employee_LeaveHistory", "LeaveModule_Employee_LeaveHistory", 4, 21 },
                    { 16, "SettingModule_DropDownSettings", "SettingModule_DropDownSettings", 5, 22 },
                    { 17, "SettingModule_LeaveType_Add", "SettingModule_LeaveType_Add", 5, 23 },
                    { 18, "SettingModule_LeaveType_Update", "SettingModule_LeaveType_Update", 5, 24 },
                    { 19, "SettingModule_LeaveType_Delete", "SettingModule_LeaveType_Delete", 5, 25 },
                    { 20, "SettingModule_Holidays_Add", "SettingModule_Holidays_Add", 5, 26 },
                    { 21, "SettingModule_Holidays_Update", "SettingModule_Holidays_Update", 5, 27 },
                    { 22, "SettingModule_Holidays_Delete", "SettingModule_Holidays_Delete", 5, 28 }
                });

            migrationBuilder.InsertData(
                table: "RolePermissions",
                columns: new[] { "Id", "IsDeleted", "PermissionActionId", "RoleId" },
                values: new object[,]
                {
                    { 9, false, 9, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 10, false, 10, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 11, false, 11, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 12, false, 12, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 13, false, 13, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 14, false, 14, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") },
                    { 15, false, 15, new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 25);

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

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "RolePermissions",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "PermissionCategories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "PermissionCategories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Employee Module view", "EmployeeModule_View", 2, 1 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Employee Module Add", "EmployeeModule_Add", 2, 3 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Employee Module Delete", "EmployeeModule_Delete", 2, 4 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[] { "Employee Module Edit", "EmployeeModule_Edit", 2, 2 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Project Module view", "ProjectModule_View", 5 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "Name" },
                values: new object[] { "Project Module Add", "ProjectModule_Add" });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Project Module Delete", "ProjectModule_Delete", 8 });

            migrationBuilder.UpdateData(
                table: "PermissionActions",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "Name", "Value" },
                values: new object[] { "Project Module Edit", "ProjectModule_Edit", 6 });
        }
    }
}
