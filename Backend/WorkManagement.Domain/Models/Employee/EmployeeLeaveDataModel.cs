using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Models.Employee
{
    public class EmployeeLeaveDataModel
    {
        public int LeaveId { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string ManagerName { get; set; }
        public int? JobLevelLeaveType { get; set; }
        public LeaveStatus? LeaveStatus { get; set; }
        public bool IsApprovedByDepartmentHead { get; set; }
        public bool IsApprovedByHRHead { get; set; }
        public List<EmployeeLeaveSummaryModel>? CurrentLeaves { get; set; }
        public List<EmployeeLeaveSummaryModel> UpdatedNewLeaves { get; set; }
        public int? UpdatedBy { get; set; }
        public string UpdatedByUserName { get; set; }
        public string UpdatedDateTime { get; set; }
    }
}
