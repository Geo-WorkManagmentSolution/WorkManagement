using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;
using WorkManagement.Domain.Models.Employee;
using WorkManagement.Domain.Models.Project;
using WorkManagementSolution.Employee;

namespace WorkManagement.Service
{
    public interface IProjectService
    {
        public Task<List<ProjectModel>> GetAllProjectsAsync();

        public Task<ProjectModel> GetProjectByIdAsync(int id);

        public Task<ProjectModel> CreateProjectAsync(ProjectModel project);
                                                                   
        public Task<ProjectModel> UpdateProjectAsync(ProjectModel project);
        public Task<bool> DeleteProjectAsync(int id);
        public Task<List<ProjectWorkOrders>> GetProjectDocumentsAsync(int projectId);


        public Task<string> GetProjectDocumentFileName(int id, string fileName);
        public Task<string> UpdateProjectDocumentData(int id, string fileName, FileType fileType, long fileSize, string filePath, byte[] fileContent);
        public string GetProjectFilePath(int id, string fileName);
        public Task<bool> DeleteProjectFile(int employeeId, string fileName);
        public Task<bool> AssignProjectToEmployee(int projectId, int employeeId);
        public  Task<bool> RemoveEmployeeFromProjectAsync(int projectId, int employeeId);
        public  Task<List<EmployeeTeamMemberList>> GetEmployeesByProjectIdAsync(int projectId);
        public Task<List<EmployeeModel>> GetEmployeesNotAssignedToProjectByDepartment(int projectId, int departmentId);


    }
}
