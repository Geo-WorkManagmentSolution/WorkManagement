using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models.Employee;

namespace WorkManagement.Domain.Contracts
{
    public interface ILeavesService
    {
        public Task<List<EmployeeHoliday>> GetHolidays();
        public Task<List<EmployeeLeave>> GetAllEmployeeLeaves();
        public Task<List<EmployeeLeaveHistoryDTO>> GetEmployeeLeaveHistory(EmployeeLeaveHistoryDataModel data, string loggedUserId);
    }
}
