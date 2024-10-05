using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        // GET: api/project/companyList
        [HttpGet("companyList")]
        public async Task<ActionResult<IEnumerable<Company>>> GetProjectCompanyList()
        {
            var companyList = await _projectService.GetProjectCompanyList();
            return Ok(companyList);
        }

        // GET: api/project/tenderList
        [HttpGet("tenderList")]
        public async Task<ActionResult<IEnumerable<Tender>>> GetProjectTendersList()
        {
            var tenderList = await _projectService.GetProjectTendersList();
            return Ok(tenderList);
        }

        // GET: api/project/employeeList
        [HttpGet("employeeList")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetProjectEmployeeList()
        {
            var employeeList = await _projectService.GetProjectEmployeeList();
            return Ok(mapper.Map<List<EmployeeModel>>(employeeList));
        }


        // GET: api/project/clientList
        [HttpGet("clientList")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetProjectClientList()
        {
            var clientList = await _projectService.GetProjectClientList();
            return Ok(clientList);
        }

        // GET: api/project/paramList
        [HttpGet("paramList")]
        public async Task<ActionResult<IEnumerable<Param>>> GetProjectParamList(string paramType)
        {
            var paramList = await _projectService.GetProjectParamList(paramType);
            return Ok(paramList);
        }

        // GET: api/project/vendorList
        [HttpGet("vendorList")]
        public async Task<ActionResult<IEnumerable<Param>>> GetProjectVendorList()
        {
            var vendorList = await _projectService.GetProjectVendorList();
            return Ok(vendorList);
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectModel>>> GetProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
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
    }
}
