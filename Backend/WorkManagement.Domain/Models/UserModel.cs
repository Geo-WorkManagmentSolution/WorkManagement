using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models
{
    public class UserModel
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public List<string> Shortcuts { get; set; } = new List<string>() { "apps.calendar", "apps.mailbox", "apps.contacts" };

    }
}
