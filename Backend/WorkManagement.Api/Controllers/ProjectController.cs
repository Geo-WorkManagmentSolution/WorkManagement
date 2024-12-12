using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IO;
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

        public ProjectController(IProjectService projectService, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this._projectService = projectService;
            _httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
            _userManager = userManager;
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectModel>>> GetProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        // GET: api/project/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectModel>> GetProject(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        // POST: api/project
        [HttpPost]
        public async Task<ActionResult<EmployeeModel>> CreateProject([FromBody] ProjectModel projectModel)
        {
            var createdProject = await _projectService.CreateProjectAsync(projectModel);
            return Ok(createdProject);

        }


        // PUT: api/project/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, ProjectModel projectModel)
        {
            if (id != projectModel.Id)
            {
                return BadRequest();
            }

            projectModel.Id = id;

            var updatedProject = await _projectService.UpdateProjectAsync(projectModel);
            return Ok(updatedProject);
        }


        // DELETE: api/project/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var deleted = await _projectService.DeleteProjectAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost("upload/{projectId}")]
        public async Task<ActionResult<ProjectWorkOrders>> CreateWorkOrderDocument(int projectId, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is required");
            }

            var document = await _projectService.CreateWorkOrderDocumentAsync(projectId, file);
            return CreatedAtAction(nameof(DownloadWorkOrderDocument), new { documentId = document.Id }, document);
        }

        [HttpDelete("remove/{documentId}")]
        public async Task<IActionResult> DeleteWorkOrderDocument(int documentId)
        {
            var result = await _projectService.DeleteWorkOrderDocumentAsync(documentId);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("download/{documentId}")]
        public async Task<IActionResult> DownloadWorkOrderDocument(int documentId)
        {
            var fileResult = await _projectService.DownloadWorkOrderDocumentAsync(documentId);
            return File(fileResult.FileStream, fileResult.ContentType, fileResult.FileName);
        }

        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<IEnumerable<ProjectWorkOrders>>> GetWorkOrderDocuments(int projectId)
        {
            var documents = await _projectService.GetWorkOrderDocumentsAsync(projectId);
            return Ok(documents);
        }

    }
}
