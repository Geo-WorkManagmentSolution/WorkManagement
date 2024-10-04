using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity
{
    public class Tender : FullyAuditableEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
