using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models.Employee;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Contracts
{
    public interface IEmployeeService
    {
        #region Getting Dropdown data

        public Task<List<EmployeeLeaveSummaryModel>> GetEmployeeLeaves(string loggedUserId);
        public Task<EmployeeModel> GetEmployeeByIdAsync(int id);

        public Task SendEmail();

        public Task<EmployeeModel> CreateEmployeeAsync(Employee employee);

        public Task<EmployeeModel> UpdateEmployeeAsync(Employee employee);
        public Task<List<EmployeeCategory>> GetEmployeeCategories();
        public Task<List<EmployeeDepartment>> GetEmployeeDepartments();
        public Task<List<EmployeeDesignation>> GetEmployeeDesignations();
        public Task<List<Site>> GetSites();
        public Task<List<EmployeeReportToModel>> GetReportToEmployeeList(int? departmentId, int? employeeId);
        public Task<List<EmployeeTeamMemberList>> GetTeamMembersList(int? employeeId);

        #endregion

        #region Add data to dropdown list
        public Task<EmployeeCategory> AddNewCategory(EmployeeCategory employeeCategory);
        public Task<EmployeeDepartment> AddNewDepartment(EmployeeDepartment employeeDepartment);
        public Task<EmployeeDesignation> AddNewDesignation(EmployeeDesignation employeeDesignation);
        public Task<Site> AddNewSite(Site site);

        #endregion

        #region Employee Dashboard

        public Task<Site> AddNewSite(Site site);
        public Task<EmployeeLeave> AddLeave(EmployeeLeave employeeLeave,string loggedUserId);
        public Task CancelLeave(int employeeLeaveId);
        public Task<EmployeeLeave> UpdateLeave(EmployeeLeave employeeLeave, string loggedUserId);
    }
}
