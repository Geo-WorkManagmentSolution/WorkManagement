using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using WorkManagement.Domain.Models.Employee;
using WorkManagementSolution.Employee;
using WorkManagmentSolution.EFCore;

namespace WorkManagement.Service
{
    public class EmployeeService
    {
        private readonly WorkManagementDbContext _dbContext;
        private readonly IMapper mapper;

        public EmployeeService(WorkManagementDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<List<EmployeeModel>> GetAllEmployeesAsync()
        {
            var Employee = await _dbContext.Employees.ToListAsync();
            return mapper.Map<List<EmployeeModel>>(Employee);
        }

        public async Task<EmployeeModel> GetEmployeeByIdAsync(int id)
        {
            var Employee = await _dbContext.Employees.FindAsync(id);
            return mapper.Map<EmployeeModel>(Employee);
        }

        public async Task<EmployeeModel> CreateEmployeeAsync(Employee employee)
        {
            _dbContext.Employees.Add(employee);
            var Employee = await _dbContext.SaveChangesAsync();
            return mapper.Map<EmployeeModel>(Employee);
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
