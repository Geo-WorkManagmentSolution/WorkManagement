using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models.Employee
{
    public class EmployeeDashboardDataModel : BaseModel
    {
        public int? EmployeeNumber { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string MotherName { get; set; }
        public string Email { get; set; }
        public long? PhoneNumber { get; set; }
        public string Gender { get; set; }
        public string? DepartmentName { get; set; }
        public string? DesignationName { get; set; }
        public string? CategoryName { get; set; }
        public string? Site { get; set; }
        public string HireDate { get; set; }
    }
}
