using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Runtime.InteropServices;
using System.Security.Claims;
using WorkManagement.Domain.Attribute;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;

using WorkManagement.Domain.Models.Employee;
using WorkManagement.Domain.Models.Project;
using WorkManagement.Service;
using WorkManagementSolution.Employee;

namespace WorkManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private string _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles\\ProjectDocuments");
        public ProjectController(IProjectService projectService, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this._projectService = projectService;
            _httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
            _userManager = userManager;
        }

        // GET: api/projects
        [HttpGet]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Dashboard)]
        public async Task<ActionResult<IEnumerable<ProjectDashboardModel>>> GetProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        // GET: api/project/5
        [HttpGet("{id}")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_View)]
        public async Task<ActionResult<ProjectModel>> GetProject(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        // GET: api/project/projectTask/5
        [HttpGet("projectTask/{id}")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Task)]
        public async Task<ActionResult<TaskModel>> GetProjectTask(int id)
        {
            var projectTask = await _projectService.GetProjectTaskByIdAsync(id);
            if (projectTask == null)
            {
                return NotFound();
            }
            return Ok(projectTask);
        }

        // GET: api/projects/projectTask
        [HttpGet("projectTasks/{projectId}")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Task)]
        public async Task<ActionResult<IEnumerable<TaskDashboardModel>>> GetProjectTasks(int projectId)
        {
            var projectTasks = await _projectService.GetAllProjectTasksAsync(projectId);
            return Ok(projectTasks);
        }

        // POST: api/project
        [HttpPost]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Add)]
        public async Task<ActionResult<EmployeeModel>> CreateProject([FromBody] ProjectModel projectModel)
        {
            string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var createdProject = await _projectService.CreateProjectAsync(loggedUserId,projectModel);
            return Ok(createdProject);

        }


        // PUT: api/project/5
        [HttpPut("{id}")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Update)]
        public async Task<IActionResult> UpdateProject(int id, ProjectModel projectModel)
        {
            if (id != projectModel.Id)
            {
                return BadRequest();
            }

            projectModel.Id = id;
            string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var updatedProject = await _projectService.UpdateProjectAsync(loggedUserId,projectModel);
            return Ok(updatedProject);
        }


        // DELETE: api/project/5
        [HttpDelete("{id}")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Delete)]
        public async Task<IActionResult> DeleteProject(int id)
        {
            string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var deleted = await _projectService.DeleteProjectAsync(loggedUserId,id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }


        // POST: api/project/projectTask
        [HttpPost("projectTask")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Task)]
        public async Task<ActionResult<EmployeeModel>> CreateProjectTask([FromBody] TaskModel taskModel)
        {
            string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var createdProjectTask = await _projectService.CreateTaskToProjectAsync(loggedUserId,taskModel);
            return Ok(createdProjectTask);

        }


        // PUT: api/project/projectTask/5
        [HttpPut("projectTask/{id}")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Task)]
        public async Task<IActionResult> UpdateProjectTask(int id, TaskModel taskModel)
        {
            if (id != taskModel.Id)
            {
                return BadRequest();
            }

            taskModel.Id = id;
            string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var updatedProjectTask = await _projectService.UpdateTaskToProjectAsync(loggedUserId, taskModel);
            return Ok(updatedProjectTask);
        }


        // DELETE: api/project/projectTask/5
        [HttpDelete("Task/{taskId}/{projectId}")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Task)]
        public async Task<IActionResult> DeleteProjectTask(int taskId,int projectId)
        {
            var deleted = await _projectService.DeleteProjectTaskAsync(taskId,projectId);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost("assign")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Employee)]
        public async Task<IActionResult> AssignProjectToEmployee(int projectId, int employeeId)
        {
            try
            {
                string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var result = await _projectService.AssignProjectToEmployee(loggedUserId,projectId, employeeId);
                if (result)
                {
                    return Ok(new { message = "Project assigned to employee successfully" });
                }
                else
                {
                    return BadRequest(new { message = "Failed to assign project to employee" });
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }
        [HttpGet("{projectId}/employees")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Employee)]
        public async Task<ActionResult<IEnumerable<EmployeeTeamMemberList>>> GetEmployeesByProjectId(int projectId)
        {
            try
            {
                var employees = await _projectService.GetEmployeesByProjectIdAsync(projectId);
                if (employees == null)
                {
                    return NotFound("No employees found for this project.");
                }
                return Ok(employees);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("{projectId}/employees/{employeeId}")]
        [PermissionAuth(PermissionActionEnum.ProjectModule_Employee)]
        public async Task<IActionResult> RemoveEmployeeFromProject(int projectId, int employeeId)
        {
            try
            {
                var result = await _projectService.RemoveEmployeeFromProjectAsync(projectId, employeeId);
                if (result)
                {
                    return Ok("Employee removed from project successfully.");
                }
                else
                {
                    return NotFound("Employee not found in the project or already removed.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        #region Without Permission Methods

        [HttpGet("documents/{projectId}")]
        public async Task<ActionResult<IEnumerable<ProjectWorkOrders>>> GetWorkOrderDocuments(int projectId)
        {
            var documents = await _projectService.GetProjectDocumentsAsync(projectId);
            return Ok(documents);
        }

        [HttpPost("documnet/upload")]
        public async Task<ActionResult<string>> Upload(int id, IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("No file uploaded.");

                var projectFilePath = await _projectService.GetProjectDocumentFileName(id, file.FileName);

                var projectFolderPath = await _projectService.GetProjectFolderPath(id);

                if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles/ProjectDocuments");
                }

                var folderPath = Path.Combine(_storagePath, projectFolderPath);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var filePath = Path.Combine(folderPath, projectFilePath);
                var fileTypeStr = "";
                var fileType = FileType.Other;
                if (!string.IsNullOrEmpty(file.ContentType))
                {
                    var types = GetMimeTypes();
                    var ext = file.ContentType.ToLower();
                    fileTypeStr = types.ContainsValue(ext) ? types.FirstOrDefault(s => s.Value == ext).Key : "";
                    fileTypeStr = fileTypeStr.Replace(".", "");

                    switch (fileTypeStr)
                    {
                        case "txt":
                            fileType = FileType.TXT;
                            break;
                        case "pdf":
                            fileType = FileType.PDF;
                            break;
                        case "doc":
                        case "docx":
                            fileType = FileType.DOCX;
                            break;
                        case "xls":
                        case "xlsx":
                            fileType = FileType.XLSX;
                            break;
                        case "csv":
                            fileType = FileType.CSV;
                            break;
                    }
                }
                byte[] fileContent;
                using (var memoryStream = new MemoryStream()) { await file.CopyToAsync(memoryStream); fileContent = memoryStream.ToArray(); }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);

                    await _projectService.UpdateProjectDocumentData(id, file.FileName, fileType, file.Length, filePath, fileContent);
                }


                return Ok(filePath);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

        }

        [HttpDelete("document/{fileName}")]
        public async Task<IActionResult> DeleteDocument(int id, string fileName)
        {
            var result = await _projectService.DeleteProjectFile(id, fileName);
            if (result)
            {
                return Ok(new { message = "File deleted successfully" });
            }
            return NotFound(new { message = "File not found" });
        }

        [HttpGet("download/{fileName}")]
        public IActionResult Download(int id, string fileName)
        {
            var filePath = _projectService.GetProjectFilePath(id, fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;

            return File(memory, GetContentType(filePath), fileName);
        }

        [HttpGet("department-employees/{departmentId}")]
        public async Task<IEnumerable<EmployeeModel>> GetEmployeeByDepartment(int projectId, int departmentId)
        {
            return await _projectService.GetEmployeesNotAssignedToProjectByDepartment(projectId, departmentId);
        }

        #endregion

        #region Private Methods
        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types.ContainsKey(ext) ? types[ext] : "application/octet-stream";
        }
        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                { ".txt", "text/plain" },
                { ".pdf", "application/pdf" },
                { ".doc", "application/vnd.ms-word" },
                { ".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
                { ".xls", "application/vnd.ms-excel" },
                { ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
                { ".png", "image/png" },
                { ".jpg", "image/jpeg" },
                { ".jpeg", "image/jpeg" },
                { ".gif", "image/gif" },
                { ".csv", "text/csv" }
            };
        }

        #endregion








    }
}
