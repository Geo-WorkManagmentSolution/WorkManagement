using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;
using WorkManagement.Domain.Models.Project;
using WorkManagementSolution.Employee;
using WorkManagmentSolution.EFCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace WorkManagement.Service
{
    public class ProjectServices : IProjectService

    {
        private readonly WorkManagementDbContext _dbContext;
        private readonly IMapper mapper;

        public ProjectServices(WorkManagementDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            this.mapper = mapper;
        }

        public Task<ResponseModel> CreateCompanyAsync(string user, CompanyModel company)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel> CreateProjectAsync(string user, ProjectModel project)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel> DeleteCompanyAsync(string user, int id)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel> DeleteProjectAsync(string user, int id)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel> GetAllProjectsAsync(string user)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel> GetCompaniesAsync(string user)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel> GetCompanyByIdAsync(string user, int companyId)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel> GetProjectByIdAsync(string user, int projectId)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel> UpdateCompanyAsync(string user, CompanyModel company)
        {
            throw new NotImplementedException();
        }

        public Task<ResponseModel> UpdateProjectAsync(string user, ProjectModel project)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Company>> GetProjectCompanyList()
        {
            return await _dbContext.Companies.ToListAsync();
        }

        public async Task<List<Tender>> GetProjectTendersList()
        {
            return await _dbContext.Tenders.ToListAsync();
        }

        public async Task<List<Employee>> GetProjectEmployeeList()
        {
            return await _dbContext.Employees.ToListAsync();
        }

        public async Task<List<Client>> GetProjectClientList()
        {
            return await _dbContext.Clients.ToListAsync();
        }

        public async Task<List<Param>> GetProjectParamList(string paramType)
        {
            return await _dbContext.Params.Where(p=>p.ParamType == paramType).ToListAsync();
        }

        public async Task<List<Vendor>> GetProjectVendorList()
        {
            return await _dbContext.Vendors.ToListAsync();
        }

        //public async Task<ResponseModel> CreateCompanyAsync(string user, CompanyModel company)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    var userId = userInfo.Id;

        //    try
        //    {
        //        Company newCompany = new Company();

        //        newCompany.CompanyName = string.IsNullOrEmpty(company.CompanyName) ? "" : company.CompanyName;
        //        newCompany.CompanyDescription = string.IsNullOrEmpty(company.CompanyDescription) ? "" : company.CompanyDescription;
        //        newCompany.CompanyFullAddress = string.IsNullOrEmpty(company.CompanyFullAddress) ? "" : company.CompanyFullAddress;
        //        newCompany.PostalCode = string.IsNullOrEmpty(company.PostalCode) ? "" : company.PostalCode;
        //        newCompany.PrimaryPhoneNumber = string.IsNullOrEmpty(company.PrimaryPhoneNumber) ? "" : company.PrimaryPhoneNumber;
        //        newCompany.PrimaryEmailAddress = string.IsNullOrEmpty(company.PrimaryEmailAddress) ? "" : company.PrimaryEmailAddress;
        //        newCompany.AlternativeEmailAddress = string.IsNullOrEmpty(company.AlternativeEmailAddress) ? "" : company.AlternativeEmailAddress;
        //        newCompany.AlternativePhoneNumber = string.IsNullOrEmpty(company.AlternativePhoneNumber) ? "" : company.AlternativePhoneNumber;
        //        newCompany.CityId = 1;
        //        newCompany.StateId = 1;
        //        newCompany.CountryId = 1;
        //        newCompany.IsDeleted = false;
        //        newCompany.CountryId = company.TotalEmployess;
        //        newCompany.CreatedBy = userId;
        //        newCompany.LastModifiedBy = userId;
        //        newCompany.CreatedOn = DateTime.Now;
        //        newCompany.LastModifiedOn = DateTime.Now;

        //        _dbContext.Companies.Add(newCompany);

        //        _dbContext.SaveChanges();

        //        retrunResponse.Data = company;
        //        retrunResponse.Success = true;
        //        retrunResponse.Message = $"Company data has been created successfully";

        //        return retrunResponse;
        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}

        //public async Task<ResponseModel> CreateProjectAsync(string user, ProjectModel project)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    var userId = userInfo.Id;

        //    try
        //    {
        //        Company company = _dbContext.Companies.FirstOrDefault(s => s.CompanyName == project.CompanyName);

        //        if (company == null)
        //        {
        //            retrunResponse.Data = null;
        //            retrunResponse.Success = false;
        //            retrunResponse.Message = "Company can not be found.";

        //            return retrunResponse;
        //        }

        //        Project newProject = new Project();

        //        newProject.ProjectName = string.IsNullOrEmpty(project.ProjectName) ? "" : project.ProjectName;
        //        newProject.ProjectIncharge = string.IsNullOrEmpty(project.ProjectIncharge) ? "" : project.ProjectIncharge;
        //        newProject.WorkOrderNumber = string.IsNullOrEmpty(project.WorkOrderNumber) ? "" : project.WorkOrderNumber;
        //        newProject.WorkOrderAmount = project.WorkOrderAmount;
        //        newProject.WorkDescription = project.WorkOrderAmount;
        //        newProject.StartDate = project.StartDate;
        //        newProject.EndDate = project.EndDate;
        //        newProject.CompanyId = company.Id;
        //        newProject.CreatedBy = userId;
        //        newProject.LastModifiedBy = userId;
        //        newProject.CreatedOn = DateTime.Now;
        //        newProject.LastModifiedOn = DateTime.Now;
        //        newProject.IsDeleted = false;

        //        _dbContext.Projects.Add(newProject);

        //        _dbContext.SaveChanges();

        //        retrunResponse.Data = project;
        //        retrunResponse.Success = true;
        //        retrunResponse.Message = $"Project data has been created successfully";

        //        return retrunResponse;
        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}

        //public async Task<ResponseModel> DeleteCompanyAsync(string user, int id)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    var userId = userInfo.Id;

        //    try
        //    {
        //        Company company = _dbContext.Companies.FirstOrDefault(s => s.Id == id);

        //        if (company == null)
        //        {
        //            retrunResponse.Data = null;
        //            retrunResponse.Success = true;
        //            retrunResponse.Message = $"There is no company data avaialable to delete ";

        //        }
        //        else
        //        {
        //            _dbContext.Companies.Remove(company);

        //            _dbContext.SaveChanges();

        //            retrunResponse.Data = null;
        //            retrunResponse.Success = false;
        //            retrunResponse.Message = $"Company data has been removed successfully";
        //        }

        //        return retrunResponse;
        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}

        //public async Task<ResponseModel> DeleteProjectAsync(string user, int id)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    var userId = userInfo.Id;

        //    try
        //    {
        //        Project project = _dbContext.Projects.FirstOrDefault(s => s.Id == id);

        //        if (project == null)
        //        {
        //            retrunResponse.Data = null;
        //            retrunResponse.Success = true;
        //            retrunResponse.Message = $"There is no company data avaialable to delete ";

        //        }
        //        else
        //        {
        //            _dbContext.Projects.Remove(project);

        //            _dbContext.SaveChanges();

        //            retrunResponse.Data = null;
        //            retrunResponse.Success = false;
        //            retrunResponse.Message = $"Project data has been removed successfully";
        //        }

        //        return retrunResponse;
        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}

        //public async Task<ResponseModel> GetAllProjectsAsync(string user)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    try
        //    {
        //        var data = (from p in _dbContext.Projects
        //                    select new ProjectModel
        //                    {
        //                        ProjectName = p.ProjectName.Trim(),
        //                        CompanyName = p.Company.CompanyName.Trim(),
        //                        ProjectIncharge = p.ProjectIncharge.Trim(),
        //                        WorkOrderNumber = string.IsNullOrEmpty(p.WorkOrderNumber) ? "": p.WorkOrderNumber.Trim(),
        //                        WorkOrderAmount = p.WorkOrderAmount,
        //                        WorkDescription = p.WorkDescription,
        //                        StartDate = p.StartDate,
        //                        EndDate = p.EndDate,
        //                    }).ToList();

        //        retrunResponse.Data = data;
        //        retrunResponse.Success = true;
        //        retrunResponse.Message = $"All Projects data recieved successfully";

        //        return retrunResponse;

        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}

        //public async Task<ResponseModel> GetCompaniesAsync(string user)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    try
        //    {
        //        var data = (from c in _dbContext.Companies
        //                    select new CompanyModel
        //                    {
        //                        CompanyName = c.CompanyName.Trim(),
        //                        CompanyDescription = c.CompanyDescription.Trim(),
        //                        CompanyFullAddress = string.IsNullOrEmpty(c.CompanyFullAddress) ? "" : c.CompanyFullAddress.Trim(),
        //                        PostalCode = string.IsNullOrEmpty(c.PostalCode) ? "" : c.PostalCode.Trim(),
        //                        PrimaryPhoneNumber = string.IsNullOrEmpty(c.PrimaryPhoneNumber) ? "" : c.PrimaryPhoneNumber.Trim(),
        //                        AlternativePhoneNumber = string.IsNullOrEmpty(c.AlternativePhoneNumber) ? "" : c.AlternativePhoneNumber.Trim(),
        //                        PrimaryEmailAddress = string.IsNullOrEmpty(c.PrimaryEmailAddress) ? "" : c.PrimaryEmailAddress.Trim(),
        //                        AlternativeEmailAddress = string.IsNullOrEmpty(c.AlternativeEmailAddress) ? "" : c.AlternativeEmailAddress.Trim(),
        //                        TotalEmployess = c.TotalEmployess,
        //                    }).ToList();

        //        retrunResponse.Data = data;
        //        retrunResponse.Success = true;
        //        retrunResponse.Message = $"All Companies data recieved successfully";

        //        return retrunResponse;

        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}

        //public async Task<ResponseModel> GetCompanyByIdAsync(string user, int companyId)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    try
        //    {
        //        var data = (from c in _dbContext.Companies.Where(c=>c.Id == companyId)
        //                    select new CompanyModel
        //                    {
        //                        CompanyName = c.CompanyName.Trim(),
        //                        CompanyDescription = c.CompanyDescription.Trim(),
        //                        CompanyFullAddress = string.IsNullOrEmpty(c.CompanyFullAddress) ? "" : c.CompanyFullAddress.Trim(),
        //                        PostalCode = string.IsNullOrEmpty(c.PostalCode) ? "" : c.PostalCode.Trim(),
        //                        PrimaryPhoneNumber = string.IsNullOrEmpty(c.PrimaryPhoneNumber) ? "" : c.PrimaryPhoneNumber.Trim(),
        //                        AlternativePhoneNumber = string.IsNullOrEmpty(c.AlternativePhoneNumber) ? "" : c.AlternativePhoneNumber.Trim(),
        //                        PrimaryEmailAddress = string.IsNullOrEmpty(c.PrimaryEmailAddress) ? "" : c.PrimaryEmailAddress.Trim(),
        //                        AlternativeEmailAddress = string.IsNullOrEmpty(c.AlternativeEmailAddress) ? "" : c.AlternativeEmailAddress.Trim(),
        //                        TotalEmployess = c.TotalEmployess,
        //                    }).ToList();

        //        retrunResponse.Data = data;
        //        retrunResponse.Success = true;
        //        retrunResponse.Message = $"Company data recieved successfully";

        //        return retrunResponse;

        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}

        //public async Task<ResponseModel> GetProjectByIdAsync(string user, int projectId)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    try
        //    {
        //        var data = (from p in _dbContext.Projects.Where(c=>c.Id == projectId)
        //                    select new ProjectModel
        //                    {
        //                        ProjectName = p.ProjectName.Trim(),
        //                        CompanyName = p.Company.CompanyName.Trim(),
        //                        ProjectIncharge = p.ProjectIncharge.Trim(),
        //                        WorkOrderNumber = string.IsNullOrEmpty(p.WorkOrderNumber) ? "" : p.WorkOrderNumber.Trim(),
        //                        WorkOrderAmount = p.WorkOrderAmount,
        //                        WorkDescription = p.WorkDescription,
        //                        StartDate = p.StartDate,
        //                        EndDate = p.EndDate,
        //                    }).ToList();

        //        retrunResponse.Data = data;
        //        retrunResponse.Success = true;
        //        retrunResponse.Message = $"Project data recieved successfully";

        //        return retrunResponse;

        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}

        //public async Task<ResponseModel> UpdateCompanyAsync(string user, CompanyModel company)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    try
        //    {
        //        if (string.IsNullOrEmpty(company.CompanyName))
        //        {
        //            retrunResponse.Data = null;
        //            retrunResponse.Success = false;
        //            retrunResponse.Message = $"Company name can not be empty";

        //            return retrunResponse;
        //        }

        //        Company updateCompany = _dbContext.Companies.FirstOrDefault(s => s.CompanyName == company.CompanyName);

        //        if (updateCompany == null)
        //        {
        //            retrunResponse.Data = null;
        //            retrunResponse.Success = false;
        //            retrunResponse.Message = $"Company can not be empty";

        //            return retrunResponse;
        //        }

        //        updateCompany.CompanyName = company.CompanyName;
        //        updateCompany.CompanyDescription = company.CompanyDescription;
        //        updateCompany.CompanyFullAddress = company.CompanyFullAddress;
        //        updateCompany.PostalCode = company.PostalCode;
        //        updateCompany.PrimaryPhoneNumber = company.PrimaryPhoneNumber;
        //        updateCompany.AlternativePhoneNumber = company.AlternativePhoneNumber;
        //        updateCompany.PrimaryEmailAddress = company.PrimaryEmailAddress;
        //        updateCompany.AlternativeEmailAddress = company.AlternativeEmailAddress;
        //        updateCompany.TotalEmployess = company.TotalEmployess;
        //        updateCompany.LastModifiedOn = DateTime.Now;
        //        updateCompany.LastModifiedBy = userInfo.Id;

        //        _dbContext.Companies.Update(updateCompany);

        //        _dbContext.SaveChanges();

        //        retrunResponse.Data = company;
        //        retrunResponse.Success = true;
        //        retrunResponse.Message = "Company data updated successfully.";

        //        return retrunResponse;
        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}

        //public async Task<ResponseModel> UpdateProjectAsync(string user, ProjectModel project)
        //{
        //    var retrunResponse = new ResponseModel();

        //    #region Check user

        //    if (string.IsNullOrEmpty(user))
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = "User can not be empty.";

        //        return retrunResponse;
        //    }

        //    var userInfo = _dbContext.Users.FirstOrDefault(s => s.UserName == user);

        //    if (userInfo == null)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"Not able to find user for {user}";

        //        return retrunResponse;
        //    }

        //    #endregion

        //    try
        //    {
        //        if (string.IsNullOrEmpty(project.ProjectName))
        //        {
        //            retrunResponse.Data = null;
        //            retrunResponse.Success = false;
        //            retrunResponse.Message = $"Project name can not be empty";
        //            return retrunResponse;
        //        }

        //        Project updateProject = _dbContext.Projects.FirstOrDefault(s => s.ProjectName == project.ProjectName);
        //        Company company = _dbContext.Companies.FirstOrDefault(s => s.CompanyName == project.CompanyName);


        //        if (updateProject == null)
        //        {
        //            retrunResponse.Data = null;
        //            retrunResponse.Success = false;
        //            retrunResponse.Message = $"Project can not be empty";
        //            return retrunResponse;
        //        }

        //        updateProject.ProjectName = project.ProjectName;
        //        updateProject.CompanyId = company == null ? -1 : company.Id;
        //        updateProject.ProjectIncharge = project.ProjectIncharge;
        //        updateProject.WorkOrderNumber = project.WorkOrderNumber;
        //        updateProject.WorkOrderAmount = project.WorkOrderAmount;
        //        updateProject.WorkDescription = project.WorkDescription;
        //        updateProject.StartDate = project.StartDate;
        //        updateProject.EndDate = project.EndDate;
        //        updateProject.ProjectName = project.ProjectName;
        //        updateProject.LastModifiedOn = DateTime.Now;
        //        updateProject.LastModifiedBy = userInfo.Id;

        //        _dbContext.Projects.Update(updateProject);

        //        _dbContext.SaveChanges();

        //        retrunResponse.Data = project;
        //        retrunResponse.Success = true;
        //        retrunResponse.Message = "Project data updated successfully.";

        //        return retrunResponse;
        //    }
        //    catch (Exception ex)
        //    {
        //        retrunResponse.Data = null;
        //        retrunResponse.Success = false;
        //        retrunResponse.Message = $"System error. Reason: {ex.Message}";

        //        return retrunResponse;
        //    }
        //}
    }
}
