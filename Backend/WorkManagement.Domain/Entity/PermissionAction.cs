using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WorkManagement.Domain.Entity
{
        public partial class PermissionAction
        {
            public int Id { get; set; }

            public string Name { get; set; } = null!;

            public string Description { get; set; } = null!;

            public PermissionActionEnum Value { get; set; }

            public int? PermissionCategoryId { get; set; }

            [ForeignKey(nameof(PermissionCategoryId))]
            [JsonIgnore]
            public virtual PermissionCategory? PermissionCategory { get; set; }

            [JsonIgnore]
            public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
        }

    }
