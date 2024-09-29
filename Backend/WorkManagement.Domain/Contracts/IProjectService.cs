using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;
using WorkManagement.Domain.Models.Project;

namespace WorkManagement.Service
{
    public interface IProjectService
    {
        public Task<ResponseModel> GetAllProjectsAsync(string user);
        public Task<ResponseModel> GetCompaniesAsync(string user);

        public Task<ResponseModel> GetCompanyByIdAsync(string user, int companyId);
        public Task<ResponseModel> GetProjectByIdAsync(string user, int projectId);

        public Task<ResponseModel> CreateCompanyAsync(string user, CompanyModel company);
        public Task<ResponseModel> CreateProjectAsync(string user, ProjectModel project);


        public Task<ResponseModel> UpdateCompanyAsync(string user, CompanyModel company);
        public Task<ResponseModel> UpdateProjectAsync(string user,ProjectModel project);

       
        public Task<ResponseModel> DeleteProjectAsync(string user, int id);
        public Task<ResponseModel> DeleteCompanyAsync(string user, int id);


    }
}
