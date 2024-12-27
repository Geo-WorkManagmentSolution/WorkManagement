using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;

namespace WorkManagement.API.Controllers
{
    public interface IPermissionService
    {
        public Task<List<RolePermission>> AssignRolePermissionsAsync(IEnumerable<RolePermission> featurePermissions);
        public Task<List<PermissionCategoryClaim>> GetPermissionClaimsByUserAsync(Guid userId);
        public Task<List<RolePermission>> GetRolePermissionsByRoleAsync(Guid roleId);
        public Task<List<RolePermission>> GetRolePermissionsByUserAsync(Guid userId);
        public Task<List<PermissionAction>> GetAllPermissionActions();
    }
}