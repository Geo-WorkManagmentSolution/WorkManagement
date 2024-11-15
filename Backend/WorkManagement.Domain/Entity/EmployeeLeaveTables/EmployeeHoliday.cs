using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity.EmployeeLeaveTables
{
    public class EmployeeHoliday : BaseEntity
    {
        public string Name { get; set; }
        public bool IsFloater { get; set; }

        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
    }
}
