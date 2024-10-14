using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public string ProjectNumber { get; set; }
        public string ProjectDescription { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
