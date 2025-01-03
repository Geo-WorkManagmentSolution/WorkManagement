﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models.Email;
using WorkManagement.Domain.Models.Employee;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Contracts
{
    public interface ILeavesService
    {
        public Task<List<EmployeeHoliday>> GetHolidays();
        public Task<List<EmployeeLeaveModel>> GetAssignedEmployeeLeaves(string LoggedInUserId);
        public Task<List<EmployeeLeaveHistoryDTO>> GetEmployeeLeaveHistory(EmployeeLeaveHistoryDataModel data, string loggedUserId);
        public Task<List<EmployeeDefaultLeaveSummary>> GetDefaultLeaveSummaries(int jobLevelId);
        public Task<List<JobLevelLeave>> GetJobLevels();
        public Task<bool> UpdateDefaultLeave(List<DefaultLeaveModel> defaultLeaves);
        public Task<bool> DeleteDefaultLeaveAsync(int defaultLeaveSummaryId);


        public Task<bool> AddHoliday(List<EmployeeHoliday> holidays);
        public Task<List<EmployeeHoliday>> GetHolidaysByYear(int year);
        public Task<List<EmployeeLeaveType>> GetEmployeeLeaveTypes();
    }
}
