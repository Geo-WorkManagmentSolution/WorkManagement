using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
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


        public async Task<List<EmployeeHoliday>> GetHolidays()
        {
           return await _dbContext.EmployeeHolidays.ToListAsync();
        }

        public async Task<List<EmployeeLeave>> GetAllEmployeeLeaves()
        {
            return await _dbContext.EmployeeLeaves.ToListAsync();
        }

        public async Task<List<EmployeeLeaveHistoryDTO>> GetEmployeeLeaveHistory(EmployeeLeaveHistoryDataModel data)
        {
            var returnData = new List<EmployeeLeaveHistoryDTO>();
           
            if (data != null)
            {
                var employeeId = data.EmployeeId;
                if (data.GetLeaveData && !data.GetHolidayData)
                {
                    var startDate = DateTime.Now;
                    if (data.GetFutureLeaveData)
                    {
                        returnData = (from l in _dbContext.EmployeeLeaves.Where(s => s.StartDate >= startDate && s.EmployeeId == employeeId)
                                      select new EmployeeLeaveHistoryDTO
                                      {
                                          StartDate = l.StartDate,
                                          EndDate = l.EndDate,
                                          EmployeeId = l.EmployeeId,
                                          Description = l.Description,
                                          Reason = l.Reason,
                                      }).ToList();


                    }
                    else
                    {
                        returnData = (from l in _dbContext.EmployeeLeaves.Where(s => s.StartDate < startDate && s.EmployeeId == employeeId)
                                      select new EmployeeLeaveHistoryDTO
                                      {
                                          StartDate = l.StartDate,
                                          EndDate = l.EndDate,
                                          EmployeeId = l.EmployeeId,
                                          Description = l.Description,
                                          Reason = l.Reason,
                                      }).ToList();
                    }

                }

                if (data.GetHolidayData && !data.GetLeaveData)
                {
                    var startDate = DateTime.Now;
                    if (data.GetFutureLeaveData)
                    {
                        returnData = (from l in _dbContext.EmployeeHolidays.Where(s => s.StartDate >= startDate)
                                      select new EmployeeLeaveHistoryDTO
                                      {
                                          StartDate = l.StartDate,
                                          EndDate = l.EndDate,
                                          EmployeeId = employeeId,
                                      }).ToList();


                    }
                    else
                    {
                        returnData = (from l in _dbContext.EmployeeHolidays.Where(s => s.StartDate < startDate)
                                      select new EmployeeLeaveHistoryDTO
                                      {
                                          StartDate = l.StartDate,
                                          EndDate = l.EndDate,
                                          EmployeeId = employeeId,
                                      }).ToList();
                    }


                }

                if(data.GetHolidayData && data.GetLeaveData)
                {
                    var startDate = DateTime.Now;
                    if (data.GetFutureLeaveData)
                    {
                        var holidayData = (from l in _dbContext.EmployeeHolidays.Where(s => s.StartDate >= startDate)
                                      select new EmployeeLeaveHistoryDTO
                                      {
                                          StartDate = l.StartDate,
                                          EndDate = l.EndDate,
                                          EmployeeId = employeeId,
                                      }).ToList();

                        var leaveData = (from l in _dbContext.EmployeeLeaves.Where(s => s.StartDate >= startDate && s.EmployeeId == employeeId)
                                         select new EmployeeLeaveHistoryDTO
                                         {
                                             StartDate = l.StartDate,
                                             EndDate = l.EndDate,
                                             EmployeeId = l.EmployeeId,
                                             Description = l.Description,
                                             Reason = l.Reason,
                                         }).ToList();

                        returnData.AddRange(leaveData);
                        returnData.AddRange(holidayData);
                    }
                    else
                    {
                        var holidayData = (from l in _dbContext.EmployeeHolidays.Where(s => s.StartDate < startDate)
                                      select new EmployeeLeaveHistoryDTO
                                      {
                                          StartDate = l.StartDate,
                                          EndDate = l.EndDate,
                                          EmployeeId = employeeId,
                                      }).ToList();

                        var leaveData = (from l in _dbContext.EmployeeLeaves.Where(s => s.StartDate < startDate && s.EmployeeId == employeeId)
                                         select new EmployeeLeaveHistoryDTO
                                         {
                                             StartDate = l.StartDate,
                                             EndDate = l.EndDate,
                                             EmployeeId = l.EmployeeId,
                                             Description = l.Description,
                                             Reason = l.Reason,
                                         }).ToList();

                        returnData.AddRange(leaveData);
                        returnData.AddRange(holidayData);
                    }
                }
            }

            return returnData;
        }

      

    }
}
