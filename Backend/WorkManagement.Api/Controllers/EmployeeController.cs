﻿using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Security.Claims;
using WorkManagement.Domain.Attribute;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models;
using WorkManagement.Domain.Models.Dropdown;
using WorkManagement.Domain.Models.Employee;
using WorkManagement.Domain.Models.Project;
using WorkManagement.Service;
using WorkManagementSolution.Employee;

namespace WorkManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmployeesController : APIControllerBase
    {
        private readonly IEmployeeService employeeService;
        private readonly IEmailService _emailService;
        private readonly AdvanceSearchService advanceSearchService;
        private IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper mapper;
        private string _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles\\EmployeeDocuments");

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
        [PermissionAuth(PermissionActionEnum.EmployeeModule_Dashboard)]
        public async Task<ActionResult<IEnumerable<EmployeeDashboardDataModel>>> GetEmployees()
        {
            var userRole = this.User.FindFirst(ClaimTypes.Role).Value;
            string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var employees = await employeeService.GetAllEmployeesAsync(loggedUserId,userRole);
            return Ok(employees);
        }

        
        // GET: api/employees/5
        [HttpGet("{id}")]
        [PermissionAuth(PermissionActionEnum.EmployeeModule_View)]
        public async Task<ActionResult<EmployeeModel>> GetEmployee(int id)
        {
            string userRole = this.User.FindFirst(ClaimTypes.Role).Value;
            string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var employee = await employeeService.GetEmployeeByIdAsync(userRole, loggedUserId,id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        // POST: api/employees
        [HttpPost]
        [PermissionAuth(PermissionActionEnum.EmployeeModule_Add)]
        public async Task<ActionResult<EmployeeModel>> CreateEmployee([FromBody] EmployeeModel employeeModel)
        {
            var userRole = this.User.FindFirst(ClaimTypes.Role).Value;

            if (userRole == "Employee")
            {
                return BadRequest("Employee user can not add new employee");
            }
            var createdEmployee = await employeeService.CreateEmployeeAsync(employeeModel);
            return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.Id }, createdEmployee);
        }

        // PUT: api/employees/5
        [HttpPut("{id}")]
        [PermissionAuth(PermissionActionEnum.EmployeeModule_Update)]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeModel employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }


            await employeeService.UpdateEmployeeAsync(id, employee);
            return NoContent();
        }

        [HttpGet("partial/{employeeId}")]
        public async Task<ActionResult<SalaryEmployeeDashboardModel>> GetPartialEmployeeData(int employeeId)
        {
            var employee = await employeeService.EmployeePartialDetailsById(employeeId);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        // DELETE: api/employees/5
        [HttpDelete("{id}")]
        [PermissionAuth(PermissionActionEnum.EmployeeModule_Delete)]
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
        

        [HttpPut("SalaryApprove/{salaryId}")]
        [PermissionAuth(PermissionActionEnum.EmployeeModule_Salary_Approve_Reject)]
        public async Task<ActionResult<EmployeeSalary>> ApproveSalary(int salaryId, int employeeId)
        {
            try
            {
                var loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var employeeSalary = await employeeService.ApproveSalary(salaryId, loggedUserId, employeeId);
                return Ok(employeeSalary);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPut("SalaryReject/{salaryId}")]
        [PermissionAuth(PermissionActionEnum.EmployeeModule_Salary_Approve_Reject)]
        public async Task<ActionResult<EmployeeSalary>> RejectSalary(int salaryId, int employeeId)
        {
            var loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var employeeSalary = await employeeService.RejectSalary(salaryId, loggedUserId, employeeId);
            return Ok(employeeSalary);
        }

        [HttpGet("Salary/PendingSalaryRequest")]
        //[PermissionAuth(PermissionActionEnum.EmployeeModule_Salary_History_View)]
        public async Task<ActionResult<IEnumerable<EmployeeSalaryDataModel>>> GetEmployeePendingSalaryRequest([FromQuery] int? employeeId = null)
        {
            List<EmployeeSalaryDataModel> salaryRequests = new List<EmployeeSalaryDataModel>();
            var loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (employeeId.HasValue)
            { // Fetch data based on employeeId
                salaryRequests = await employeeService.GetEmployeeSalaryRequestList(loggedUserId, employeeId.Value);
            }
            else
            {
                salaryRequests = await employeeService.GetAllPenidngSalaryRequestList(loggedUserId);
            }
            return Ok(salaryRequests);
        }

        [HttpGet("SalaryDashboard")]
        public async Task<ActionResult<IEnumerable<SalaryEmployeeDashboardModel>>> GetEmployeesForSalaryDashboard()
        {
            var userRole = this.User.FindFirst(ClaimTypes.Role).Value;
            string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var employees = await employeeService.GetDashboardForEmployeeSalary(loggedUserId, userRole);
            return Ok(employees);
        }



        // GET api/employee/leaves/current
        [HttpGet("leaves/current")]
        [PermissionAuth(PermissionActionEnum.LeaveModule_Employee_LeaveHistory)]
        public async Task<ActionResult<IEnumerable<EmployeeLeaveSummary>>> GetEmployeeLeaves([FromQuery] int? employeeId = null)
        {
            List<EmployeeLeaveSummaryModel> leaves; if (employeeId.HasValue)
            { // Fetch data based on employeeId
              leaves = await employeeService.GetEmployeeLeaves(null, employeeId); 
            } else 
            { 
                // Fetch data based on loggedUserId
                var loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                leaves = await employeeService.GetEmployeeLeaves(loggedUserId, null); 
            } return Ok(leaves); 
        }

        // GET api/employee/leaves/addLeave
        [HttpPost("leaves/addLeave")]
        [PermissionAuth(PermissionActionEnum.LeaveModule_Add)]
        public async Task<ActionResult<EmployeeLeaveModel>> AddLeave(EmployeeLeaveModel employeeLeaveData)
        {
            var leaves = await employeeService.AddLeave(employeeLeaveData, User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(leaves);
        }

        // GET api/employee/leaves/updateLeave
        [HttpPut("leaves/updateLeave")]
        [PermissionAuth(PermissionActionEnum.LeaveModule_Update)]
        public async Task<ActionResult<EmployeeLeaveModel>> UpdateLeave(EmployeeLeaveModel employeeLeaveData)
        {
            var leaves = await employeeService.UpdateLeave(employeeLeaveData, User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(leaves);
        }

        // GET api/employee/leaves/CancelLeave
        [HttpDelete("leaves/cancelLeave")]
        [PermissionAuth(PermissionActionEnum.LeaveModule_Delete)]
        public async Task<ActionResult<bool>> CancelLeave(int employeeLeaveId)
        {
            await employeeService.CancelLeave(employeeLeaveId, User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return Ok(true);
        }

        [HttpPut("approve/{leaveId}")]
        [PermissionAuth(PermissionActionEnum.LeaveModule_Approvals)]
        public async Task<ActionResult<EmployeeLeave>> ApproveLeave(int leaveId)
        {
            try
            {
                var employeeLeave = await employeeService.ApproveLeave(leaveId);
                return Ok(employeeLeave);
            }
            catch(Exception e) {
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPut("reject/{leaveId}")]
        [PermissionAuth(PermissionActionEnum.LeaveModule_Approvals)]
        public async Task<ActionResult<EmployeeLeave>> RejectLeave(int leaveId)
        {
            var employeeLeave = await employeeService.RejectLeave(leaveId);
            return Ok(employeeLeave);
        }       

        [HttpPost("settings/addDropdownItem")]
        [PermissionAuth(PermissionActionEnum.SettingModule_DropDownSettings_Update)]
        public async Task<IActionResult> AddDropdownItem([FromBody] DropdownModel model)
        {
            try
            {
                var newItem = await employeeService.AddDropdownItem(model);
                return Ok(newItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("settings/deleteDropdownItem/{id}/{dropdownName}")]
        [PermissionAuth(PermissionActionEnum.SettingModule_DropDownSettings_Update)]
        public async Task<IActionResult> DeleteDropdownItem(int id,string dropdownName)
        {
            try
            {
                await employeeService.DeleteDropdownItem(id,dropdownName);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("settings/ updateDropdownItem")]
        [PermissionAuth(PermissionActionEnum.SettingModule_DropDownSettings_Update)]
        public async Task<IActionResult> UpdateDropdownItem([FromBody] DropdownModel model)
        {
            try
            {
                var updatedItem = await employeeService.UpdateDropdownItem(model);
                return Ok(updatedItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        #region Without Permission Methods

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

        [HttpGet("ReportToEmployeeList")]
        public async Task<ActionResult<IEnumerable<EmployeeReportToModel>>> GetReportToEmployeeList(int? departmentId, int? employeeId)
        {
            var reportToEmployeeList = await employeeService.GetReportToEmployeeList(departmentId, employeeId);
            return Ok(reportToEmployeeList);
        }
        //[HttpGet("ReportToEmployeeList")]
        //public async Task<ActionResult<IEnumerable<EmployeeReportToModel>>> GetReportToEmployeeList(int? departmentId)
        //{
        //    var reportToEmployeeList = await employeeService.GetReportToEmployeeList(departmentId);
        //    return Ok(reportToEmployeeList);
        //}


        [HttpGet("TeamMembersList")]
        public async Task<ActionResult<IEnumerable<EmployeeTeamMemberList>>> GetTeamMembersList([FromQuery] int? employeeId = null)
        {
            string loggedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var teamMembersList = await employeeService.GetTeamMembersList(loggedUserId, employeeId);
            return Ok(teamMembersList);
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

        [HttpPost("documnet/upload")]
        public async Task<ActionResult<string>> Upload(int id, IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("No file uploaded.");

                var employeeFilePath = await employeeService.GetEmployeeDocumentFileName(id, file.FileName);

                var employeeFolderPath = await employeeService.GetEmployeeFolderPath(id);

                if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles/EmployeeDocuments");
                }

                var folderPath = Path.Combine(_storagePath, employeeFolderPath);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                var filePath = Path.Combine(folderPath, employeeFilePath);

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

                    await employeeService.UpdateEmployeeDocumentData(id, file.FileName, fileType, file.Length, filePath, fileContent);
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
            var result = await employeeService.DeleteEmployeeFile(id, fileName);
            if (result)
            {
                return Ok(new { message = "File deleted successfully" });
            }
            return NotFound(new { message = "File not found" });
        }

        [HttpGet("download/{fileName}")]
        public IActionResult Download(int id, string fileName)
        {
            var filePath = employeeService.GetEmployeeFilePath(id, fileName);

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

        [HttpGet("project/{employeeId}")]
        public async Task<ActionResult<IEnumerable<ProjectModel>>> GetProjectsByEmployeeId(int employeeId)
        {
            try
            {
                var projects = await employeeService.GetProjectsByEmployeeIdAsync(employeeId);
                if (projects == null)
                {
                    return NotFound(new { message = "No projects found for this employee." });
                }
                return Ok(projects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }


        #endregion

        #region Private Methobds

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
