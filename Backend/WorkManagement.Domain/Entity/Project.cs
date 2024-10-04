using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Entity
{
    public class Project : FullyAuditableEntity
    {
        [Required]
        public string ProjectName { get; set; }
        public string ProjectNumber { get; set; }
        public string ProjectDescription { get; set; }
        public string ProjectLocation { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime? EndDate { get; set; }

        [ForeignKey(nameof(ProjectDetails))]
        public int? ProjectDetailsId { get; set; }
        public ProjectDetail? ProjectDetails { get; set; }

        [ForeignKey(nameof(Company))]
        public int? CompanyId { get; set; }
        public Company? Company { get; set; }

        [ForeignKey(nameof(Tender))]
        public int? TenderId { get; set; }
        public Tender? Tender {  get; set; }

        [ForeignKey(nameof(ProjectIncharge))]
        public int? ProjectInchargeId { get; set; }
        public Employee? ProjectIncharge { get; set; }


        [ForeignKey(nameof(FundingClient))]
        public int? FundingClientId { get; set; }
        public Client? FundingClient { get; set; }

        [ForeignKey(nameof(InchargeClient))]
        public int? InchargeClientId { get; set; }
        public Client? InchargeClient { get; set; }

        [ForeignKey(nameof(TaxModelParam))]
        public int? TaxModelParamId { get; set; }       
        public Param? TaxModelParam { get; set; }


        [ForeignKey(nameof(ProjectItemTypePram))]
        public int? ProjectItemTypePramId { get; set; }
        public Param? ProjectItemTypePram { get; set; }

        [ForeignKey(nameof(ServiceParam))]
        public int? ServiceParamId { get; set; }
        public Param? ServiceParam { get; set; }
        public int? VendorId { get; set; }
        public Vendor? Vendor { get; set; }



    }
}
