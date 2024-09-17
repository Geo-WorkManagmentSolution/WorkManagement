using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WorkManagement.Domain.Models.Employee;
using WorkManagement.Service;
using WorkManagementSolution.Employee;

namespace WorkManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeService employeeService;

        public EmployeesController(EmployeeService employeeService)
        {
            this.employeeService = employeeService;
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
        public async Task<ActionResult<EmployeeModel>> CreateEmployee(Employee employee)
        {
            var createdEmployee = await employeeService.CreateEmployeeAsync(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.Id }, createdEmployee);
        }

        // PUT: api/employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }
            await employeeService.UpdateEmployeeAsync(employee);
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
