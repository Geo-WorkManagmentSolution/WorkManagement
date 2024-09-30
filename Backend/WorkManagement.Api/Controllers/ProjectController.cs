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

        // GET: api/project/GetAllCopanies
        [HttpGet("GetAllCopanies")]
        public async Task<ActionResult<ResponseModel>> GetAllCopanies()
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.GetCompaniesAsync(user);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // GET: api/project/GetAllCopanies
        [HttpGet("GetCopanyById")]
        public async Task<ActionResult<ResponseModel>> GetCopanyById(int companyId)
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.GetCompanyByIdAsync(user, companyId);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // GET: api/project/GetAllProjects
        [HttpGet("GetAllProjects")]
        public async Task<ActionResult<ResponseModel>> GetAllProjects()
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.GetAllProjectsAsync(user);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // GET: api/project/GetAllProjects
        [HttpGet("GetProjectById")]
        public async Task<ActionResult<ResponseModel>> GetProjectById(int projectId)
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.GetProjectByIdAsync(user, projectId);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // POST: api/project/SaveCompanyData
        [HttpPost("SaveCompanyData")]
        public async Task<ActionResult<ResponseModel>> PostCompanyData([FromBody] CompanyModel company)
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.CreateCompanyAsync(user, company);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // POST: api/project/SaveCompanyData
        [HttpPut("SaveCompanyData")]
        public async Task<ActionResult<ResponseModel>> PutCompanyData([FromBody] CompanyModel company)
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.UpdateCompanyAsync(user, company);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // GET: api/project/GetAllProjects
        [HttpPost("SaveProjectData")]
        public async Task<ActionResult<ResponseModel>> PostProjectData([FromBody] ProjectModel project)
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.CreateProjectAsync(user, project);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // GET: api/project/GetAllProjects
        [HttpPut("SaveProjectData")]
        public async Task<ActionResult<ResponseModel>> PutProjectData([FromBody] ProjectModel project)
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.UpdateProjectAsync(user, project);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // GET: api/project/GetAllProjects
        [HttpDelete("DeleteProjectById")]
        public async Task<ActionResult<ResponseModel>> DeleteProjectById(int projectId)
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.DeleteProjectAsync(user, projectId);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        // GET: api/project/GetAllProjects
        [HttpDelete("DeleteCompanyById")]
        public async Task<ActionResult<ResponseModel>> DeleteCompanyById(int companyId)
        {
            var userClaim = _httpContextAccessor.HttpContext?.User;
            var user = _userManager.GetUserName(userClaim);

            user = "admin1@admin.com";

            var response = await _projectService.DeleteCompanyAsync(user, companyId);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }
    }
}
