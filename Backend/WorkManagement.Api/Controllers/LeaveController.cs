using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WorkManagement.Domain.Contracts;
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

        // GET api/leaves/history
        [HttpPost("leaves/employeeLeaveHistory")]
        public async Task<ActionResult<IEnumerable<EmployeeLeaveHistoryDTO>>> GetEmployeeLeaveHistory([FromBody] EmployeeLeaveHistoryDataModel data)
        {
            var leaves = await leavesService.GetEmployeeLeaveHistory(data, User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(leaves);
        }

        [HttpGet("default-leaves")]
        public async Task<ActionResult<List<EmployeeDefaultLeaveSummary>>> GetDefaultLeave() 
        {
            var result = await leavesService.GetDefaultLeaveSummaries(); 
            return Ok(result); 
        }

        [HttpPut("default-leaves")]
        public async Task<ActionResult<bool>> UpdateDefaultLeave([FromBody] List<EmployeeDefaultLeaveSummary> defaultLeaves)
        {
            var result = await leavesService.UpdateDefaultLeave(defaultLeaves);
            if (result)
            {
                return Ok(true);
            }
            return BadRequest("Failed to update default leaves");
        }
        [HttpPost("holidays")]
        public async Task<ActionResult<bool>> AddHolidays([FromBody] List<EmployeeHoliday> holidays)
        {
            var result = await leavesService.AddHoliday(holidays);
            if (result)
            {
                return Ok(true);
            }
            return BadRequest("Failed to add holidays");
        }

        [HttpGet("holidays/{year}")]
        public async Task<ActionResult<List<EmployeeHoliday>>> GetHolidaysByYear(int year)
        {
            var holidays = await leavesService.GetHolidaysByYear(year);
            return Ok(holidays);
        }


    }
}
