using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkManagement.Domain.Models.Project
{
    public class CompanyModel: BaseModel
    {
        public string CompanyName { get; set; }
        public string CompanyDescription { get; set; }
        public string CompanyFullAddress { get; set; }
        public string PostalCode { get; set; }
        public string PrimaryPhoneNumber { get; set; }
        public string AlternativePhoneNumber { get; set; }
        public string PrimaryEmailAddress { get; set; }
        public string AlternativeEmailAddress { get; set; }
        public int TotalEmployess { get; set; }

    }
}
