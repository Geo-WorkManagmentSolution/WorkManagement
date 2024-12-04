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

    public class LeaveEmailModel
    {
        public string LeaveEmailType { get; set; }
        public string EmployeeName { get; set; }
        public string ApprovalStatus { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalDays { get; set; }
        public string Reason { get; set; }
        public string ManagerName { get; set; }
        public string RequestType { get; set; }
    }
}
