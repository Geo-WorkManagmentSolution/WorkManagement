using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity
{
    public class EmployeeCategory: WorkManagement.Domain.Models.BaseEntity
    {
        public string Name { get; set; }
    }
}
