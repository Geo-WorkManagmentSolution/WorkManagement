using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;
using WorkManagement.Domain.Models.Employee;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.AutoMapper.Profiles
{
    public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            AllowNullCollections = true;
            AddGlobalIgnore("Item");

            CreateMap<Employee, EmployeeModel>();
            CreateMap<EmployeePersonalDetails, EmployeePersonalDetailsModel>();

        }
    }

}
