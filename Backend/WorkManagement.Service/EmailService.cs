using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FluentEmail.Core;
using System.Net.Http;
using Serilog;

namespace WorkManagement.Service
{
    public class EmailService
    {
        public EmailService()
        {
        }

        public async Task SendWelcomeMail(EmailModel<WelcomeModel> emailModel)
        {
            var email = await Email
                        .From("your_email@gmail.com")
                        .To("new_employee@example.com")
                        .Subject("Welcome to Our Company!")
                        .UsingTemplateFromFile("Welcome_EmailTemplate.cshtml", emailModel.repModel)
                        .SendAsync();
            Log.Information("Email sent successfully.");
        }

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
        }
    }
}
