using System.Text.Json.Serialization;

namespace WorkManagement.Domain.Entity
{
        public class PermissionCategory
        {
            public int Id { get; set; }

            public string Name { get; set; } = null!;

            public string Description { get; set; } = null!;

            public PermissionCategoryEnum Value { get; set; }


            [JsonIgnore]
            public virtual ICollection<PermissionAction> PermissionActions { get; set; } = new List<PermissionAction>();
        }

    }

