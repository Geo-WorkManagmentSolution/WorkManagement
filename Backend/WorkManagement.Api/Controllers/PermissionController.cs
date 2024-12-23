using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;
using WorkManagement.Domain.Models.Employee;
using WorkManagement.Service;

namespace WorkManagement.API.Controllers
{
    public class RolePermissionModel
    {
        public Guid RoleId { get; set; }
        public virtual List<int> PermissionActionIds { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PermissionsController : ControllerBase
    {
        private readonly IPermissionService permissionService;
        private readonly IMapper mapper;

        public PermissionsController(IPermissionService permissionService, IMapper mapper)
        {
            this.permissionService = permissionService;
            this.mapper = mapper;
        }

        [HttpPut("assign/role/{roleId}")]
        public async Task<List<RolePermission>> AssignRolePermissionsAsync(Guid roleId, List<int> PermissionActionIds)
        {
            var featurePermissions = PermissionActionIds.Select(x => new RolePermission { RoleId = roleId, PermissionActionId = x });
            return await permissionService.AssignRolePermissionsAsync(featurePermissions);
        }

        [HttpPost("assign/role/all")]
        public async Task<List<RolePermission>> AssignRolePermissionsAsync(List<RolePermissionModel> permissions)
        {
            var featurePermissions = permissions.SelectMany(x => x.PermissionActionIds, (role, PermissionActionId) => new RolePermission { RoleId = role.RoleId, PermissionActionId = PermissionActionId });
            return await permissionService.AssignRolePermissionsAsync(featurePermissions);
        }

        [HttpGet("claims/{userId}")]
        public async Task<List<PermissionCategoryClaim>> GetPermissionClaimsByUserAsync(Guid userId)
        {
            return await permissionService.GetPermissionClaimsByUserAsync(userId);
        }

        [HttpGet("role/{roleId}")]
        public async Task<List<RolePermission>> GetRolePermissionsByRoleAsync(Guid roleId)
        {
            return await permissionService.GetRolePermissionsByRoleAsync(roleId);
        }
        [HttpGet("user/{userId}")]
        public async Task<List<RolePermission>> GetRolePermissionsByUserAsync(Guid userId)
        {
            return await permissionService.GetRolePermissionsByUserAsync(userId);

        }

        [HttpGet("PermissionActions")]
        public async Task<List<PermissionAction>> GetPermissionActions()
        {
            return await permissionService.GetAllPermissionActions();

        }
    }
}
