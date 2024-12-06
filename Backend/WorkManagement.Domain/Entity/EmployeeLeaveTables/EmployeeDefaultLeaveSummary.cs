using System.ComponentModel.DataAnnotations.Schema;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity.EmployeeLeaveTables
{
    public class EmployeeDefaultLeaveSummary : BaseEntity
    {
        [ForeignKey(nameof(EmployeeLeaveType))]
        public int? EmployeeLeaveTypeId { get; set; }

        [ForeignKey(nameof(JobLevelLeave))]
        public int? JobLevelLeaveId { get; set; }  
       
        public EmployeeLeaveType EmployeeLeaveTypes { get; set; }
        public JobLevelLeave JobLevelLeaves { get; set; }
        public int TotalLeaves { get; set; }
    }
}
