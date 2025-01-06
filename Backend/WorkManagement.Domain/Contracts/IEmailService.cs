using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models.Email;
using WorkManagement.Domain.Models.Employee;

namespace WorkManagement.Domain.Contracts
{
    public interface IEmailService
    {
        public Task SendWelcomeMail(EmailModel<WelcomeModel> emailModel);
        public Task SendLeaveEmail(EmailModel<LeaveEmailModel> emailModel);
        public Task SendSalaryUpdateEmail(EmailModel<SalaryEmailModel> emailModel);
        public Task SendEmployeeSalaryUpdateEmail(EmailModel<EmployeeSalaryUpdateEmailModel> emailModel);
        public Task SendLeaveUpdateEmail(EmailModel<EmployeeLeaveRequestEmailModel> emailModel);
        public Task SendemployeeLeaveUpdateEmail(EmailModel<EmployeeLeaveUpdateEmailModel> emailModel);

    }
}
