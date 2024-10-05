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

        public Task<List<Company>> GetProjectCompanyList();
        public Task<List<Tender>> GetProjectTendersList();
        public Task<List<Employee>> GetProjectEmployeeList();
        public Task<List<Client>> GetProjectClientList();
        public Task<List<Vendor>> GetProjectVendorList();
        public Task<List<Param>> GetProjectParamList(string paramType);


    }
}
