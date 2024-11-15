using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Models.Employee
{
    public class EmployeeLeaveHistoryDataModel
    {
        public int EmployeeId { get; set; }
        public bool GetLeaveData { get; set; }
        public bool GetHolidayData { get; set; }
        public bool GetFutureLeaveData { get; set; }
    }

    public class EmployeeLeaveHistoryDTO
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }

        public int EmployeeLeaveId { get; set; }
        public int LeaveTypeId { get; set; }
        public string? Description { get; set; }
        public string? Reason { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public LeaveStatus status { get; set; } 
    }
}
