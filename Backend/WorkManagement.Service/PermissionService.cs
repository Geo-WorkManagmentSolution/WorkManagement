using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;
using WorkManagmentSolution.EFCore;

namespace WorkManagement.API.Controllers
{
    public class PermissionService : IPermissionService
    {
        private readonly WorkManagementDbContext _dbContext;
        private readonly IMapper mapper;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly UserManager<ApplicationUser> userManager;

        public PermissionService(WorkManagementDbContext _dbContext, IMapper mapper, RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            this._dbContext = _dbContext;
            this.mapper = mapper;
            this.roleManager = roleManager;
            this.userManager = userManager;

        }

        public async Task<List<RolePermission>> AssignRolePermissionsAsync(IEnumerable<RolePermission> featurePermissions)
        {
            foreach (var permission in featurePermissions)
            {
                if (await _dbContext.RolePermissions.AnyAsync(x => x.RoleId == permission.RoleId && x.PermissionActionId == permission.PermissionActionId))
                    continue;
                _dbContext.RolePermissions.Add(permission);
            }

            await _dbContext.SaveChangesAsync();
            return featurePermissions.ToList();

        }

        public async Task<List<PermissionCategoryClaim>> GetPermissionClaimsByUserAsync(Guid UserId)
        {
            var user = await userManager.Users.FirstAsync(x => x.Id == UserId);
            var roles = await userManager.GetRolesAsync(user);
            var rolestring = roles.First();
            var role = await roleManager.Roles.FirstAsync(x => x.Name == rolestring);
            // Fetch the role for the user

            //// Fetch the permissions for the user's role
            var rolePermissions = await _dbContext
                .RolePermissions
                .Where(rp => rp.RoleId == role.Id)
                .Include(rp => rp.PermissionAction)
                .ThenInclude(pa => pa.PermissionCategory)
                .ToListAsync();

            var permissionCategories = rolePermissions
                .GroupBy(rp => rp.PermissionAction?.PermissionCategory)
                .Select(categoryGroup => new PermissionCategoryClaim
                {
                    PermissionCategoryName = categoryGroup.Key?.Name,
                    PermissionCategoryId = categoryGroup.Key.Value,
                    Actions = categoryGroup
                        .Select(rp => new PermissionActionClaim
                        {
                            Id = rp.PermissionAction.Value,
                            Name = rp.PermissionAction.Name
                        })
                        .ToList()
                })
                .ToList();

            return permissionCategories.ToList();
        }

        public async Task<List<RolePermission>> GetRolePermissionsByRoleAsync(Guid roleId)
        {
            //// Fetch the permissions for the user's role
            return await _dbContext
                 .RolePermissions
                 .Where(rp => rp.RoleId == roleId)
                 .ToListAsync();

        }
        public async Task<List<RolePermission>> GetRolePermissionsByUserAsync(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}