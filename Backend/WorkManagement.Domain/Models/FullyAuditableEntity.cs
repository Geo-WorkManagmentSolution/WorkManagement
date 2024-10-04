using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Contracts;

namespace WorkManagement.Domain.Models
{
    public class FullyAuditableEntity : IAuditableEntity,ISoftDeleteEntity
    {
        [Key]
        public int Id { get; set; }
        public Guid CreatedBy {get;set;}

        public DateTimeOffset CreatedOn {get;set;}
        public Guid? LastModifiedBy {get;set;}

        public DateTimeOffset LastModifiedOn {get;set;}
        public bool IsDeleted { get; set; }
    }
}
