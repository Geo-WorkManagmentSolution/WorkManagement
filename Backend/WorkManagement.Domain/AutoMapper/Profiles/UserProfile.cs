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
                .ForMember(dest => dest.Uid, opt => opt.MapFrom(src => src.Id))
                .ForPath(dest => dest.Data.DisplayName, opt => opt.MapFrom(src => src.UserName))
                .ForPath(dest => dest.Data.Email, opt => opt.MapFrom(src => src.Email));

        }
    }

}
