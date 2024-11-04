using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkManagement.Domain.Contracts;
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

        // GET api/leaves/history
        [HttpGet("leaves/history")]
        public async Task<ActionResult<IEnumerable<EmployeeLeave>>> LeaveHistory()
        {
            var leaves = await leavesService.GetAllEmployeeLeaves();
            return Ok(leaves);
        }



    }
}
