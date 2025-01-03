﻿using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using WorkManagement.Domain.Entity;
using WorkManagement.Domain.Entity.EmployeeLeaveTables;
using WorkManagement.Domain.Models;

namespace WorkManagementSolution.Employee
{
    public class Employee : FullyAuditableEntity
    {
        public string? PhotoURL { get; set; }
        public int EmployeeNumber { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }
        public string? AlternateEmail { get; set; }
        public long? PhoneNumber { get; set; }
        public long? AlternateNumber { get; set; }
        //public int? JobLevelLeaveType { get; set; }

        #region Foreign Keys

        [ForeignKey(nameof(EmployeeDepartment))]
        public int? EmployeeDepartmentId { get; set; }

        [ForeignKey(nameof(EmployeeDesignation))]
        public int? EmployeeDesignationId { get; set; }

        [ForeignKey(nameof(EmployeeReportTo))]
        public int? EmployeeReportToId { get; set; }

        [ForeignKey(nameof(ApplicationUser))]
        public Guid UserId { get; set; }

        [ForeignKey(nameof(ApplicationRole))]
        public Guid RoleId { get; set; }

        [ForeignKey(nameof(EmployeeCategory))]
        public int? EmployeeCategoryId { get; set; }

        [ForeignKey(nameof(EmployeePersonalDetails))]
        public int? EmployeePersonalDetailsId { get; set; }

        [ForeignKey(nameof(EmployeeWorkInformation))]
        public int? EmployeeWorkInformationId { get; set; }

        [ForeignKey(nameof(EmployeeInsuranceDetails))]
        public int? EmployeeInsuranceDetailsId { get; set; }

        [ForeignKey(nameof(EmployeeAddresses))]
        public int? EmployeeAddressesId { get; set; }

        [ForeignKey(nameof(EmployeeIdentityInfos))]
        public int? EmployeeIdentityInfoId { get; set; }

        #endregion

        public EmployeeDepartment? EmployeeDepartment { get; set; }
        public EmployeeDesignation? EmployeeDesignation { get; set; }
        public Employee? EmployeeReportTo { get; set; }
        public ApplicationUser? ApplicationUser { get; set; }
        public ApplicationRole? ApplicationRole { get; set; }
        public EmployeeCategory? EmployeeCategory { get; set; }
        public EmployeePersonalDetails? EmployeePersonalDetails { get; set; }
        public EmployeeWorkInformation? EmployeeWorkInformation { get; set; }
        public EmployeeInsuranceDetail? EmployeeInsuranceDetails { get; set; }
        public EmployeeAddress? EmployeeAddresses { get; set; }
        public EmployeeIdentityInfo? EmployeeIdentityInfos { get; set; }
        public List<EmployeeEducationDetail>? EmployeeEducationDetail { get; set; }
        public List<EmployeeRelationshipDetail>? EmployeeRelationshipDetails { get; set; }
        public List<EmployeeDocuments>? EmployeeDocuments { get; set; }
        public List<EmployeeLeaveSummary> EmployeeLeaves { get; set; }
    }

    public class EmployeeDocuments : BaseEntity
    {
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public int? FileSize { get; set; }
        public byte[]? FileContent { get; set; }
        public FileType? FileType { get; set; }

        public int? EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }

    }
    public class EmployeeDepartment : BaseEntity
    {
        public string? Name { get; set; }
    }

    public class EmployeeDesignation : BaseEntity
    {
        public string? Name { get; set; }
    }

    public class Site : BaseEntity
    {
        public string? Name { get; set; }
    }
    public enum FileType
    {
        PDF,
        DOCX,
        TXT,
        ZIP,
        XLSX,
        CSV,
        Other
    }

    public enum MaritalStatus
    {
        Unknown,
        Single,
        Married,
        Divorced,
        Widowed,
        Separated,
        CommonLaw, // Common Law (Defacto)
        CivilUnion,
        DomesticPartnership,
        Other
    }


    public class EmployeePersonalDetails : BaseEntity
    {
        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public MaritalStatus? MaritalStatus { get; set; }
        public BloodGroup? bloodGroup { get; set; }

        public RelationWithEmployee? RelationWithEmployee { get; set; }
    }


    public class EmployeeWorkInformation : BaseEntity
    {
        public string? Designation { get; set; }
        public SalaryType? SalaryType { get; set; }

        [DataType(DataType.Date)]
        public DateTime? HireDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? ConfirmationDate { get; set; }
        public decimal TotalPreviousExperience { get; set; }
        public bool UseDefaultLeaves { get; set; }
        public decimal Salary { get; set; }
        public decimal Basic { get; set; }
        public decimal HRAllowances { get; set; }
        public decimal Bonus { get; set; }
        public decimal Gratuity { get; set; }
        public decimal PF { get; set; }
        public decimal ESI { get; set; }
        public decimal PT { get; set; }

        [ForeignKey(nameof(Site))]
        public int? SiteId { get; set; }
        public Site? Site { get; set; }
        public decimal? Bond { get; set; }
        [DataType(DataType.Date)]
        public DateTime? PreviousDateOfJoiningInGDR { get; set; }
        [DataType(DataType.Date)]
        public DateTime? PreviousDateOfLeavingInGDR { get; set; }
        public string? GRPHead { get; set; }
    }

    public class EmployeeAddress : BaseEntity
    {
        public string? UserAddressLine1 { get; set; }
        public string? UserAddressLine2 { get; set; }
        public string? UserCity { get; set; }
        public string? UserCountry { get; set; }
        public string? UserState { get; set; }
        public long? UserAddressPinCode { get; set; }
        public string? MailingAddressLine1 { get; set; }
        public string? MailingAddressLine2 { get; set; }
        public string? MailingCity { get; set; }
        public string? MailingCountry { get; set; }
        public string? MailingState { get; set; }
        public long? MailingAddressPinCode { get; set; }
        // Other address-related properties
    }

    public class EmployeeIdentityInfo : BaseEntity
    {
        public string? UID { get; set; } // Enum formatted as '0000 0000 0000'
        public string? BankAccountNumber { get; set; } // BankAC No.
        public string? BankName { get; set; }
        public string? Branch { get; set; } // Enum formatted as 'AREA, CITY'
        public string? IFSC { get; set; }
        public string? AccountHolderName { get; set; } // ACHolder
        public string? PAN { get; set; }
        public string? ProvidentFundNumber { get; set; } // PFNO
        public string? EmployeeStateInsuranceNumber { get; set; } // ESINO
        public string? BiometricCode { get; set; } // BIOCODE

    }

    public class EmployeeRelationshipDetail : BaseEntity
    {
        public int? EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }

        public RelationshipType? RelationshipType { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

    }

    public class EmployeeInsuranceDetail : BaseEntity
    {

        [ForeignKey(nameof(EmployeeDesignation))]
        public int? EmployeeDesignationId { get; set; }
        public EmployeeDesignation? EmployeeDesignation { get; set; }
        public string? SerialNumber { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public decimal Age { get; set; }
        public decimal GrossSalary { get; set; }
        public decimal TotalSIWider { get; set; }
        public decimal Comprehensive { get; set; }
        public string? Risk { get; set; }

    }

    public class EmployeeEducationDetail : BaseEntity
    {
        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }
        public string? Type { get; set; }
        public string? PassingYear { get; set; }
        public DateTime? DegreeCertificateDate { get; set; }
        public string? University { get; set; }
        public string? grade { get; set; }

        public int? EmployeeId { get; set; }

    }

    public enum SalaryType
    {
        OnRoll,
        Consultant,
        Labour,
        Apprentice,
        VisitBased,
    }
    public enum RelationWithEmployee
    {
        Colleague,
        Supervisor,
        Subordinate,
        Manager,
        Mentor,
        Friend,
        FamilyMember,
        Other
    }

    public enum RelationshipType
    {
        Parent,
        Spouse,
        FamilyMember,
        Friend,
        Other
    }

    public enum BloodGroup
    {
        [EnumMember(Value = "O+")]
        OPositive,
        [Display(Name = "A+")]
        APositive,
        [Display(Name = "B+")]
        BPositive,
        [Display(Name = "AB+")]
        ABPositive,
        [Display(Name = "AB-")]
        ABNegative,
        [Display(Name = "A-")]
        ANegative,
        [Display(Name = "B-")]
        BNegative,
        [Display(Name = "O-")]
        ONegative
    }
}