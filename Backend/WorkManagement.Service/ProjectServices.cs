using AutoMapper;
using Microsoft.AspNetCore.Http;
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

        public async Task<List<ProjectModel>> GetAllProjectsAsync()
        {

            try
            {
                var projects = (from p in _dbContext.Projects.Where(s=>!s.IsDeleted)
                                select new ProjectModel
                                {
                                    Id = p.Id,
                                    ProjectName = string.IsNullOrEmpty(p.ProjectName) ? "" : p.ProjectName.Trim(),
                                    ProjectNumber = string.IsNullOrEmpty(p.ProjectNumber) ? "" : p.ProjectNumber.Trim(),
                                    ProjectDescription = string.IsNullOrEmpty(p.ProjectDescription) ? "" : p.ProjectDescription.Trim(),
                                    StartDate = p.StartDate,
                                    EndDate = p.EndDate,
                                    WorkOrderName=p.WorkOrderName,
                                    WorkOrderNumber = p.WorkOrderNumber,
                                    WorkOrderDate = p.WorkOrderDate,
                                    PeriodOfWorkInMonths=p.PeriodOfWorkInMonths,
                                    Status=p.Status,
                                    WorkOrderAmount=p.WorkOrderAmount,
                                    
                                    

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
                var projects = (from p in _dbContext.Projects.Where(p => p.Id == id && !p.IsDeleted)
                                select new ProjectModel
                                {
                                    Id = p.Id,
                                    ProjectName = string.IsNullOrEmpty(p.ProjectName) ? "" : p.ProjectName.Trim(),
                                    ProjectNumber = string.IsNullOrEmpty(p.ProjectNumber) ? "" : p.ProjectNumber.Trim(),
                                    ProjectDescription = string.IsNullOrEmpty(p.ProjectDescription) ? "" : p.ProjectDescription.Trim(),
                                    StartDate = p.StartDate,
                                    EndDate = p.EndDate,
                                    WorkOrderName = p.WorkOrderName,
                                    WorkOrderNumber = p.WorkOrderNumber,
                                    WorkOrderDate = p.WorkOrderDate,
                                    PeriodOfWorkInMonths = p.PeriodOfWorkInMonths,
                                    Status = p.Status,
                                    WorkOrderAmount = p.WorkOrderAmount,


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

                Project project = new Project();

                project.ProjectName = projectData.ProjectName;
                project.ProjectNumber = projectData.ProjectNumber;
                project.ProjectDescription = projectData.ProjectDescription;
                project.StartDate = projectData.StartDate;
                project.EndDate = projectData.EndDate;
                project.WorkOrderName = projectData.WorkOrderNumber;
                project.WorkOrderNumber = projectData.WorkOrderNumber;
                project.WorkOrderDate = projectData.WorkOrderDate;
                project.PeriodOfWorkInMonths = projectData.PeriodOfWorkInMonths;
                project.Status = projectData.Status;
                project.WorkOrderAmount = projectData.WorkOrderAmount;
                
                project.CreatedBy = user.Id;
                project.CreatedOn = DateTime.Now;
                project.LastModifiedBy = user.Id;
                project.LastModifiedOn = DateTime.Now;

                
                
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
                var existingProject = _dbContext.Projects.FirstOrDefault(s => s.Id == projectData.Id);

                var user = _dbContext.Users.FirstOrDefault(s => s.UserName == "admin1@admin.com");

                existingProject.ProjectName = projectData.ProjectName;
                existingProject.ProjectNumber = projectData.ProjectNumber;
                existingProject.ProjectDescription = projectData.ProjectDescription;
                existingProject.StartDate = projectData.StartDate;
                existingProject.EndDate = projectData.EndDate;
                existingProject.WorkOrderName = projectData.WorkOrderNumber;
                existingProject.WorkOrderNumber = projectData.WorkOrderNumber;
                existingProject.WorkOrderDate = projectData.WorkOrderDate;
                existingProject.PeriodOfWorkInMonths = projectData.PeriodOfWorkInMonths;
                existingProject.Status = projectData.Status;
                existingProject.WorkOrderAmount = projectData.WorkOrderAmount;
                existingProject.LastModifiedBy = user.Id;
                existingProject.LastModifiedOn = DateTime.Now;



                _dbContext.Projects.Update(existingProject);

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
                {
                    return false;
                }
                    

                var user = _dbContext.Users.FirstOrDefault(s => s.UserName == "admin1@admin.com");

                project.IsDeleted = true;
                project.LastModifiedBy = user.Id;
                project.LastModifiedOn = DateTime.Now;


                _dbContext.Projects.Update(project);

                _dbContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
        public string GetProjectFilePath(int id, string fileName)
        {
            var retunrFilePath = "";
            var Project = _dbContext.Projects.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (Project != null)
            {
                var projectDocument = _dbContext.WorkOrderDocuments.FirstOrDefault(s => s.FileName == fileName && s.ProjectId == id && !s.IsDeleted);
                if (projectDocument != null)
                {
                    retunrFilePath = projectDocument.FilePath;
                }
            }

            return retunrFilePath;
        }

        public async Task<string> UpdateProjectDocumentData(int id, string fileName, FileType fileType, long fileSize, string filePath, byte[] fileContent)
        {
            var project = _dbContext.Projects.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (project != null)
            {
                var availableProjectDocument = _dbContext.WorkOrderDocuments.FirstOrDefault(s => s.ProjectId == id && s.FileName == fileName);
                if (availableProjectDocument == null)
                {
                    var workOrderDocument = new ProjectWorkOrders();
                    workOrderDocument.ProjectId = project.Id;
                    workOrderDocument.FileName = fileName;
                    workOrderDocument.FilePath = filePath;
                    workOrderDocument.FileSize = (int)fileSize;
                    workOrderDocument.FileType = fileType;
                    workOrderDocument.FileContent = fileContent;
                    workOrderDocument.IsDeleted = false;



                    _dbContext.WorkOrderDocuments.Add(workOrderDocument);
                }
                else
                {
                    availableProjectDocument.ProjectId = project.Id;
                    availableProjectDocument.FileName = fileName;
                    availableProjectDocument.FilePath = filePath;
                    availableProjectDocument.IsDeleted = false;


                    _dbContext.WorkOrderDocuments.Update(availableProjectDocument);
                }

                _dbContext.SaveChanges();
            }

            return fileName;
        }
        public async Task<List<ProjectWorkOrders>> GetProjectDocumentsAsync(int projectId)
        {
            return await _dbContext.WorkOrderDocuments
                .Where(d => d.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<bool> DeleteProjectFile(int projectId, string fileName)
        {
            var filePath = GetProjectFilePath(projectId, fileName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);

                // Remove the file entry from the database
                var projectDocument = await _dbContext.WorkOrderDocuments
                    .FirstOrDefaultAsync(d => d.ProjectId == projectId && d.FileName == fileName);

                if (projectDocument != null)
                {
                    _dbContext.WorkOrderDocuments.Remove(projectDocument);
                    await _dbContext.SaveChangesAsync();
                }

                return true;
            }
            return false;
        }

        public async Task<string> GetProjectDocumentFileName(int id, string fileName)
        {
            var returnFilePath = fileName;
            var project = _dbContext.Projects.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (project != null)
            {
                returnFilePath = project.ProjectName + "_" + project.ProjectNumber + "_" + fileName;
            }

            return returnFilePath;
        }







        #region Private Methods

        private ProjectModel GetProjectByName(string projectName)
        {
            var projects = (from p in _dbContext.Projects.Where(p => p.ProjectName == projectName)
                            select new ProjectModel
                            {
                                ProjectName = string.IsNullOrEmpty(p.ProjectName) ? "" : p.ProjectName.Trim(),
                                ProjectNumber = string.IsNullOrEmpty(p.ProjectNumber) ? "" : p.ProjectNumber.Trim(),
                                ProjectDescription = string.IsNullOrEmpty(p.ProjectDescription) ? "" : p.ProjectDescription.Trim(),
                                StartDate = p.StartDate,
                                EndDate = p.EndDate
                            }).FirstOrDefault();


            return projects;
        }

        
       

        
       
        #endregion
    }
}
