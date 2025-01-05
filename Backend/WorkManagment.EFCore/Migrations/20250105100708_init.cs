using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WorkManagement.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateSequence<int>(
                name: "EmployeeNumber",
                startValue: 1000L);

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Shortcuts = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedUserName = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NormalizedEmail = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmailConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SecurityStamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ConcurrencyStamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumberConfirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserAddressLine1 = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserAddressLine2 = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserCity = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserCountry = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserState = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserAddressPinCode = table.Column<long>(type: "bigint", nullable: true),
                    MailingAddressLine1 = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MailingAddressLine2 = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MailingCity = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MailingCountry = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MailingState = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MailingAddressPinCode = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeAddresses", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeCategories", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeDepartments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDepartments", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeDesignations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDesignations", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeHolidays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsFloater = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeHolidays", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeIdentityInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UID = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BankAccountNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BankName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Branch = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IFSC = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AccountHolderName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PAN = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProvidentFundNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployeeStateInsuranceNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BiometricCode = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeIdentityInfos", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeLeaveType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsPaid = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeLeaveType", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeePersonalDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DateOfBirth = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Gender = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaritalStatus = table.Column<int>(type: "int", nullable: true),
                    bloodGroup = table.Column<int>(type: "int", nullable: true),
                    RelationWithEmployee = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePersonalDetails", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "JobLevelLeave",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    JobLevel = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobLevelLeave", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PermissionCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionCategories", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ProjectName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProjectNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProjectDescription = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WorkOrderNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WorkOrderName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WorkOrderAmount = table.Column<double>(type: "double", nullable: true),
                    PeriodOfWorkInMonths = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    WorkOrderDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreatedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    LastModifiedBy = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    LastModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Sites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sites", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ClaimType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClaimValue = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ClaimType = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ClaimValue = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProviderKey = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProviderDisplayName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    RoleId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    LoginProvider = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeInsuranceDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployeeDesignationId = table.Column<int>(type: "int", nullable: true),
                    SerialNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DateOfJoining = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Age = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    GrossSalary = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalSIWider = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Comprehensive = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Risk = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeInsuranceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeInsuranceDetails_EmployeeDesignations_EmployeeDesign~",
                        column: x => x.EmployeeDesignationId,
                        principalTable: "EmployeeDesignations",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeDefaultLeave",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployeeLeaveTypeId = table.Column<int>(type: "int", nullable: true),
                    JobLevelLeaveId = table.Column<int>(type: "int", nullable: true),
                    TotalLeaves = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDefaultLeave", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeDefaultLeave_EmployeeLeaveType_EmployeeLeaveTypeId",
                        column: x => x.EmployeeLeaveTypeId,
                        principalTable: "EmployeeLeaveType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeDefaultLeave_JobLevelLeave_JobLevelLeaveId",
                        column: x => x.JobLevelLeaveId,
                        principalTable: "JobLevelLeave",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PermissionActions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Value = table.Column<int>(type: "int", nullable: false),
                    PermissionCategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PermissionActions_PermissionCategories_PermissionCategoryId",
                        column: x => x.PermissionCategoryId,
                        principalTable: "PermissionCategories",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProjectTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Notes = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: true),
                    Priority = table.Column<int>(type: "int", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    EstimatedHours = table.Column<double>(type: "double", nullable: true),
                    RemainingHours = table.Column<double>(type: "double", nullable: true),
                    CompletedHours = table.Column<double>(type: "double", nullable: true),
                    AssignedEmployees = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProjectId = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreatedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    LastModifiedBy = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    LastModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "WorkOrderDocuments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FilePath = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FileSize = table.Column<int>(type: "int", nullable: true),
                    FileContent = table.Column<byte[]>(type: "longblob", nullable: true),
                    FileType = table.Column<int>(type: "int", nullable: true),
                    ProjectId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkOrderDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkOrderDocuments_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeWorkInformations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Designation = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SalaryType = table.Column<int>(type: "int", nullable: true),
                    HireDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ConfirmationDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    TotalPreviousExperience = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UseDefaultLeaves = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Salary = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Basic = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    HRAllowances = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Bonus = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Gratuity = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PF = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ESI = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PT = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    SiteId = table.Column<int>(type: "int", nullable: true),
                    Bond = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PreviousDateOfJoiningInGDR = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    PreviousDateOfLeavingInGDR = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    GRPHead = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeWorkInformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeWorkInformations_Sites_SiteId",
                        column: x => x.SiteId,
                        principalTable: "Sites",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RolePermissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    PermissionActionId = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RolePermissions_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermissions_PermissionActions_PermissionActionId",
                        column: x => x.PermissionActionId,
                        principalTable: "PermissionActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PhotoURL = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployeeNumber = table.Column<int>(type: "int", nullable: false, defaultValueSql: "NEXT VALUE FOR EmployeeNumber"),
                    FirstName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MiddleName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AlternateEmail = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<long>(type: "bigint", nullable: true),
                    AlternateNumber = table.Column<long>(type: "bigint", nullable: true),
                    EmployeeDepartmentId = table.Column<int>(type: "int", nullable: true),
                    EmployeeDesignationId = table.Column<int>(type: "int", nullable: true),
                    EmployeeReportToId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    RoleId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    EmployeeCategoryId = table.Column<int>(type: "int", nullable: true),
                    EmployeePersonalDetailsId = table.Column<int>(type: "int", nullable: true),
                    EmployeeWorkInformationId = table.Column<int>(type: "int", nullable: true),
                    EmployeeInsuranceDetailsId = table.Column<int>(type: "int", nullable: true),
                    EmployeeAddressesId = table.Column<int>(type: "int", nullable: true),
                    EmployeeIdentityInfoId = table.Column<int>(type: "int", nullable: true),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreatedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    LastModifiedBy = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    LastModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employees_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeAddresses_EmployeeAddressesId",
                        column: x => x.EmployeeAddressesId,
                        principalTable: "EmployeeAddresses",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeCategories_EmployeeCategoryId",
                        column: x => x.EmployeeCategoryId,
                        principalTable: "EmployeeCategories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeDepartments_EmployeeDepartmentId",
                        column: x => x.EmployeeDepartmentId,
                        principalTable: "EmployeeDepartments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeDesignations_EmployeeDesignationId",
                        column: x => x.EmployeeDesignationId,
                        principalTable: "EmployeeDesignations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeIdentityInfos_EmployeeIdentityInfoId",
                        column: x => x.EmployeeIdentityInfoId,
                        principalTable: "EmployeeIdentityInfos",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeInsuranceDetails_EmployeeInsuranceDetailsId",
                        column: x => x.EmployeeInsuranceDetailsId,
                        principalTable: "EmployeeInsuranceDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_EmployeePersonalDetails_EmployeePersonalDetailsId",
                        column: x => x.EmployeePersonalDetailsId,
                        principalTable: "EmployeePersonalDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeWorkInformations_EmployeeWorkInformationId",
                        column: x => x.EmployeeWorkInformationId,
                        principalTable: "EmployeeWorkInformations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_Employees_EmployeeReportToId",
                        column: x => x.EmployeeReportToId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeDocuments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FileName = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FilePath = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FileSize = table.Column<int>(type: "int", nullable: true),
                    FileContent = table.Column<byte[]>(type: "longblob", nullable: true),
                    FileType = table.Column<int>(type: "int", nullable: true),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeDocuments_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeEducationDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PassingYear = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DegreeCertificateDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    University = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    grade = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeEducationDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeEducationDetails_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeLeaves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Reason = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    LeaveDays = table.Column<double>(type: "double", nullable: false),
                    EmployeeLeaveTypeId = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeLeaves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeLeaves_EmployeeLeaveType_EmployeeLeaveTypeId",
                        column: x => x.EmployeeLeaveTypeId,
                        principalTable: "EmployeeLeaveType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeLeaves_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeLeaveSummary",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    RemainingLeaves = table.Column<double>(type: "double", nullable: false),
                    EmployeeLeaveTypeId = table.Column<int>(type: "int", nullable: true),
                    TotalLeaves = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeLeaveSummary", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeLeaveSummary_EmployeeLeaveType_EmployeeLeaveTypeId",
                        column: x => x.EmployeeLeaveTypeId,
                        principalTable: "EmployeeLeaveType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLeaveSummary_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeRelationshipDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    RelationshipType = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeRelationshipDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeRelationshipDetails_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmployeeSalaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    SalaryType = table.Column<int>(type: "int", nullable: true),
                    SalaryStatus = table.Column<int>(type: "int", nullable: true),
                    IsApprovedByDepartmentHead = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsApprovedByHRHead = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CurrentSalary = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ExpectedToBeSalary = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Basic = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    HRAllowances = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Bonus = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Gratuity = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PF = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ESI = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    PT = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedDateTime = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSalaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaries_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProjectEmployees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreatedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    LastModifiedBy = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    LastModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectEmployees_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectEmployees_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), null, "HR Admin", "HR ADMIN" },
                    { new Guid("2800e45a-293d-4c8e-8b91-2f57cce4b963"), null, "Manager", "MANAGER" },
                    { new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), null, "admin", "ADMIN" },
                    { new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"), null, "Employee", "EMPLOYEE" },
                    { new Guid("f794ec58-bf79-4ca0-a897-021e0657ca42"), null, "HR", "HR" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Shortcuts", "TwoFactorEnabled", "UserName" },
                values: new object[] { new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"), 0, "1e1f5777-07f9-4300-a9bf-e78f58a6f46d", "admin1@admin.com", false, false, null, null, "admin", "AQAAAAIAAYagAAAAEGyrI3ofdUWNCYq/kzmWwcKi3ouV5tvBE8BRHHJHf/s20+Pmwa9kpEo4P7MBsYyqvQ==", null, false, null, "[]", false, "admin1@admin.com" });

            migrationBuilder.InsertData(
                table: "EmployeeCategories",
                columns: new[] { "Id", "IsDeleted", "Name" },
                values: new object[,]
                {
                    { 1, false, "Full-Time" },
                    { 2, false, "Contractor" },
                    { 3, false, "Site" }
                });

            migrationBuilder.InsertData(
                table: "EmployeeDepartments",
                columns: new[] { "Id", "IsDeleted", "Name" },
                values: new object[,]
                {
                    { 1, false, "IT" },
                    { 2, false, "Enginnering" },
                    { 3, false, "Site" }
                });

            migrationBuilder.InsertData(
                table: "EmployeeDesignations",
                columns: new[] { "Id", "IsDeleted", "Name" },
                values: new object[,]
                {
                    { 1, false, "Manager" },
                    { 2, false, "Senior Manager" },
                    { 3, false, "Director" },
                    { 4, false, "Senior Director" },
                    { 5, false, "HR Head" },
                    { 6, false, "Engineer" }
                });

            migrationBuilder.InsertData(
                table: "EmployeeHolidays",
                columns: new[] { "Id", "EndDate", "IsDeleted", "IsFloater", "Name", "StartDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "New Year's Day", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Republic Day", new DateTime(2024, 1, 26, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, new DateTime(2024, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), false, true, "Holi", new DateTime(2024, 3, 25, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, new DateTime(2024, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Independence Day", new DateTime(2024, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, new DateTime(2024, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Dussehra", new DateTime(2024, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, new DateTime(2024, 10, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Diwali", new DateTime(2024, 10, 31, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, new DateTime(2024, 12, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), false, false, "Christmas", new DateTime(2024, 12, 25, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "EmployeeLeaveType",
                columns: new[] { "Id", "IsDeleted", "IsPaid", "Name" },
                values: new object[,]
                {
                    { 1, false, true, "Privilege Leave" },
                    { 2, false, true, "Sick Leave" },
                    { 3, false, true, "Casual Leave" },
                    { 4, false, true, "Maternity Leave" },
                    { 5, false, true, "Bereavement Leave" },
                    { 6, false, true, "Compensatory Leave" }
                });

            migrationBuilder.InsertData(
                table: "JobLevelLeave",
                columns: new[] { "Id", "IsDeleted", "JobLevel" },
                values: new object[,]
                {
                    { 1, false, "Junior level" },
                    { 2, false, "Middle level" },
                    { 3, false, "Senior level" }
                });

            migrationBuilder.InsertData(
                table: "PermissionCategories",
                columns: new[] { "Id", "Description", "Name", "Value" },
                values: new object[,]
                {
                    { 1, "Project Module", "ProjectModule", 2 },
                    { 2, "Employee Module", "EmployeeModule", 1 },
                    { 3, "Integration Module", "IntegrationModule", 3 },
                    { 4, "Leave Module", "LeaveModule", 4 },
                    { 5, "Setting Module", "SettingModule", 5 }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9") });

            migrationBuilder.InsertData(
                table: "EmployeeDefaultLeave",
                columns: new[] { "Id", "EmployeeLeaveTypeId", "IsDeleted", "JobLevelLeaveId", "TotalLeaves" },
                values: new object[,]
                {
                    { 1, 1, false, null, 5 },
                    { 2, 2, false, null, 5 },
                    { 3, 3, false, null, 5 },
                    { 4, 4, false, null, 5 },
                    { 5, 5, false, null, 5 },
                    { 6, 6, false, null, 5 }
                });

            migrationBuilder.InsertData(
                table: "PermissionActions",
                columns: new[] { "Id", "Description", "Name", "PermissionCategoryId", "Value" },
                values: new object[,]
                {
                    { 1, "Project Dashboard", "ProjectModule_Dashboard", 1, 10 },
                    { 2, "Add Project", "ProjectModule_Add", 1, 7 },
                    { 3, "Delete Project", "ProjectModule_Delete", 1, 9 },
                    { 4, "Update Project", "ProjectModule_Update", 1, 8 },
                    { 5, "View Project", "ProjectModule_View", 1, 33 },
                    { 6, "Project Task", "ProjectModule_Task", 1, 34 },
                    { 7, "Project Employees", "ProjectModule_Employee", 1, 35 },
                    { 8, "Add Employee", "EmployeeModule_Add", 2, 1 },
                    { 9, "Updated Employee", "EmployeeModule_Update", 2, 2 },
                    { 10, "Delete Employee", "EmployeeModule_Delete", 2, 3 },
                    { 11, "View Employee", "EmployeeModule_View", 2, 30 },
                    { 12, "Employee Salary Update", "EmployeeModule_Salary_Update", 2, 4 },
                    { 13, "View Employee Salary History", "EmployeeModule_Salary_History_View", 2, 31 },
                    { 14, "Employee Salary Approve/Reject", "EmployeeModule_Salary_Approve_Reject", 2, 32 },
                    { 15, "Employee Leave Update", "EmployeeModule_Leave_Update", 2, 5 },
                    { 16, "Employee Dashboard", "EmployeeModule_Dashboard", 2, 6 },
                    { 17, "IntegrationModule_UploadCSV", "IntegrationModule_UploadCSV", 3, 29 },
                    { 18, "Add Leaves", "LeaveModule_Add", 4, 17 },
                    { 19, "Delete Leaves", "LeaveModule_Delete", 4, 18 },
                    { 20, "Update Leaves", "LeaveModule_Update", 4, 19 },
                    { 21, "Approve/Reject Leaves", "LeaveModule_Approvals", 4, 20 },
                    { 22, "Leave History Dashboard", "LeaveModule_Employee_LeaveHistory", 4, 21 },
                    { 23, "Update Dropdown values", "SettingModule_DropDownSettings_Update", 5, 22 },
                    { 24, "Update Default Leaves", "SettingModule_DefaultLeaves_Update", 5, 23 },
                    { 25, "Update Public Holidays", "SettingModule_Holidays_Update", 5, 27 }
                });

            migrationBuilder.InsertData(
                table: "RolePermissions",
                columns: new[] { "Id", "IsDeleted", "PermissionActionId", "RoleId" },
                values: new object[,]
                {
                    { 1, false, 1, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 2, false, 2, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 3, false, 3, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 4, false, 4, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 5, false, 5, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 6, false, 6, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 7, false, 7, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 8, false, 8, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 9, false, 9, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 10, false, 10, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 11, false, 11, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 12, false, 12, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 13, false, 13, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 14, false, 14, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
                    { 15, false, 15, new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7") },
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

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDefaultLeave_EmployeeLeaveTypeId",
                table: "EmployeeDefaultLeave",
                column: "EmployeeLeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDefaultLeave_JobLevelLeaveId",
                table: "EmployeeDefaultLeave",
                column: "JobLevelLeaveId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDocuments_EmployeeId",
                table: "EmployeeDocuments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEducationDetails_EmployeeId",
                table: "EmployeeEducationDetails",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeInsuranceDetails_EmployeeDesignationId",
                table: "EmployeeInsuranceDetails",
                column: "EmployeeDesignationId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaves_EmployeeId",
                table: "EmployeeLeaves",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaves_EmployeeLeaveTypeId",
                table: "EmployeeLeaves",
                column: "EmployeeLeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaveSummary_EmployeeId",
                table: "EmployeeLeaveSummary",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaveSummary_EmployeeLeaveTypeId",
                table: "EmployeeLeaveSummary",
                column: "EmployeeLeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeRelationshipDetails_EmployeeId",
                table: "EmployeeRelationshipDetails",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeAddressesId",
                table: "Employees",
                column: "EmployeeAddressesId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeCategoryId",
                table: "Employees",
                column: "EmployeeCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeDepartmentId",
                table: "Employees",
                column: "EmployeeDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeDesignationId",
                table: "Employees",
                column: "EmployeeDesignationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeIdentityInfoId",
                table: "Employees",
                column: "EmployeeIdentityInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeInsuranceDetailsId",
                table: "Employees",
                column: "EmployeeInsuranceDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeePersonalDetailsId",
                table: "Employees",
                column: "EmployeePersonalDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeReportToId",
                table: "Employees",
                column: "EmployeeReportToId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeWorkInformationId",
                table: "Employees",
                column: "EmployeeWorkInformationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_RoleId",
                table: "Employees",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_UserId",
                table: "Employees",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaries_EmployeeId",
                table: "EmployeeSalaries",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWorkInformations_SiteId",
                table: "EmployeeWorkInformations",
                column: "SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_PermissionActions_PermissionCategoryId",
                table: "PermissionActions",
                column: "PermissionCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectEmployees_EmployeeId",
                table: "ProjectEmployees",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectEmployees_ProjectId",
                table: "ProjectEmployees",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_ProjectId",
                table: "ProjectTasks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_PermissionActionId",
                table: "RolePermissions",
                column: "PermissionActionId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_RoleId",
                table: "RolePermissions",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkOrderDocuments_ProjectId",
                table: "WorkOrderDocuments",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "EmployeeDefaultLeave");

            migrationBuilder.DropTable(
                name: "EmployeeDocuments");

            migrationBuilder.DropTable(
                name: "EmployeeEducationDetails");

            migrationBuilder.DropTable(
                name: "EmployeeHolidays");

            migrationBuilder.DropTable(
                name: "EmployeeLeaves");

            migrationBuilder.DropTable(
                name: "EmployeeLeaveSummary");

            migrationBuilder.DropTable(
                name: "EmployeeRelationshipDetails");

            migrationBuilder.DropTable(
                name: "EmployeeSalaries");

            migrationBuilder.DropTable(
                name: "ProjectEmployees");

            migrationBuilder.DropTable(
                name: "ProjectTasks");

            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "WorkOrderDocuments");

            migrationBuilder.DropTable(
                name: "JobLevelLeave");

            migrationBuilder.DropTable(
                name: "EmployeeLeaveType");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "PermissionActions");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "EmployeeAddresses");

            migrationBuilder.DropTable(
                name: "EmployeeCategories");

            migrationBuilder.DropTable(
                name: "EmployeeDepartments");

            migrationBuilder.DropTable(
                name: "EmployeeIdentityInfos");

            migrationBuilder.DropTable(
                name: "EmployeeInsuranceDetails");

            migrationBuilder.DropTable(
                name: "EmployeePersonalDetails");

            migrationBuilder.DropTable(
                name: "EmployeeWorkInformations");

            migrationBuilder.DropTable(
                name: "PermissionCategories");

            migrationBuilder.DropTable(
                name: "EmployeeDesignations");

            migrationBuilder.DropTable(
                name: "Sites");

            migrationBuilder.DropSequence(
                name: "EmployeeNumber");
        }
    }
}
