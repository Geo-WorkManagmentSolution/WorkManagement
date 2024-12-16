using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity
{
        public partial class RolePermission:BaseEntity
        {
            public required Guid RoleId { get; set; }
            public required int PermissionActionId { get; set; }

            [ForeignKey(nameof(PermissionActionId))]
            [JsonIgnore]
            public virtual PermissionAction? PermissionAction { get; set; } = null!;

            [JsonIgnore]
            public virtual ApplicationRole Role { get; set; } = null!;
        }

}
