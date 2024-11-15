using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Entity.EmployeeLeaveTables
{
    public class EmployeeLeaveSummary : BaseEntity
    {
        public int EmployeeId { get; set; }

        [ForeignKey(nameof(EmployeeId))]
        public Employee? Employee { get; set; }
        public double RemainingLeaves { get; set; }

        [ForeignKey(nameof(EmployeeLeaveType))]
        public int? EmployeeLeaveTypeId { get; set; }
        public EmployeeLeaveType EmployeeLeaveTypes { get; set; }
        public int TotalLeaves { get; set; }
    }
}
