using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models
{
    public class Criterion
    {
        public string Field { get; set; }
        public string Operator { get; set; }
        public object Value { get; set; }
        public string NextOperator { get; set; }
    }
}
