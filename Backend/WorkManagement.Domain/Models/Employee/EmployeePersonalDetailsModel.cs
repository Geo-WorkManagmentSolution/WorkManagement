﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagementSolution.Employee
{
    public class EmployeePersonalDetailsModel
    {
        [DataType(DataType.Date)]
        public required DateTime DateOfBirth { get; set; }

        public string Gender { get; set; }

        public string MaritalStatus { get; set; }
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