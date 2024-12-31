using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Extentions;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagmentSolution.EFCore
{
    public class WorkManagementDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public WorkManagementDbContext(DbContextOptions<WorkManagementDbContext> options, IHttpContextAccessor _httpContextAccessor) : base(options)
        {
            HttpContextAccessor = _httpContextAccessor;
        }

        public WorkManagementDbContext(DbContextOptions<WorkManagementDbContext> options) : base(options)
        {
        }


        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmployeePersonalDetails> EmployeePersonalDetails { get; set; }
        public virtual DbSet<EmployeeWorkInformation> EmployeeWorkInformations { get; set; }
        public virtual DbSet<EmployeeAddress> EmployeeAddresses { get; set; }
        public virtual DbSet<EmployeeIdentityInfo> EmployeeIdentityInfos { get; set; }
        public virtual DbSet<EmployeeEducationDetail> EmployeeEducationDetails { get; set; }
        public virtual DbSet<EmployeeRelationshipDetail> EmployeeRelationshipDetails { get; set; }
        public virtual DbSet<EmployeeInsuranceDetail> EmployeeInsuranceDetails { get; set; }
        public virtual DbSet<EmployeeCategory> EmployeeCategories { get; set; }
        public virtual DbSet<EmployeeDepartment> EmployeeDepartments { get; set; }
        public virtual DbSet<EmployeeDesignation> EmployeeDesignations { get; set; }
        public virtual DbSet<Site> Sites { get; set; }
        public virtual DbSet<EmployeeDocuments> EmployeeDocuments { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectEmployee> ProjectEmployees { get; set; }

        public virtual DbSet<ProjectWorkOrders> WorkOrderDocuments { get; set; }
        public virtual DbSet<ProjectTask> ProjectTasks { get; set; }

        public virtual DbSet<EmployeeLeaveSummary> EmployeeLeaveSummary { get; set; }
        public virtual DbSet<EmployeeDefaultLeaveSummary> EmployeeDefaultLeave { get; set; }
        public virtual DbSet<EmployeeLeaveType> EmployeeLeaveType { get; set; }
        public virtual DbSet<EmployeeLeave> EmployeeLeaves { get; set; }
        public virtual DbSet<EmployeeHoliday> EmployeeHolidays { get; set; }

        public virtual DbSet<JobLevelLeave> JobLevelLeave { get; set; }

        public virtual DbSet<RolePermission> RolePermissions { get; set; }
        public virtual DbSet<PermissionAction> PermissionActions { get; set; }
        public virtual DbSet<PermissionCategory> PermissionCategories { get; set; }
        public virtual DbSet<EmployeeSalary> EmployeeSalaries { get; set; }


        public IHttpContextAccessor HttpContextAccessor { get; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Expression<Func<FullyAuditableEntity, bool>> filterExpr = bm => !bm.IsDeleted;
            //foreach (var mutableEntityType in modelBuilder.Model.GetEntityTypes())
            //{
            //    // check if current entity type is child of BaseModel
            //    if (mutableEntityType.ClrType.IsAssignableTo(typeof(FullyAuditableEntity)))
            //    {
            //        // modify expression to handle correct child type
            //        var parameter = Expression.Parameter(mutableEntityType.ClrType);
            //        var body = ReplacingExpressionVisitor.Replace(filterExpr.Parameters.First(), parameter, filterExpr.Body);
            //        var lambdaExpression = Expression.Lambda(body, parameter);

            //        // set filter
            //        mutableEntityType.SetQueryFilter(lambdaExpression);
            //    }
            //}

            modelBuilder.HasSequence<int>("EmployeeNumber")
            .StartsAt(1000)
            .IncrementsBy(1);

            modelBuilder.Entity<Employee>()
                .Property(o => o.EmployeeNumber)
                .HasDefaultValueSql("NEXT VALUE FOR EmployeeNumber");


            modelBuilder.Entity<JobLevelLeave>().HasData(
                new JobLevelLeave { Id = 1, JobLevel = "Junior level" },
                new JobLevelLeave { Id = 2, JobLevel = "Middle level" },
                new JobLevelLeave { Id = 3, JobLevel = "Senior level" }
                );

            modelBuilder.Entity<EmployeeCategory>().HasData(
                     new EmployeeCategory { Id = 1, Name = "Full-Time" },
                     new EmployeeCategory { Id = 2, Name = "Contractor" },
                     new EmployeeCategory { Id = 3, Name = "Site" }
            );

            modelBuilder.Entity<EmployeeDepartment>().HasData(
                new EmployeeDepartment { Id = 1, Name = "IT" },
                new EmployeeDepartment { Id = 2, Name = "Enginnering" },
                new EmployeeDepartment { Id = 3, Name = "Site" }
            );

            modelBuilder.Entity<EmployeeDesignation>().HasData(
                new EmployeeDesignation { Id = 1, Name = "Manager" },
                new EmployeeDesignation { Id = 2, Name = "Senior Manager" },
                new EmployeeDesignation { Id = 3, Name = "Director" },
                new EmployeeDesignation { Id = 4, Name = "Senior Director" },
                new EmployeeDesignation { Id = 5, Name = "HR Head" },
                new EmployeeDesignation { Id = 6, Name = "Engineer" }
            );


            modelBuilder.Entity<EmployeeLeaveType>().HasData(
            new EmployeeLeaveType { Id = 1, Name = "Privilege Leave", IsPaid = true },
            new EmployeeLeaveType { Id = 2, Name = "Sick Leave", IsPaid = true },
            new EmployeeLeaveType { Id = 3, Name = "Casual Leave", IsPaid = true },
            new EmployeeLeaveType { Id = 4, Name = "Maternity Leave", IsPaid = true },
            new EmployeeLeaveType { Id = 5, Name = "Bereavement Leave", IsPaid = true },
            new EmployeeLeaveType { Id = 6, Name = "Compensatory Leave", IsPaid = true }
        );

            modelBuilder.Entity<EmployeeDefaultLeaveSummary>().HasData(
              new EmployeeDefaultLeaveSummary { Id = 1, EmployeeLeaveTypeId = 1, TotalLeaves = 5 },
              new EmployeeDefaultLeaveSummary { Id = 2, EmployeeLeaveTypeId = 2, TotalLeaves = 5 },
              new EmployeeDefaultLeaveSummary { Id = 3, EmployeeLeaveTypeId = 3, TotalLeaves = 5 },
              new EmployeeDefaultLeaveSummary { Id = 4, EmployeeLeaveTypeId = 4, TotalLeaves = 5 },
              new EmployeeDefaultLeaveSummary { Id = 5, EmployeeLeaveTypeId = 5, TotalLeaves = 5 },
              new EmployeeDefaultLeaveSummary { Id = 6, EmployeeLeaveTypeId = 6, TotalLeaves = 5 }
          );

            modelBuilder.Entity<EmployeeHoliday>().HasData(
            new EmployeeHoliday
            {
                Id = 1,
                Name = "New Year's Day",
                IsFloater = false,
                StartDate = new DateTime(2024, 1, 1),
                EndDate = new DateTime(2024, 1, 1)

            },
            new EmployeeHoliday
            {
                Id = 2,
                Name = "Republic Day",
                IsFloater = false,
                StartDate = new DateTime(2024, 1, 26),
                EndDate = new DateTime(2024, 1, 26)

            },
            new EmployeeHoliday
            {
                Id = 3,
                Name = "Holi",
                IsFloater = true,
                StartDate = new DateTime(2024, 3, 25),
                EndDate = new DateTime(2024, 3, 25),

            },
            new EmployeeHoliday
            {
                Id = 4,
                Name = "Independence Day",
                IsFloater = false,
                StartDate = new DateTime(2024, 8, 15),
                EndDate = new DateTime(2024, 8, 15),
            },
            new EmployeeHoliday
            {
                Id = 5,
                Name = "Dussehra",
                IsFloater = false,
                StartDate = new DateTime(2024, 10, 12),
                EndDate = new DateTime(2024, 10, 12),
            },
            new EmployeeHoliday
            {
                Id = 6,
                Name = "Diwali",
                IsFloater = false,
                StartDate = new DateTime(2024, 10, 31),
                EndDate = new DateTime(2024, 10, 31),
            },
            new EmployeeHoliday
            {
                Id = 7,
                Name = "Christmas",
                IsFloater = false,
                StartDate = new DateTime(2024, 12, 25),
                EndDate = new DateTime(2024, 12, 25),
            });

            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), Name = "admin", NormalizedName = "admin".ToUpper() });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), Name = "HR Admin", NormalizedName = "HR Admin".ToUpper() });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = new Guid("2800e45a-293d-4c8e-8b91-2f57cce4b963"), Name = "Manager", NormalizedName = "Manager".ToUpper() });            
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = new Guid("f794ec58-bf79-4ca0-a897-021e0657ca42"), Name = "HR", NormalizedName = "HR".ToUpper() });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = new Guid("d48a7bcd-43f2-415f-b854-3392c9445e6f"), Name = "Employee", NormalizedName = "Employee".ToUpper() });


            var hasher = new PasswordHasher<ApplicationUser>();

            //Seeding the User to AspNetUsers table
            modelBuilder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Id = new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9"), // primary key
                    UserName = "admin1@admin.com",
                    NormalizedUserName = "admin",
                    Email = "admin1@admin.com",
                    PasswordHash = hasher.HashPassword(null, "admin@admin.com"),
                    Shortcuts = new List<string>()
                }
            );

            modelBuilder.Entity<IdentityUserRole<Guid>>().HasData(
                new IdentityUserRole<Guid>
                {
                    RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"),
                    UserId = new Guid("8e445865-a24d-4543-a6c6-9443d048cdb9")
                }
            );


            modelBuilder.Entity<PermissionCategory>().HasData(
                new PermissionCategory { Id = 1, Name = PermissionCategoryEnum.ProjectModule.convertToString(), Value = PermissionCategoryEnum.ProjectModule, Description = "Project Module", },
                new PermissionCategory { Id = 2, Name = PermissionCategoryEnum.EmployeeModule.convertToString(), Value = PermissionCategoryEnum.EmployeeModule, Description = "Employee Module" },
                new PermissionCategory { Id = 3, Name = PermissionCategoryEnum.IntegrationModule.convertToString(), Value = PermissionCategoryEnum.IntegrationModule, Description = "Integration Module" },
                new PermissionCategory { Id = 4, Name = PermissionCategoryEnum.LeaveModule.convertToString(), Value = PermissionCategoryEnum.LeaveModule, Description = "Leave Module" },
                new PermissionCategory { Id = 5, Name = PermissionCategoryEnum.SettingModule.convertToString(), Value = PermissionCategoryEnum.SettingModule, Description = "Setting Module" }

            );
            //seed permission actions
            modelBuilder.Entity<PermissionAction>().HasData(
             new PermissionAction { Id = 1, PermissionCategoryId = 1, Name = PermissionActionEnum.ProjectModule_Dashboard.convertToString(), Value = PermissionActionEnum.ProjectModule_Dashboard, Description = "Project Dashboard" },
             new PermissionAction { Id = 2, PermissionCategoryId = 1, Name = PermissionActionEnum.ProjectModule_Add.convertToString(), Value = PermissionActionEnum.ProjectModule_Add, Description = "Add Project" },
             new PermissionAction { Id = 3, PermissionCategoryId = 1, Name = PermissionActionEnum.ProjectModule_Delete.convertToString(), Value = PermissionActionEnum.ProjectModule_Delete, Description = "Delete Project" },
             new PermissionAction { Id = 4, PermissionCategoryId = 1, Name = PermissionActionEnum.ProjectModule_Update.convertToString(), Value = PermissionActionEnum.ProjectModule_Update, Description = "Update Project" },
             new PermissionAction { Id = 5, PermissionCategoryId = 1, Name = PermissionActionEnum.ProjectModule_View.convertToString(), Value = PermissionActionEnum.ProjectModule_View, Description = "View Project" },
             new PermissionAction { Id = 6, PermissionCategoryId = 1, Name = PermissionActionEnum.ProjectModule_Task.convertToString(), Value = PermissionActionEnum.ProjectModule_Task, Description = "Project Task" },
             new PermissionAction { Id = 7, PermissionCategoryId = 1, Name = PermissionActionEnum.ProjectModule_Employee.convertToString(), Value = PermissionActionEnum.ProjectModule_Employee, Description = "Project Employees" },

             new PermissionAction { Id = 8, PermissionCategoryId = 2, Name = PermissionActionEnum.EmployeeModule_Add.convertToString(), Value = PermissionActionEnum.EmployeeModule_Add, Description = "Add Employee" },
             new PermissionAction { Id = 9, PermissionCategoryId = 2, Name = PermissionActionEnum.EmployeeModule_Update.convertToString(), Value = PermissionActionEnum.EmployeeModule_Update, Description = "Updated Employee" },
             new PermissionAction { Id = 10, PermissionCategoryId = 2, Name = PermissionActionEnum.EmployeeModule_Delete.convertToString(), Value = PermissionActionEnum.EmployeeModule_Delete, Description = "Delete Employee" },
             new PermissionAction { Id = 11, PermissionCategoryId = 2, Name = PermissionActionEnum.EmployeeModule_View.convertToString(), Value = PermissionActionEnum.EmployeeModule_View, Description = "View Employee" },
             new PermissionAction { Id = 12, PermissionCategoryId = 2, Name = PermissionActionEnum.EmployeeModule_Salary_Update.convertToString(), Value = PermissionActionEnum.EmployeeModule_Salary_Update, Description = "Employee Salary Update" },
             new PermissionAction { Id = 13, PermissionCategoryId = 2, Name = PermissionActionEnum.EmployeeModule_Salary_History_View.convertToString(), Value = PermissionActionEnum.EmployeeModule_Salary_History_View, Description = "View Employee Salary History" },
             new PermissionAction { Id = 14, PermissionCategoryId = 2, Name = PermissionActionEnum.EmployeeModule_Salary_Approve_Reject.convertToString(), Value = PermissionActionEnum.EmployeeModule_Salary_Approve_Reject, Description = "Employee Salary Approve/Reject" },
             new PermissionAction { Id = 15, PermissionCategoryId = 2, Name = PermissionActionEnum.EmployeeModule_Leave_Update.convertToString(), Value = PermissionActionEnum.EmployeeModule_Leave_Update, Description = "Employee Leave Update" },
             new PermissionAction { Id = 16, PermissionCategoryId = 2, Name = PermissionActionEnum.EmployeeModule_Dashboard.convertToString(), Value = PermissionActionEnum.EmployeeModule_Dashboard, Description = "Employee Dashboard" },

             new PermissionAction { Id = 17, PermissionCategoryId = 3, Name = PermissionActionEnum.IntegrationModule_UploadCSV.convertToString(), Value = PermissionActionEnum.IntegrationModule_UploadCSV, Description = "IntegrationModule_UploadCSV" },

             new PermissionAction { Id = 18, PermissionCategoryId = 4, Name = PermissionActionEnum.LeaveModule_Add.convertToString(), Value = PermissionActionEnum.LeaveModule_Add, Description = "Add Leaves" },
             new PermissionAction { Id = 19, PermissionCategoryId = 4, Name = PermissionActionEnum.LeaveModule_Delete.convertToString(), Value = PermissionActionEnum.LeaveModule_Delete, Description = "Delete Leaves" },
             new PermissionAction { Id = 20, PermissionCategoryId = 4, Name = PermissionActionEnum.LeaveModule_Update.convertToString(), Value = PermissionActionEnum.LeaveModule_Update, Description = "Update Leaves" },
             new PermissionAction { Id = 21, PermissionCategoryId = 4, Name = PermissionActionEnum.LeaveModule_Approvals.convertToString(), Value = PermissionActionEnum.LeaveModule_Approvals, Description = "Approve/Reject Leaves" },
             new PermissionAction { Id = 22, PermissionCategoryId = 4, Name = PermissionActionEnum.LeaveModule_Employee_LeaveHistory.convertToString(), Value = PermissionActionEnum.LeaveModule_Employee_LeaveHistory, Description = "Leave History Dashboard" },

             new PermissionAction { Id = 23, PermissionCategoryId = 5, Name = PermissionActionEnum.SettingModule_DropDownSettings_Update.convertToString(), Value = PermissionActionEnum.SettingModule_DropDownSettings_Update, Description = "Update Dropdown values" },
             new PermissionAction { Id = 24, PermissionCategoryId = 5, Name = PermissionActionEnum.SettingModule_DefaultLeaves_Update.convertToString(), Value = PermissionActionEnum.SettingModule_DefaultLeaves_Update, Description = "Update Default Leaves" },
             new PermissionAction { Id = 25, PermissionCategoryId = 5, Name = PermissionActionEnum.SettingModule_Holidays_Update.convertToString(), Value = PermissionActionEnum.SettingModule_Holidays_Update, Description = "Update Public Holidays" }
         );

            //default permission for a employee role
            modelBuilder.Entity<RolePermission>().HasData(
                new RolePermission { Id = 1, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 1 },
                new RolePermission { Id = 2, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 2 },
                new RolePermission { Id = 3, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 3 },
                new RolePermission { Id = 4, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 4 },
                new RolePermission { Id = 5, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 5 },
                new RolePermission { Id = 6, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 6 },
                new RolePermission { Id = 7, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 7 },
                new RolePermission { Id = 8, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 8 },
                new RolePermission { Id = 9, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 9 },
                new RolePermission { Id = 10, RoleId=new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 10 },

                new RolePermission { Id = 11, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 11 },
                new RolePermission { Id = 12, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 12 },
                new RolePermission { Id = 13, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 13 },
                new RolePermission { Id = 14, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 14 },
                new RolePermission { Id = 15, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 15 },
                new RolePermission { Id = 16, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 16 },
                new RolePermission { Id = 17, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 17 },
                new RolePermission { Id = 18, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 18 },
                new RolePermission { Id = 19, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 19 },
                new RolePermission { Id = 20, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 20 },
                new RolePermission { Id = 21, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 21 },
                new RolePermission { Id = 22, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 22 },
                new RolePermission { Id = 23, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 23 },
                new RolePermission { Id = 24, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 24 },
                new RolePermission { Id = 25, RoleId = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), PermissionActionId = 25 },

                new RolePermission { Id = 26, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 1 },
                new RolePermission { Id = 27, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 2 },
                new RolePermission { Id = 28, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 3 },
                new RolePermission { Id = 29, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 4 },
                new RolePermission { Id = 30, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 5 },
                new RolePermission { Id = 31, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 6 },
                new RolePermission { Id = 32, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 7 },
                new RolePermission { Id = 33, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 8 },
                new RolePermission { Id = 34, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 9 },
                new RolePermission { Id = 35, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 10 },

                new RolePermission { Id = 36, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 11 },
                new RolePermission { Id = 37, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 12 },
                new RolePermission { Id = 38, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 13 },
                new RolePermission { Id = 39, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 14 },
                new RolePermission { Id = 40, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 15 },
                new RolePermission { Id = 41, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 16 },
                new RolePermission { Id = 42, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 17 },
                new RolePermission { Id = 43, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 18 },
                new RolePermission { Id = 44, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 19 },
                new RolePermission { Id = 45, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 20 },
                new RolePermission { Id = 46, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 21 },
                new RolePermission { Id = 47, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 22 },
                new RolePermission { Id = 48, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 23 },
                new RolePermission { Id = 49, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 24 },
                new RolePermission { Id = 50, RoleId = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), PermissionActionId = 25 }
            );
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            AddTimestamps();
            var result = await base.SaveChangesAsync(cancellationToken);

            // More custom logic if needed
            // ...

            return result;
        }

        public override int SaveChanges()
        {
            AddTimestamps();
            return base.SaveChangesAsync().Result;

        }

        private void AddTimestamps()
        {
            var entities = ChangeTracker.Entries().Where(x => x.Entity is FullyAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));

            var email = HttpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email);
            var loggedinUser = this.Users.FirstOrDefault(x => x.Email == email);
            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added)
                {
                    ((FullyAuditableEntity)entity.Entity).CreatedOn = DateTime.UtcNow;
                    ((FullyAuditableEntity)entity.Entity).CreatedBy = loggedinUser.Id;
                }
                ((FullyAuditableEntity)entity.Entity).LastModifiedOn = DateTime.UtcNow;
                ((FullyAuditableEntity)entity.Entity).LastModifiedBy = loggedinUser.Id;
            }
        }
    }
}
