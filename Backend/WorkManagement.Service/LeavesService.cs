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

        //public async Task<List<EmployeeLeave>> GetAssignedEmployeeLeaves(string loggedUserId)
        //{
        //    var ManagerId = _dbContext.Employees.First(x => x.UserId == Guid.Parse(loggedUserId)).Id;

        //    var assignedLeaves = from emp in _dbContext.Employees.Where(x => x.EmployeeReportToId == ManagerId)
        //                         join empLeave in _dbContext.EmployeeLeaves on emp.Id equals empLeave.EmployeeId
        //                         select empLeave;
        //    return assignedLeaves.ToList();
        //}


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
                                            EmployeeLeaveId = empLeave.Id,
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
