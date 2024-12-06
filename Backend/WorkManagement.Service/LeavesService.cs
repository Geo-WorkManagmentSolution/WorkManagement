using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models.Employee;
using WorkManagementSolution.Employee;
using WorkManagmentSolution.EFCore;

namespace WorkManagement.Service
{
    public class LeavesService : ILeavesService
    {

        private readonly WorkManagementDbContext _dbContext;
        private readonly IMapper mapper;
        private readonly IEmailService _emailService;

        public LeavesService(WorkManagementDbContext dbContext, IMapper mapper, IEmailService emailService)
        {
            _dbContext = dbContext;
            this.mapper = mapper;
            _emailService = emailService;
        }

        public async Task<List<EmployeeLeave>> GetAllEmployeeLeaves()
        {
            return await _dbContext.EmployeeLeaves.ToListAsync();
        }

        public async Task<List<EmployeeHoliday>> GetHolidays()
        {
            return await _dbContext.EmployeeHolidays.ToListAsync();
        }
        public async Task<List<EmployeeLeaveModel>> GetAssignedEmployeeLeaves(string loggedUserId)
        {
            var ManagerId = await _dbContext.Employees
                .Where(x => x.UserId == Guid.Parse(loggedUserId))
                .Select(x => x.Id)
                .FirstOrDefaultAsync();

            var assignedLeaves = await (from emp in _dbContext.Employees
                                        join empLeave in _dbContext.EmployeeLeaves on emp.Id equals empLeave.EmployeeId
                                        join leaveType in _dbContext.EmployeeLeaveType on empLeave.EmployeeLeaveTypeId equals leaveType.Id
                                        where emp.EmployeeReportToId == ManagerId
                                        select new EmployeeLeaveModel
                                        {
                                            Id = empLeave.Id,
                                            EmployeeId = empLeave.EmployeeId,
                                            EmployeeNumber=emp.EmployeeNumber,
                                            Status = empLeave.Status,
                                            Description = empLeave.Description,
                                            Reason = empLeave.Reason,
                                            StartDate = empLeave.StartDate,
                                            EndDate = empLeave.EndDate,
                                            LeaveDays = empLeave.LeaveDays,
                                            EmployeeLeaveTypeId = empLeave.EmployeeLeaveTypeId,
                                            LeaveType = empLeave.EmployeeLeaveTypes.Name,
                                            EmployeeName = emp.FirstName + " " + emp.LastName
                                        }).ToListAsync();

            return assignedLeaves;
        }





        public async Task<List<EmployeeLeaveHistoryDTO>> GetEmployeeLeaveHistory(EmployeeLeaveHistoryDataModel data,string loggedUserId)
        {
            var returnData = new List<EmployeeLeaveHistoryDTO>();

            if (data == null) return returnData;

            var startDate = DateTime.Now;
            var EmployeeId = _dbContext.Employees.First(x => x.UserId == Guid.Parse(loggedUserId)).Id;
            data.EmployeeId = EmployeeId;
            var employeeId = data.EmployeeId;
            
            if (data.GetLeaveData)
            {
                var leaveData = data.GetFutureLeaveData
                    ? GetLeaveData(employeeId, startDate, true)
                    : GetLeaveData(employeeId, startDate, false);

                returnData.AddRange(leaveData);
            }

            if (data.GetHolidayData)
            {
                var holidayData = data.GetFutureLeaveData
                    ? GetHolidayData(employeeId, startDate, true)
                    : GetHolidayData(employeeId, startDate, false);

                returnData.AddRange(holidayData);
            }

            return returnData;
        }

        public async Task<List<JobLevelLeave>> GetJobLevels()
        {
            var levels= await _dbContext.JobLevelLeave.ToListAsync();
            return levels;
        }


        public async Task<List<EmployeeDefaultLeaveSummary>> GetDefaultLeaveSummaries(int jobLevelId)
        {
            var employeeDefaultLeaveSummary = await _dbContext.EmployeeDefaultLeave
                .Include(x => x.EmployeeLeaveTypes)
                .Include(x => x.JobLevelLeaves)
                .Where(x => x.JobLevelLeaveId == jobLevelId)
                .ToListAsync();

            return employeeDefaultLeaveSummary;
        }

        public async Task<bool> UpdateDefaultLeave(List<DefaultLeaveModel> defaultLeaves)
        {
            try
            {
                // Group the leaves by JobLevelLeaveTypeId
                var leavesByJobLevel = defaultLeaves.GroupBy(l => l.JobLevelLeaveTypeId);

                foreach (var jobLevelGroup in leavesByJobLevel)
                {
                    int jobLevelLeaveTypeId = jobLevelGroup.Key;

                    // Remove existing default leaves for this job level
                    var existingLeaves = await _dbContext.EmployeeDefaultLeave
                        .Where(l => l.JobLevelLeaveId == jobLevelLeaveTypeId)
                        .ToListAsync();
                    _dbContext.EmployeeDefaultLeave.RemoveRange(existingLeaves);

                    // Add new default leaves for this job level
                    foreach (var leave in jobLevelGroup)
                    {
                        var leaveType = await _dbContext.EmployeeLeaveType.FirstOrDefaultAsync(lt => lt.Name == leave.Name);
                        if (leaveType == null)
                        {
                            leaveType = new EmployeeLeaveType
                            {
                                Name = leave.Name,
                                IsPaid = true
                            };
                            _dbContext.EmployeeLeaveType.Add(leaveType);
                            await _dbContext.SaveChangesAsync();
                        }

                        var newDefaultLeave = new EmployeeDefaultLeaveSummary
                        {
                            EmployeeLeaveTypeId = leaveType.Id,
                            JobLevelLeaveId = jobLevelLeaveTypeId,
                            TotalLeaves = leave.TotalLeaves
                        };
                        _dbContext.EmployeeDefaultLeave.Add(newDefaultLeave);
                    }
                }

                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                // Log the exception
                return false;
            }
        }

        public async Task<bool> DeleteDefaultLeaveAsync(int defaultLeaveSummaryId)
        {
            var defaultLeave = await _dbContext.EmployeeDefaultLeave
                .FirstOrDefaultAsync(dl => dl.Id == defaultLeaveSummaryId);

            if (defaultLeave == null)
            {
                return false;
            }

            _dbContext.EmployeeDefaultLeave.Remove(defaultLeave);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AddHoliday(List<EmployeeHoliday> holidays)
        {
            try
            {
                // Get existing holidays for the year of the first holiday in the list
                // Assuming all holidays in the list are for the same year
                int year = holidays.First().StartDate.Year;
                var existingHolidays = await _dbContext.EmployeeHolidays
                    .Where(h => h.StartDate.Year == year || h.EndDate.Year == year)
                    .ToListAsync();

                // Remove holidays that are not in the new list
                var holidaysToRemove = existingHolidays
                    .Where(eh => !holidays.Any(h =>
                        h.StartDate.Date == eh.StartDate.Date &&
                        h.EndDate.Date == eh.EndDate.Date &&
                        h.Name == eh.Name))
                    .ToList();

                _dbContext.EmployeeHolidays.RemoveRange(holidaysToRemove);

                foreach (var holiday in holidays)
                {
                    var existingHoliday = existingHolidays.FirstOrDefault(eh =>
                        eh.StartDate.Date == holiday.StartDate.Date &&
                        eh.EndDate.Date == holiday.EndDate.Date);

                    if (existingHoliday != null)
                    {
                        // Update existing holiday
                        existingHoliday.Name = holiday.Name;
                        existingHoliday.IsFloater = holiday.IsFloater;
                        _dbContext.EmployeeHolidays.Update(existingHoliday);
                    }
                    else
                    {
                        // Add new holiday
                        await _dbContext.EmployeeHolidays.AddAsync(holiday);
                    }
                }

                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in AddHoliday: {ex.Message}");
                return false;
            }
        }

        public async Task<List<EmployeeHoliday>> GetHolidaysByYear(int year)
        {
            return await _dbContext.EmployeeHolidays
                .Where(h => h.StartDate.Year == year || h.EndDate.Year == year)
                .OrderBy(s=>s.StartDate)
                .ToListAsync();
        }


        #region Private Methods

        private List<EmployeeLeaveHistoryDTO> GetLeaveData(int employeeId, DateTime startDate, bool isFutureData)
        {
            return _dbContext.EmployeeLeaves
                .Where(l => (isFutureData ? l.StartDate >= startDate : l.StartDate < startDate) && l.EmployeeId == employeeId)
                .Select(l => new EmployeeLeaveHistoryDTO
                {
                    StartDate = l.StartDate,
                    EndDate = l.EndDate,
                    EmployeeId = l.EmployeeId,
                    Description = l.Description,
                    Reason = l.Reason,
                    Name=l.EmployeeLeaveTypes.Name,
                    LeaveTypeId=l.EmployeeLeaveTypeId,
                    EmployeeLeaveId=l.Id,
                    status=l.Status
                    
                                        
                })
                .ToList();
        }

        private List<EmployeeLeaveHistoryDTO> GetHolidayData(int employeeId, DateTime startDate, bool isFutureData)
        {
            return _dbContext.EmployeeHolidays
                .Where(h => isFutureData ? h.StartDate >= startDate : h.StartDate < startDate)
                .Select(h => new EmployeeLeaveHistoryDTO
                {
                    StartDate = h.StartDate,
                    EndDate = h.EndDate,
                    EmployeeId = employeeId,
                    Description=h.Name,
                    Name="Holiday - " + h.Name,

                })
                .ToList();
        }

       
        #endregion


    }
}
