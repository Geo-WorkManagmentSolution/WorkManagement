using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;
using WorkManagement.Domain.Models.Employee;
using WorkManagement.Service;
using WorkManagementSolution.Employee;

namespace WorkManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService employeeService;
        private readonly IEmailService _emailService;
        private readonly AdvanceSearchService advanceSearchService;
        private IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper mapper;

        public EmployeesController(IEmployeeService employeeService, AdvanceSearchService AdvanceSearchService, IHttpContextAccessor httpContextAccessor, IMapper mapper, IEmailService emailService)
        {
            this.employeeService = employeeService;
            advanceSearchService = AdvanceSearchService;
            _httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
            _emailService = emailService;
        }

        // GET: api/employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeModel>>> GetEmployees()
        {
            var employees = await employeeService.GetAllEmployeesAsync();
            return Ok(employees);
        }


        // GET: api/employees/categories
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<EmployeeCategory>>> GetEmployeeCategories()
        {
            var EmployeeCategories = await employeeService.GetEmployeeCategories();
            return Ok(EmployeeCategories);
        }

        // GET: api/employees/departments
        [HttpGet("departments")]
        public async Task<ActionResult<IEnumerable<EmployeeDepartment>>> GetEmployeeDepartments()
        {
            var EmployeeDepartments = await employeeService.GetEmployeeDepartments();
            return Ok(EmployeeDepartments);
        }

        [HttpGet("designations")]
        public async Task<ActionResult<IEnumerable<EmployeeDesignation>>> GetEmployeeDesignations()
        {
            var EmployeeDesignations = await employeeService.GetEmployeeDesignations();
            return Ok(EmployeeDesignations);
        }

        [HttpGet("sites")]
        public async Task<ActionResult<IEnumerable<Site>>> GetSites()
        {
            var Sites = await employeeService.GetSites();
            return Ok(Sites);
        }

        // GET: api/employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeModel>> GetEmployee(int id)
        {
            var employee = await employeeService.GetEmployeeByIdAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        // GET: api/employees/checkEmail
        [HttpGet]
        [Route("CheckEmailExists")]
        public async Task<ActionResult<bool>> CheckEmailExists(string email)
        {
            var result = await employeeService.CheckEmailExists(email);
            return Ok(result);
        }

        // POST: api/employees
        [HttpPost]
        public async Task<ActionResult<EmployeeModel>> CreateEmployee([FromBody] EmployeeModel employeeModel)
        {
            var employee = mapper.Map<Employee>(employeeModel);
            var createdEmployee = await employeeService.CreateEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.Id }, createdEmployee);
        }

        // POST: api/employees
        [HttpPost("sendEmail")]
        public async Task<ActionResult> SendEmail()
        {
            try
            {
                employeeService.SendEmail();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("Search")]
        public async Task<ActionResult<List<EmployeeModel>>> SearchEmployees([FromBody] List<Criterion> criterias)
        {
            var SearchResult = advanceSearchService.ApplySearch<Employee>(criterias).ToList();
            return mapper.Map<List<EmployeeModel>>(SearchResult);
        }

        // PUT: api/employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeModel employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }
            await employeeService.UpdateEmployeeAsync(mapper.Map<Employee>(employee));
            return NoContent();
        }

        // DELETE: api/employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            //delete one to many manually


            var deleted = await employeeService.DeleteEmployeeAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpPost]
        [Route("AddNewCategory")]
        public async Task<IActionResult> AddNewCategory(EmployeeCategory employeeCategory)
        {
            var newOption = await employeeService.AddNewCategory(employeeCategory);
            return Ok(newOption);
        }

        [HttpPost]
        [Route("AddNewDepartment")]
        public async Task<IActionResult> AddNewDepartment(EmployeeDepartment employeeDepartment)
        {
            var newOption = await employeeService.AddNewDepartment(employeeDepartment);
            return Ok(newOption);
        }

        [HttpPost]
        [Route("AddNewSite")]
        public async Task<IActionResult> AddNewSite(Site site)
        {
            var newOption = await employeeService.AddNewSite(site);
            return Ok(newOption);
        }

        [HttpPost]
        [Route("AddNewDesignation")]
        public async Task<IActionResult> AddNewDesignation(EmployeeDesignation site)
        {
            var newOption = await employeeService.AddNewDesignation(site);
            return Ok(newOption);
        }

        // GET api/employee/1/leaves/current
        [HttpGet("{employeeId}/leaves/current")]
        public async Task<ActionResult<IEnumerable<EmployeeLeaveSummary>>> GetEmployeeLeaves(int employeeId)
        {
            var leaves = await employeeService.GetEmployeeLeaves(employeeId);
            return Ok(leaves);
        }


        // GET api/employee/1/leaves/addLeave
        [HttpPut("{employeeId}/leaves/addLeave")]
        public async Task<ActionResult<EmployeeLeave>> AddLeave(EmployeeLeave employeeLeave)
        {
            var leaves = await employeeService.AddLeave(employeeLeave, User.Identity.GetUserId());
            return Ok(leaves);
        }


        // GET api/employee/1/leaves/CancelLeave
        [HttpDelete("{employeeId}/leaves/cancelLeave")]
        public async Task<ActionResult<bool>> CancelLeave(int employeeLeaveId)
        {
            await employeeService.CancelLeave(employeeLeaveId);
            return Ok(true);
        }

        // GET api/employee/1/leaves/CancelLeave
        [HttpGet("{employeeId}/leaves/updateLeave")]
        public async Task<ActionResult<EmployeeLeave>> UpdateLeave(EmployeeLeave employeeLeave)
        {
            var leaves = await employeeService.UpdateLeave(employeeLeave);
            return Ok(leaves);
        }


    }

}
