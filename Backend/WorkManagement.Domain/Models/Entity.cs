using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Contracts;

namespace WorkManagement.Domain.Models
{
    public class Entity : ISoftDeleteEntity
    {
        [Key]
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
