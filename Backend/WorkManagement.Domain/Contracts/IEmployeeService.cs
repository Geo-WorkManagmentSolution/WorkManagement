using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models.Employee;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Contracts
{
    public interface IEmployeeService
    {
        public Task<List<EmployeeModel>> GetAllEmployeesAsync();

        public Task<EmployeeModel> GetEmployeeByIdAsync(int id);

        public Task SendEmail();

        public Task<EmployeeModel> CreateEmployeeAsync(Employee employee);

        public Task<EmployeeModel> UpdateEmployeeAsync(Employee employee);
        public Task<List<EmployeeCategory>> GetEmployeeCategories();
        public Task<List<EmployeeDepartment>> GetEmployeeDepartments();

        public Task<bool> DeleteEmployeeAsync(int id);
        public Task<bool> CheckEmailExists(string email);
    }
}
