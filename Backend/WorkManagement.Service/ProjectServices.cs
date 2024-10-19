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
                                    EndDate = p.EndDate
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
                                    EndDate = p.EndDate

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
