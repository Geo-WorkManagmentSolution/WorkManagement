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
        //public async Task SendLeaveApprovalEmail(EmailModel<LeaveApprovalModel> emailModel)
        //{
        //    try
        //    {
        //        var sender = new SmtpSender(() => new SmtpClient("smtp.gmail.com")
        //        {
        //            UseDefaultCredentials = false,
        //            Port = _smtpsettings.Value.Port,
        //            Credentials = new NetworkCredential(_smtpsettings.Value.Sender, _smtpsettings.Value.Password),
        //            EnableSsl = true,
        //            DeliveryMethod = SmtpDeliveryMethod.Network
        //        });

        //        Email.DefaultSender = sender;
        //        Email.DefaultRenderer = new RazorRenderer();

        //        var email = await Email
        //                    .From(emailModel.From)
        //                    .To(emailModel.To)
        //                    .Subject(emailModel.Subject)
        //                    .UsingTemplateFromFile(@"EmailTemplate\LeaveApproval_EmailTemplate.cshtml", emailModel.repModel)
        //                    .SendAsync();
        //        Log.Information("Leave approval email sent successfully.");
        //    }
        //    catch (Exception ex)
        //    {
        //        Log.Error(ex, "Error sending leave approval email");
        //    }
        //}

        //public async Task SendLeaveRejectionEmail(EmailModel<LeaveRejectionModel> emailModel)
        //{
        //    try
        //    {
        //        var sender = new SmtpSender(() => new SmtpClient("smtp.gmail.com")
        //        {
        //            UseDefaultCredentials = false,
        //            Port = _smtpsettings.Value.Port,
        //            Credentials = new NetworkCredential(_smtpsettings.Value.Sender, _smtpsettings.Value.Password),
        //            EnableSsl = true,
        //            DeliveryMethod = SmtpDeliveryMethod.Network
        //        });

        //        Email.DefaultSender = sender;
        //        Email.DefaultRenderer = new RazorRenderer();

        //        var email = await Email
        //                    .From(emailModel.From)
        //                    .To(emailModel.To)
        //                    .Subject(emailModel.Subject)
        //                    .UsingTemplateFromFile(@"EmailTemplate\LeaveRejection_EmailTemplate.cshtml", emailModel.repModel)
        //                    .SendAsync();
        //        Log.Information("Leave rejection email sent successfully.");
        //    }
        //    catch (Exception ex)
        //    {
        //        Log.Error(ex, "Error sending leave rejection email");
        //    }
        //}

        public async Task SendLeaveEmail(EmailModel<LeaveEmailModel> emailModel)
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

                Email.DefaultSender = sender;
                Email.DefaultRenderer = new RazorRenderer();

                if(emailModel.repModel.LeaveEmailType == "Approval")
                {
                    var email = await Email
                            .From(emailModel.From)
                            .To(emailModel.To)
                            .Subject(emailModel.Subject)
                            .UsingTemplateFromFile(@"EmailTemplate\LeaveApproval_EmailTemplate.cshtml", emailModel.repModel)
                            .SendAsync();
                    Log.Information("Leave approval email sent successfully.");
                }

                if(emailModel.repModel.LeaveEmailType == "Pending Request")
                {
                    var email = await Email
                            .From(emailModel.From)
                            .To(emailModel.To)
                            .Subject(emailModel.Subject)
                            .UsingTemplateFromFile(@"EmailTemplate\LeavePendingRequest_EmailTemplate.cshtml", emailModel.repModel)
                            .SendAsync();
                    Log.Information("Leave approval email sent successfully.");
                }


            }
            catch (Exception ex)
            {
                Log.Information(ex.Message);
            }

        }

        public async Task SendSalaryUpdateEmail(EmailModel<SalaryEmailModel> emailModel)
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

                Email.DefaultSender = sender;
                Email.DefaultRenderer = new RazorRenderer();

                var email = await Email
                           .From(emailModel.From)
                           .To(emailModel.To)
                           .Subject(emailModel.Subject)
                           .UsingTemplateFromFile(@"EmailTemplate\ManagerSalaryUpdate_EmailTemplate.cshtml", emailModel.repModel)
                           .SendAsync();
                Log.Information("Salary update email sent successfully.");


            }
            catch (Exception ex)
            {
                Log.Information(ex.Message);
            }

        }

        public async Task SendEmployeeSalaryUpdateEmail(EmailModel<EmployeeSalaryUpdateEmailModel> emailModel)
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

                Email.DefaultSender = sender;
                Email.DefaultRenderer = new RazorRenderer();

                if(emailModel.repModel.ApprovalStatus == "Approve")
                {
                    var email = await Email
                          .From(emailModel.From)
                          .To(emailModel.To)
                          .Subject(emailModel.Subject)
                          .UsingTemplateFromFile(@"EmailTemplate\EmployeeSalaryApprove_EmailTemplate.cshtml", emailModel.repModel)
                          .SendAsync();
                    Log.Information("Salary approval email to employee sent successfully.");
                }

                if (emailModel.repModel.ApprovalStatus == "Reject")
                {
                    var email = await Email
                          .From(emailModel.From)
                          .To(emailModel.To)
                          .Subject(emailModel.Subject)
                          .UsingTemplateFromFile(@"EmailTemplate\EmployeeSalaryReject_EmailTemplate.cshtml", emailModel.repModel)
                          .SendAsync();
                    Log.Information("Salary approval email to employee sent successfully.");
                }

                if (emailModel.repModel.ApprovalStatus == "Pending")
                {
                    var email = await Email
                          .From(emailModel.From)
                          .To(emailModel.To)
                          .Subject(emailModel.Subject)
                          .UsingTemplateFromFile(@"EmailTemplate\EmployeeSalaryUpdate_EmailTemplate.cshtml", emailModel.repModel)
                          .SendAsync();
                    Log.Information("Salary update email to employee sent successfully.");
                }

               


            }
            catch (Exception ex)
            {
                Log.Information(ex.Message);
            }

        }


    }
}
