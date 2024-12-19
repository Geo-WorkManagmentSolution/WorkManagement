using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Entity
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ApplicationUser() : base() { }

        public List<string>? Shortcuts { get; set; }
    }
}
