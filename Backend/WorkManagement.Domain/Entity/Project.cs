using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Entity
{
    public class Project : FullyAuditableEntity
    {
        [Required]
        public string ProjectName { get; set; }
        public int CompanyId { get; set; }
        public string ProjectIncharge { get; set; }
        public string WorkOrderNumber { get; set; }
        public decimal WorkOrderAmount { get; set; }
        public decimal WorkDescription { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual Company Company { get; set; }
    }
}
