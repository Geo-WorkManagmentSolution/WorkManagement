using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Security.Claims;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;
using static System.Formats.Asn1.AsnWriter;

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

        public virtual DbSet<EmployeeLeaveSummary> EmployeeLeaveSummary { get; set; }
        public virtual DbSet<EmployeeDefaultLeaveSummary> EmployeeDefaultLeave { get; set; }
        public virtual DbSet<EmployeeLeaveType> EmployeeLeaveType { get; set; }
        public virtual DbSet<EmployeeLeave> EmployeeLeaves { get; set; }
        public virtual DbSet<EmployeeHoliday> EmployeeHolidays { get; set; }

        public virtual DbSet<JobLevelLeave> JobLevelLeave { get; set; }

        public virtual DbSet<RolePermission> RolePermissions { get; set; }
        public virtual DbSet<PermissionAction> PermissionActions { get; set; }
        public virtual DbSet<PermissionCategory> PermissionCategories { get; set; }

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

            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = new Guid("2c5e174e-3b0e-446f-86af-483d56fd7210"), Name = "admin", NormalizedName = "admin".ToUpper() });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = new Guid("2800e45a-293d-4c8e-8b91-2f57cce4b963"), Name = "Manager", NormalizedName = "Manager".ToUpper() });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = new Guid("611c6e4c-c1fc-49a4-847e-fb9608f460c0"), Name = "SuperUser", NormalizedName = "SuperUser".ToUpper() });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = new Guid("186d7b12-af9a-4956-a112-0795ac4d60e7"), Name = "HR Admin", NormalizedName = "HR Admin".ToUpper() });
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
