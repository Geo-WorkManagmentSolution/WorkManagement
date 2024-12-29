using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models.Dropdown;
using WorkManagement.Domain.Models.Employee;
using WorkManagement.Domain.Models.Project;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Contracts
{
    public interface IEmployeeService
    {
        #region Getting Dropdown data

        public Task<List<EmployeeCategory>> GetEmployeeCategories();
        public Task<List<EmployeeDepartment>> GetEmployeeDepartments();

        public Task<List<EmployeeDesignation>> GetEmployeeDesignations();
        public Task<List<Site>> GetSites();
        public Task<List<EmployeeReportToModel>> GetReportToEmployeeList(int? departmentId, int? employeeId);
        //public Task<List<EmployeeReportToModel>> GetReportToEmployeeList(int? departmentId);
        public Task<List<EmployeeTeamMemberList>> GetTeamMembersList(string loggedUserId, int? employeeId);

        #endregion

        #region Add data to dropdown list
        public Task<EmployeeCategory> AddNewCategory(EmployeeCategory employeeCategory);
        public Task<EmployeeDepartment> AddNewDepartment(EmployeeDepartment employeeDepartment);
        public Task<EmployeeDesignation> AddNewDesignation(EmployeeDesignation employeeDesignation);
        public Task<Site> AddNewSite(Site site);

        #endregion

        #region Employee Dashboard

        public Task<List<EmployeeDashboardDataModel>> GetAllEmployeesAsync(string loggedUserId,string userRole);
        public Task<EmployeeModel> GetEmployeeByIdAsync(int id);
        public Task<EmployeeModel> CreateEmployeeAsync(EmployeeModel employee);
        public Task<EmployeeModel> UpdateEmployeeAsync(int id, EmployeeModel employee);
        public Task<bool> DeleteEmployeeAsync(int id);
        public Task<string> GetEmployeeFolderPath(int id);
        public Task<string> GetEmployeeDocumentFileName(int id, string fileName);
        public Task<string> UpdateEmployeeDocumentData(int id, string fileName, FileType fileType, long fileSize, string filePath, byte[] fileContent);
        public string GetEmployeeFilePath(int id, string fileName);
        public Task<bool> DeleteEmployeeFile(int employeeId, string fileName);
        public Task<List<ProjectModel>> GetProjectsByEmployeeIdAsync(int employeeId);
        #endregion

        #region Employee Leave

        public Task<List<EmployeeLeaveSummaryModel>> GetEmployeeLeaves(string loggedUserId,int? EmployeeId);

        //public Task<List<EmployeeLeaveSummaryModel>> GetEmployeeLeavesByEmployeeID(int EmployeeId);
        public Task<EmployeeLeaveModel> AddLeave(EmployeeLeaveModel employeeLeave, string loggedUserId);
        public Task<EmployeeLeaveModel> UpdateLeave(EmployeeLeaveModel employeeLeaveData, string loggedUserId);
        public Task CancelLeave(int employeeLeaveId, string value);
        public Task<EmployeeLeave> ApproveLeave(int leaveId);
        public Task<EmployeeLeave> RejectLeave(int leaveId);


        #endregion


        #region settings

        Task<DropdownModel> AddDropdownItem(DropdownModel model);
        public Task DeleteDropdownItem(int id, string dropdownName);
        Task<DropdownModel> UpdateDropdownItem(DropdownModel model);

        #endregion


        public Task<bool> CheckEmailExists(string email);

        public Task SendEmail();
        public Task<EmployeeSalary> ApproveSalary(int salaryId, string? loggedUserId, int employeeId);
        public Task<EmployeeSalary> RejectSalary(int salaryId, string? loggedUserId, int employeeId);
        public int CheckValidEmployeeId(string loggedUserId);
        public Task<List<EmployeeSalaryDataModel>> GetAllPenidngSalaryRequestList(string loggedUserId);
        public Task<List<EmployeeSalaryDataModel>> GetEmployeeSalaryRequestList(string loggedUserId, int employeeId);
    }
}
