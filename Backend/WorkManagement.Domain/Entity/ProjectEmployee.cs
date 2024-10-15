using System.ComponentModel.DataAnnotations.Schema;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Entity
{
    public class ProjectEmployee : FullyAuditableEntity
    {
        [ForeignKey(nameof(Employee))]
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }

        [ForeignKey(nameof(Project))]
        public int ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}
