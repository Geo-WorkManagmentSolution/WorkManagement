using FluentEmail.Core;
using FluentEmail.Razor;
using FluentEmail.Smtp;
using Microsoft.Extensions.Options;
using Serilog;
using System.Net;
using System.Net.Mail;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Models.Email;

namespace WorkManagement.Service
{
    public class EmailService : IEmailService
    {
        private readonly IOptions<SMTPSettings> _smtpsettings;
        public EmailService(IOptions<SMTPSettings> smtpsettings)
        {
            _smtpsettings = smtpsettings;
        }

        public async Task SendWelcomeMail(EmailModel<WelcomeModel> emailModel)
        {
            try
            {
                var sender = new SmtpSender(() => new SmtpClient("smtp.gmail.com")
                {
                    UseDefaultCredentials = false,
                    Port = _smtpsettings.Value.Port,
                    Credentials = new NetworkCredential(_smtpsettings.Value.Sender, _smtpsettings.Value.Password),
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network
                });


                /*var email = await Email
                            .From("your_email@gmail.com")
                            .To("new_employee@example.com")
                            .Subject("Welcome to Our Company!")
                            .UsingTemplateFromFile("Welcome_EmailTemplate.cshtml", emailModel.repModel)
                            .SendAsync();*/

                Email.DefaultSender = sender;
                Email.DefaultRenderer = new RazorRenderer();

                var email = await Email
                            .From(emailModel.From)
                            .To(emailModel.To)
                            .Subject(emailModel.Subject)
                            .UsingTemplateFromFile(@"EmailTemplate\Welcome_EmailTemplate.cshtml", emailModel.repModel)
                            .SendAsync();
                Log.Information("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Log.Information(ex.Message);
            }

        }


    }
}
