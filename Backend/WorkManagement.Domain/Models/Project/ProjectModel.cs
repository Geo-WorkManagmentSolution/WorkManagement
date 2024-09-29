using System.ComponentModel.DataAnnotations;

namespace WorkManagement.Domain.Models.Project
{
    public class ProjectModel : BaseModel
    {
        public string ProjectName { get; set; }
        public string CompanyName { get; set; }
        public string ProjectIncharge { get; set; }
        public string WorkOrderNumber { get; set; }
        public decimal WorkOrderAmount { get; set; }
        public decimal WorkDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

    }
}
