using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models.Email
{
    public class EmailModel<T>
    {
        public string From { get; set; }
        public string To { get; set; }
        public string Subject { get; set; }
        public T repModel { get; set; }
    }

    public class WelcomeModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
