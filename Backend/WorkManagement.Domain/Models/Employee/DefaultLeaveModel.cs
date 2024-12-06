using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models.Employee
{
    public class DefaultLeaveModel
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int JobLevelLeaveTypeId { get; set; }
        public int TotalLeaves { get; set; }
    }
}
