using WorkManagement.Domain.Entity;

namespace WorkManagement.API.Controllers
{
    public class PermissionCategoryClaim
    {
        public string PermissionCategoryName { get; set; }
        public PermissionCategoryEnum PermissionCategoryId { get; set; }
        public List<PermissionActionClaim> Actions { get; set; }
    }
}