using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Entity.EmployeeLeaveTables
{
    public class EmployeeLeave : BaseEntity
    {
        public int EmployeeId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(EmployeeId))]
        public Employee? employee { get; set; }

        public LeaveStatus Status { get; set; }
        public string? Description { get; set; }
        public string? Reason { get; set; }

        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        public double LeaveDays { get; set; }

        [ForeignKey(nameof(EmployeeLeaveType))]
        public int EmployeeLeaveTypeId { get; set; }

        [JsonIgnore]
        public EmployeeLeaveType? EmployeeLeaveTypes { get; set; }

    }

    public enum LeaveStatus
    {
        Approved,
        Pending,
        Rejected
    }
}
