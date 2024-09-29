using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;

namespace WorkManagement.Domain.Entity
{

    public class Company:FullyAuditableEntity
    {
        public Company() 
        {
            Projects = new HashSet<Project>();
        }


        [Required]
        public string CompanyName { get; set; }
        public string CompanyDescription { get; set; }
        public string CompanyFullAddress { get; set; }
        public int CityId { get; set; }
        public int StateId { get; set; }
        public int CountryId { get; set; }
        public string PostalCode { get; set; }
        [Required]
        public string PrimaryPhoneNumber { get; set; }
        public string AlternativePhoneNumber { get; set; }
        [Required]
        public string PrimaryEmailAddress { get; set; }
        public string AlternativeEmailAddress { get; set; }
        public int TotalEmployess {  get; set; }

        public virtual ICollection<Project> Projects { get; set; }

    }
}
