using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Entity
{
    public class EmployeeSalary: BaseEntity
    {
        public int? EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }
        public SalaryType? SalaryType { get; set; }
        public SalaryStatus? SalaryStatus { get; set; }
        public bool? IsApprovedByDepartmentHead { get; set; }
        public bool? IsApprovedByHRHead { get; set; }
        public decimal CurrentSalary { get; set; }
        public decimal ExpectedToBeSalary { get; set; }
        public decimal Basic { get; set; }
        public decimal HRAllowances { get; set; }
        public decimal Bonus { get; set; }
        public decimal Gratuity { get; set; }
        public decimal PF { get; set; }
        public decimal ESI { get; set; }
        public decimal PT { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDateTime { get; set; }

    }


    public enum SalaryStatus
    {
        Approved,
        Pending,
        Rejected
    }
}
