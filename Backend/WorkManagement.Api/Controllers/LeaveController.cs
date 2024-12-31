using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WorkManagement.Domain.Attribute;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models.Employee;
using WorkManagement.Service;
using WorkManagementSolution.Employee;

namespace WorkManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LeavesController : ControllerBase
    {
        private readonly ILeavesService leavesService;
        private readonly IEmailService _emailService;
        private readonly IMapper mapper;

        public LeavesController(ILeavesService leavesService, AdvanceSearchService AdvanceSearchService, IHttpContextAccessor httpContextAccessor, IMapper mapper, IEmailService emailService)
        {
            this.leavesService = leavesService;
            this.mapper = mapper;
            _emailService = emailService;
        }

        // GET api/leaves/history
        [HttpPost("leaves/employeeLeaveHistory")]
        [PermissionAuth(PermissionActionEnum.LeaveModule_Employee_LeaveHistory)]
        public async Task<ActionResult<IEnumerable<EmployeeLeaveHistoryDTO>>> GetEmployeeLeaveHistory([FromBody] EmployeeLeaveHistoryDataModel data)
        {
            var leaves = await leavesService.GetEmployeeLeaveHistory(data, User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(leaves);
        }

        [HttpGet("default-leaves/{jobLevelId}")]
        [PermissionAuth(PermissionActionEnum.SettingModule_DefaultLeaves_Update)]
        public async Task<ActionResult<List<EmployeeDefaultLeaveSummary>>> GetDefaultLeave(int jobLevelId)
        {
            var result = await leavesService.GetDefaultLeaveSummaries(jobLevelId);
            return Ok(result);
        }


        [HttpPost("settings/holidays")]
        [PermissionAuth(PermissionActionEnum.SettingModule_Holidays_Update)]
        public async Task<ActionResult<bool>> AddHolidays([FromBody] List<EmployeeHoliday> holidays)
        {
            var result = await leavesService.AddHoliday(holidays);
            if (result)
            {
                return Ok(true);
            }
            return BadRequest("Failed to add holidays");
        }

        [HttpPut("settings/default-leaves")]
        [PermissionAuth(PermissionActionEnum.SettingModule_DefaultLeaves_Update)]
        public async Task<ActionResult<bool>> UpdateDefaultLeave([FromBody] List<DefaultLeaveModel> defaultLeaves)
        {
            var result = await leavesService.UpdateDefaultLeave(defaultLeaves);
            if (result)
            {
                return Ok(true);
            }
            return BadRequest("Failed to update default leaves");
        }

        [HttpDelete("settings/default-leaves/{id}")]
        [PermissionAuth(PermissionActionEnum.SettingModule_DefaultLeaves_Update)]
        public async Task<IActionResult> DeleteDefaultLeave(int id)
        {
            var result = await leavesService.DeleteDefaultLeaveAsync(id);
            if (result)
            {
                return Ok();
            }
            return NotFound();
        }

        #region Without Permission Methods

        [HttpGet("joblevels")]
        public async Task<ActionResult<List<JobLevelLeave>>> GetjobLevels()
        {
            var jobLevels = await leavesService.GetJobLevels();
            return Ok(jobLevels);
        }
        [HttpGet("settings/holidays/{year}")]
        public async Task<ActionResult<List<EmployeeHoliday>>> GetHolidaysByYear(int year)
        {
            var holidays = await leavesService.GetHolidaysByYear(year);
            return Ok(holidays);
        }

        [HttpGet("settings/leaveTypes")]
        public async Task<ActionResult<List<EmployeeLeaveType>>> GetEmployeeLeaveTypes()
        {
            return await leavesService.GetEmployeeLeaveTypes();
        }

        // GET api/leaves/holidays
        [HttpGet("holidays")]
        public async Task<ActionResult<IEnumerable<EmployeeHoliday>>> GetHolidays()
        {
            var leaves = await leavesService.GetHolidays();
            return Ok(leaves);
        }

        // GET api/leaves/assignedLeaves
        [HttpGet("leaves/all")]
        public async Task<ActionResult<IEnumerable<EmployeeLeaveModel>>> GetAllLeves()
        {

            var leaves = await leavesService.GetAssignedEmployeeLeaves(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(leaves);
        }

        #endregion

    }
}
