using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
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

    }
}
