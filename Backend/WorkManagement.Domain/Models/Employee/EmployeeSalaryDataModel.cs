using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Models.Employee
{
    public class EmployeeSalaryDataModel
    {
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string ManagerName { get; set; }
        public SalaryType? SalaryType { get; set; }
        public SalaryStatus? SalaryStatus { get; set; }
        public bool IsApprovedByDepartmentHead { get; set; }
        public bool IsApprovedByHRHead { get; set; }
        public decimal CurrentSalary { get; set; }
        public decimal ExpectedToBeSalary { get; set; }
        public int? UpdatedBy { get; set; }
        public string UpdatedByUserName { get; set; }
        public string UpdatedDateTime { get; set; }
    }
}
