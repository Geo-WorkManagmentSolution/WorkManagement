﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models.Employee;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Contracts
{
    public interface IEmployeeService
    {
        public Task<List<EmployeeModel>> GetAllEmployeesAsync();

        public Task<EmployeeModel> GetEmployeeByIdAsync(int id);

        public Task<EmployeeModel> CreateEmployeeAsync(Employee employee);

        public Task<EmployeeModel> UpdateEmployeeAsync(Employee employee);
        public Task<bool> DeleteEmployeeAsync(int id);
    }
}