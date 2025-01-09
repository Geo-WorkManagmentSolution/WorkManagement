using FluentEmail.Core;
using FluentEmail.Razor;
using FluentEmail.Smtp;
using Microsoft.Extensions.Options;
using Serilog;
using System.Net;
using System.Net.Mail;
using System.Runtime.InteropServices;
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
                Log.Information("Trying to send mail.");

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
                string EmailTemplatepath = "";
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    EmailTemplatepath = "EmailTemplate/Welcome_EmailTemplate.cshtml";
                }
                else
                {
                    EmailTemplatepath = "EmailTemplate\\Welcome_EmailTemplate.cshtml";
                }
                var email = await Email
                            .From(emailModel.From)
                            .To(emailModel.To)
                            .Subject(emailModel.Subject)
                            .UsingTemplateFromFile(EmailTemplatepath, emailModel.repModel)
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

          
                if (emailModel.repModel.LeaveEmailType == "Approval")
                {
                    string EmailTemplatepath = "";
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        EmailTemplatepath = "EmailTemplate/LeaveApproval_EmailTemplate.cshtml";
                    }
                    else
                    {
                        EmailTemplatepath = "EmailTemplate\\LeaveApproval_EmailTemplate.cshtml";
                    }

                    var email = await Email
                            .From(emailModel.From)
                            .To(emailModel.To)
                            .Subject(emailModel.Subject)
                            .UsingTemplateFromFile(EmailTemplatepath, emailModel.repModel)
                            .SendAsync();
                    Log.Information("Leave approval email sent successfully.");
                }

                if(emailModel.repModel.LeaveEmailType == "Pending Request")
                {
                    string EmailTemplatepath = "";
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        EmailTemplatepath = "EmailTemplate/LeavePendingRequest_EmailTemplate.cshtml";
                    }
                    else
                    {
                        EmailTemplatepath = "EmailTemplate\\LeavePendingRequest_EmailTemplate.cshtml";
                    }

                    var email = await Email
                            .From(emailModel.From)
                            .To(emailModel.To)
                            .Subject(emailModel.Subject)
                            .UsingTemplateFromFile(EmailTemplatepath, emailModel.repModel)
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
                string EmailTemplatepath = "";
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    EmailTemplatepath = "EmailTemplate/ManagerSalaryUpdate_EmailTemplate.cshtml";
                }
                else
                {
                    EmailTemplatepath = "EmailTemplate\\ManagerSalaryUpdate_EmailTemplate.cshtml";
                }

                var email = await Email
                           .From(emailModel.From)
                           .To(emailModel.To)
                           .Subject(emailModel.Subject)
                           .UsingTemplateFromFile(EmailTemplatepath, emailModel.repModel)
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
                    string EmailTemplatepath = "";
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        EmailTemplatepath = "EmailTemplate/EmployeeSalaryApprove_EmailTemplate.cshtml";
                    }
                    else
                    {
                        EmailTemplatepath = "EmailTemplate\\EmployeeSalaryApprove_EmailTemplate.cshtml";
                    }
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
                    string EmailTemplatepath = "";
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        EmailTemplatepath = "EmailTemplate/EmployeeSalaryReject_EmailTemplate.cshtml";
                    }
                    else
                    {
                        EmailTemplatepath = "EmailTemplate\\EmployeeSalaryReject_EmailTemplate.cshtml";
                    }
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
                    string EmailTemplatepath = "";
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        EmailTemplatepath = "EmailTemplate/EmployeeSalaryUpdate_EmailTemplate.cshtml";
                    }
                    else
                    {
                        EmailTemplatepath = "EmailTemplate\\EmployeeSalaryUpdate_EmailTemplate.cshtml";
                    }

                    var email = await Email
                          .From(emailModel.From)
                          .To(emailModel.To)
                          .Subject(emailModel.Subject)
                          .UsingTemplateFromFile(EmailTemplatepath, emailModel.repModel)
                          .SendAsync();
                    Log.Information("Salary update email to employee sent successfully.");
                }

               


            }
            catch (Exception ex)
            {
                Log.Information(ex.Message);
            }

        }

       public async Task SendLeaveUpdateEmail(EmailModel<EmployeeLeaveRequestEmailModel> emailModel)
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
                string EmailTemplatepath = "";
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    EmailTemplatepath = "EmailTemplate/ManagerLeaveUpdate_EmailTemplate.cshtml";
                }
                else
                {
                    EmailTemplatepath = "EmailTemplate\\ManagerLeaveUpdate_EmailTemplate.cshtml";
                }

                var email = await Email
                           .From(emailModel.From)
                           .To(emailModel.To)
                           .Subject(emailModel.Subject)
                           .UsingTemplateFromFile(EmailTemplatepath, emailModel.repModel)
                           .SendAsync();
                Log.Information("Leave update email sent successfully.");


            }
            catch (Exception ex)
            {
                Log.Information(ex.Message);
            }

        }

       public async Task SendemployeeLeaveUpdateEmail(EmailModel<EmployeeLeaveUpdateEmailModel> emailModel)
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

                if (emailModel.repModel.ApprovalStatus == "Approve")
                {
                    string EmailTemplatepath = "";
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        EmailTemplatepath = "EmailTemplate/EmployeeLeaveUpdateApprove_EmailTemplate.cshtml";
                    }
                    else
                    {
                        EmailTemplatepath = "EmailTemplate\\EmployeeLeaveUpdateApprove_EmailTemplate.cshtml";
                    }
                    var email = await Email
                          .From(emailModel.From)
                          .To(emailModel.To)
                          .Subject(emailModel.Subject)
                          .UsingTemplateFromFile(@"EmailTemplate\EmployeeLeaveUpdateApprove_EmailTemplate   .cshtml", emailModel.repModel)
                          .SendAsync();
                    Log.Information("Leave approval email to employee sent successfully.");
                }

                if (emailModel.repModel.ApprovalStatus == "Reject")
                {
                    string EmailTemplatepath = "";
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        EmailTemplatepath = "EmailTemplate/EmployeeLeveUpdateReject_EmailTemplate.cshtml";
                    }
                    else
                    {
                        EmailTemplatepath = "EmailTemplate\\EmployeeLeveUpdateReject_EmailTemplate.cshtml";
                    }
                    var email = await Email
                          .From(emailModel.From)
                          .To(emailModel.To)
                          .Subject(emailModel.Subject)
                          .UsingTemplateFromFile(@"EmailTemplate\EmployeeLeveUpdateReject_EmailTemplate.cshtml", emailModel.repModel)
                          .SendAsync();
                    Log.Information("Leave approval email to employee sent successfully.");
                }

                if (emailModel.repModel.ApprovalStatus == "Pending")
                {
                    string EmailTemplatepath = "";
                    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                    {
                        EmailTemplatepath = "EmailTemplate/EmployeeLeaveUpdate_EmailTemplate.cshtml";
                    }
                    else
                    {
                        EmailTemplatepath = "EmailTemplate\\EmployeeLeaveUpdate_EmailTemplate.cshtml";
                    }

                    var email = await Email
                          .From(emailModel.From)
                          .To(emailModel.To)
                          .Subject(emailModel.Subject)
                          .UsingTemplateFromFile(EmailTemplatepath, emailModel.repModel)
                          .SendAsync();
                    Log.Information("leave update email to employee sent successfully.");
                }




            }
            catch (Exception ex)
            {
                Log.Information(ex.Message);
            }
        }
    }
}
