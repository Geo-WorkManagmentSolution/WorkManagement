using System.ComponentModel.DataAnnotations;
using WorkManagement.Domain.Entity;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Models.Project
{
    public class ProjectModel : BaseModel
    {
        public string ProjectName { get; set; }
        public string ProjectNumber { get; set; }
        public string CompanyName { get; set; }
        public string ProjectDescription { get; set; }
        public string ProjectLocation { get; set; }
        public string ProjectIncharge { get; set; }
        public string WorkOrderNumber { get; set; }
        public decimal WorkOrderAmount { get; set; }
        public decimal WorkDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? TenderId { get; set; }
        public string TenderName { get; set; }
        public int? ProjectInchargeId { get; set; }
        public string ProjectInchargeName { get; set; }
        public int? FundingClientId { get; set; }
        public string FundingClientName { get; set; }
        public int? InchargeClientId { get; set; }
        public string InchargeClientName { get; set; }
        public int? TaxModelParamId { get; set; }
        public string TaxModelParamDecription { get; set; }
        public int? ProjectItemTypePramId { get; set; }
        public string ProjectItemTypePramDecription { get; set; }
        public int? ServiceParamId { get; set; }
        public string ServiceParamDecription { get; set; }
        public int? VendorId { get; set; }
        public string VendorName { get; set; }
        public ProjectDetail ProjectDetail { get; set; }
        public Company Company { get; set; }      


    }
}
