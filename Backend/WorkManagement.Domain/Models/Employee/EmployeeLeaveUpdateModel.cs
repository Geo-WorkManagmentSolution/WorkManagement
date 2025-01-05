using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models.Employee
{
   public class EmployeeLeaveUpdateModel
    {
        public int EmployeeId { get; set; }
        public int? JobLevelLeaveType { get; set; }
        public bool useDefultLeaves { get; set; }
        public List<EmployeeLeaveSummaryModel> EmployeeLeaves{ get; set; }
    }
}
