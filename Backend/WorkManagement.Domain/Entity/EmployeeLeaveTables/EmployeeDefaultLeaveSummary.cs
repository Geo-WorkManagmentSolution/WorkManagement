using System.ComponentModel.DataAnnotations.Schema;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity.EmployeeLeaveTables
{
    public class EmployeeDefaultLeaveSummary : BaseEntity
    {
        [ForeignKey(nameof(EmployeeLeaveType))]
        public int? EmployeeLeaveTypeId { get; set; }
        // 1: Junior Level
        // 2: Mid Level
        // 3 : Senior Level
        public int? JobLevelLeaveType { get; set; }
        public EmployeeLeaveType EmployeeLeaveTypes { get; set; }
        public int TotalLeaves { get; set; }
    }
}
