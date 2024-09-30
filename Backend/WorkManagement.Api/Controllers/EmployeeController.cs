using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WorkManagement.Domain.Contracts;
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
        private readonly AdvanceSearchService advanceSearchService;
        private IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper mapper;

        public EmployeesController(IEmployeeService employeeService,AdvanceSearchService AdvanceSearchService, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            this.employeeService = employeeService;
            advanceSearchService = AdvanceSearchService;
            _httpContextAccessor = httpContextAccessor;
            this.mapper = mapper;
        }

        // GET: api/employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeModel>>> GetEmployees()
        {
            var employees = await employeeService.GetAllEmployeesAsync();
            return Ok(employees);
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

        // POST: api/employees
        [HttpPost]
        public async Task<ActionResult<EmployeeModel>> CreateEmployee([FromBody]EmployeeModel employee)
        {
            var createdEmployee = await employeeService.CreateEmployeeAsync(mapper.Map<Employee>(employee));
            return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.Id }, createdEmployee);

        }

        [HttpPost]
        [Route("Search")]
        public async Task<ActionResult<List<EmployeeModel>>> SearchEmployees([FromBody]List<Criterion> criterias)
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
            var deleted = await employeeService.DeleteEmployeeAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }

}
