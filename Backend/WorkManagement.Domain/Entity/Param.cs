using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity
{
    public class Param : FullyAuditableEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ParamType { get; set; }
        public string ParamValue { get; set; }
    }
}
