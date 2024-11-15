using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity.EmployeeLeaveTables
{
    public class EmployeeLeaveType : BaseEntity
    {
        public string Name { get; set; }
        public bool IsPaid { get; set; }
    }
}
