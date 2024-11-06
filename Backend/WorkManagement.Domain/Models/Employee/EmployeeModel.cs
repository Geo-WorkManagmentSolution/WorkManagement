using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Contracts;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Models.Employee
{
    public class EmployeeModel : BaseModel
    {
        public string? PhotoURL { get; set; }
        public int? EmployeeNumber { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string MotherName { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string AlternateEmail { get; set; }
        public long? PhoneNumber { get; set; }
        public long? AlternateNumber { get; set; }
        public string? Position { get; set; }
        public bool? IsDeleted { get; set; }
        public Guid? UserId { get; set; }
        public Guid RoleId { get; set; }
        public int? EmployeeCategoryId { get; set; }
        //public EmployeeCategory? EmployeeCategory { get; set; }
        public int? EmployeeDepartmentId { get; set; }
       // public EmployeeDepartment? EmployeeDepartment { get; set; }
        public int? EmployeeReportToId { get; set; }
        public string EmployeeReportToName { get; set; }
        public int? EmployeeDesignationId { get; set; }
        public EmployeeDesignation? EmployeeDesignation { get; set; }
        public EmployeePersonalDetailsModel EmployeePersonalDetails { get; set; }
        public EmployeeWorkInformationModel EmployeeWorkInformation { get; set; }
        public EmployeeInsuranceDetailModel EmployeeInsuranceDetails { get; set; }
        public EmployeeAddressModel EmployeeAddresses { get; set; }
        public EmployeeBankingDataModel EmployeeIdentityInfos { get; set; }
        public List<EmployeeEducationDetailModel>? EmployeeEducationDetail { get; set; }
        public List<EmployeeRelationshipDetailModel>? EmployeeRelationshipDetails { get; set; }
        public List<EmployeeDocumentsModel>? EmployeeDocuments { get; set; }
    }

    public class EmployeePersonalDetailsModel
    {
        public string DateOfBirth { get; set; }
        public string Gender { get; set; }
        public MaritalStatus? MaritalStatus { get; set; }
        public BloodGroup? bloodGroup { get; set; }
    }

    public class EmployeeWorkInformationModel
    {
        public string? Designation { get; set; }
        public string? GRPHead { get; set; }
        public int? SiteId { get; set; }
        public SalaryType? SalaryType { get; set; }
        public decimal Salary { get; set; }
        public decimal Basic { get; set; }
        public decimal HRAllowances { get; set; }
        public decimal Bonus { get; set; }
        public decimal Gratuity { get; set; }
        public decimal PF { get; set; }
        public decimal ESI { get; set; }
        public decimal PT { get; set; }
        public string HireDate { get; set; }
        public string ConfirmationDate { get; set; }
        public decimal TotalPreviousExperience { get; set; }
    }

    public class EmployeeInsuranceDetailModel
    {
        public int? EmployeeDesignationId { get; set; }
        public required string SerialNumber { get; set; }
        public string? DateOfJoining { get; set; }
        public string? DateOfBirth { get; set; }
        public decimal Age { get; set; }
        public decimal GrossSalary { get; set; }
        public decimal TotalSIWider { get; set; }
        public decimal Comprehensive { get; set; }
        public string? Risk { get; set; }
    }

    public class EmployeeAddressModel
    {
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public long? PinCode { get; set; }
    }

    public class EmployeeBankingDataModel
    {
        public string? UID { get; set; } 
        public string? BankAccountNumber { get; set; } 
        public string? BankName { get; set; }
        public string? Branch { get; set; }
        public string? IFSC { get; set; }
        public string? AccountHolderName { get; set; } 
        public string? PAN { get; set; }
        public string? ProvidentFundNumber { get; set; }
        public string? EmployeeStateInsuranceNumber { get; set; }
        public string? BiometricCode { get; set; } 
    }

    public class EmployeeEducationDetailModel
    {
        public string? Type { get; set; }
        public string? PassingYear { get; set; }
        public DateTime? DegreeCertificateDate { get; set; }
        public string? University { get; set; }
        public string? grade { get; set; }
    }

    public class EmployeeRelationshipDetailModel
    {
        public RelationshipType? RelationshipType { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class EmployeeDocumentsModel
    {
        public string? FileName { get; set; }
        public int? FileSize { get; set; }
        public byte[]? FileContent { get; set; }
        public FileType? FileType { get; set; }
    }

    public class EmployeeReportToModel 
    { 
        public string Name {  get; set; }
        public int Id { get; set; }
    }

    public class EmployeeTeamMemberList
    {
        public string Name { set; get; }
        public string Email { set; get; }
        public string Avatar { set; get; }
    }
}

//Employee Personal Details:
//This model will represent personal information about employees.
//C#

//public class EmployeePersonalDetails
//{
//    public int EmployeeID { get; set; }
//    public string FirstName { get; set; }
//    public string LastName { get; set; }
//    public string Email { get; set; }
//    public DateTime DateOfBirth { get; set; }
//    public string Gender { get; set; }
//    public string MaritalStatus { get; set; }
//    // Other personal details as needed
//}
//AI - generated code.Review and use carefully. More info on FAQ.
//Employees Work Information:
//This model will capture work-related details.
//C#

//public class EmployeeWorkInformation
//{
//    public int EmployeeID { get; set; }
//    public int DepartmentID { get; set; }
//    public string JobTitle { get; set; }
//    public DateTime HireDate { get; set; }
//    public decimal Salary { get; set; }
//    // Other work-related properties
//}
//AI - generated code.Review and use carefully. More info on FAQ.
//Employees Addresses:
//A model for storing address information.
//C#

//public class EmployeeAddress
//{
//    public int AddressID { get; set; }
//    public int EmployeeID { get; set; }
//    public string AddressLine1 { get; set; }
//    public string AddressLine2 { get; set; }
//    public string City { get; set; }
//    public string Country { get; set; }
//    public string State { get; set; }
//    public string PostalCode { get; set; }
//    // Other address-related properties
//}
//AI - generated code.Review and use carefully. More info on FAQ.
//Employees Departments:
//A model to represent department details.
//C#

//public class EmployeeDepartment
//{
//    public int DepartmentID { get; set; }
//    public string DepartmentName { get; set; }
//    // Other department-related properties
//}
//AI - generated code.Review and use carefully. More info on FAQ.
//Employees Identity Information:
//Model for identity-related data (UAN, PAN, Aadhaar).
//C#

//public class EmployeeIdentityInfo
//{
//    public int EmployeeID { get; set; }
//    public string UAN { get; set; }
//    public string PAN { get; set; }
//    public string Aadhaar { get; set; }
//    // Other identity-related properties
//}
//AI - generated code.Review and use carefully. More info on FAQ.
//Employees Contact Details:
//Model for contact information (phone numbers, email).
//C#

//public class EmployeeContactDetails
//{
//    public int EmployeeID { get; set; }
//    public string WorkPhoneNumber { get; set; }
//    public string PersonalMobileNumber { get; set; }
//    public string PersonalEmailAddress { get; set; }
//    // Other contact-related properties
//}
//AI - generated code.Review and use carefully. More info on FAQ.
//Employees Work Experience:
//Model to track work experiences.
//C#

//public class EmployeeWorkExperience
//{
//    public int WorkExperienceID { get; set; }
//    public int EmployeeID { get; set; }
//    public string CompanyName { get; set; }
//    public string JobDescription { get; set; }
//    public DateTime FromDate { get; set; }
//    public DateTime ToDate { get; set; }
//    // Other work experience properties
//}
//AI - generated code.Review and use carefully. More info on FAQ.
//Employees Education Details:
//Model for education information.
//C#

//public class EmployeeEducation
//{
//    public int EducationID { get; set; }
//    public int EmployeeID { get; set; }
//    public string InstituteName { get; set; }
//    public string Degree { get; set; }
//    public string Specialization { get; set; }
//    public DateTime DateOfCompletion { get; set; }
//    // Other education-related properties
//}
//AI - generated code.Review and use carefully. More info on FAQ.
//Employees Dependent Details:
//Model for dependent information (e.g., family members).
//C#

//public class EmployeeDependent
//{
//    public int DependentID { get; set; }
//    public int EmployeeID { get; set; }
//    public string DependentName { get; set; }
//    public string Relationship { get; set; }
//    public DateTime DateOfBirth { get; set; }
//    // Other dependent-related properties
//}
