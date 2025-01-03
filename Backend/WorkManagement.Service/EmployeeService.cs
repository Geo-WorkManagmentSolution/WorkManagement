﻿using AutoMapper;
using FluentEmail.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using Microsoft.EntityFrameworkCore;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models.Dropdown;
using WorkManagement.Domain.Models.Email;
using WorkManagement.Domain.Models.Employee;
using WorkManagement.Domain.Models.Project;
using WorkManagement.Domain.Utility;
using WorkManagementSolution.Employee;
using WorkManagmentSolution.EFCore;

namespace WorkManagement.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly WorkManagementDbContext _dbContext;
        private readonly IMapper mapper;
        private readonly IAuthService authService;
        private readonly IEmailService _emailService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<ApplicationRole> roleManager;


        public EmployeeService(WorkManagementDbContext dbContext, IMapper mapper, IAuthService authService, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, IEmailService emailService)
        {
            _dbContext = dbContext;
            this.mapper = mapper;
            this.authService = authService;
            this.userManager = userManager;
            this.roleManager = roleManager;
            _emailService = emailService;
        }

        public async Task<List<EmployeeDashboardDataModel>> GetAllEmployeesAsync(string loggedUserId, string userRole)
        {
            try
            {
                var targetEmployeeId = CheckValidEmployeeId(loggedUserId);
                if (targetEmployeeId == -1 && userRole != "HR Admin")
                {
                    throw new Exception("Invalid User data");
                }

                var employeeData = new List<EmployeeDashboardDataModel>();

                //var Employee = await _dbContext.Employees.ToListAsync();
                //return mapper.Map<List<EmployeeModel>>(Employee);

                if (userRole != "HR Admin")
                {
                    employeeData = (from e in _dbContext.Employees.Where(s => !s.IsDeleted && (s.EmployeeReportToId == targetEmployeeId || s.Id == targetEmployeeId))
                                    select new EmployeeDashboardDataModel
                                    {
                                        Id = e.Id,
                                        EmployeeNumber = e.EmployeeNumber,
                                        FirstName = e.FirstName,
                                        MiddleName = e.MiddleName,
                                        LastName = e.LastName,
                                        Email = e.Email,
                                        PhoneNumber = e.PhoneNumber,
                                        Gender = e.EmployeePersonalDetails == null ? "" : e.EmployeePersonalDetails.Gender.ToUpper(),
                                        DepartmentName = e.EmployeeDepartment == null ? "" : e.EmployeeDepartment.Name,
                                        DesignationName = e.EmployeeDesignation == null ? "" : e.EmployeeDesignation.Name,
                                        CategoryName = e.EmployeeCategory == null ? "" : e.EmployeeCategory.Name,
                                        Site = e.EmployeeWorkInformation == null ? "" : (e.EmployeeWorkInformation.Site == null ? "" : e.EmployeeWorkInformation.Site.Name),
                                        HireDate = e.EmployeeWorkInformation == null ? "" : (e.EmployeeWorkInformation.HireDate.HasValue ? e.EmployeeWorkInformation.HireDate.Value.ToString("yyyy-MM-dd") : ""),
                                    }).ToList();
                }
                else
                {
                    employeeData = (from e in _dbContext.Employees.Where(s => !s.IsDeleted)
                                    select new EmployeeDashboardDataModel
                                    {
                                        Id = e.Id,
                                        EmployeeNumber = e.EmployeeNumber,
                                        FirstName = e.FirstName,
                                        MiddleName = e.MiddleName,
                                        LastName = e.LastName,
                                        Email = e.Email,
                                        PhoneNumber = e.PhoneNumber,
                                        Gender = e.EmployeePersonalDetails == null ? "" : e.EmployeePersonalDetails.Gender.ToUpper(),
                                        DepartmentName = e.EmployeeDepartment == null ? "" : e.EmployeeDepartment.Name,
                                        DesignationName = e.EmployeeDesignation == null ? "" : e.EmployeeDesignation.Name,
                                        CategoryName = e.EmployeeCategory == null ? "" : e.EmployeeCategory.Name,
                                        Site = e.EmployeeWorkInformation == null ? "" : (e.EmployeeWorkInformation.Site == null ? "" : e.EmployeeWorkInformation.Site.Name),
                                        HireDate = e.EmployeeWorkInformation == null ? "" : (e.EmployeeWorkInformation.HireDate.HasValue ? e.EmployeeWorkInformation.HireDate.Value.ToString("yyyy-MM-dd") : ""),
                                    }).ToList();
                }




                if (employeeData != null)
                {
                    return employeeData;
                }
                else
                {
                    return new List<EmployeeDashboardDataModel>();
                }
            }
            catch (Exception ex)
            {
                return new List<EmployeeDashboardDataModel>();
            }

        }

        public async Task<List<EmployeeCategory>> GetEmployeeCategories()
        {
            return await _dbContext.EmployeeCategories.ToListAsync();
        }

        public async Task<List<EmployeeDepartment>> GetEmployeeDepartments()
        {
            return await _dbContext.EmployeeDepartments.ToListAsync();
        }

        public async Task<EmployeeDepartment> AddNewDepartment(EmployeeDepartment employeeDepartment)
        {
            _dbContext.Entry(employeeDepartment).State = EntityState.Added;
            await _dbContext.SaveChangesAsync();
            return employeeDepartment;
        }

        public async Task<List<EmployeeDesignation>> GetEmployeeDesignations()
        {
            return await _dbContext.EmployeeDesignations.ToListAsync();
        }
        public async Task<List<Site>> GetSites()
        {
            return await _dbContext.Sites.ToListAsync();
        }

        //public async Task<List<EmployeeTeamMemberList>> GetTeamMembersList(int? employeeId)
        //{
        //    if (employeeId == null)
        //    {
        //        return new List<EmployeeTeamMemberList>();
        //    }
        //    else
        //    {

        //        var data = (from e in _dbContext.Employees.Where(e => !e.IsDeleted && e.EmployeeReportToId == employeeId)
        //                    .Include(x=>x.EmployeeDesignation)
        //                    select new EmployeeTeamMemberList
        //                    {
        //                        Name = e.FirstName + " " + e.LastName,
        //                        Email = e.Email,
        //                        Avatar = "",
        //                        Designation = e.EmployeeDesignation != null ? e.EmployeeDesignation.Name : "",
        //                        EmployeeId =e.Id
        //                    }).ToList();

        //        return data;
        //    }
        //}

        public async Task<List<EmployeeTeamMemberList>> GetTeamMembersList(string loggedUserId, int? employeeId)
        {
            try
            {
                int targetEmployeeId;

                if (employeeId.HasValue)
                {
                    targetEmployeeId = employeeId.Value;
                }
                else
                {
                    targetEmployeeId = CheckValidEmployeeId(loggedUserId);
                    if (targetEmployeeId == -1)
                    {
                        return new List<EmployeeTeamMemberList>();
                    }
                }

                var data = await (from e in _dbContext.Employees
                                  where !e.IsDeleted && e.EmployeeReportToId == targetEmployeeId
                                  select new EmployeeTeamMemberList
                                  {
                                      Name = e.FirstName + " " + e.LastName,
                                      Email = e.Email,
                                      Avatar = "",
                                      Designation = e.EmployeeDesignation != null ? e.EmployeeDesignation.Name : "",
                                      EmployeeId = e.Id,
                                      EmployeeNumber = e.EmployeeNumber
                                  }).ToListAsync();

                return data.Any() ? data : new List<EmployeeTeamMemberList>();

            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine(ex.ToString());
                throw new Exception("An error occurred while fetching the team members list.", ex);
            }
        }

        //public async Task<List<EmployeeReportToModel>> GetReportToEmployeeList(int? departmentId, int? employeeId)
        //{
        //    if (departmentId == null || employeeId == null)
        //    {
        //        return new List<EmployeeReportToModel>();
        //    }
        //    else
        //    {
        //        var existingEmployee = _dbContext.Employees.FirstOrDefault(s => s.Id == employeeId.Value);
        //        if (existingEmployee != null)
        //        {
        //            if (departmentId == null || departmentId == 0)
        //            {
        //                var data = (from e in _dbContext.Employees.Where(e => !e.IsDeleted && e.EmployeeDepartmentId == existingEmployee.EmployeeDepartmentId && e.Id != employeeId)
        //                            select new EmployeeReportToModel
        //                            {
        //                                Name = e.FirstName + " " + e.LastName,
        //                                Id = e.Id,
        //                            }).ToList();

        //                return data;
        //            }
        //            else
        //            {
        //                var data = (from e in _dbContext.Employees.Where(e => !e.IsDeleted && e.EmployeeDepartmentId == departmentId && e.Id != employeeId)
        //                            select new EmployeeReportToModel
        //                            {
        //                                Name = e.FirstName + " " + e.LastName,
        //                                Id = e.Id,
        //                            }).ToList();

        //                return data;
        //            }
        //        }
        //        else
        //        {
        //            return new List<EmployeeReportToModel>();
        //        }

        //    }

        //}

        public async Task<List<EmployeeReportToModel>> GetReportToEmployeeList(int? departmentId, int? employeeId)
        {
            if (departmentId == null && employeeId == null)
            {
                return new List<EmployeeReportToModel>();
            }
        
            if (employeeId.HasValue)
            {
                var employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.Id == employeeId.Value);
                if (employee != null)
                {
                    departmentId = employee.EmployeeDepartmentId;
                }
            }
        
            if (departmentId.HasValue)
            {
                var data = await _dbContext.Employees
                    .Where(e => !e.IsDeleted && 
                                e.EmployeeDepartmentId == departmentId &&
                                e.Id != employeeId)
                    .Select(e => new EmployeeReportToModel
                    {
                        Name = e.FirstName + " " + e.LastName,
                        Id = e.Id,
                    })
                    .ToListAsync();
        
                return data;
            }
        
            return new List<EmployeeReportToModel>();
        }

        public async Task<EmployeeDesignation> AddNewDesignation(EmployeeDesignation employeeDesignation)
        {
            _dbContext.Entry(employeeDesignation).State = EntityState.Added;
            await _dbContext.SaveChangesAsync();
            return employeeDesignation;
        }
        public async Task<Site> AddNewSite(Site site)
        {
            _dbContext.Entry(site).State = EntityState.Added;
            await _dbContext.SaveChangesAsync();
            return site;
        }



        public async Task<EmployeeModel> GetEmployeeByIdAsync(string userRole, string loggedUserId, int id)
        {
            //var Employee = await _dbContext.Employees
            //    .AsNoTracking()
            //    .Include(x => x.EmployeePersonalDetails)
            //    .Include(x => x.EmployeeWorkInformation)
            //    .Include(x => x.EmployeeAddresses)
            //    .Include(x => x.EmployeeIdentityInfos)
            //    .Include(x => x.EmployeeEducationDetail)
            //    .Include(x => x.EmployeeDocuments)
            //    .SingleOrDefaultAsync(x => x.Id == id);
            //var EmployeeModel = mapper.Map<EmployeeModel>(Employee);
            //return EmployeeModel;

            var targetEmployeeId = CheckValidEmployeeId(loggedUserId);
            if (targetEmployeeId == -1 && userRole != "HR Admin")
            {
                throw new Exception("Invalid User data");
            }

            if(userRole == "Manager")
            {
                var employee = _dbContext.Employees.FirstOrDefault(s => s.Id == id);
                if(employee!= null)
                {
                    if(employee.EmployeeReportToId != targetEmployeeId && targetEmployeeId != id)
                    {
                        throw new Exception("User has no access to read employee info.");
                    }
                }
            }

            if(userRole == "Employee")
            {
                if(targetEmployeeId != id)
                {
                    throw new Exception("User has no access to read employee info.");
                }
            }

            var employeeData = (from e in _dbContext.Employees.Where(s => s.Id == id)
                                select new EmployeeModel
                                {
                                    Id = e.Id,
                                    PhotoURL = e.PhotoURL,
                                    EmployeeNumber = e.EmployeeNumber,
                                    FirstName = e.FirstName,
                                    MiddleName = e.MiddleName,
                                    LastName = e.LastName,
                                    Email = e.Email,
                                    AlternateEmail = e.AlternateEmail,
                                    PhoneNumber = e.PhoneNumber,
                                    AlternateNumber = e.AlternateNumber,
                                    EmployeeCategoryId = e.EmployeeCategoryId,
                                    EmployeeDepartmentId = e.EmployeeDepartmentId,
                                    EmployeeDesignationId = e.EmployeeDesignationId,
                                    EmployeeReportToId = e.EmployeeReportToId,
                                    RoleId = e.RoleId,
                                    UserId = e.UserId,
                                    IsDeleted = e.IsDeleted,
                                    EmployeePersonalDetails = new EmployeePersonalDetailsModel
                                    {
                                        DateOfBirth = e.EmployeePersonalDetails == null ? "" : (e.EmployeePersonalDetails.DateOfBirth.HasValue ? e.EmployeePersonalDetails.DateOfBirth.Value.ToString("yyyy-MM-dd") : ""),
                                        Gender = e.EmployeePersonalDetails == null ? "" : e.EmployeePersonalDetails.Gender,
                                        MaritalStatus = e.EmployeePersonalDetails == null ? null : e.EmployeePersonalDetails.MaritalStatus,
                                        bloodGroup = e.EmployeePersonalDetails == null ? null : e.EmployeePersonalDetails.bloodGroup,
                                    },
                                    EmployeeWorkInformation = new EmployeeWorkInformationModel
                                    {
                                        Designation = e.EmployeeWorkInformation == null ? null : e.EmployeeWorkInformation.Designation,
                                        SalaryType = e.EmployeeWorkInformation == null ? null : e.EmployeeWorkInformation.SalaryType,
                                        HireDate = e.EmployeeWorkInformation == null ? null : (e.EmployeeWorkInformation.HireDate.HasValue ? e.EmployeeWorkInformation.HireDate.Value.ToString("yyyy-MM-dd") : ""),
                                        ConfirmationDate = e.EmployeeWorkInformation == null ? null : (e.EmployeeWorkInformation.ConfirmationDate.HasValue ? e.EmployeeWorkInformation.ConfirmationDate.Value.ToString("yyyy-MM-dd") : ""),
                                        TotalPreviousExperience = e.EmployeeWorkInformation == null ? 0 : e.EmployeeWorkInformation.TotalPreviousExperience,
                                        Salary = e.EmployeeWorkInformation == null ? 0 : e.EmployeeWorkInformation.Salary,
                                        Basic = e.EmployeeWorkInformation == null ? 0 : e.EmployeeWorkInformation.Basic,
                                        HRAllowances = e.EmployeeWorkInformation == null ? 0 : e.EmployeeWorkInformation.HRAllowances,
                                        Bonus = e.EmployeeWorkInformation == null ? 0 : e.EmployeeWorkInformation.Bonus,
                                        Gratuity = e.EmployeeWorkInformation == null ? 0 : e.EmployeeWorkInformation.Gratuity,
                                        PF = e.EmployeeWorkInformation == null ? 0 : e.EmployeeWorkInformation.PF,
                                        ESI = e.EmployeeWorkInformation == null ? 0 : e.EmployeeWorkInformation.ESI,
                                        PT = e.EmployeeWorkInformation == null ? 0 : e.EmployeeWorkInformation.PT,
                                        SiteId = e.EmployeeWorkInformation == null ? null : e.EmployeeWorkInformation.SiteId,
                                        GRPHead = e.EmployeeWorkInformation == null ? null : e.EmployeeWorkInformation.GRPHead,
                                    },
                                    EmployeeInsuranceDetails = new EmployeeInsuranceDetailModel
                                    {
                                        EmployeeDesignationId = e.EmployeeInsuranceDetails == null ? null : e.EmployeeInsuranceDetails.EmployeeDesignationId,
                                        SerialNumber = e.EmployeeInsuranceDetails == null ? "" : e.EmployeeInsuranceDetails.SerialNumber,
                                        DateOfJoining = e.EmployeeInsuranceDetails == null ? "" : (e.EmployeeInsuranceDetails.DateOfJoining.HasValue ? e.EmployeeInsuranceDetails.DateOfJoining.Value.ToString("yyyy-MM-dd") : ""),
                                        DateOfBirth = e.EmployeeInsuranceDetails == null ? "" : (e.EmployeeInsuranceDetails.DateOfBirth.HasValue ? e.EmployeeInsuranceDetails.DateOfJoining.Value.ToString("yyyy-MM-dd") : ""),
                                        Age = e.EmployeeInsuranceDetails == null ? 0 : e.EmployeeInsuranceDetails.Age,
                                        GrossSalary = e.EmployeeInsuranceDetails == null ? 0 : e.EmployeeInsuranceDetails.GrossSalary,
                                        TotalSIWider = e.EmployeeInsuranceDetails == null ? 0 : e.EmployeeInsuranceDetails.TotalSIWider,
                                        Comprehensive = e.EmployeeInsuranceDetails == null ? 0 : e.EmployeeInsuranceDetails.Comprehensive,
                                        Risk = e.EmployeeInsuranceDetails == null ? "" : e.EmployeeInsuranceDetails.Risk,
                                    },
                                    EmployeeAddresses = new EmployeeAddressModel
                                    {
                                        UserAddress = new AddressModel
                                        {
                                            AddressLine1 = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.UserAddressLine1,
                                            AddressLine2 = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.UserAddressLine2,
                                            City = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.UserCity,
                                            Country = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.UserCountry,
                                            State = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.UserState,
                                            PinCode = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.UserAddressPinCode,
                                        },
                                        MailingAddress = new AddressModel
                                        {
                                            AddressLine1 = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.MailingAddressLine1,
                                            AddressLine2 = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.MailingAddressLine2,
                                            City = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.MailingCity,
                                            Country = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.MailingCountry,
                                            State = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.MailingState,
                                            PinCode = e.EmployeeAddresses == null ? null : e.EmployeeAddresses.MailingAddressPinCode,
                                        }

                                    },
                                    EmployeeIdentityInfos = new EmployeeBankingDataModel
                                    {
                                        UID = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.UID,
                                        BankAccountNumber = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.BankAccountNumber,
                                        BankName = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.BankName,
                                        Branch = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.Branch,
                                        IFSC = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.IFSC,
                                        AccountHolderName = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.AccountHolderName,
                                        PAN = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.PAN,
                                        ProvidentFundNumber = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.ProvidentFundNumber,
                                        EmployeeStateInsuranceNumber = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.EmployeeStateInsuranceNumber,
                                        BiometricCode = e.EmployeeIdentityInfos == null ? null : e.EmployeeIdentityInfos.BiometricCode,
                                    },
                                    EmployeeDocuments = new List<EmployeeDocumentsModel>(),
                                    EmployeeEducationDetail = new List<EmployeeEducationDetailModel>(),
                                    EmployeeRelationshipDetails = new List<EmployeeRelationshipDetailModel>(),
                                });

            if (employeeData != null)
            {
                var returnEployeeData = employeeData.FirstOrDefault();
                var employeeEducationData = (from e in _dbContext.EmployeeEducationDetails.Where(s => s.EmployeeId == returnEployeeData.Id)
                                             select new EmployeeEducationDetailModel
                                             {
                                                 Type = e.Type,
                                                 PassingYear = e.PassingYear,
                                                 DegreeCertificateDate = e.DegreeCertificateDate,
                                                 University = e.University,
                                                 grade = e.grade
                                             }).ToList();

                var employeeDocumentData = (from e in _dbContext.EmployeeDocuments.Where(s => s.EmployeeId == returnEployeeData.Id)
                                            select new EmployeeDocumentsModel
                                            {
                                                FileContent = e.FileContent,
                                                FileName = e.FileName,
                                                FileSize = e.FileSize,
                                                FileType = e.FileType
                                            }).ToList();


                if (employeeDocumentData != null)
                {
                    if (employeeDocumentData.Count == 0)
                    {
                        var documentData = new EmployeeDocumentsModel();
                        documentData.FileContent = null;
                        documentData.FileName = "";
                        documentData.FileName = "";
                        documentData.FileSize = null;
                        returnEployeeData.EmployeeDocuments.Add(documentData);
                    }
                    else
                    {
                        returnEployeeData.EmployeeDocuments = employeeDocumentData;
                    }
                }
                else
                {
                    var documentData = new EmployeeDocumentsModel();
                    documentData.FileContent = null;
                    documentData.FileName = "";
                    documentData.FileName = "";
                    documentData.FileSize = null;
                    returnEployeeData.EmployeeDocuments.Add(documentData);
                }



                if (employeeEducationData != null)
                {
                    if (employeeEducationData.Count == 0)
                    {
                        var educationData = new EmployeeEducationDetailModel();
                        educationData.Type = "";
                        educationData.PassingYear = "";
                        educationData.University = "";
                        educationData.grade = "";
                        educationData.DegreeCertificateDate = null;

                        returnEployeeData.EmployeeEducationDetail.Add(educationData);
                    }
                    else
                    {
                        returnEployeeData.EmployeeEducationDetail = employeeEducationData;
                    }


                }
                else
                {
                    var educationData = new EmployeeEducationDetailModel();
                    educationData.Type = "";
                    educationData.PassingYear = "";
                    educationData.University = "";
                    educationData.grade = "";
                    educationData.DegreeCertificateDate = null;

                    returnEployeeData.EmployeeEducationDetail.Add(educationData);

                }

                var employeeRelationshipData = (from r in _dbContext.EmployeeRelationshipDetails.Where(s => s.EmployeeId == returnEployeeData.Id)
                                                select new EmployeeRelationshipDetailModel
                                                {
                                                    RelationshipType = r.RelationshipType,
                                                    Name = r.Name,
                                                    Email = r.Email,
                                                    PhoneNumber = r.PhoneNumber,
                                                }).ToList();

                if (employeeRelationshipData != null)
                {
                    if (employeeRelationshipData.Count == 0)
                    {
                        var relationshipData = new EmployeeRelationshipDetailModel();
                        relationshipData.RelationshipType = RelationshipType.Parent;
                        relationshipData.Name = "";
                        relationshipData.Email = "";
                        relationshipData.PhoneNumber = "";

                        returnEployeeData.EmployeeRelationshipDetails.Add(relationshipData);
                    }
                    else
                    {
                        returnEployeeData.EmployeeRelationshipDetails = employeeRelationshipData;
                    }

                }
                else
                {
                    var relationshipData = new EmployeeRelationshipDetailModel();
                    relationshipData.RelationshipType = RelationshipType.Parent;
                    relationshipData.Name = "";
                    relationshipData.Email = "";
                    relationshipData.PhoneNumber = "";

                    returnEployeeData.EmployeeRelationshipDetails.Add(relationshipData);

                }



                return returnEployeeData;
            }
            else
            {
                return new EmployeeModel();
            }
        }
        public async Task<bool> CheckEmailExists(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            return user != null ? true : false;
        }

        public async Task<EmployeeCategory> AddNewCategory(EmployeeCategory employeeCategory)
        {
            _dbContext.Entry(employeeCategory).State = EntityState.Added;
            await _dbContext.SaveChangesAsync();
            return employeeCategory;
        }
        public async Task SendEmail()
        {
            var WelcomeModelCredentials = new WelcomeModel();
            WelcomeModelCredentials.Username = "snaupul@gmail.com";
            WelcomeModelCredentials.Password = "Test1234@";
            WelcomeModelCredentials.FirstName = "Naupul";
            WelcomeModelCredentials.LastName = "Shah";

            var emailModel = new EmailModel<WelcomeModel>();
            emailModel.From = "naupul30@gmail.com";
            emailModel.To = "snaupul@gmail.com";
            emailModel.Subject = "Welcome to Geo!";
            emailModel.repModel = WelcomeModelCredentials;

            _emailService.SendWelcomeMail(emailModel);
        }

        public async Task<EmployeeModel> CreateEmployeeAsync(EmployeeModel employee)
        {
            var user = new ApplicationUser { UserName = employee.Email, Email = employee.Email, Shortcuts = new List<string>() };
            var password = new PasswordGenerator().GenerateRandomPassword(6);
            var userResult = await userManager.CreateAsync(
                  user
                , password
                );

            var role = await roleManager.Roles.FirstAsync(x => x.Id == employee.RoleId);
            var roleResult = await userManager.AddToRoleAsync(user, role.Name);

            if (roleResult.Succeeded && userResult.Succeeded)
            {
                try
                {
                    var today = DateTime.Today;
                    var age = 0;
                    decimal grossSalary = 0;
                    var HRDate = today;
                    var DOB = today;
                    var newEmployee = new Employee();

                    newEmployee.PhotoURL = employee.PhotoURL;
                    newEmployee.FirstName = employee.FirstName;
                    newEmployee.MiddleName = employee.MiddleName;
                    newEmployee.LastName = employee.LastName;
                    newEmployee.Email = employee.Email;
                    newEmployee.AlternateEmail = employee.AlternateEmail;
                    newEmployee.PhoneNumber = employee.PhoneNumber;
                    newEmployee.AlternateNumber = employee.AlternateNumber;
                    newEmployee.EmployeeDepartmentId = employee.EmployeeDepartmentId;
                    newEmployee.EmployeeDesignationId = employee.EmployeeDesignationId;
                    newEmployee.EmployeeReportToId = employee.EmployeeReportToId;
                    newEmployee.RoleId = employee.RoleId;
                    newEmployee.EmployeeCategoryId = employee.EmployeeCategoryId;

                    if (employee.EmployeePersonalDetails != null)
                    {
                        var employeePersonalDetailsData = new EmployeePersonalDetails();

                        if (!string.IsNullOrEmpty(employee.EmployeePersonalDetails.DateOfBirth))
                        {
                            var dateOfBirth = DateTime.Parse(employee.EmployeePersonalDetails.DateOfBirth);
                            employeePersonalDetailsData.DateOfBirth = dateOfBirth;
                        }
                        if (employeePersonalDetailsData.DateOfBirth.HasValue)
                        {
                            DOB = employeePersonalDetailsData.DateOfBirth.Value;
                        }

                        if (employeePersonalDetailsData.DateOfBirth.HasValue)
                        {
                            age = today.Year - employeePersonalDetailsData.DateOfBirth.Value.Year;
                        }



                        employeePersonalDetailsData.Gender = employee.EmployeePersonalDetails.Gender;
                        employeePersonalDetailsData.MaritalStatus = employee.EmployeePersonalDetails.MaritalStatus;
                        employeePersonalDetailsData.bloodGroup = employee.EmployeePersonalDetails.bloodGroup;

                        newEmployee.EmployeePersonalDetails = employeePersonalDetailsData;
                    }

                    if (employee.EmployeeWorkInformation != null)
                    {
                        var employeeWorkInformationData = new EmployeeWorkInformation();
                        if (!string.IsNullOrEmpty(employee.EmployeeWorkInformation.HireDate))
                        {
                            var hireDate = DateTime.Parse(employee.EmployeeWorkInformation.HireDate);
                            employeeWorkInformationData.HireDate = hireDate;
                        }

                        if (employeeWorkInformationData.HireDate.HasValue)
                        {
                            HRDate = employeeWorkInformationData.HireDate.Value;
                        }

                        if (!string.IsNullOrEmpty(employee.EmployeeWorkInformation.ConfirmationDate))
                        {
                            var confirmationDate = DateTime.Parse(employee.EmployeeWorkInformation.ConfirmationDate);
                            employeeWorkInformationData.ConfirmationDate = confirmationDate;
                        }

                        employeeWorkInformationData.Designation = employee.EmployeeWorkInformation.Designation;
                        employeeWorkInformationData.GRPHead = employee.EmployeeWorkInformation.GRPHead;
                        employeeWorkInformationData.SiteId = employee.EmployeeWorkInformation.SiteId;
                        employeeWorkInformationData.SalaryType = employee.EmployeeWorkInformation.SalaryType;
                        employeeWorkInformationData.Salary = employee.EmployeeWorkInformation.Salary;
                        employeeWorkInformationData.Basic = employee.EmployeeWorkInformation.Basic;
                        employeeWorkInformationData.HRAllowances = employee.EmployeeWorkInformation.HRAllowances;
                        employeeWorkInformationData.Bonus = employee.EmployeeWorkInformation.Bonus;
                        employeeWorkInformationData.Gratuity = employee.EmployeeWorkInformation.Gratuity;
                        employeeWorkInformationData.PF = employee.EmployeeWorkInformation.PF;
                        employeeWorkInformationData.ESI = employee.EmployeeWorkInformation.ESI;
                        employeeWorkInformationData.PT = employee.EmployeeWorkInformation.PT;
                        employeeWorkInformationData.TotalPreviousExperience = employee.EmployeeWorkInformation.TotalPreviousExperience;

                        grossSalary = employeeWorkInformationData.Salary;

                        newEmployee.EmployeeWorkInformation = employeeWorkInformationData;
                    }

                    if (employee.EmployeeInsuranceDetails != null)
                    {
                        var employeeInsuranceData = new EmployeeInsuranceDetail();

                        employeeInsuranceData.SerialNumber = employee.EmployeeInsuranceDetails.SerialNumber;
                        employeeInsuranceData.TotalSIWider = employee.EmployeeInsuranceDetails.TotalSIWider.HasValue ? employee.EmployeeInsuranceDetails.TotalSIWider.Value : 0;
                        employeeInsuranceData.Comprehensive = employee.EmployeeInsuranceDetails.Comprehensive.HasValue ? employee.EmployeeInsuranceDetails.Comprehensive.Value : 0;
                        employeeInsuranceData.Risk = employee.EmployeeInsuranceDetails.Risk;
                        employeeInsuranceData.Age = age;
                        employeeInsuranceData.EmployeeDesignationId = employee.EmployeeDesignationId;
                        employeeInsuranceData.DateOfJoining = HRDate;
                        employeeInsuranceData.DateOfBirth = DOB;
                        employeeInsuranceData.GrossSalary = grossSalary;

                        newEmployee.EmployeeInsuranceDetails = employeeInsuranceData;
                    }

                    if (employee.EmployeeAddresses != null)
                    {
                        var employeeAddressData = new EmployeeAddress();
                        if (employee.EmployeeAddresses.UserAddress != null)
                        {
                            employeeAddressData.UserAddressLine1 = employee.EmployeeAddresses.UserAddress.AddressLine1;
                            employeeAddressData.UserAddressLine2 = employee.EmployeeAddresses.UserAddress.AddressLine2;
                            employeeAddressData.UserCity = employee.EmployeeAddresses.UserAddress.City;
                            employeeAddressData.UserCountry = employee.EmployeeAddresses.UserAddress.Country;
                            employeeAddressData.UserState = employee.EmployeeAddresses.UserAddress.State;
                            employeeAddressData.UserAddressPinCode = employee.EmployeeAddresses.UserAddress.PinCode;
                        }

                        if (employee.EmployeeAddresses.MailingAddress != null)
                        {
                            employeeAddressData.MailingAddressLine1 = employee.EmployeeAddresses.MailingAddress.AddressLine1;
                            employeeAddressData.MailingAddressLine2 = employee.EmployeeAddresses.MailingAddress.AddressLine2;
                            employeeAddressData.MailingCity = employee.EmployeeAddresses.MailingAddress.City;
                            employeeAddressData.MailingCountry = employee.EmployeeAddresses.MailingAddress.Country;
                            employeeAddressData.MailingState = employee.EmployeeAddresses.MailingAddress.State;
                            employeeAddressData.MailingAddressPinCode = employee.EmployeeAddresses.MailingAddress.PinCode;
                        }


                        newEmployee.EmployeeAddresses = employeeAddressData;
                    }

                    if (employee.EmployeeIdentityInfos != null)
                    {
                        var employeeIdentityData = new EmployeeIdentityInfo();
                        employeeIdentityData.UID = employee.EmployeeIdentityInfos.UID;
                        employeeIdentityData.BankAccountNumber = employee.EmployeeIdentityInfos.BankAccountNumber;
                        employeeIdentityData.BankName = employee.EmployeeIdentityInfos.BankName;
                        employeeIdentityData.Branch = employee.EmployeeIdentityInfos.Branch;
                        employeeIdentityData.IFSC = employee.EmployeeIdentityInfos.IFSC;
                        employeeIdentityData.AccountHolderName = employee.EmployeeIdentityInfos.AccountHolderName;
                        employeeIdentityData.PAN = employee.EmployeeIdentityInfos.PAN;
                        employeeIdentityData.ProvidentFundNumber = employee.EmployeeIdentityInfos.ProvidentFundNumber;
                        employeeIdentityData.EmployeeStateInsuranceNumber = employee.EmployeeIdentityInfos.EmployeeStateInsuranceNumber;
                        employeeIdentityData.BiometricCode = employee.EmployeeIdentityInfos.BiometricCode;

                        newEmployee.EmployeeIdentityInfos = employeeIdentityData;
                    }

                    if (employee.EmployeeEducationDetail != null)
                    {
                        if (employee.EmployeeEducationDetail.Count > 0)
                        {
                            newEmployee.EmployeeEducationDetail = new List<EmployeeEducationDetail>();
                            foreach (var detail in employee.EmployeeEducationDetail)
                            {
                                var educationData = new EmployeeEducationDetail();
                                educationData.Type = detail.Type;
                                educationData.PassingYear = detail.PassingYear;
                                educationData.DegreeCertificateDate = detail.DegreeCertificateDate;
                                educationData.University = detail.University;
                                educationData.grade = detail.grade;

                                newEmployee.EmployeeEducationDetail.Add(educationData);
                            }
                        }
                    }

                    if (employee.EmployeeRelationshipDetails != null)
                    {
                        if (employee.EmployeeRelationshipDetails.Count > 0)
                        {
                            newEmployee.EmployeeRelationshipDetails = new List<EmployeeRelationshipDetail>();
                            foreach (var detail in employee.EmployeeRelationshipDetails)
                            {
                                var relationshipData = new EmployeeRelationshipDetail();
                                relationshipData.RelationshipType = RelationshipType.Parent;
                                relationshipData.Name = detail.Name;
                                relationshipData.Email = detail.Email;
                                relationshipData.PhoneNumber = detail.PhoneNumber;

                                newEmployee.EmployeeRelationshipDetails.Add(relationshipData);
                            }
                        }
                    }

                    employee.JobLevelLeaveType = employee.JobLevelLeaveType.HasValue ? employee.JobLevelLeaveType.Value : 1;

                    var defaultLeaves = (from ed in _dbContext.EmployeeDefaultLeave.Where(s => s.JobLevelLeaveId == employee.JobLevelLeaveType)
                                         select new EmployeeLeaveSummaryModel
                                         {
                                             Id = ed.EmployeeLeaveTypeId.HasValue ? ed.EmployeeLeaveTypeId.Value : 0,
                                             EmployeeLeaveType = ed.EmployeeLeaveTypes.Name,
                                             TotalLeaves = ed.TotalLeaves,
                                             RemainingLeaves = ed.TotalLeaves
                                         }).ToList();
                    newEmployee.EmployeeLeaves = new List<EmployeeLeaveSummary>();
                    if (employee.EmployeeWorkInformation.UseDefaultLeaves)
                    {

                        if (defaultLeaves.Any())
                        {
                        //if (employee.EmployeeWorkInformation.UseDefaultLeaves)
                        //{

                            foreach (var leave in defaultLeaves)
                            {
                                var employeeLeave = new EmployeeLeaveSummary();
                                employeeLeave.EmployeeLeaveTypeId = leave.Id;
                                employeeLeave.RemainingLeaves = leave.RemainingLeaves;
                                employeeLeave.TotalLeaves = leave.TotalLeaves;

                                newEmployee.EmployeeLeaves.Add(employeeLeave);
                            }

                            /*newEmployee.EmployeeLeaves = new List<EmployeeLeaveSummary>();
                           var leaves= _dbContext.EmployeeDefaultLeave.Select(x => new EmployeeLeaveSummary()
                            {
                                EmployeeLeaveTypeId = x.EmployeeLeaveTypeId,
                                RemainingLeaves = x.TotalLeaves ,
                                TotalLeaves = x.TotalLeaves
                            });*/
                            //newEmployee.EmployeeLeaves.AddRange(leaves.ToList());

                        }
                        //else
                        //{


                        //    foreach (var leave in employee.EmployeeLeaves)
                        //    {
                        //        var employeeLeave = new EmployeeLeaveSummary();
                        //        employeeLeave.EmployeeLeaveTypeId = leave.Id;
                        //        employeeLeave.RemainingLeaves = leave.TotalLeaves;

                        //        employeeLeave.TotalLeaves = leave.TotalLeaves;

                        //        newEmployee.EmployeeLeaves.Add(employeeLeave);
                        //    }



                        //}

                    }
                    else
                    {


                        foreach (var leave in employee.EmployeeLeaves)
                        {
                            var employeeLeave = new EmployeeLeaveSummary();
                            employeeLeave.EmployeeLeaveTypeId = leave.Id;
                            employeeLeave.RemainingLeaves = leave.TotalLeaves;

                            employeeLeave.TotalLeaves = leave.TotalLeaves;

                            newEmployee.EmployeeLeaves.Add(employeeLeave);
                        }



                    }


                    newEmployee.UserId = user.Id;
                    newEmployee.CreatedBy = user.Id;
                    newEmployee.CreatedOn = DateTime.Now;
                    newEmployee.LastModifiedBy = user.Id;
                    newEmployee.LastModifiedOn = DateTime.Now;

                    _dbContext.Employees.Add(newEmployee);
                    _dbContext.SaveChanges();

                    SendEmail(user, password);

                    return employee;
                }
                catch (Exception e)
                {
                    throw new InvalidOperationException("Somthing wrong while creating Users and Roles for employee");
                }
            }
            else
            {
                throw new InvalidOperationException("Somthing wrong while creating Users and Roles for employee");
            }
        }

        public async Task<EmployeeModel> UpdateEmployeeAsync(int id, EmployeeModel employee)
        {
            var employeeData = _dbContext.Employees.FirstOrDefault(s => s.Id == id);
            var today = DateTime.Today;
            var age = 0;
            decimal grossSalary = 0;
            var HRDate = today;
            var DOB = today;
            try
            {
                if (employeeData != null)
                {
                    if(employeeData.RoleId != employee.RoleId)
                    {
                        var user = await userManager.FindByEmailAsync(employeeData.Email);
                        if(user != null)
                        {
                            var currentRoles = await userManager.GetRolesAsync(user);
                            var removeRolesResult = await userManager.RemoveFromRolesAsync(user, currentRoles);
                            if (removeRolesResult.Succeeded)
                            {
                                var role = await roleManager.Roles.FirstAsync(x => x.Id == employee.RoleId);
                                var roleResult = await userManager.AddToRoleAsync(user, role.Name);
                                if(roleResult.Succeeded)
                                {
                                    employeeData.RoleId = employee.RoleId;
                                }
                            }
                        }
                    }

                    employeeData.PhotoURL = employee.PhotoURL;
                    employeeData.FirstName = employee.FirstName;
                    employeeData.MiddleName = employee.MiddleName;
                    employeeData.LastName = employee.LastName;
                    employeeData.Email = employee.Email;
                    employeeData.AlternateEmail = employee.AlternateEmail;
                    employeeData.PhoneNumber = employee.PhoneNumber;
                    employeeData.AlternateNumber = employee.AlternateNumber;
                    employeeData.EmployeeCategoryId = employee.EmployeeCategoryId;
                    employeeData.EmployeeDepartmentId = employee.EmployeeDepartmentId;
                    employeeData.EmployeeReportToId = employee.EmployeeReportToId;
                    employeeData.EmployeeDesignationId = employee.EmployeeDesignationId;

                    if (employeeData.EmployeePersonalDetailsId.HasValue && employee.EmployeePersonalDetails != null)
                    {
                        var employeePersonalDetailsData = _dbContext.EmployeePersonalDetails.FirstOrDefault(s => s.Id == employeeData.EmployeePersonalDetailsId.Value);
                        if (employeePersonalDetailsData != null)
                        {
                            if (!string.IsNullOrEmpty(employee.EmployeePersonalDetails.DateOfBirth))
                            {
                                var dateOfBirth = DateTime.Parse(employee.EmployeePersonalDetails.DateOfBirth);
                                employeePersonalDetailsData.DateOfBirth = dateOfBirth;
                            }
                            if (employeePersonalDetailsData.DateOfBirth.HasValue)
                            {
                                DOB = employeePersonalDetailsData.DateOfBirth.Value;
                            }


                            if (employeePersonalDetailsData.DateOfBirth.HasValue)
                            {
                                age = today.Year - employeePersonalDetailsData.DateOfBirth.Value.Year;
                            }



                            employeePersonalDetailsData.Gender = employee.EmployeePersonalDetails.Gender;
                            employeePersonalDetailsData.MaritalStatus = employee.EmployeePersonalDetails.MaritalStatus;
                            employeePersonalDetailsData.bloodGroup = employee.EmployeePersonalDetails.bloodGroup;

                            //_dbContext.Update(employeePersonalDetailsData);
                            employeeData.EmployeePersonalDetails = employeePersonalDetailsData;
                        }
                    }

                    if (employeeData.EmployeeWorkInformationId.HasValue && employee.EmployeeWorkInformation != null)
                    {
                        var employeeWorkInformationData = _dbContext.EmployeeWorkInformations.FirstOrDefault(s => s.Id == employeeData.EmployeeWorkInformationId.Value);
                        if (employeeWorkInformationData != null)
                        {
                            if (!string.IsNullOrEmpty(employee.EmployeeWorkInformation.HireDate))
                            {
                                var hireDate = DateTime.Parse(employee.EmployeeWorkInformation.HireDate);
                                employeeWorkInformationData.HireDate = hireDate;
                            }

                            if (employeeWorkInformationData.HireDate.HasValue)
                            {
                                HRDate = employeeWorkInformationData.HireDate.Value;
                            }

                            if (!string.IsNullOrEmpty(employee.EmployeeWorkInformation.ConfirmationDate))
                            {
                                var confirmationDate = DateTime.Parse(employee.EmployeeWorkInformation.ConfirmationDate);
                                employeeWorkInformationData.ConfirmationDate = confirmationDate;
                            }

                            employeeWorkInformationData.Designation = employee.EmployeeWorkInformation.Designation;
                            employeeWorkInformationData.GRPHead = employee.EmployeeWorkInformation.GRPHead;
                            employeeWorkInformationData.SiteId = employee.EmployeeWorkInformation.SiteId;
                            //employeeWorkInformationData.SalaryType = employee.EmployeeWorkInformation.SalaryType;
                            //employeeWorkInformationData.Salary = employee.EmployeeWorkInformation.Salary;
                            //employeeWorkInformationData.Basic = employee.EmployeeWorkInformation.Basic;
                            //employeeWorkInformationData.HRAllowances = employee.EmployeeWorkInformation.HRAllowances;
                            //employeeWorkInformationData.Bonus = employee.EmployeeWorkInformation.Bonus;
                            //employeeWorkInformationData.Gratuity = employee.EmployeeWorkInformation.Gratuity;
                            //employeeWorkInformationData.PF = employee.EmployeeWorkInformation.PF;
                            //employeeWorkInformationData.ESI = employee.EmployeeWorkInformation.ESI;
                            //employeeWorkInformationData.PT = employee.EmployeeWorkInformation.PT;
                            employeeWorkInformationData.TotalPreviousExperience = employee.EmployeeWorkInformation.TotalPreviousExperience;
                            employeeWorkInformationData.UseDefaultLeaves = employee.EmployeeWorkInformation.UseDefaultLeaves;
                            grossSalary = employeeWorkInformationData.Salary;

                            employeeData.EmployeeWorkInformation = employeeWorkInformationData;
                        }
                    }

                    if (employeeData.EmployeeInsuranceDetailsId.HasValue && employee.EmployeeInsuranceDetails != null)
                    {
                        var employeeInsuranceData = _dbContext.EmployeeInsuranceDetails.FirstOrDefault(s => s.Id == employeeData.EmployeeInsuranceDetailsId.Value);
                        if (employeeInsuranceData != null)
                        {
                            employeeInsuranceData.SerialNumber = employee.EmployeeInsuranceDetails.SerialNumber;
                            employeeInsuranceData.TotalSIWider = employee.EmployeeInsuranceDetails.TotalSIWider.HasValue ? employee.EmployeeInsuranceDetails.TotalSIWider.Value : 0;
                            employeeInsuranceData.Comprehensive = employee.EmployeeInsuranceDetails.Comprehensive.HasValue ? employee.EmployeeInsuranceDetails.Comprehensive.Value : 0;
                            employeeInsuranceData.Risk = employee.EmployeeInsuranceDetails.Risk;
                            employeeInsuranceData.Age = age;
                            employeeInsuranceData.EmployeeDesignationId = employee.EmployeeDesignationId;
                            employeeInsuranceData.DateOfJoining = HRDate;
                            employeeInsuranceData.DateOfBirth = DOB;
                            employeeInsuranceData.GrossSalary = grossSalary;

                            employeeData.EmployeeInsuranceDetails = employeeInsuranceData;
                        }
                    }

                    if (employeeData.EmployeeAddressesId.HasValue && employee.EmployeeAddresses != null)
                    {
                        var employeeAddressData = _dbContext.EmployeeAddresses.FirstOrDefault(s => s.Id == employeeData.EmployeeAddressesId.Value);
                        if (employeeAddressData != null)
                        {
                            if (employee.EmployeeAddresses.UserAddress != null)
                            {
                                employeeAddressData.UserAddressLine1 = employee.EmployeeAddresses.UserAddress.AddressLine1;
                                employeeAddressData.UserAddressLine2 = employee.EmployeeAddresses.UserAddress.AddressLine2;
                                employeeAddressData.UserCity = employee.EmployeeAddresses.UserAddress.City;
                                employeeAddressData.UserCountry = employee.EmployeeAddresses.UserAddress.Country;
                                employeeAddressData.UserState = employee.EmployeeAddresses.UserAddress.State;
                                employeeAddressData.UserAddressPinCode = employee.EmployeeAddresses.UserAddress.PinCode;
                            }

                            if (employee.EmployeeAddresses.UseUserAddressForMailing && employee.EmployeeAddresses.UserAddress != null)
                            {
                                employeeAddressData.MailingAddressLine1 = employee.EmployeeAddresses.UserAddress.AddressLine1;
                                employeeAddressData.MailingAddressLine2 = employee.EmployeeAddresses.UserAddress.AddressLine2;
                                employeeAddressData.MailingCity = employee.EmployeeAddresses.UserAddress.City;
                                employeeAddressData.MailingCountry = employee.EmployeeAddresses.UserAddress.Country;
                                employeeAddressData.MailingState = employee.EmployeeAddresses.UserAddress.State;
                                employeeAddressData.MailingAddressPinCode = employee.EmployeeAddresses.UserAddress.PinCode;
                            }
                            else
                            {
                                if (employee.EmployeeAddresses.MailingAddress != null)
                                {
                                    employeeAddressData.MailingAddressLine1 = employee.EmployeeAddresses.MailingAddress.AddressLine1;
                                    employeeAddressData.MailingAddressLine2 = employee.EmployeeAddresses.MailingAddress.AddressLine2;
                                    employeeAddressData.MailingCity = employee.EmployeeAddresses.MailingAddress.City;
                                    employeeAddressData.MailingCountry = employee.EmployeeAddresses.MailingAddress.Country;
                                    employeeAddressData.MailingState = employee.EmployeeAddresses.MailingAddress.State;
                                    employeeAddressData.MailingAddressPinCode = employee.EmployeeAddresses.MailingAddress.PinCode;
                                }
                            }

                            employeeData.EmployeeAddresses = employeeAddressData;
                        }
                    }

                    if (employeeData.EmployeeIdentityInfoId.HasValue && employee.EmployeeIdentityInfos != null)
                    {
                        var employeeIdentityData = _dbContext.EmployeeIdentityInfos.FirstOrDefault(s => s.Id == employeeData.EmployeeIdentityInfoId.Value);
                        if (employeeIdentityData != null)
                        {
                            employeeIdentityData.UID = employee.EmployeeIdentityInfos.UID;
                            employeeIdentityData.BankAccountNumber = employee.EmployeeIdentityInfos.BankAccountNumber;
                            employeeIdentityData.BankName = employee.EmployeeIdentityInfos.BankName;
                            employeeIdentityData.Branch = employee.EmployeeIdentityInfos.Branch;
                            employeeIdentityData.IFSC = employee.EmployeeIdentityInfos.IFSC;
                            employeeIdentityData.AccountHolderName = employee.EmployeeIdentityInfos.AccountHolderName;
                            employeeIdentityData.PAN = employee.EmployeeIdentityInfos.PAN;
                            employeeIdentityData.ProvidentFundNumber = employee.EmployeeIdentityInfos.ProvidentFundNumber;
                            employeeIdentityData.EmployeeStateInsuranceNumber = employee.EmployeeIdentityInfos.EmployeeStateInsuranceNumber;
                            employeeIdentityData.BiometricCode = employee.EmployeeIdentityInfos.BiometricCode;

                            employeeData.EmployeeIdentityInfos = employeeIdentityData;
                        }
                    }

                    if (employee.EmployeeEducationDetail != null)
                    {
                        if (employee.EmployeeEducationDetail.Count > 0)
                        {
                            var educationDetails = _dbContext.EmployeeEducationDetails.Where(s => s.EmployeeId == employeeData.Id).ToList();
                            foreach (var detail in educationDetails)
                            {
                                _dbContext.EmployeeEducationDetails.Remove(detail);
                            }

                            foreach (var detail in employee.EmployeeEducationDetail)
                            {
                                var educationData = new EmployeeEducationDetail();
                                educationData.EmployeeId = employeeData.Id;
                                educationData.Type = detail.Type;
                                educationData.PassingYear = detail.PassingYear;
                                educationData.DegreeCertificateDate = detail.DegreeCertificateDate;
                                educationData.University = detail.University;
                                educationData.grade = detail.grade;

                                _dbContext.EmployeeEducationDetails.Add(educationData);
                            }
                        }
                    }


                    if (employee.EmployeeRelationshipDetails != null)
                    {
                        if (employee.EmployeeRelationshipDetails.Count > 0)
                        {
                            var relationshipDetails = _dbContext.EmployeeRelationshipDetails.Where(s => s.EmployeeId == employeeData.Id).ToList();
                            foreach (var detail in relationshipDetails)
                            {
                                _dbContext.EmployeeRelationshipDetails.Remove(detail);
                            }

                            foreach (var detail in employee.EmployeeRelationshipDetails)
                            {
                                var relationshipData = new EmployeeRelationshipDetail();
                                relationshipData.EmployeeId = employeeData.Id;
                                relationshipData.RelationshipType = detail.RelationshipType;
                                relationshipData.Name = detail.Name;
                                relationshipData.Email = detail.Email;
                                relationshipData.PhoneNumber = detail.PhoneNumber;

                                _dbContext.EmployeeRelationshipDetails.Add(relationshipData);
                            }
                        }
                    }

                    employeeData.LastModifiedOn = DateTime.Now;


                    _dbContext.Employees.Update(employeeData);
                    _dbContext.SaveChanges();

                    if (employeeData.EmployeeWorkInformation.Salary != employee.EmployeeWorkInformation.Salary)
                    {
                        var salaryInfo = new EmployeeSalaryUpdateModel();
                        if (employee.EmployeeWorkInformation.SalaryType.Value == SalaryType.OnRoll)
                        {
                            salaryInfo.EmployeeId = employeeData.Id;
                            salaryInfo.SalaryType = employee.EmployeeWorkInformation.SalaryType.Value;
                            salaryInfo.CurrentSalary = employeeData.EmployeeWorkInformation.Salary;
                            salaryInfo.ExpectedToBeSalary = employee.EmployeeWorkInformation.Salary;
                            salaryInfo.Basic = employee.EmployeeWorkInformation.Basic;
                            salaryInfo.HRAllowances = employee.EmployeeWorkInformation.HRAllowances;
                            salaryInfo.Bonus = employee.EmployeeWorkInformation.Bonus;
                            salaryInfo.Gratuity = employee.EmployeeWorkInformation.Gratuity;
                            salaryInfo.PF = employee.EmployeeWorkInformation.PF;
                            salaryInfo.ESI = employee.EmployeeWorkInformation.ESI;
                            salaryInfo.PT = employee.EmployeeWorkInformation.PT;
                        }
                        else
                        {
                            salaryInfo.EmployeeId = employeeData.Id;
                            salaryInfo.SalaryType = employee.EmployeeWorkInformation.SalaryType.Value;
                            salaryInfo.CurrentSalary = employeeData.EmployeeWorkInformation.Salary;
                            salaryInfo.ExpectedToBeSalary = employee.EmployeeWorkInformation.Salary;
                        }
                        UpdateSalaryInformation(salaryInfo);
                    }

                    return employee;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<string> GetEmployeeDocumentFileName(int id, string fileName)
        {
            var returnFilePath = fileName;
            var employee = _dbContext.Employees.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (employee != null)
            {
                returnFilePath = fileName;
            }

            return returnFilePath;
        }

        public async Task<string> GetEmployeeFolderPath(int id)
        {
            var returnFolderPath = "";
            var employee = _dbContext.Employees.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (employee != null)
            {
                returnFolderPath = employee.FirstName + "_" + employee.LastName;
            }

            return returnFolderPath;
        }

        public string GetEmployeeFilePath(int id, string fileName)
        {
            var retunrFilePath = "";
            var employee = _dbContext.Employees.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (employee != null)
            {
                var employeeDocument = _dbContext.EmployeeDocuments.FirstOrDefault(s => s.FileName == fileName && s.EmployeeId == id && !s.IsDeleted);
                if (employeeDocument != null)
                {
                    retunrFilePath = employeeDocument.FilePath;
                }
            }

            return retunrFilePath;
        }

        public async Task<string> UpdateEmployeeDocumentData(int id, string fileName, FileType fileType, long fileSize, string filePath, byte[] fileContent)
        {
            var employee = _dbContext.Employees.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (employee != null)
            {
                var availableEmployeeDocument = _dbContext.EmployeeDocuments.FirstOrDefault(s => s.EmployeeId == id && s.FileName == fileName);
                if (availableEmployeeDocument == null)
                {
                    var employeeDocument = new EmployeeDocuments();
                    employeeDocument.EmployeeId = employee.Id;
                    employeeDocument.FileName = fileName;
                    employeeDocument.FilePath = filePath;
                    employeeDocument.FileSize = (int)fileSize;
                    employeeDocument.FileType = fileType;
                    employeeDocument.FileContent = fileContent;
                    employeeDocument.IsDeleted = false;



                    _dbContext.EmployeeDocuments.Add(employeeDocument);
                }
                else
                {
                    availableEmployeeDocument.EmployeeId = employee.Id;
                    availableEmployeeDocument.FileName = fileName;
                    availableEmployeeDocument.FilePath = filePath;
                    availableEmployeeDocument.IsDeleted = false;


                    _dbContext.EmployeeDocuments.Update(availableEmployeeDocument);
                }

                _dbContext.SaveChanges();
            }

            return fileName;
        }


        public async Task<bool> DeleteEmployeeFile(int employeeId, string fileName)
        {
            var filePath = GetEmployeeFilePath(employeeId, fileName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);

                // Remove the file entry from the database
                var employeeDocument = await _dbContext.EmployeeDocuments
                    .FirstOrDefaultAsync(d => d.EmployeeId == employeeId && d.FileName == fileName);

                if (employeeDocument != null)
                {
                    _dbContext.EmployeeDocuments.Remove(employeeDocument);
                    await _dbContext.SaveChangesAsync();
                }

                return true;
            }
            return false;
        }






        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            try
            {
                var employee = await _dbContext.Employees.FindAsync(id);
                if (employee == null)
                    return false;

                var employeeReportTo = _dbContext.Employees.Where(s => s.EmployeeReportToId == id).ToList();
                var employeeEmail = employee.Email;
                if (employeeReportTo.Any())
                {
                    foreach (var e in employeeReportTo)
                    {
                        e.EmployeeReportToId = null;
                        _dbContext.Employees.Update(e);
                    }

                    _dbContext.SaveChanges();
                }



                var employeeEducation = _dbContext.EmployeeEducationDetails.Where(e => e.EmployeeId == id).ToList();
                if (employeeEducation.Any())
                {
                    foreach (var e in employeeEducation)
                    {
                        _dbContext.EmployeeEducationDetails.Remove(e);
                    }
                }

                var employeeRelation = _dbContext.EmployeeRelationshipDetails.Where(e => e.EmployeeId == id).ToList();
                if (employeeRelation.Any())
                {
                    foreach (var e in employeeRelation)
                    {
                        _dbContext.EmployeeRelationshipDetails.Remove(e);
                    }
                }

                var employeeDocuments = _dbContext.EmployeeDocuments.Where(e => e.EmployeeId == id).ToList();
                if (employeeDocuments.Any())
                {
                    foreach (var e in employeeDocuments)
                    {
                        _dbContext.EmployeeDocuments.Remove(e);
                    }
                }

                var employeeLeave = _dbContext.EmployeeLeaves.Where(e => e.EmployeeId == id).ToList();
                if (employeeLeave.Any())
                {
                    foreach (var e in employeeLeave)
                    {
                        _dbContext.EmployeeLeaves.Remove(e);
                    }
                }

                var employeeLeaveSummary = _dbContext.EmployeeLeaveSummary.Where(e => e.EmployeeId == id).ToList();
                if (employeeLeaveSummary.Any())
                {
                    foreach (var e in employeeLeaveSummary)
                    {
                        _dbContext.EmployeeLeaveSummary.Remove(e);
                    }
                }

                _dbContext.Employees.Remove(employee);
                await _dbContext.SaveChangesAsync();

                var user = await userManager.FindByEmailAsync(employeeEmail);
                if (user != null)
                {
                    await userManager.DeleteAsync(user);
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }


        public async Task<List<SalaryEmployeeDashboardModel>> GetDashboardForEmployeeSalary(string loggedUserId, string userRole)
        {
            try
            {
                var targetEmployeeId = CheckValidEmployeeId(loggedUserId);
                if (targetEmployeeId == -1)
                {
                    throw new Exception("Invalid User data");
                }

                var employeeData = new List<SalaryEmployeeDashboardModel>();

                //var Employee = await _dbContext.Employees.ToListAsync();
                //return mapper.Map<List<EmployeeModel>>(Employee);

                if (userRole != "HR Admin")
                {
                    employeeData = (from e in _dbContext.Employees.Where(s => !s.IsDeleted && (s.EmployeeReportToId == targetEmployeeId || s.Id == targetEmployeeId))
                                    select new SalaryEmployeeDashboardModel
                                    {
                                        Id = e.Id,
                                        EmployeeNumber = e.EmployeeNumber,
                                        FullName = e.FirstName + " " + e.MiddleName + " " + e.LastName,
                                        Email = e.Email,
                                        DepartmentName = e.EmployeeDepartment == null ? "" : e.EmployeeDepartment.Name,
                                        DesignationName = e.EmployeeDesignation == null ? "" : e.EmployeeDesignation.Name,
                                        
                                    }).ToList();
                }
                else
                {
                    employeeData = (from e in _dbContext.Employees.Where(s => !s.IsDeleted)
                                    select new SalaryEmployeeDashboardModel
                                    {
                                        Id = e.Id,
                                        EmployeeNumber = e.EmployeeNumber,
                                        FullName = e.FirstName + " " + e.MiddleName + " " + e.LastName,
                                        Email = e.Email,
                                        DepartmentName = e.EmployeeDepartment == null ? "" : e.EmployeeDepartment.Name,
                                        DesignationName = e.EmployeeDesignation == null ? "" : e.EmployeeDesignation.Name,
                                    }).ToList();
                }




                if (employeeData != null)
                {
                    return employeeData;
                }
                else
                {
                    return new List<SalaryEmployeeDashboardModel>();
                }
            }
            catch (Exception ex)
            {
                return new List<SalaryEmployeeDashboardModel>();
            }

        }

        public async Task<SalaryEmployeeDashboardModel> EmployeePartialDetailsById(int employeeId)
        {

            var employeeData = (from e in _dbContext.Employees.Where(s => s.Id == employeeId)
                                select new SalaryEmployeeDashboardModel
                                {
                                    Id = e.Id,
                                    EmployeeNumber = e.EmployeeNumber,
                                    FullName = e.FirstName + " " + e.MiddleName + " " + e.LastName,
                                    Email = e.Email,
                                    DepartmentName = e.EmployeeDepartment == null ? "" : e.EmployeeDepartment.Name,
                                    DesignationName = e.EmployeeDesignation == null ? "" : e.EmployeeDesignation.Name,

                                });


            if (employeeData != null)
            {
                return await employeeData.FirstOrDefaultAsync();
            }
            else
            {
                return new SalaryEmployeeDashboardModel();
            }

        }











        #region Leave management


        //public async Task<List<EmployeeLeaveSummaryModel>> GetEmployeeLeaves(string loggedUserId)
        //{
        //    try
        //    {
        //        var employeeId = CheckValidEmployeeId(loggedUserId);
        //        /*if (employeeId == -1)
        //        {
        //            throw new Exception("Invalid User data");
        //        }*/


        //        //var defaultLeaves = await _dbContext.EmployeeDefaultLeave.Include(x => x.EmployeeLeaveTypes).ToListAsync();

        //        var defaultLeaves = (from ed in _dbContext.EmployeeDefaultLeave
        //                             select new EmployeeLeaveSummaryModel
        //                             {
        //                                 Id = ed.EmployeeLeaveTypeId.HasValue ? ed.EmployeeLeaveTypeId.Value : 0,
        //                                 EmployeeLeaveType = ed.EmployeeLeaveTypes.Name,
        //                                 TotalLeaves = ed.TotalLeaves,
        //                                 RemainingLeaves = ed.TotalLeaves
        //                             }).ToList();

        //        var employeeLeaveData = (from el in _dbContext.EmployeeLeaveSummary.Where(s => s.EmployeeId == employeeId)
        //                                 select new EmployeeLeaveSummaryModel
        //                                 {
        //                                     EmployeeLeaveSummaryId = el.Id,
        //                                     Id = el.EmployeeLeaveTypeId.HasValue ? el.EmployeeLeaveTypeId.Value : 0,
        //                                     EmployeeLeaveType = el.EmployeeLeaveTypes.Name,
        //                                     TotalLeaves = el.TotalLeaves,
        //                                     RemainingLeaves = el.RemainingLeaves
        //                                 }).ToList();

        //        if (employeeLeaveData.Count > 0)
        //        {
        //            var employeeLeaveHistory = _dbContext.EmployeeLeaves.Where(s => s.EmployeeId == employeeId).ToList();
        //            var isLeaveMismatch = false;
        //            if (employeeLeaveHistory.Count > 0)
        //            {
        //                foreach(var e in employeeLeaveData)
        //                {
        //                    var employeeLeave = employeeLeaveHistory.Where(s => s.EmployeeLeaveTypeId == e.Id).Sum(s => s.LeaveDays);
        //                    var remainingLeaves = e.TotalLeaves - employeeLeave;
        //                    if(e.RemainingLeaves != remainingLeaves)
        //                    {
        //                        isLeaveMismatch = true;
        //                        e.RemainingLeaves = remainingLeaves;
        //                        var employeeLeaveSummary = _dbContext.EmployeeLeaveSummary.FirstOrDefault(s => s.Id == e.EmployeeLeaveSummaryId);
        //                        if (employeeLeaveSummary != null)
        //                        {
        //                            employeeLeaveSummary.RemainingLeaves = remainingLeaves;
        //                            _dbContext.EmployeeLeaveSummary.Update(employeeLeaveSummary);
        //                        }
        //                    }
        //                }

        //                if (isLeaveMismatch)
        //                {
        //                    _dbContext.SaveChanges();
        //                }
        //            }
        //            return employeeLeaveData;
        //        }
        //        else
        //        {
        //            return defaultLeaves;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception (use your preferred logging framework)
        //        Console.WriteLine(ex.ToString());

        //        // Optionally, rethrow the exception or handle it accordingly
        //        throw new Exception("An error occurred while fetching the employee leaves.", ex);
        //    }

        //}



        public async Task<List<EmployeeLeaveSummaryModel>> GetEmployeeLeaves(string loggedUserId, int? employeeId)
        {
            try
            {
                // If employeeId is not provided or invalid, check for a valid loggedUserId
                if (!employeeId.HasValue || employeeId.Value == -1)
                {
                    if (!string.IsNullOrEmpty(loggedUserId))
                    {
                        employeeId = CheckValidEmployeeId(loggedUserId);
                    }
                }

                if (employeeId.HasValue && employeeId.Value != -1)
                {
                    //var defaultLeaves = (from ed in _dbContext.EmployeeDefaultLeave
                    //                     select new EmployeeLeaveSummaryModel
                    //                     {
                    //                         Id = ed.EmployeeLeaveTypeId.HasValue ? ed.EmployeeLeaveTypeId.Value : 0,
                    //                         EmployeeLeaveType = ed.EmployeeLeaveTypes.Name,
                    //                         TotalLeaves = ed.TotalLeaves,
                    //                         RemainingLeaves = ed.TotalLeaves
                    //                     }).ToList();

                    var employeeLeaveData = (from el in _dbContext.EmployeeLeaveSummary.Where(s => s.EmployeeId == employeeId.Value)
                                             select new EmployeeLeaveSummaryModel
                                             {
                                                 EmployeeLeaveSummaryId = el.Id,
                                                 Id = el.EmployeeLeaveTypeId.HasValue ? el.EmployeeLeaveTypeId.Value : 0,
                                                 EmployeeLeaveType = el.EmployeeLeaveTypes.Name,
                                                 TotalLeaves = el.TotalLeaves,
                                                 RemainingLeaves = el.RemainingLeaves
                                             }).ToList();

                    if (employeeLeaveData.Count > 0)
                    {
                        var employeeLeaveHistory = _dbContext.EmployeeLeaves.Where(s => s.EmployeeId == employeeId.Value).ToList();
                        var isLeaveMismatch = false;
                        if (employeeLeaveHistory.Count > 0)
                        {
                            foreach (var e in employeeLeaveData)
                            {
                                var employeeLeave = employeeLeaveHistory.Where(s => s.EmployeeLeaveTypeId == e.Id).Sum(s => s.LeaveDays);
                                var remainingLeaves = e.TotalLeaves - employeeLeave;
                                if (e.RemainingLeaves != remainingLeaves)
                                {
                                    isLeaveMismatch = true;
                                    e.RemainingLeaves = remainingLeaves;
                                    var employeeLeaveSummary = _dbContext.EmployeeLeaveSummary.FirstOrDefault(s => s.Id == e.EmployeeLeaveSummaryId);
                                    if (employeeLeaveSummary != null)
                                    {
                                        employeeLeaveSummary.RemainingLeaves = remainingLeaves;
                                        _dbContext.EmployeeLeaveSummary.Update(employeeLeaveSummary);
                                    }
                                }
                            }

                            if (isLeaveMismatch)
                            {
                                _dbContext.SaveChanges();
                            }
                        }
                        return employeeLeaveData;
                    }
                    else
                    {
                        return new List<EmployeeLeaveSummaryModel>();
                    }
                }
                else
                {
                    return new List<EmployeeLeaveSummaryModel>();
                }
            }
            catch (Exception ex)
            {
                // Log the exception (use your preferred logging framework)
                Console.WriteLine(ex.ToString());

                // Optionally, rethrow the exception or handle it accordingly
                throw new Exception("An error occurred while fetching the employee leaves.", ex);
            }
        }






        public async Task<EmployeeLeaveModel> AddLeave(EmployeeLeaveModel employeeLeaveData, string loggedUserId)
        {
            try
            {
                var returnData = new EmployeeLeaveModel();
                var employeeId = CheckValidEmployeeId(loggedUserId);
                if (employeeId == -1)
                {
                    throw new Exception("Invalid User data");
                }


                var leaveSummary = await _dbContext.EmployeeLeaveSummary.FirstAsync(x => x.EmployeeId == employeeId && x.EmployeeLeaveTypeId == employeeLeaveData.EmployeeLeaveTypeId);

                if (leaveSummary.RemainingLeaves <= 0)
                {
                    return returnData;
                    throw new Exception("Applied leavs are more than available leave for employee. Can not add more leaves");
                }
                else
                {
                    _dbContext.EmployeeLeaveSummary.Update(leaveSummary);
                }
                leaveSummary.RemainingLeaves = leaveSummary.RemainingLeaves - employeeLeaveData.LeaveDays;
                employeeLeaveData.EmployeeId = employeeId;

                EmployeeLeave employeeLeave = new EmployeeLeave();
                employeeLeave.EmployeeId = employeeId;
                employeeLeave.Status = employeeLeaveData.Status;
                employeeLeave.Description = string.IsNullOrEmpty(employeeLeaveData.Description) ? "" : employeeLeaveData.Description;
                employeeLeave.Reason = string.IsNullOrEmpty(employeeLeaveData.Reason) ? "" : employeeLeaveData.Reason;
                employeeLeave.StartDate = employeeLeaveData.StartDate.HasValue ? employeeLeaveData.StartDate.Value : DateTime.Now;
                employeeLeave.EndDate = employeeLeaveData.EndDate.HasValue ? employeeLeaveData.EndDate.Value : DateTime.Now;
                employeeLeave.LeaveDays = employeeLeaveData.LeaveDays;
                employeeLeave.EmployeeLeaveTypeId = employeeLeaveData.EmployeeLeaveTypeId;

                _dbContext.EmployeeLeaves.Add(employeeLeave);

                _dbContext.SaveChanges();

                var employee = await _dbContext.Employees.FirstAsync(s => s.Id == employeeId);
                if (employee.EmployeeReportToId.HasValue)
                {
                    var employeeLeaveType = await _dbContext.EmployeeLeaveType.FirstAsync(s => s.Id == employeeLeaveData.EmployeeLeaveTypeId);
                    var reportToEmployee = await _dbContext.Employees.FirstAsync(s => s.Id == employee.EmployeeReportToId.Value);
                    var pendingRequestEmailModel = new LeaveEmailModel();
                    pendingRequestEmailModel.LeaveEmailType = "Pending Request";
                    pendingRequestEmailModel.EmployeeName = employee.FirstName + " " + employee.LastName;
                    pendingRequestEmailModel.ApprovalStatus = "Pending";
                    pendingRequestEmailModel.RequestType = (employeeLeaveType == null) ? "" : employeeLeaveType.Name;
                    pendingRequestEmailModel.ManagerName = reportToEmployee.FirstName;
                    pendingRequestEmailModel.TotalDays = (int)employeeLeaveData.LeaveDays;
                    pendingRequestEmailModel.Reason = string.IsNullOrEmpty(employeeLeaveData.Reason) ? "" : employeeLeaveData.Reason;
                    pendingRequestEmailModel.StartDate = employeeLeaveData.StartDate.HasValue ? employeeLeaveData.StartDate.Value : DateTime.Now;
                    pendingRequestEmailModel.EndDate = employeeLeaveData.EndDate.HasValue ? employeeLeaveData.EndDate.Value : DateTime.Now;



                    SendPendingRequestEmailToManager(reportToEmployee.Email, pendingRequestEmailModel);
                }

                return employeeLeaveData;
            }
            catch (Exception ex)
            {
                // Log the exception (use your preferred logging framework)
                Console.WriteLine(ex.ToString());

                // Optionally, rethrow the exception or handle it accordingly
                throw new Exception("An error occurred while adding the employee leaves.", ex);
            }


        }

        public async Task<EmployeeLeaveModel> UpdateLeave(EmployeeLeaveModel employeeLeaveData, string loggedUserId)
        {
            try
            {
                var employeeId = CheckValidEmployeeId(loggedUserId);
                if (employeeId == -1)
                {
                    throw new Exception("Invalid User data");
                }

                employeeLeaveData.EmployeeId = employeeId;


                var employeeLeave = _dbContext.EmployeeLeaves.FirstOrDefault(x => x.Id == employeeLeaveData.Id);

                if (DateTime.Compare(employeeLeave.StartDate, DateTime.Now) < 0)
                {
                    throw new Exception("This leave is in past. Can not update leave data");
                }

                if (employeeLeave != null)
                {
                    employeeLeave.Status = employeeLeaveData.Status;
                    employeeLeave.Description = string.IsNullOrEmpty(employeeLeaveData.Description) ? "" : employeeLeaveData.Description;
                    employeeLeave.Reason = string.IsNullOrEmpty(employeeLeaveData.Reason) ? "" : employeeLeaveData.Reason;
                    employeeLeave.StartDate = employeeLeaveData.StartDate.HasValue ? employeeLeaveData.StartDate.Value : DateTime.Now;
                    employeeLeave.EndDate = employeeLeaveData.EndDate.HasValue ? employeeLeaveData.EndDate.Value : DateTime.Now;
                    employeeLeave.LeaveDays = employeeLeaveData.LeaveDays;
                    employeeLeave.EmployeeLeaveTypeId = employeeLeaveData.EmployeeLeaveTypeId;

                    _dbContext.EmployeeLeaves.Update(employeeLeave);
                }

                _dbContext.SaveChanges();


                return employeeLeaveData;
            }
            catch (Exception ex)
            {
                // Log the exception (use your preferred logging framework)
                Console.WriteLine(ex.ToString());

                // Optionally, rethrow the exception or handle it accordingly
                throw new Exception("An error occurred while updating the employee leaves.", ex);
            }
        }

        public async Task CancelLeave(int employeeLeaveId, string loggedUserId)
        {
            try
            {
                var employeeId = CheckValidEmployeeId(loggedUserId);
                if (employeeId == -1)
                {
                    throw new Exception("Invalid User data");
                }

                var employeeLeave = _dbContext.EmployeeLeaves.FirstOrDefault(x => x.Id == employeeLeaveId);

                if (DateTime.Compare(employeeLeave.StartDate, DateTime.Now) < 0)
                {
                    throw new Exception("This leave is in past. Can not delete leave data");
                }

                var leaveSummary = await _dbContext.EmployeeLeaveSummary.FirstAsync(x => x.EmployeeId == employeeId && x.EmployeeLeaveTypeId == employeeLeave.EmployeeLeaveTypeId);
                leaveSummary.RemainingLeaves += employeeLeave.LeaveDays;

                if (leaveSummary.RemainingLeaves > leaveSummary.TotalLeaves)
                {
                    leaveSummary.RemainingLeaves = leaveSummary.TotalLeaves;
                }

                _dbContext.EmployeeLeaves.Remove(employeeLeave);
                _dbContext.EmployeeLeaveSummary.Update(leaveSummary);

                _dbContext.SaveChanges();

            }
            catch (Exception ex)
            {
                // Log the exception (use your preferred logging framework)
                Console.WriteLine(ex.ToString());

                // Optionally, rethrow the exception or handle it accordingly
                throw new Exception("An error occurred while deleting the employee leaves.", ex);
            }
        }

        public async Task<EmployeeLeave> ApproveLeave(int leaveId)
        {
            var employeeLeave = await _dbContext.EmployeeLeaves
                .Include(l => l.employee)
                .Include(l => l.EmployeeLeaveTypes)
                .FirstOrDefaultAsync(l => l.Id == leaveId);

            if (employeeLeave != null)
            {
                if (employeeLeave.Status == LeaveStatus.Approved)
                {
                    return employeeLeave;
                }

                else if (employeeLeave.Status == LeaveStatus.Pending)
                {
                    employeeLeave.Status = LeaveStatus.Approved;
                    await _dbContext.SaveChangesAsync();

                    var emailModel = new EmailModel<LeaveEmailModel>
                    {
                        From = "hr@company.com",
                        To = employeeLeave.employee.Email,
                        Subject = "Leave Approval Notification",
                        repModel = new LeaveEmailModel
                        {
                            LeaveEmailType = "Approval",
                            EmployeeName = $"{employeeLeave.employee.FirstName} {employeeLeave.employee.LastName}",
                            ApprovalStatus = "Approved",
                            StartDate = employeeLeave.StartDate,
                            EndDate = employeeLeave.EndDate,
                            TotalDays = (int)employeeLeave.LeaveDays,
                            Reason = employeeLeave.Reason,
                            RequestType = employeeLeave.EmployeeLeaveTypes.Name
                        }
                    };

                    await _emailService.SendLeaveEmail(emailModel);
                }
                else
                {
                    throw new Exception("Cannot Approve Rejected Leave");
                }
            }
            return employeeLeave;
        }
        public async Task<EmployeeLeave> RejectLeave(int leaveId)
        {
            var employeeLeave = await _dbContext.EmployeeLeaves
                .Include(l => l.employee)
                .Include(l => l.EmployeeLeaveTypes)
                .FirstOrDefaultAsync(l => l.Id == leaveId);
            if (employeeLeave.Status == LeaveStatus.Rejected)
            {
                return employeeLeave;
            }

            if (employeeLeave != null)
            {
                employeeLeave.Status = LeaveStatus.Rejected;
                var leaveSummary = await _dbContext.EmployeeLeaveSummary
                    .FirstAsync(x => x.EmployeeId == employeeLeave.EmployeeId && x.EmployeeLeaveTypeId == employeeLeave.EmployeeLeaveTypeId);
                leaveSummary.RemainingLeaves += employeeLeave.LeaveDays;
                _dbContext.EmployeeLeaves.Update(employeeLeave);
                _dbContext.EmployeeLeaveSummary.Update(leaveSummary);

                await _dbContext.SaveChangesAsync();

                var emailModel = new EmailModel<LeaveEmailModel>
                {
                    From = "hr@company.com",
                    To = employeeLeave.employee.Email,
                    Subject = "Leave Rejection Notification",
                    repModel = new LeaveEmailModel
                    {
                        LeaveEmailType = "Approval",
                        EmployeeName = $"{employeeLeave.employee.FirstName} {employeeLeave.employee.LastName}",
                        ApprovalStatus = "Rejected",
                        StartDate = employeeLeave.StartDate,
                        EndDate = employeeLeave.EndDate,
                        TotalDays = (int)employeeLeave.LeaveDays,
                        Reason = employeeLeave.Reason,
                        RequestType = employeeLeave.EmployeeLeaveTypes.Name
                    }
                };

                await _emailService.SendLeaveEmail(emailModel);
            }
            return employeeLeave;
        }
        public int CheckValidEmployeeId(string loggedUserId)
        {
            // Check if the loggedUserId can be parsed to a GUID
            if (!Guid.TryParse(loggedUserId, out Guid userGuid))
            {
                return -1;
                throw new Exception("Invalid User ID");

            }

            // Find Employee ID
            var employee = _dbContext.Employees.FirstOrDefault(x => x.UserId == userGuid);
            if (employee == null)
            {
                return -1;
                throw new Exception("User was not found");

            }

            return employee.Id;
        }

        public async Task<EmployeeSalary> ApproveSalary(int salaryId, string loggedUserId, int employeeId)
        {
            var employeeSalary = new EmployeeSalary();
            var targetEmployeeId = CheckValidEmployeeId(loggedUserId);
            if (targetEmployeeId == -1)
            {
                throw new Exception("Invalid User data");
                return employeeSalary;
            }

            var employee = _dbContext.Employees.Include(e=>e.EmployeeWorkInformation).FirstOrDefault(s => s.Id == employeeId);
            if (employee != null)
            {
                employeeSalary = _dbContext.EmployeeSalaries.FirstOrDefault(s => s.Id == salaryId && s.EmployeeId == employeeId);
                if (employeeSalary != null)
                {
                    if (employeeSalary.SalaryStatus == SalaryStatus.Approved)
                    {
                        return employeeSalary;
                    }
                    else if (employeeSalary.SalaryStatus == SalaryStatus.Pending)
                    {
                        employeeSalary.UpdatedBy = targetEmployeeId;
                        employeeSalary.UpdatedDateTime = DateTime.Now;
                        if (employee.EmployeeReportToId == targetEmployeeId)
                        {
                            employeeSalary.IsApprovedByDepartmentHead = true;
                        }

                        if (!employeeSalary.IsApprovedByHRHead)
                        {
                            var HRHeadRole = roleManager.Roles.FirstOrDefault(x => x.Name == "HR Admin");
                            var HRHeadEmployee = new Employee();
                            if (HRHeadRole != null)
                            {
                                HRHeadEmployee = _dbContext.Employees.FirstOrDefault(s => s.RoleId == HRHeadRole.Id);
                                if (HRHeadEmployee.Id == targetEmployeeId)
                                {
                                    employeeSalary.IsApprovedByHRHead = true;
                                }
                            }
                        }
                        
                        if (employeeSalary.IsApprovedByDepartmentHead && employeeSalary.IsApprovedByHRHead)
                        {
                            employeeSalary.SalaryStatus = SalaryStatus.Approved;
                        }
                    }

                    _dbContext.EmployeeSalaries.Update(employeeSalary);
                    _dbContext.SaveChanges();
                }

                employeeSalary = _dbContext.EmployeeSalaries.FirstOrDefault(s => s.Id == salaryId && s.EmployeeId == employeeId);
                if (employeeSalary != null)
                {
                    var isHRHeadApprove = employeeSalary.IsApprovedByHRHead;
                    var isDepartmentHeadApprove = employeeSalary.IsApprovedByDepartmentHead;

                    if (isHRHeadApprove && isDepartmentHeadApprove)
                    {
                        var employeeWorkInfo = _dbContext.EmployeeWorkInformations.FirstOrDefault(s => s.Id == employee.EmployeeWorkInformationId);
                        if(employeeWorkInfo != null)
                        {
                            if (employeeSalary.SalaryType == SalaryType.OnRoll)
                            {
                                employeeWorkInfo.SalaryType = employeeSalary.SalaryType;
                                employeeWorkInfo.Salary = employeeSalary.ExpectedToBeSalary;
                                employeeWorkInfo.Basic = employeeSalary.Basic;
                                employeeWorkInfo.HRAllowances = employeeSalary.HRAllowances;
                                employeeWorkInfo.Bonus = employeeSalary.Bonus;
                                employeeWorkInfo.Gratuity = employeeSalary.Gratuity;
                                employeeWorkInfo.PF = employeeSalary.PF;
                                employeeWorkInfo.ESI = employeeSalary.ESI;
                                employeeWorkInfo.PT = employeeSalary.PT;
                            }
                            else
                            {
                                 employeeWorkInfo.SalaryType = employeeSalary.SalaryType;
                                employeeWorkInfo.Salary = employeeSalary.ExpectedToBeSalary;
                            }

                            _dbContext.EmployeeWorkInformations.Update(employeeWorkInfo);
                            _dbContext.SaveChanges();

                            var employeeSalaryInfoEmail = new EmployeeSalaryUpdateEmailModel();
                            employeeSalaryInfoEmail.EmployeeName = employee.FirstName + " " + employee.LastName;
                            employeeSalaryInfoEmail.ApprovalStatus = "Approve";
                            var reportToEmployee = _dbContext.Employees.FirstOrDefault(s => s.Id == employee.EmployeeReportToId);

                            if (reportToEmployee != null)
                            {
                                employeeSalaryInfoEmail.ManagerName = reportToEmployee.FirstName;
                            }


                            employeeSalaryInfoEmail.CurrentSalary = employeeSalary.CurrentSalary;
                            employeeSalaryInfoEmail.ExpectedToBeSalary = employeeSalary.ExpectedToBeSalary;
                            employeeSalaryInfoEmail.UpdatedDate = DateTime.Now;

                            SendPendingSalaryRequestEmailToEmployee(employee.Email, employeeSalaryInfoEmail);
                        }
                    }
                }

            }


            return employeeSalary;
        }

        public async Task<EmployeeSalary> RejectSalary(int salaryId, string loggedUserId, int employeeId)
        {
            var employeeSalary = new EmployeeSalary();
            var targetEmployeeId = CheckValidEmployeeId(loggedUserId);
            if (targetEmployeeId == -1)
            {
                throw new Exception("Invalid User data");
                return employeeSalary;
            }

            var employee = _dbContext.Employees.FirstOrDefault(s => s.Id == employeeId);
            if (employee != null)
            {
                employeeSalary = _dbContext.EmployeeSalaries.FirstOrDefault(s => s.Id == salaryId && s.EmployeeId == employeeId);
                if (employeeSalary != null)
                {
                    if (employeeSalary.SalaryStatus == SalaryStatus.Rejected)
                    {
                        return employeeSalary;
                    }
                    else if (employeeSalary.SalaryStatus == SalaryStatus.Pending)
                    {
                        employeeSalary.UpdatedBy = targetEmployeeId;
                        employeeSalary.UpdatedDateTime = DateTime.Now;
                        if (employee.EmployeeReportToId == targetEmployeeId)
                        {
                            employeeSalary.IsApprovedByDepartmentHead = false;
                        }

                        var HRHeadRole = roleManager.Roles.FirstOrDefault(x => x.Name == "HR Admin");
                        var HRHeadEmployee = new Employee();
                        if (HRHeadRole != null)
                        {
                            HRHeadEmployee = _dbContext.Employees.FirstOrDefault(s => s.RoleId == HRHeadRole.Id);
                            if (HRHeadEmployee.Id == targetEmployeeId)
                            {
                                employeeSalary.IsApprovedByHRHead = false;
                            }
                        }

                        employeeSalary.SalaryStatus = SalaryStatus.Rejected;
                    }

                    _dbContext.EmployeeSalaries.Update(employeeSalary);
                    _dbContext.SaveChanges();

                    var employeeSalaryInfoEmail = new EmployeeSalaryUpdateEmailModel();
                    employeeSalaryInfoEmail.EmployeeName = employee.FirstName + " " + employee.LastName;
                    employeeSalaryInfoEmail.ApprovalStatus = "Reject";
                    var reportToEmployee = _dbContext.Employees.FirstOrDefault(s => s.Id == employee.EmployeeReportToId);

                    if (reportToEmployee != null)
                    {
                        employeeSalaryInfoEmail.ManagerName = reportToEmployee.FirstName;
                    }


                    employeeSalaryInfoEmail.CurrentSalary = employeeSalary.CurrentSalary;
                    employeeSalaryInfoEmail.ExpectedToBeSalary = employeeSalary.ExpectedToBeSalary;
                    employeeSalaryInfoEmail.UpdatedDate = DateTime.Now;

                    SendPendingSalaryRequestEmailToEmployee(employee.Email, employeeSalaryInfoEmail);
                }
            }


            return employeeSalary;
        }

        public async Task<List<EmployeeSalaryDataModel>> GetAllPenidngSalaryRequestList(string loggedUserId)
        {
            var returnData = new List<EmployeeSalaryDataModel>();
            var targetEmployeeId = CheckValidEmployeeId(loggedUserId);
            if (targetEmployeeId == -1)
            {
                //throw new Exception("Invalid User data");
                return returnData;
            }

            var HRHeadRole = roleManager.Roles.FirstOrDefault(x => x.Name == "HR Admin");
            var HRHeadEmployee = new Employee();
            if (HRHeadRole != null)
            {
                HRHeadEmployee = _dbContext.Employees.FirstOrDefault(s => s.RoleId == HRHeadRole.Id);
                if (HRHeadEmployee.Id == targetEmployeeId)
                {

                    returnData = (from es in _dbContext.EmployeeSalaries.Where(s => s.SalaryStatus == SalaryStatus.Pending && s.EmployeeId.HasValue)
                                  join e in _dbContext.Employees on es.UpdatedBy equals e.Id into employee_default
                                  from ed in employee_default.DefaultIfEmpty()
                                  select new EmployeeSalaryDataModel
                                  {
                                      Salaryid = es.Id,
                                      EmployeeId = es.EmployeeId,
                                      EmployeeName = es.Employee.FirstName + " " + es.Employee.LastName,
                                      SalaryType = es.SalaryType,
                                      ManagerName = ed.EmployeeReportTo.FirstName + " " + ed.EmployeeReportTo.LastName,
                                      SalaryStatus = es.SalaryStatus,
                                      IsApprovedByDepartmentHead = es.IsApprovedByDepartmentHead,
                                      IsApprovedByHRHead = es.IsApprovedByHRHead,
                                      CurrentSalary = es.CurrentSalary,
                                      ExpectedToBeSalary = es.ExpectedToBeSalary,
                                      UpdatedDateTime = (es.UpdatedDateTime.HasValue ? es.UpdatedDateTime.Value.ToString("yyyy-MM-dd") : ""),
                                      UpdatedBy = es.UpdatedBy,
                                      UpdatedByUserName = (ed == null) ? "" : ed.FirstName + " " + ed.LastName,
                                  }).ToList();
                }
                else
                {
                    var employeeData = _dbContext.Employees.Where(s => s.EmployeeReportToId == targetEmployeeId);
                    returnData = (from es in _dbContext.EmployeeSalaries.Where(s => s.SalaryStatus == SalaryStatus.Pending && s.EmployeeId.HasValue)
                                  join er in employeeData on es.EmployeeId equals er.Id
                                  join e in _dbContext.Employees on es.UpdatedBy equals e.Id into employee_default
                                  from ed in employee_default.DefaultIfEmpty()
                                  select new EmployeeSalaryDataModel
                                  {
                                      Salaryid = es.Id,
                                      EmployeeId = es.EmployeeId,
                                      EmployeeName = es.Employee.FirstName + " " + es.Employee.LastName,
                                      SalaryType = es.SalaryType,
                                      ManagerName = ed.EmployeeReportTo.FirstName + " " + ed.EmployeeReportTo.LastName,
                                      SalaryStatus = es.SalaryStatus,
                                      IsApprovedByDepartmentHead = es.IsApprovedByDepartmentHead,
                                      IsApprovedByHRHead = es.IsApprovedByHRHead,
                                      CurrentSalary = es.CurrentSalary,
                                      ExpectedToBeSalary = es.ExpectedToBeSalary,
                                      UpdatedDateTime = (es.UpdatedDateTime.HasValue ? es.UpdatedDateTime.Value.ToString("yyyy-MM-dd") : ""),
                                      UpdatedBy = es.UpdatedBy,
                                      UpdatedByUserName = (ed == null) ? "" : ed.FirstName + " " + ed.LastName,
                                  }).ToList();
                }
            }
           

            return returnData;



        }

        public async Task<List<EmployeeSalaryDataModel>> GetEmployeeSalaryRequestList(string loggedUserId,int employeeId)
        {
            var returnData = new List<EmployeeSalaryDataModel>();
            var targetEmployeeId = CheckValidEmployeeId(loggedUserId);
            if (targetEmployeeId == -1)
            {
                throw new Exception("Invalid User data");
                return returnData;
            }

            returnData = (from es in _dbContext.EmployeeSalaries.Where(s => s.EmployeeId == employeeId)
                          join e in _dbContext.Employees on es.UpdatedBy equals e.Id into employee_default
                          from ed in employee_default.DefaultIfEmpty()
                          select new EmployeeSalaryDataModel
                          {
                              Salaryid=es.Id,
                              EmployeeId = es.EmployeeId,
                              EmployeeName = es.Employee.FirstName + " " + es.Employee.LastName,
                              SalaryType = es.SalaryType,
                              ManagerName = ed.EmployeeReportTo.FirstName + " " + ed.EmployeeReportTo.LastName,
                              SalaryStatus = es.SalaryStatus,
                              IsApprovedByDepartmentHead = es.IsApprovedByDepartmentHead,
                              IsApprovedByHRHead = es.IsApprovedByHRHead,
                              CurrentSalary = es.CurrentSalary,
                              ExpectedToBeSalary = es.ExpectedToBeSalary,
                              UpdatedDateTime = (es.UpdatedDateTime.HasValue ? es.UpdatedDateTime.Value.ToString("yyyy-MM-dd") : ""),
                              UpdatedBy = es.UpdatedBy,
                              UpdatedByUserName = (ed == null) ? "" : ed.FirstName + " " + ed.LastName,
                          }).ToList();

            return returnData;



        }

        #endregion

        #region Private methods

        private void UpdateSalaryInformation(EmployeeSalaryUpdateModel salaryInfo)
        {
            var employee = _dbContext.Employees.FirstOrDefault(s => s.Id == salaryInfo.EmployeeId);
            if (employee != null)
            {
                EmployeeSalary employeeSalary = new EmployeeSalary();
                employeeSalary.EmployeeId = salaryInfo.EmployeeId;
                employeeSalary.SalaryType = salaryInfo.SalaryType;
                employeeSalary.SalaryStatus = SalaryStatus.Pending;
                employeeSalary.IsApprovedByDepartmentHead = false;
                employeeSalary.IsApprovedByHRHead = false;
                employeeSalary.CurrentSalary = salaryInfo.CurrentSalary;
                employeeSalary.ExpectedToBeSalary = salaryInfo.ExpectedToBeSalary;
                employeeSalary.Basic = salaryInfo.Basic;
                employeeSalary.HRAllowances = salaryInfo.HRAllowances;
                employeeSalary.Bonus = salaryInfo.Bonus;
                employeeSalary.Gratuity = salaryInfo.Gratuity;
                employeeSalary.PF = salaryInfo.PF;
                employeeSalary.ESI = salaryInfo.ESI;
                employeeSalary.PT = salaryInfo.PT;
                employeeSalary.UpdatedBy = null;
                employeeSalary.UpdatedDateTime = DateTime.Now;

                _dbContext.EmployeeSalaries.Add(employeeSalary);

                _dbContext.SaveChanges();

                var pendingSalaryRequestEmailList = new List<SalaryEmailModel>();
                var pendingRequestEmailModel = new SalaryEmailModel();



                var reportToEmployee = _dbContext.Employees.FirstOrDefault(s => s.Id == employee.EmployeeReportToId);
                if (reportToEmployee != null)
                {
                    pendingRequestEmailModel = new SalaryEmailModel();
                    pendingRequestEmailModel.SalaryType = "Pending Request for salary update";
                    pendingRequestEmailModel.EmployeeName = employee.FirstName + " " + employee.LastName;
                    pendingRequestEmailModel.ApprovalStatus = "Pending";
                    pendingRequestEmailModel.ManagerName = reportToEmployee.FirstName;
                    pendingRequestEmailModel.ManagerEmail = reportToEmployee.Email;
                    pendingRequestEmailModel.CurrentSalary = salaryInfo.CurrentSalary;
                    pendingRequestEmailModel.ExpectedToBeSalary = salaryInfo.ExpectedToBeSalary;
                    pendingRequestEmailModel.UpdatedDate = DateTime.Now;

                    pendingSalaryRequestEmailList.Add(pendingRequestEmailModel);

                }

                var HRHeadRole = roleManager.Roles.FirstOrDefault(x => x.Name == "HR Admin");
                var HRHeadEmployee = new Employee();
                if (HRHeadRole != null)
                {
                    HRHeadEmployee = _dbContext.Employees.FirstOrDefault(s => s.RoleId == HRHeadRole.Id);
                    if (HRHeadEmployee != null)
                    {
                        pendingRequestEmailModel = new SalaryEmailModel();
                        pendingRequestEmailModel.SalaryType = "Pending Request for salary update";
                        pendingRequestEmailModel.EmployeeName = employee.FirstName + " " + employee.LastName;
                        pendingRequestEmailModel.ApprovalStatus = "Pending";
                        pendingRequestEmailModel.ManagerName = HRHeadEmployee.FirstName;
                        pendingRequestEmailModel.ManagerEmail = HRHeadEmployee.Email;
                        pendingRequestEmailModel.CurrentSalary = salaryInfo.CurrentSalary;
                        pendingRequestEmailModel.ExpectedToBeSalary = salaryInfo.ExpectedToBeSalary;
                        pendingRequestEmailModel.UpdatedDate = DateTime.Now;

                        pendingSalaryRequestEmailList.Add(pendingRequestEmailModel);


                    }
                }

                var employeeSalaryInfoEmail = new EmployeeSalaryUpdateEmailModel();
                employeeSalaryInfoEmail.EmployeeName = employee.FirstName + " " + employee.LastName;
                employeeSalaryInfoEmail.ApprovalStatus = "Pending";
                if (reportToEmployee != null)
                {
                    employeeSalaryInfoEmail.ManagerName = reportToEmployee.FirstName;
                }

                if (HRHeadEmployee != null)
                {
                    employeeSalaryInfoEmail.HRManagerName = HRHeadEmployee.FirstName;
                }

                employeeSalaryInfoEmail.CurrentSalary = salaryInfo.CurrentSalary;
                employeeSalaryInfoEmail.ExpectedToBeSalary = salaryInfo.ExpectedToBeSalary;
                employeeSalaryInfoEmail.UpdatedDate = DateTime.Now;

                foreach (var salaryEmail in pendingSalaryRequestEmailList)
                {
                    SendPendingSalaryRequestEmailToManager(salaryEmail.ManagerEmail, salaryEmail);

                }

                //SendPendingSalaryRequestEmailToEmployee(employee.Email, employeeSalaryInfoEmail);
            }
        }

        private async Task SendEmail(ApplicationUser user, string password)
        {
            var WelcomeModelCredentials = new WelcomeModel();
            WelcomeModelCredentials.Username = user.UserName;
            WelcomeModelCredentials.Password = password;

            var emailModel = new EmailModel<WelcomeModel>();
            emailModel.From = "naupul30@gmail.com";
            emailModel.To = user.UserName;
            emailModel.Subject = "Welcome to Geo!";
            emailModel.repModel = WelcomeModelCredentials;
            _emailService.SendWelcomeMail(emailModel);

            emailModel = new EmailModel<WelcomeModel>();
            emailModel.From = "naupul30@gmail.com";
            emailModel.To = "hrgdr@geogroup.in";
            emailModel.Subject = "Welcome to Geo!";
            emailModel.repModel = WelcomeModelCredentials;
            _emailService.SendWelcomeMail(emailModel);
        }

        private async Task SendPendingRequestEmailToManager(string userEmail, LeaveEmailModel pendingRequestEmailModel)
        {

            var emailModel = new EmailModel<LeaveEmailModel>();
            emailModel.From = "naupul30@gmail.com";
            emailModel.To = userEmail;
            emailModel.Subject = $"Leave request from: {pendingRequestEmailModel.EmployeeName}";
            emailModel.repModel = pendingRequestEmailModel;
            _emailService.SendLeaveEmail(emailModel);
        }

        private async Task SendPendingSalaryRequestEmailToManager(string userEmail, SalaryEmailModel pendingRequestEmailModel)
        {

            var emailModel = new EmailModel<SalaryEmailModel>();
            emailModel.From = "naupul30@gmail.com";
            emailModel.To = userEmail;
            emailModel.Subject = $"Salary update request from: {pendingRequestEmailModel.EmployeeName}";
            emailModel.repModel = pendingRequestEmailModel;
            _emailService.SendSalaryUpdateEmail(emailModel);
        }

        private async Task SendPendingSalaryRequestEmailToEmployee(string userEmail, EmployeeSalaryUpdateEmailModel pendingRequestEmailModel)
        {

            var emailModel = new EmailModel<EmployeeSalaryUpdateEmailModel>();
            emailModel.From = "naupul30@gmail.com";
            emailModel.To = userEmail;
            emailModel.Subject = $"Salary update information";
            emailModel.repModel = pendingRequestEmailModel;
            _emailService.SendEmployeeSalaryUpdateEmail(emailModel);
        }

        #endregion

        #region Settings Tab 

        public async Task<DropdownModel> AddDropdownItem(DropdownModel model)
        {
            if (model.Category.Equals("Designation", StringComparison.OrdinalIgnoreCase))
            {
                var newDesignation = new EmployeeDesignation { Name = model.Name };
                _dbContext.EmployeeDesignations.Add(newDesignation);
                await _dbContext.SaveChangesAsync();
                model.Id = newDesignation.Id;
            }
            else if (model.Category.Equals("Department", StringComparison.OrdinalIgnoreCase))
            {
                var newDepartment = new EmployeeDepartment { Name = model.Name };
                _dbContext.EmployeeDepartments.Add(newDepartment);
                await _dbContext.SaveChangesAsync();
                model.Id = newDepartment.Id;
            }
            else if (model.Category.Equals("JobLevel", StringComparison.OrdinalIgnoreCase))
            {
                var newJobLevel = new JobLevelLeave { JobLevel = model.Name };
                _dbContext.JobLevelLeave.Add(newJobLevel);
                await _dbContext.SaveChangesAsync();
                model.Id = newJobLevel.Id;
            }

            else
            {
                throw new ArgumentException("Invalid category");
            }

            return model;
        }

        public async Task DeleteDropdownItem(int id, string dropdownName)
        {
            if (dropdownName.Equals("Designation", StringComparison.OrdinalIgnoreCase))
            {
                var designation = await _dbContext.EmployeeDesignations.FindAsync(id);
                if (designation != null)
                {
                    _dbContext.EmployeeDesignations.Remove(designation);
                    await _dbContext.SaveChangesAsync();
                    return;
                }
            }
            else if (dropdownName.Equals("Department", StringComparison.OrdinalIgnoreCase))
            {
                var department = await _dbContext.EmployeeDepartments.FindAsync(id);
                if (department != null)
                {
                    _dbContext.EmployeeDepartments.Remove(department);
                    await _dbContext.SaveChangesAsync();
                    return;
                }
            }
            else if (dropdownName.Equals("JobLevel", StringComparison.OrdinalIgnoreCase))
            {
                var jobLevel = await _dbContext.JobLevelLeave.FindAsync(id);
                if (jobLevel != null)
                {
                    _dbContext.JobLevelLeave.Remove(jobLevel);
                    await _dbContext.SaveChangesAsync();
                    return;
                }
            }

            throw new ArgumentException("Item not found");
        }

        public async Task<DropdownModel> UpdateDropdownItem(DropdownModel model)
        {
            if (model.Category.Equals("Designation", StringComparison.OrdinalIgnoreCase))
            {
                var designation = await _dbContext.EmployeeDesignations.FindAsync(model.Id);
                if (designation == null)
                    throw new ArgumentException("Designation not found");

                designation.Name = model.Name;
                await _dbContext.SaveChangesAsync();
            }
            else if (model.Category.Equals("Department", StringComparison.OrdinalIgnoreCase))
            {
                var department = await _dbContext.EmployeeDepartments.FindAsync(model.Id);
                if (department == null)
                    throw new ArgumentException("Department not found");

                department.Name = model.Name;
                await _dbContext.SaveChangesAsync();
            }
            else if (model.Category.Equals("JobLevel", StringComparison.OrdinalIgnoreCase))
            {
                var jobLevel = await _dbContext.JobLevelLeave.FindAsync(model.Id);
                if (jobLevel == null) throw new ArgumentException("Job Level not Found");
                jobLevel.JobLevel = model.Name;
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Invalid category");
            }

            return model;
        }

        public async Task<List<ProjectModel>> GetProjectsByEmployeeIdAsync(int employeeId)
        {
            try
            {
                var projects = await _dbContext.ProjectEmployees
                    .Where(pe => pe.EmployeeId == employeeId && !pe.IsDeleted)
                    .Select(pe => new ProjectModel
                    {
                        Id = pe.Project.Id,
                        ProjectName = string.IsNullOrEmpty(pe.Project.ProjectName) ? "" : pe.Project.ProjectName.Trim(),
                        ProjectNumber = string.IsNullOrEmpty(pe.Project.ProjectNumber) ? "" : pe.Project.ProjectNumber.Trim(),
                        ProjectDescription = string.IsNullOrEmpty(pe.Project.ProjectDescription) ? "" : pe.Project.ProjectDescription.Trim(),
                        StartDate = pe.Project.StartDate,
                        EndDate = pe.Project.EndDate,
                        WorkOrderName = pe.Project.WorkOrderName,
                        WorkOrderNumber = pe.Project.WorkOrderNumber,
                        WorkOrderDate = pe.Project.WorkOrderDate,
                        PeriodOfWorkInMonths = pe.Project.PeriodOfWorkInMonths,
                        Status = pe.Project.Status,
                        WorkOrderAmount = pe.Project.WorkOrderAmount
                    })
                    .ToListAsync();

                return projects;
            }
            catch (Exception ex)
            {
                // Log the exception
                // In a production environment, use a proper logging mechanism
                Console.WriteLine($"Error retrieving projects for employee: {ex.Message}");
                return new List<ProjectModel>();
            }
        }



        #endregion

        public async Task<(bool isValid, string errorMessage)> ValidateLeaveRequest(DateTime startDate, DateTime endDate, int employeeId)
        {
            // Check for existing leaves
            var existingLeaves = await _dbContext.EmployeeLeaves
                .Where(l => l.EmployeeId == employeeId &&
                            ((l.StartDate <= startDate && l.EndDate >= startDate) ||
                             (l.StartDate <= endDate && l.EndDate >= endDate) ||
                             (l.StartDate >= startDate && l.EndDate <= endDate)))
                .ToListAsync();

            if (existingLeaves.Any())
            {
                return (false, "You already have leave applied for the selected dates.");
            }

            // Check for holidays
            var holidays = await _dbContext.EmployeeHolidays
                .Where(h => (h.StartDate <= startDate && h.EndDate >= startDate) ||
                            (h.StartDate <= endDate && h.EndDate >= endDate) ||
                            (h.StartDate >= startDate && h.EndDate <= endDate))
                .ToListAsync();

            if (holidays.Any())
            {
                return (false, "The selected date range includes holidays.");
            }

            return (true, string.Empty);
        }


    }
}
