using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;

namespace WorkManagement.Domain.Models.Employee
{
    public class EmployeeLeaveModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }

        public int EmployeeNumber { get; set; }
        public LeaveStatus Status { get; set; }
        public string? Description { get; set; }
        public string? Reason { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double LeaveDays { get; set; }
        public int EmployeeLeaveTypeId { get; set; }
        public string? LeaveType { get; set; }
        public string? EmployeeName { get; set; }
    }

    public class EmployeeLeaveSummaryModel
    {
        public int Id { get; set; }
        public string EmployeeLeaveType { get; set; }
        public int TotalLeaves { get; set; }
        public double RemainingLeaves { get; set; }
    }
}
