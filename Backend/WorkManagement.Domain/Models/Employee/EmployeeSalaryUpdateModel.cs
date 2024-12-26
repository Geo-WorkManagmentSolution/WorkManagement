using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Models.Employee
{
    public class EmployeeSalaryUpdateModel
    {
        public int EmployeeId { get; set; }
        public decimal CurrentSalary { get; set; }
        public decimal ExpectedToBeSalary { get; set; }
        public decimal Basic { get; set; }
        public decimal HRAllowances { get; set; }
        public decimal Bonus { get; set; }
        public decimal Gratuity { get; set; }
        public decimal PF { get; set; }
        public decimal ESI { get; set; }
        public decimal PT { get; set; }
        public SalaryType SalaryType { get; set; }
    }
}
