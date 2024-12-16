using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;
using WorkManagement.Service;

namespace WorkManagement.API.Controllers
{
    public class RolePermissionModel
    {
        public virtual List<int> PermissionActionIds { get; set; }
        public Guid RoleId { get; set; }

    }
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService permissionService;
        private readonly IMapper mapper;

        public PermissionController(IPermissionService permissionService,  IMapper mapper)
        {
            this.permissionService = permissionService;
            this.mapper = mapper;
        }

        public async Task<List<RolePermission>> AssignRolePermissionsAsync(List<RolePermissionModel> permissions)
        {
            var featurePermissions = permissions.SelectMany(x=>x.PermissionActionIds,(role,PermissionActionId)=> new RolePermission{RoleId=role.RoleId,PermissionActionId= PermissionActionId });
            return await permissionService.AssignRolePermissionsAsync(featurePermissions);
        }
        public async Task<List<PermissionCategoryClaim>> GetPermissionClaimsByUserAsync(Guid userId)
        {
            return await permissionService.GetPermissionClaimsByUserAsync(userId);
        }

        public async Task<List<RolePermission>> GetRolePermissionsByRoleAsync(Guid roleId)
        {
            return await permissionService.GetRolePermissionsByRoleAsync(roleId);
        }
        public async Task<List<RolePermission>> GetRolePermissionsByUserAsync(Guid userId) {

            return await permissionService.GetRolePermissionsByUserAsync(userId);

        }


    }
}
