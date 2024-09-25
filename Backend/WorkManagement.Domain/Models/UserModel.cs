using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models
{
    public class UserModel
    {
        public string Uid { get; set; }
        public string Role { get; set; }
        public Data Data { get; set; } = new Data();
    }

    public class Data
    {
        public string DisplayName { get; set; } 
        public string PhotoURL { get; set; }
        public string Email { get; set; }
        public UserSettings Settings { get; set; } 
        public List<string> Shortcuts { get; set; } = new List<string>() { "apps.calendar", "apps.mailbox", "apps.contacts" };
    }

    public class UserSettings
    {
        public Dictionary<string, object> Layout { get; set; }
        public Dictionary<string, object> Theme { get; set; }
    }

}
