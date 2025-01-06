using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;
using WorkManagement.Domain.Models.Employee;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Entity.EmployeeLeaveTables
{
    public class EmployeeLeaveUpdatesTable:BaseEntity
    {
       
            public int? EmployeeId { get; set; }
             [ForeignKey("EmployeeId")]
            public Employee? Employee { get; set; }
            public string? ManagerName { get; set; }
        public int? EmployeeNumber { get; set; }
        public LeaveStatus? Status { get; set; }
            public bool IsApprovedByDepartmentHead { get; set; }
            public bool IsApprovedByHRHead { get; set; }
            public int? JobLevelLeaveType { get; set; }
            
            public bool? useDefultLeaves { get; set; }
                public List<int>? EmployeeLeaveSummaryId { get; set; }
            public int? EmployeeLeaveUpdateTableId { get; set; }

            [ForeignKey("EmployeeLeaveUpdateTableId")]
            public List<EmployeeLeavesDeatils>? UpdatedNewLeaves { get; set; }

            public int? UpdatedBy { get; set; }
            public DateTime? UpdatedDateTime { get; set; }

        }
        public class EmployeeLeavesDeatils : BaseEntity {
        [ForeignKey(nameof(EmployeeId))]
        public int EmployeeId { get; set; }

        public Employee? Employee { get; set; }
        public double RemainingLeaves { get; set; }

        [ForeignKey(nameof(EmployeeLeaveType))]
        public int? EmployeeLeaveTypeId { get; set; }
        public EmployeeLeaveType EmployeeLeaveTypes { get; set; }
        public int TotalLeaves { get; set; }
    }

    
}
