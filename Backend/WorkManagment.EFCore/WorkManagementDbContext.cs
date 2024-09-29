using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WorkManagement.Domain.Entity;
using WorkManagementSolution.Employee;

namespace WorkManagmentSolution.EFCore
{
    public class WorkManagementDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public WorkManagementDbContext(DbContextOptions<WorkManagementDbContext> options) : base(options) { }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmployeePersonalDetails> EmployeePersonalDetails { get; set; }

        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Company> Companies { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           /* modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employees");
            });

            modelBuilder.Entity<EmployeePersonalDetailsModel>(entity =>
            {
                entity.ToTable("EmployeePersonalDetails");
            });*/
        }

    }
}
