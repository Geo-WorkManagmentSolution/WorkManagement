using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class addijobLlevalInDefaultLeave : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ProjectNumber",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectDescription",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "PeriodOfWorkInMonths",
                table: "Projects",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Projects",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "WorkOrderAmount",
                table: "Projects",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "WorkOrderDate",
                table: "Projects",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkOrderName",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkOrderNumber",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "JobLevelLeaveType",
                table: "EmployeeDefaultLeave",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 1,
                column: "JobLevelLeaveType",
                value: null);

            migrationBuilder.UpdateData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 2,
                column: "JobLevelLeaveType",
                value: null);

            migrationBuilder.UpdateData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 3,
                column: "JobLevelLeaveType",
                value: null);

            migrationBuilder.UpdateData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 4,
                column: "JobLevelLeaveType",
                value: null);

            migrationBuilder.UpdateData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 5,
                column: "JobLevelLeaveType",
                value: null);

            migrationBuilder.UpdateData(
                table: "EmployeeDefaultLeave",
                keyColumn: "Id",
                keyValue: 6,
                column: "JobLevelLeaveType",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PeriodOfWorkInMonths",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "WorkOrderAmount",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "WorkOrderDate",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "WorkOrderName",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "WorkOrderNumber",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "JobLevelLeaveType",
                table: "EmployeeDefaultLeave");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectNumber",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProjectDescription",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
