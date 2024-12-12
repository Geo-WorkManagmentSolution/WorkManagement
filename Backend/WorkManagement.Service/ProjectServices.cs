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

        public async Task<ProjectWorkOrders> CreateWorkOrderDocumentAsync(int projectId, IFormFile file)
        {
            var project = await _dbContext.Projects.FindAsync(projectId);
            if (project == null)
            {
                throw new Exception("Project not found");
            }

            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var filePath = Path.Combine(uploadsFolder, fileName);
            byte[] fileContent;
            using (var memoryStream = new MemoryStream()) { await file.CopyToAsync(memoryStream); fileContent = memoryStream.ToArray(); }

            var workOrderDocument = new ProjectWorkOrders
            {
                FileName = file.FileName,
                FilePath = filePath,
                FileSize = (int)file.Length,
                FileContent = fileContent,
                FileType = GetFileType(file.ContentType),
                ProjectId = projectId
            };



            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
                
            }

            _dbContext.WorkOrderDocuments.Add(workOrderDocument);
            await _dbContext.SaveChangesAsync();

            return workOrderDocument;
        }

        public async Task<bool> DeleteWorkOrderDocumentAsync(int documentId)
        {
            var document = await _dbContext.WorkOrderDocuments.FindAsync(documentId);
            if (document == null)
            {
                return false;
            }

            var uploadsFolder = EnsureUploadsFolderExists();
            var filePath = Path.Combine(uploadsFolder, Path.GetFileName(document.FilePath));

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            _dbContext.WorkOrderDocuments.Remove(document);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<(FileStream FileStream, string ContentType, string FileName)> DownloadWorkOrderDocumentAsync(int documentId)
        {
            var document = await _dbContext.WorkOrderDocuments.FindAsync(documentId);
            if (document == null)
            {
                throw new Exception("Document not found");
            }

            var uploadsFolder = EnsureUploadsFolderExists();
            var filePath = Path.Combine(uploadsFolder, Path.GetFileName(document.FilePath));

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("File not found on the server");
            }

            var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return (fileStream, GetContentType(document.FileType), document.FileName);
        }

        public async Task<List<ProjectWorkOrders>> GetWorkOrderDocumentsAsync(int projectId)
        {
            return await _dbContext.WorkOrderDocuments
                .Where(d => d.ProjectId == projectId)
                .ToListAsync();
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

        
        private FileType GetFileType(string contentType)
        {
            // Will add other types
            if (contentType.StartsWith("image/"))
                return FileType.Other;
            if (contentType == "application/pdf")
                return FileType.PDF;
            return FileType.Other;
        }

        private string GetContentType(FileType? fileType)
        {
            switch (fileType)
            {
                case FileType.Other:
                    return "image/jpeg";
                case FileType.PDF:
                    return "application/pdf";
                default:
                    return "application/octet-stream";
            }
        }
        private string EnsureUploadsFolderExists()
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }
            return uploadsFolder;
        }
        #endregion
    }
}
