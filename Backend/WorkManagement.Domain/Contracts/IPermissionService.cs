using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;

namespace WorkManagement.API.Controllers
{
    public interface IPermissionService
    {
        Task<List<RolePermission>> AssignRolePermissionsAsync(IEnumerable<RolePermission> featurePermissions);
        Task<List<PermissionCategoryClaim>> GetPermissionClaimsByUserAsync(Guid userId);
        Task<List<RolePermission>> GetRolePermissionsByRoleAsync(Guid roleId);
        Task<List<RolePermission>> GetRolePermissionsByUserAsync(Guid userId);
    }
}