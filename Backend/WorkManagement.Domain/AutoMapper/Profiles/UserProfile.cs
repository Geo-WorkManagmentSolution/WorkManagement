using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.AutoMapper.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            AllowNullCollections = true;
            AddGlobalIgnore("Item");

            CreateMap<ApplicationUser, UserModel>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
        }
    }

}
