using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models.Project;
using WorkManagementSolution.Employee;
using WorkManagmentSolution.EFCore;

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
            return await _dbContext.Params.Where(p => p.ParamType == paramType).ToListAsync();
        }

        public async Task<List<Vendor>> GetProjectVendorList()
        {
            return await _dbContext.Vendors.ToListAsync();
        }

        public async Task<List<ProjectModel>> GetAllProjectsAsync()
        {

            try
            {
                var projects = (from p in _dbContext.Projects
                                select new ProjectModel
                                {
                                    ProjectName = string.IsNullOrEmpty(p.ProjectName) ? "" : p.ProjectName.Trim(),
                                    ProjectNumber = string.IsNullOrEmpty(p.ProjectNumber) ? "" : p.ProjectNumber.Trim(),
                                    CompanyName = p.Company != null ? p.Company.CompanyName : "",
                                    CompanyId = p.CompanyId,
                                    ProjectDescription = string.IsNullOrEmpty(p.ProjectDescription) ? "" : p.ProjectDescription.Trim(),
                                    ProjectLocation = string.IsNullOrEmpty(p.ProjectLocation) ? "" : p.ProjectLocation.Trim(),
                                    ProjectIncharge = p.ProjectIncharge != null ? p.ProjectIncharge.FirstName + " " + p.ProjectIncharge.LastName : "",
                                    ProjectInchargeId = p.ProjectInchargeId,
                                    WorkOrderNumber = p.ProjectDetails != null ? p.ProjectDetails.WorkOrderNumber : "",
                                    WorkOrderAmount = p.ProjectDetails != null ? p.ProjectDetails.WorkOrderAmount : 0,
                                    PeriodOfWrokInMonths = p.ProjectDetails != null ? p.ProjectDetails.PeriodOfWrokInMonths : 0,
                                    EstimateManPower = p.ProjectDetails != null ? p.ProjectDetails.EstimateManPower : 0,
                                    EstimateDays = p.ProjectDetails != null ? p.ProjectDetails.EstimateDays : 0,
                                    Qty = p.ProjectDetails != null ? p.ProjectDetails.Qty : 0,
                                    Rate = p.ProjectDetails != null ? p.ProjectDetails.Rate : 0,
                                    CGST = p.ProjectDetails != null ? p.ProjectDetails.CGST : 0,
                                    IGST = p.ProjectDetails != null ? p.ProjectDetails.IGST : 0,
                                    SGST = p.ProjectDetails != null ? p.ProjectDetails.SGST : 0,
                                    TotalCost = p.ProjectDetails != null ? p.ProjectDetails.TotalCost : 0,
                                    WorkDescription = p.ProjectDetails != null ? p.ProjectDetails.WorkDescription : "",
                                    StartDate = p.StartDate,
                                    EndDate = p.EndDate,
                                    TenderId = p.TenderId,
                                    TenderName = p.Tender != null ? p.Tender.Name : "",
                                    FundingClientId = p.FundingClientId,
                                    FundingClientName = p.FundingClient != null ? p.FundingClient.Name : "",
                                    InchargeClientId = p.InchargeClientId,
                                    InchargeClientName = p.InchargeClient != null ? p.InchargeClient.Name : "",
                                    TaxModelParamId = p.TaxModelParamId,
                                    TaxModelParamDecription = p.TaxModelParam != null ? p.TaxModelParam.Description : "",
                                    ProjectItemTypePramId = p.ProjectItemTypePramId,
                                    ProjectItemTypePramDecription = p.ProjectItemTypePram != null ? p.ProjectItemTypePram.Description : "",
                                    ServiceParamId = p.ServiceParamId,
                                    ServiceParamDecription = p.ServiceParam != null ? p.ServiceParam.Description : "",
                                    VendorId = p.VendorId,
                                    VendorName = p.Vendor != null ? p.Vendor.Name : "",

                                }).ToList();

                return projects;
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async Task<ProjectModel> GetProjectByIdAsync(int id)
        {
            try
            {
                var returnProject = new ProjectModel();
                var projects = (from p in _dbContext.Projects.Where(p => p.Id == id)
                                select new ProjectModel
                                {
                                    ProjectName = string.IsNullOrEmpty(p.ProjectName) ? "" : p.ProjectName.Trim(),
                                    ProjectNumber = string.IsNullOrEmpty(p.ProjectNumber) ? "" : p.ProjectNumber.Trim(),
                                    CompanyName = p.Company != null ? p.Company.CompanyName : "",
                                    CompanyId = p.CompanyId,
                                    ProjectDescription = string.IsNullOrEmpty(p.ProjectDescription) ? "" : p.ProjectDescription.Trim(),
                                    ProjectLocation = string.IsNullOrEmpty(p.ProjectLocation) ? "" : p.ProjectLocation.Trim(),
                                    ProjectIncharge = p.ProjectIncharge != null ? p.ProjectIncharge.FirstName + " " + p.ProjectIncharge.LastName : "",
                                    ProjectInchargeId = p.ProjectInchargeId,
                                    WorkOrderNumber = p.ProjectDetails != null ? p.ProjectDetails.WorkOrderNumber : "",
                                    WorkOrderAmount = p.ProjectDetails != null ? p.ProjectDetails.WorkOrderAmount : 0,
                                    PeriodOfWrokInMonths = p.ProjectDetails != null ? p.ProjectDetails.PeriodOfWrokInMonths : 0,
                                    EstimateManPower = p.ProjectDetails != null ? p.ProjectDetails.EstimateManPower : 0,
                                    EstimateDays = p.ProjectDetails != null ? p.ProjectDetails.EstimateDays : 0,
                                    Qty = p.ProjectDetails != null ? p.ProjectDetails.Qty : 0,
                                    Rate = p.ProjectDetails != null ? p.ProjectDetails.Rate : 0,
                                    CGST = p.ProjectDetails != null ? p.ProjectDetails.CGST : 0,
                                    IGST = p.ProjectDetails != null ? p.ProjectDetails.IGST : 0,
                                    SGST = p.ProjectDetails != null ? p.ProjectDetails.SGST : 0,
                                    TotalCost = p.ProjectDetails != null ? p.ProjectDetails.TotalCost : 0,
                                    WorkDescription = p.ProjectDetails != null ? p.ProjectDetails.WorkDescription : "",
                                    StartDate = p.StartDate,
                                    EndDate = p.EndDate,
                                    TenderId = p.TenderId,
                                    TenderName = p.Tender != null ? p.Tender.Name : "",
                                    FundingClientId = p.FundingClientId,
                                    FundingClientName = p.FundingClient != null ? p.FundingClient.Name : "",
                                    InchargeClientId = p.InchargeClientId,
                                    InchargeClientName = p.InchargeClient != null ? p.InchargeClient.Name : "",
                                    TaxModelParamId = p.TaxModelParamId,
                                    TaxModelParamDecription = p.TaxModelParam != null ? p.TaxModelParam.Description : "",
                                    ProjectItemTypePramId = p.ProjectItemTypePramId,
                                    ProjectItemTypePramDecription = p.ProjectItemTypePram != null ? p.ProjectItemTypePram.Description : "",
                                    ServiceParamId = p.ServiceParamId,
                                    ServiceParamDecription = p.ServiceParam != null ? p.ServiceParam.Description : "",
                                    VendorId = p.VendorId,
                                    VendorName = p.Vendor != null ? p.Vendor.Name : "",

                                }).FirstOrDefault();


                return projects;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<ProjectModel> CreateProjectAsync(ProjectModel projectData)
        {
            try
            {
                var user = _dbContext.Users.FirstOrDefault(s => s.UserName == "admin1@admin.com");

                projectData = UpdateProjectDropdownData(projectData);

                Project project = new Project();

                project.ProjectName = projectData.ProjectName;
                project.ProjectNumber = projectData.ProjectNumber;
                project.ProjectDescription = projectData.ProjectDescription;
                project.ProjectLocation = projectData.ProjectLocation;
                project.StartDate = projectData.StartDate;
                project.EndDate = projectData.EndDate;
                project.CompanyId = projectData.CompanyId;
                project.TenderId = projectData.TenderId;
                project.ProjectInchargeId = projectData.ProjectInchargeId;
                project.FundingClientId = projectData.FundingClientId;
                project.InchargeClientId = projectData.InchargeClientId;
                project.TaxModelParamId = projectData.TaxModelParamId;
                project.ProjectItemTypePramId = projectData.ProjectItemTypePramId;
                project.ServiceParamId = projectData.ServiceParamId;
                project.VendorId = projectData.VendorId;
                project.CreatedBy = user.Id;
                project.CreatedOn = DateTime.Now;
                project.LastModifiedBy = user.Id;
                project.LastModifiedOn = DateTime.Now;

                ProjectDetail projectDetail = new ProjectDetail();
                projectDetail.WorkOrderNumber = projectData.WorkOrderNumber;
                projectDetail.WorkDescription = projectData.WorkDescription;
                projectDetail.WorkOrderAmount = projectData.WorkOrderAmount;
                projectDetail.PeriodOfWrokInMonths = projectData.PeriodOfWrokInMonths;
                projectDetail.EstimateManPower = projectData.EstimateManPower;
                projectDetail.EstimateDays = projectData.EstimateDays;
                projectDetail.Qty = projectData.Qty;
                projectDetail.Rate = projectData.Rate;
                projectDetail.CGST = projectData.CGST;
                projectDetail.SGST = projectData.SGST;
                projectDetail.IGST = projectData.IGST;
                projectDetail.TotalCost = projectData.TotalCost;
                projectDetail.CreatedBy = user.Id;
                projectDetail.CreatedOn = DateTime.Now;
                projectDetail.LastModifiedBy = user.Id;
                projectDetail.LastModifiedOn = DateTime.Now;

                project.ProjectDetails = projectDetail;

                _dbContext.Projects.Add(project);

                _dbContext.SaveChanges();

                projectData = GetProjectByName(projectData.ProjectName);

                return projectData;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<ProjectModel> UpdateProjectAsync(ProjectModel projectData)
        {
            try
            {
                projectData = UpdateProjectDropdownData(projectData);

                var existingProject = _dbContext.Projects.FirstOrDefault(s => s.ProjectName == projectData.ProjectName);

                existingProject.ProjectName = projectData.ProjectName;
                existingProject.ProjectNumber = projectData.ProjectNumber;
                existingProject.ProjectDescription = projectData.ProjectDescription;
                existingProject.ProjectLocation = projectData.ProjectLocation;
                existingProject.StartDate = projectData.StartDate;
                existingProject.EndDate = projectData.EndDate;
                existingProject.CompanyId = projectData.CompanyId;
                existingProject.TenderId = projectData.TenderId;
                existingProject.ProjectInchargeId = projectData.ProjectInchargeId;
                existingProject.FundingClientId = projectData.FundingClientId;
                existingProject.InchargeClientId = projectData.InchargeClientId;
                existingProject.TaxModelParamId = projectData.TaxModelParamId;
                existingProject.ProjectItemTypePramId = projectData.ProjectItemTypePramId;
                existingProject.ServiceParamId = projectData.ServiceParamId;
                existingProject.VendorId = projectData.VendorId;

                ProjectDetail projectDetail = _dbContext.ProjectDetails.FirstOrDefault(s => s.Id == existingProject.ProjectDetailsId);
                projectDetail.WorkOrderNumber = projectData.WorkOrderNumber;
                projectDetail.WorkDescription = projectData.WorkDescription;
                projectDetail.WorkOrderAmount = projectData.WorkOrderAmount;
                projectDetail.PeriodOfWrokInMonths = projectData.PeriodOfWrokInMonths;
                projectDetail.EstimateManPower = projectData.EstimateManPower;
                projectDetail.EstimateDays = projectData.EstimateDays;
                projectDetail.Qty = projectData.Qty;
                projectDetail.Rate = projectData.Rate;
                projectDetail.CGST = projectData.CGST;
                projectDetail.SGST = projectData.SGST;
                projectDetail.IGST = projectData.IGST;
                projectDetail.TotalCost = projectData.TotalCost;



                _dbContext.Projects.Update(existingProject);
                _dbContext.ProjectDetails.Update(projectDetail);

                _dbContext.SaveChanges();

                projectData = GetProjectByName(projectData.ProjectName);

                return projectData;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> DeleteProjectAsync(int id)
        {
            try
            {
                var project = await _dbContext.Projects.FindAsync(id);
                if (project == null)
                    return false;

                _dbContext.Projects.Remove(project);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        #region Private Methods

        private ProjectModel GetProjectByName(string projectName)
        {
            var projects = (from p in _dbContext.Projects.Where(p => p.ProjectName == projectName)
                            select new ProjectModel
                            {
                                ProjectName = string.IsNullOrEmpty(p.ProjectName) ? "" : p.ProjectName.Trim(),
                                ProjectNumber = string.IsNullOrEmpty(p.ProjectNumber) ? "" : p.ProjectNumber.Trim(),
                                CompanyName = p.Company != null ? p.Company.CompanyName : "",
                                CompanyId = p.CompanyId,
                                ProjectDescription = string.IsNullOrEmpty(p.ProjectDescription) ? "" : p.ProjectDescription.Trim(),
                                ProjectLocation = string.IsNullOrEmpty(p.ProjectLocation) ? "" : p.ProjectLocation.Trim(),
                                ProjectIncharge = p.ProjectIncharge != null ? p.ProjectIncharge.FirstName + " " + p.ProjectIncharge.LastName : "",
                                ProjectInchargeId = p.ProjectInchargeId,
                                WorkOrderNumber = p.ProjectDetails != null ? p.ProjectDetails.WorkOrderNumber : "",
                                WorkOrderAmount = p.ProjectDetails != null ? p.ProjectDetails.WorkOrderAmount : 0,
                                PeriodOfWrokInMonths = p.ProjectDetails != null ? p.ProjectDetails.PeriodOfWrokInMonths : 0,
                                EstimateManPower = p.ProjectDetails != null ? p.ProjectDetails.EstimateManPower : 0,
                                EstimateDays = p.ProjectDetails != null ? p.ProjectDetails.EstimateDays : 0,
                                Qty = p.ProjectDetails != null ? p.ProjectDetails.Qty : 0,
                                Rate = p.ProjectDetails != null ? p.ProjectDetails.Rate : 0,
                                CGST = p.ProjectDetails != null ? p.ProjectDetails.CGST : 0,
                                IGST = p.ProjectDetails != null ? p.ProjectDetails.IGST : 0,
                                SGST = p.ProjectDetails != null ? p.ProjectDetails.SGST : 0,
                                TotalCost = p.ProjectDetails != null ? p.ProjectDetails.TotalCost : 0,
                                WorkDescription = p.ProjectDetails != null ? p.ProjectDetails.WorkDescription : "",
                                StartDate = p.StartDate,
                                EndDate = p.EndDate,
                                TenderId = p.TenderId,
                                TenderName = p.Tender != null ? p.Tender.Name : "",
                                FundingClientId = p.FundingClientId,
                                FundingClientName = p.FundingClient != null ? p.FundingClient.Name : "",
                                InchargeClientId = p.InchargeClientId,
                                InchargeClientName = p.InchargeClient != null ? p.InchargeClient.Name : "",
                                TaxModelParamId = p.TaxModelParamId,
                                TaxModelParamDecription = p.TaxModelParam != null ? p.TaxModelParam.Description : "",
                                ProjectItemTypePramId = p.ProjectItemTypePramId,
                                ProjectItemTypePramDecription = p.ProjectItemTypePram != null ? p.ProjectItemTypePram.Description : "",
                                ServiceParamId = p.ServiceParamId,
                                ServiceParamDecription = p.ServiceParam != null ? p.ServiceParam.Description : "",
                                VendorId = p.VendorId,
                                VendorName = p.Vendor != null ? p.Vendor.Name : "",

                            }).FirstOrDefault();


            return projects;
        }

        private ProjectModel UpdateProjectDropdownData(ProjectModel projectModel)
        {
            if (!string.IsNullOrEmpty(projectModel.CompanyName))
            {
                var company = _dbContext.Companies.FirstOrDefault(s => s.CompanyName == projectModel.CompanyName);
                projectModel.CompanyId = company?.Id;
            }

            if (!string.IsNullOrEmpty(projectModel.TenderName))
            {
                var tender = _dbContext.Tenders.FirstOrDefault(s => s.Name == projectModel.TenderName);
                projectModel.TenderId = tender?.Id;
            }

            if (!string.IsNullOrEmpty(projectModel.TenderName))
            {
                var tender = _dbContext.Tenders.FirstOrDefault(s => s.Name == projectModel.TenderName);
                projectModel.TenderId = tender?.Id;
            }

            if (!string.IsNullOrEmpty(projectModel.ProjectInchargeName))
            {
                var projectIncharge = _dbContext.Employees.FirstOrDefault(s => s.FirstName + " " + s.LastName == projectModel.ProjectInchargeName);
                projectModel.ProjectInchargeId = projectIncharge?.Id;
            }

            if (!string.IsNullOrEmpty(projectModel.FundingClientName))
            {
                var fundingClient = _dbContext.Clients.FirstOrDefault(s => s.Name == projectModel.FundingClientName);
                projectModel.FundingClientId = fundingClient?.Id;
            }

            if (!string.IsNullOrEmpty(projectModel.InchargeClientName))
            {
                var inchargeClient = _dbContext.Clients.FirstOrDefault(s => s.Name == projectModel.InchargeClientName);
                projectModel.InchargeClientId = inchargeClient?.Id;
            }

            if (!string.IsNullOrEmpty(projectModel.TaxModelParamDecription))
            {
                var taxModelParam = _dbContext.Params.FirstOrDefault(s => s.Description == projectModel.TaxModelParamDecription && s.ParamType == "TAX_MODEL");
                projectModel.TaxModelParamId = taxModelParam?.Id;
            }

            if (!string.IsNullOrEmpty(projectModel.ProjectItemTypePramDecription))
            {
                var projectItemTypePram = _dbContext.Params.FirstOrDefault(s => s.Description == projectModel.ProjectItemTypePramDecription && s.ParamType == "ITEM_TYPE_MODEL");
                projectModel.ProjectItemTypePramId = projectItemTypePram?.Id;
            }

            if (!string.IsNullOrEmpty(projectModel.ServiceParamDecription))
            {
                var serviceParam = _dbContext.Params.FirstOrDefault(s => s.Description == projectModel.ServiceParamDecription && s.ParamType == "SERVICE_TYPE");
                projectModel.ServiceParamId = serviceParam?.Id;
            }

            if (!string.IsNullOrEmpty(projectModel.VendorName))
            {
                var vendor = _dbContext.Vendors.FirstOrDefault(s => s.Name == projectModel.VendorName);
                projectModel.VendorId = vendor?.Id;
            }

            return projectModel;
        }

        #endregion

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
