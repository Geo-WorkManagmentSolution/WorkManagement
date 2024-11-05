using AutoMapper;
using Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models.Email;
using WorkManagement.Domain.Models.Employee;
using WorkManagement.Domain.Utility;
using WorkManagementSolution.Employee;
using WorkManagmentSolution.EFCore;
using static WorkManagement.Service.EmailService;

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

        public async Task<List<EmployeeModel>> GetAllEmployeesAsync()
        {
            var Employee = await _dbContext.Employees.ToListAsync();
            return mapper.Map<List<EmployeeModel>>(Employee);
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



        public async Task<EmployeeModel> GetEmployeeByIdAsync(int id)
        {
            var Employee = await _dbContext.Employees
                .AsNoTracking()
                .Include(x => x.EmployeePersonalDetails)
                .Include(x => x.EmployeeWorkInformation)
                .Include(x => x.EmployeeAddresses)
                .Include(x => x.EmployeeIdentityInfos)
                .Include(x => x.EmployeeEducationDetail)
                .Include(x => x.EmployeeDocuments)
                .SingleOrDefaultAsync(x => x.Id == id);
            var EmployeeModel = mapper.Map<EmployeeModel>(Employee);
            return EmployeeModel;
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

        public async Task<EmployeeModel> CreateEmployeeAsync(Employee employee)
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
                employee.UserId = user.Id;
                _dbContext.Employees.Add(employee);
                await _dbContext.SaveChangesAsync();

                try
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
                }
                catch (Exception e)
                {
                    // think about the exception later
                }
                return mapper.Map<EmployeeModel>(employee);
            }
            else
                throw new InvalidOperationException("Somthing wrong while creating Users and Roles for employee");
        }

        public async Task<EmployeeModel> UpdateEmployeeAsync(Employee employee)
        {
            _dbContext.Employees.Update(employee);
            await _dbContext.SaveChangesAsync();
            return mapper.Map<EmployeeModel>(employee);
            ;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var edu = await _dbContext.EmployeeEducationDetails.Where(x => x.EmployeeId == id).ExecuteDeleteAsync();

            var employee = await _dbContext.Employees.FindAsync(id);
            if (employee == null)
                return false;

            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<EmployeeLeaveSummaryModel>> GetEmployeeLeaves(string loggedUserId)
        {
            //var EmployeeId = _dbContext.Employees.FirstOrDefaultAsync(x => x.UserId == Guid.Parse(loggedUserId))?.Id??1;

            var defaultLeaves = await _dbContext.EmployeeDefaultLeave.Include(x=>x.EmployeeLeaveTypes).ToListAsync();
            var defaultLeaveSummary = mapper.Map<List<EmployeeLeaveSummary>>(defaultLeaves);

            //var model=  _dbContext.EmployeeLeaveSummary.Where(x => x.EmployeeId == EmployeeId)?.ToList()?? defaultLeaveSummary;
            var model = defaultLeaveSummary;


            return mapper.Map<List<EmployeeLeaveSummaryModel>>(model);
        }


        public async Task<EmployeeLeave> AddLeave(EmployeeLeave employeeLeave, string loggedUserId)
        {

            var EmployeeId = _dbContext.Employees.First(x => x.UserId == Guid.Parse(loggedUserId)).Id;

            employeeLeave.EmployeeId = EmployeeId;
            //add validation in future
            _dbContext.EmployeeLeaves.Add(employeeLeave);
            var leaveSummary = await _dbContext.EmployeeLeaveSummary.FirstAsync(x => x.EmployeeId == EmployeeId && x.EmployeeLeaveTypeId == employeeLeave.EmployeeLeaveTypeId);
            leaveSummary.RemainingLeaves = leaveSummary.RemainingLeaves - employeeLeave.LeaveDays;
            _dbContext.EmployeeLeaveSummary.Update(leaveSummary);

            await _dbContext.SaveChangesAsync();
            return employeeLeave;
        }

        public async Task CancelLeave(int employeeLeaveId)
        {
            var QuarableCancel = _dbContext.EmployeeLeaves.Where(x => x.Id == employeeLeaveId);
            var cancelLeaves = await QuarableCancel.FirstAsync();
            var leaveSummary = await _dbContext.EmployeeLeaveSummary.FirstAsync(x => x.EmployeeId == cancelLeaves.EmployeeId && x.EmployeeLeaveTypeId == cancelLeaves.EmployeeLeaveTypeId);
            leaveSummary.RemainingLeaves += cancelLeaves.LeaveDays;
            await QuarableCancel.ExecuteDeleteAsync();
        }

        public async Task<EmployeeLeave> UpdateLeave(EmployeeLeave employeeLeave)
        {
            _dbContext.EmployeeLeaves.Update(employeeLeave);
            await _dbContext.SaveChangesAsync();
            return employeeLeave;
        }
    }
}
