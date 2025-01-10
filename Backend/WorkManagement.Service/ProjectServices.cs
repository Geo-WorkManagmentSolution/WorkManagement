using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models.Employee;
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

        public async Task<List<ProjectDashboardModel>> GetAllProjectsAsync()
        {

            try
            {
                var projects = (from p in _dbContext.Projects.Where(s=>!s.IsDeleted)
                                select new ProjectDashboardModel
                                {
                                    Id = p.Id,
                                    ProjectName = string.IsNullOrEmpty(p.ProjectName) ? "" : p.ProjectName.Trim(),
                                    ProjectNumber = string.IsNullOrEmpty(p.ProjectNumber) ? "" : p.ProjectNumber.Trim(),
                                    ProjectDescription = string.IsNullOrEmpty(p.ProjectDescription) ? "" : p.ProjectDescription.Trim(),
                                    StartDate = p.StartDate.ToString("yyyy-MM-dd"),
                                    EndDate = p.EndDate.HasValue ?  p.EndDate.Value.ToString("yyyy-MM-dd") : "",
                                    WorkOrderName= string.IsNullOrEmpty(p.WorkOrderName) ? "" : p.WorkOrderName,
                                    WorkOrderNumber = string.IsNullOrEmpty(p.WorkOrderNumber) ? "" : p.WorkOrderNumber,
                                    WorkOrderDate = p.WorkOrderDate.HasValue ? p.WorkOrderDate.Value.ToString("yyyy-MM-dd") : "",
                                    PeriodOfWorkInMonths=p.PeriodOfWorkInMonths.HasValue ? p.PeriodOfWorkInMonths.Value : 0,
                                    Status=p.Status,
                                    WorkOrderAmount=p.WorkOrderAmount.HasValue ? p.WorkOrderAmount.Value : 0,
                                    
                                    

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

        public async Task<ProjectModel> CreateProjectAsync(string loggedUserId, ProjectModel projectData)
        {
            try
            {
                // Check if the loggedUserId can be parsed to a GUID
                if (!Guid.TryParse(loggedUserId, out Guid userGuid))
                {
                    return null;
                    throw new Exception("Invalid User ID");

                }

                var user = _dbContext.Users.FirstOrDefault(s => s.Id == userGuid);

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

        public async Task<ProjectModel> UpdateProjectAsync(string loggedUserId, ProjectModel projectData)
        {
            try
            {
                // Check if the loggedUserId can be parsed to a GUID
                if (!Guid.TryParse(loggedUserId, out Guid userGuid))
                {
                    return null;
                    throw new Exception("Invalid User ID");

                }

                var existingProject = _dbContext.Projects.FirstOrDefault(s => s.Id == projectData.Id);

                var user = _dbContext.Users.FirstOrDefault(s => s.Id == userGuid);

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

        public async Task<bool> DeleteProjectAsync(string loggedUserId, int id)
        {
            try
            {
                // Check if the loggedUserId can be parsed to a GUID
                if (!Guid.TryParse(loggedUserId, out Guid userGuid))
                {
                    return false;
                    throw new Exception("Invalid User ID");

                }
                var project = await _dbContext.Projects.FindAsync(id);
                if (project == null)
                {
                    return false;
                }
                    

                var user = _dbContext.Users.FirstOrDefault(s => s.Id == userGuid);

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
            var returnDocumentList = new List<ProjectWorkOrders>();

            var projectDocs = _dbContext.WorkOrderDocuments.Where(s => s.ProjectId == projectId).ToList();
            if(projectDocs == null)
            {
                return returnDocumentList;
            }
            else
            {
                return projectDocs;
            }
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

        public async Task<string> GetProjectFolderPath(int id)
        {
            var returnFolderPath = "";
            var project = _dbContext.Projects.FirstOrDefault(s => s.Id == id && !s.IsDeleted);
            if (project != null)
            {
                returnFolderPath = project.ProjectName;
            }

            return returnFolderPath;
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



        public async Task<bool> AssignProjectToEmployee(string loggedUserId, int projectId, int employeeId)
        {
            // Check if the loggedUserId can be parsed to a GUID
            if (!Guid.TryParse(loggedUserId, out Guid userGuid))
            {
                return false;
                throw new Exception("Invalid User ID");

            }

            var user = _dbContext.Users.FirstOrDefault(s => s.Id == userGuid);
            try
            {
                var project = await _dbContext.Projects.FindAsync(projectId);
                var employee = _dbContext.Employees.FirstOrDefault(s=>s.Id == employeeId && !s.IsDeleted);

                if (project == null || employee == null)
                {
                    return false;
                }

                var existingAssignment = await _dbContext.ProjectEmployees
                    .FirstOrDefaultAsync(pe => pe.ProjectId == projectId && pe.EmployeeId == employeeId);

                if (existingAssignment != null)
                {
                    return true; // Assignment already exists
                }

                var projectEmployee = new ProjectEmployee
                {
                    ProjectId = projectId,
                    EmployeeId = employeeId,
                  CreatedBy = user.Id,
                    CreatedOn = DateTime.Now,
                   LastModifiedBy = user.Id,
                    LastModifiedOn = DateTime.Now,
                };

                _dbContext.ProjectEmployees.Add(projectEmployee);
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                return false;
            }
        }

        public async Task<List<EmployeeTeamMemberList>> GetEmployeesByProjectIdAsync(int projectId)
        {

            try
            {
                var data = await (from e in _dbContext.ProjectEmployees
                                  where !e.IsDeleted && e.ProjectId == projectId
                                  select new EmployeeTeamMemberList
                                  {
                                      Name = e.Employee.FirstName + " " + e.Employee.LastName,
                                      Email = e.Employee.Email,
                                      Avatar = "",
                                      Designation = e.Employee.EmployeeDesignationId != null ? e.Employee.EmployeeDesignation.Name : "",
                                      EmployeeId = e.Employee.Id,
                                      EmployeeNumber = e.Employee.EmployeeNumber
                                  }).ToListAsync();
                if (data.Count > 0)
                {
                    return data;
                }
                else {
                    return new List<EmployeeTeamMemberList>();
                }


            }
            catch (Exception ex)
            {
                // Log the exception
                throw new Exception("Somthing wrong happened!");
                }
            }

        public async Task<bool> RemoveEmployeeFromProjectAsync(int projectId, int employeeId)
        {
            var user = _dbContext.Users.FirstOrDefault(s => s.UserName == "admin1@admin.com");
            try
            {
                var projectEmployee = await _dbContext.ProjectEmployees
                    .FirstOrDefaultAsync(pe => pe.ProjectId == projectId && pe.EmployeeId == employeeId && !pe.IsDeleted);

                if (projectEmployee == null)
                {
                    return false;
                }

                projectEmployee.IsDeleted = true;
                projectEmployee.LastModifiedBy = user.Id; 
                projectEmployee.LastModifiedOn = DateTime.Now;

                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                return false;
            }
        }

        #region Task Region

        public async Task<TaskModel> CreateTaskToProjectAsync(string loggedUserId, TaskModel task)
        {
            try
            {
                if(task == null)
                {
                    return null;
                    throw new Exception("task data is empty");
                }

                if(task.ProjectId == null)
                {
                    return null;
                    throw new Exception("Project Id can not be null");
                }

                if (!Guid.TryParse(loggedUserId, out Guid userGuid))
                {
                    return null;
                    throw new Exception("Invalid User ID");

                }

                ProjectTask projectTask = new ProjectTask();

                projectTask.Title = task.Title;
                projectTask.Description = task.Description;
                projectTask.Notes = task.Notes;
                projectTask.Status = ProjectTaskStatus.New;
                projectTask.Priority = task.Priority;
                projectTask.EstimatedHours = task.EstimatedHours;
                projectTask.RemainingHours = task.RemainingHours;
                projectTask.CompletedHours = task.CompletedHours;
                projectTask.ProjectId = task.ProjectId;

                projectTask.CreatedBy = userGuid;
                projectTask.CreatedOn = DateTime.Now;
                projectTask.LastModifiedBy = userGuid;
                projectTask.LastModifiedOn = DateTime.Now;

                if (!string.IsNullOrEmpty(task.StartDate))
                {
                    var taskStartDate = DateTime.Parse(task.StartDate);
                    projectTask.StartDate = taskStartDate;
                }

                if (!string.IsNullOrEmpty(task.EndDate))
                {
                    var taskEndDate = DateTime.Parse(task.EndDate);
                    projectTask.EndDate = taskEndDate;
                }

                var assignedEmployeeList = new List<int>();
                if(task.AssignedEmployees != null)
                {
                    if(task.AssignedEmployees.Count > 0)
                    {
                        foreach(var employeeId in  task.AssignedEmployees)
                        {
                            var employee = _dbContext.Employees.FirstOrDefault(s=>s.IsDeleted == false && s.Id == employeeId);
                            if(employee != null)
                            {
                                assignedEmployeeList.Add(employeeId);
                            }
                        }

                        projectTask.AssignedEmployees = assignedEmployeeList;
                    }
                }

                _dbContext.ProjectTasks.Add(projectTask);

                _dbContext.SaveChanges();

                

                return task;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<TaskModel> UpdateTaskToProjectAsync(string loggedUserId, TaskModel task)
        {
            try
            {
                if (task == null)
                {
                    return null;
                    throw new Exception("task data is empty");
                }

                if (task.ProjectId == null)
                {
                    return null;
                    throw new Exception("Project Id can not be null");
                }


                if (!Guid.TryParse(loggedUserId, out Guid userGuid))
                {
                    return null;
                    throw new Exception("Invalid User ID");

                }

                ProjectTask projectTask = _dbContext.ProjectTasks.FirstOrDefault(x => x.Id == task.Id);
                
                if(projectTask == null)
                {
                    return null;
                    throw new Exception("Can not update data. There is no task available");
                }

                projectTask.Title = task.Title;
                projectTask.Description = task.Description;
                projectTask.Notes = task.Notes;
                projectTask.Status = task.Status;
                projectTask.Priority = task.Priority;
                projectTask.EstimatedHours = task.EstimatedHours.HasValue ? task.EstimatedHours.Value : 0;
                projectTask.RemainingHours = task.RemainingHours.HasValue ? task.RemainingHours.Value : 0;
                projectTask.CompletedHours = task.CompletedHours.HasValue ? task.CompletedHours.Value : 0;
                

                projectTask.LastModifiedBy = userGuid;
                projectTask.LastModifiedOn = DateTime.Now;

                if (!string.IsNullOrEmpty(task.StartDate))
                {
                    var taskStartDate = DateTime.Parse(task.StartDate);
                    projectTask.StartDate = taskStartDate;
                }

                if (!string.IsNullOrEmpty(task.EndDate))
                {
                    var taskEndDate = DateTime.Parse(task.EndDate);
                    projectTask.EndDate = taskEndDate;
                }

                var assignedEmployeeList = new List<int>();
                if (task.AssignedEmployees != null)
                {
                    if (task.AssignedEmployees.Count > 0)
                    {
                        foreach (var employeeId in task.AssignedEmployees)
                        {
                            var employee = _dbContext.Employees.FirstOrDefault(s => s.IsDeleted == false && s.Id == employeeId);
                            if (employee != null)
                            {
                                assignedEmployeeList.Add(employeeId);
                            }
                        }

                        projectTask.AssignedEmployees = assignedEmployeeList;
                    }
                }

                _dbContext.ProjectTasks.Update(projectTask);

                _dbContext.SaveChanges();


                return task;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<TaskModel> GetProjectTaskByIdAsync(int id)
        {
            try
            {
                var returnProjectTask = new TaskModel();
                var projectTasks = (from p in _dbContext.ProjectTasks.Where(p => p.Id == id && !p.IsDeleted)
                                select new TaskModel
                                {
                                    Id = p.Id,
                                    Title = string.IsNullOrEmpty(p.Title) ? "" : p.Title.Trim(),
                                    Description = string.IsNullOrEmpty(p.Description) ? "" : p.Description.Trim(),
                                    Notes = string.IsNullOrEmpty(p.Notes) ? "" : p.Notes.Trim(),
                                    Status = p.Status,
                                    Priority = p.Priority,
                                    StartDate = p.StartDate.HasValue ? p.StartDate.Value.ToString("yyyy-MM-dd") : "",
                                    EndDate = p.EndDate.HasValue ? p.EndDate.Value.ToString("yyyy-MM-dd") : "",
                                    EstimatedHours = p.EstimatedHours,
                                    RemainingHours = p.RemainingHours,
                                    CompletedHours = p.CompletedHours,
                                    AssignedEmployees = p.AssignedEmployees,
                                    ProjectId = p.ProjectId,


                                }).FirstOrDefault();


                return projectTasks;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<List<TaskDashboardModel>> GetAllProjectTasksAsync(int projectId)
        {

            try
            {
                var projectTasks = (from p in _dbContext.ProjectTasks.Where(s => !s.IsDeleted && s.ProjectId == projectId)
                                select new TaskDashboardModel
                                {
                                    Id = p.Id,
                                    Title = string.IsNullOrEmpty(p.Title) ? "" : p.Title.Trim(),
                                    Description = string.IsNullOrEmpty(p.Description) ? "" : p.Description.Trim(),
                                    Status = p.Status,
                                    Priority = p.Priority,
                                    RemainingHours = p.RemainingHours.HasValue ? p.RemainingHours.Value : 0,
                                    EstimatedHours = p.EstimatedHours.HasValue ? p.EstimatedHours.Value : 0,
                                    CompletedHours = p.CompletedHours.HasValue ? p.CompletedHours.Value : 0,
                                    StartDate = p.StartDate.HasValue ? p.StartDate.Value.ToString("yyyy-MM-dd") : "",
                                    EndDate = p.EndDate.HasValue ? p.EndDate.Value.ToString("yyyy-MM-dd") : "",
                                }).ToList();

                return projectTasks;
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async Task<bool> DeleteProjectTaskAsync(int taskId,int projectId)
        {
            try
            {
                var projectTask = await _dbContext.ProjectTasks.FindAsync(taskId);
                if (projectTask == null)
                    return false;

                if(projectTask.ProjectId != projectId)
                {
                    return false;
                }

                _dbContext.ProjectTasks.Remove(projectTask);
                await _dbContext.SaveChangesAsync();


                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        #endregion


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

        public async Task<List<EmployeeModel>> GetEmployeesNotAssignedToProjectByDepartment(int projectId, int departmentId)
        {
            var employeesInProject = await _dbContext.ProjectEmployees
                .Where(pe => pe.ProjectId == projectId)
                .Select(pe => pe.EmployeeId)
                .ToListAsync();

            var employees = await _dbContext.Employees
                .Where(e => !e.IsDeleted
                            && e.EmployeeDepartmentId == departmentId
                            && !employeesInProject.Contains(e.Id) )
                .Select(e => new EmployeeModel
                {
                    Id = e.Id,
                    EmployeeNumber = e.EmployeeNumber,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    Email = e.Email,
                    // Add other employee properties as needed
                })
                .ToListAsync();

            return employees;
        }


        #endregion
    }
}
