using AutoMapper;
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

        public async Task<EmployeeModel> GetEmployeeByIdAsync(int id)
        {
            var Employee = await _dbContext.Employees
                .Include(x => x.EmployeePersonalDetails)
                .SingleOrDefaultAsync(x => x.Id == id);
            var EmployeeModel = mapper.Map<EmployeeModel>(Employee);
            return EmployeeModel;
        }

        public async Task SendEmail()
        {
            var WelcomeModelCredentials = new WelcomeModel();
            WelcomeModelCredentials.Username = "snaupul@gmail.com";
            WelcomeModelCredentials.Password = "Test1234@";

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

                //var WelcomeModelCredentials = new WelcomeModel();
                //WelcomeModelCredentials.Username = user.UserName;
                //WelcomeModelCredentials.Password = password;

                //var emailModel = new EmailModel<WelcomeModel>();
                //emailModel.From = "naupul30@gmail.com";
                //emailModel.To = user.UserName;
                //emailModel.Subject = "Welcome to Geo!";
                //emailModel.repModel = WelcomeModelCredentials;

                //_emailService.SendWelcomeMail(emailModel);

                return mapper.Map<EmployeeModel>(employee);
            }
            else
                throw new InvalidOperationException("Somthing wrong while creating Users and Roles for employee");
        }

        public async Task<EmployeeModel> UpdateEmployeeAsync(Employee employee)
        {
            _dbContext.Entry(employee).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return mapper.Map<EmployeeModel>(employee);
            ;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employee = await _dbContext.Employees.FindAsync(id);
            if (employee == null)
                return false;

            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
