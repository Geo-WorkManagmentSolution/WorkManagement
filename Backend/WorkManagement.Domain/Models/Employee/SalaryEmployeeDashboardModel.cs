using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models.Employee
{
    public class SalaryEmployeeDashboardModel
    {

        public int Id { get; set; }
        public int EmployeeNumber { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
    }
}
