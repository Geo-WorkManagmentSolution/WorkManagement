using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Diagnostics.Metrics;
using System.Linq.Expressions;
using System.Net.Http;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Xml;
using WorkManagement.Domain.Entity;
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
        public virtual DbSet<EmployeeCategory> EmployeeCategories { get; set; }
        public virtual DbSet<EmployeeDepartment> EmployeeDepartments { get; set; }
        public virtual DbSet<EmployeeDocuments> EmployeeDocuments { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectEmployee> ProjectEmployees { get; set; }

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

            modelBuilder.Entity<EmployeeCategory>().HasData(
                     new EmployeeCategory { Id = 1, Name = "Full-Time" },
                     new EmployeeCategory { Id = 2, Name = "Contractor" },
                     new EmployeeCategory { Id = 3, Name = "Site" }
            );

            modelBuilder.Entity<EmployeeCategory>().HasData(
                new EmployeeCategory { Id = 1, Name = "IT" },
                new EmployeeCategory { Id = 2, Name = "Enginnering" },
                new EmployeeCategory { Id = 3, Name = "Site" }
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
