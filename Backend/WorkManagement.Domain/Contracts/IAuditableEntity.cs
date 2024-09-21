using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Contracts
{
    public interface IAuditableEntity
    {
        public int CreatedBy { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTimeOffset? LastModifiedOn { get; set; }
    }
}
