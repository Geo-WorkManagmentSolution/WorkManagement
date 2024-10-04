using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity
{
    public class ProjectDetail: FullyAuditableEntity
    {
        public string WorkOrderNumber { get; set; }
        public decimal WorkOrderAmount { get; set; }
        public decimal PeriodOfWrokInMonths { get; set; }
        public string WorkDescription { get; set; }
        public decimal EstimateManPower { get; set; }
        public decimal EstimateDays { get; set; }
        public decimal Qty { get; set; }
        public decimal Rate { get; set; }
        public decimal CGST { get; set; }
        public decimal SGST { get; set; }
        public decimal IGST { get; set; }
        public decimal TotalCost { get; set; }
    }
}
