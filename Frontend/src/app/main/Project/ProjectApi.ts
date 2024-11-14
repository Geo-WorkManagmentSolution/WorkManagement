import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiProject: build.query<GetApiProjectApiResponse, GetApiProjectApiArg>({
      query: () => ({ url: `/api/Project` }),
    }),
    postApiProject: build.mutation<
      PostApiProjectApiResponse,
      PostApiProjectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project`,
        method: "POST",
        body: queryArg.projectModel,
      }),
    }),
    getApiProjectById: build.query<
      GetApiProjectByIdApiResponse,
      GetApiProjectByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Project/${queryArg.id}` }),
    }),
    putApiProjectById: build.mutation<
      PutApiProjectByIdApiResponse,
      PutApiProjectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/${queryArg.id}`,
        method: "PUT",
        body: queryArg.projectModel,
      }),
    }),
    deleteApiProjectById: build.mutation<
      DeleteApiProjectByIdApiResponse,
      DeleteApiProjectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiProjectApiResponse = /** status 200 OK */ ProjectModel[];
export type GetApiProjectApiArg = void;
export type PostApiProjectApiResponse = /** status 200 OK */ EmployeeModel;
export type PostApiProjectApiArg = {
  projectModel: ProjectModel;
};
export type GetApiProjectByIdApiResponse = /** status 200 OK */ ProjectModel;
export type GetApiProjectByIdApiArg = {
  id: number;
};
export type PutApiProjectByIdApiResponse = unknown;
export type PutApiProjectByIdApiArg = {
  id: number;
  projectModel: ProjectModel;
};
export type DeleteApiProjectByIdApiResponse = unknown;
export type DeleteApiProjectByIdApiArg = {
  id: number;
};
export type ProjectModel = {
  id?: number;
  projectName?: string | null;
  projectNumber?: string | null;
  projectDescription?: string | null;
  startDate?: string;
  endDate?: string | null;
};
export type EmployeeCategory = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
};
export type EmployeeDepartment = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
};
export type EmployeeDesignation = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
};
export type EmployeePersonalDetails = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  dateOfBirth?: string | null;
  gender: string | null;
  maritalStatus?: MaritalStatus;
  bloodGroup?: BloodGroup;
  relationWithEmployee?: RelationWithEmployee;
};
export type Site = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
};
export type EmployeeWorkInformation = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  designation?: string | null;
  salaryType?: SalaryType;
  hireDate?: string | null;
  confirmationDate?: string | null;
  totalPreviousExperience?: number;
  salary?: number;
  siteId?: number | null;
  site?: Site;
  bond?: number | null;
  previousDateOfJoiningInGDR?: string | null;
  previousDateOfLeavingInGDR?: string | null;
  grpHead?: string | null;
};
export type ApplicationUser = {
  id?: string;
  userName?: string | null;
  normalizedUserName?: string | null;
  email?: string | null;
  normalizedEmail?: string | null;
  emailConfirmed?: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: string | null;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
  shortcuts?: string[] | null;
};
export type ApplicationRole = {
  id?: string;
  name?: string | null;
  normalizedName?: string | null;
  concurrencyStamp?: string | null;
};
export type EmployeeAddress = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  pinCode?: number | null;
};
export type EmployeeIdentityInfo = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  employee?: Employee;
  uid?: string | null;
  bankAccountNumber?: string | null;
  bankName?: string | null;
  branch?: string | null;
  ifsc?: string | null;
  accountHolderName?: string | null;
  pan?: string | null;
  providentFundNumber?: string | null;
  employeeStateInsuranceNumber?: string | null;
  biometricCode?: string | null;
};
export type EmployeeEducationDetail = {
  id?: number;
  isDeleted?: boolean;
  employee?: Employee;
  type?: string | null;
  passingYear?: string | null;
  degreeCertificateDate?: string | null;
  university?: string | null;
  grade?: string | null;
  employeeId?: number | null;
};
export type EmployeeRelationshipDetail = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  employee?: Employee;
  relationshipType?: RelationshipType;
  name: string | null;
  email?: string | null;
  phoneNumber?: string | null;
};
export type EmployeeDocuments = {
  id?: number;
  isDeleted?: boolean;
  fileName?: string | null;
  fileSize?: number | null;
  fileContent?: string | null;
  fileType?: FileType;
  employeeId?: number | null;
  employee?: Employee;
};
export type EmployeeLeaveType = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
  isPaid?: boolean;
};
export type EmployeeLeaveSummary = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number;
  employee?: Employee;
  remainingLeaves?: number;
  employeeLeaveTypeId?: number | null;
  employeeLeaveTypes?: EmployeeLeaveType;
  totalLeaves?: number;
};
export type Employee = {
  id?: number;
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string | null;
  lastModifiedOn?: string;
  isDeleted?: boolean;
  photoURL?: string | null;
  employeeNumber?: number;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  motherName?: string | null;
  employeeDepartmentId?: number | null;
  employeeDepartment?: EmployeeDepartment;
  employeeDesignationId?: number | null;
  employeeDesignation?: EmployeeDesignation;
  employeeReportToId?: number | null;
  employeeReportTo?: Employee;
  email: string | null;
  alternateEmail?: string | null;
  phoneNumber?: number | null;
  alternateNumber?: number | null;
  userId: string;
  applicationUser?: ApplicationUser;
  roleId: string;
  applicationRole?: ApplicationRole;
  employeeCategoryId?: number | null;
  employeePersonalDetailsId?: number | null;
  employeeWorkInformationId?: number | null;
  employeeInsuranceDetailsId?: number | null;
  employeeAddressesId?: number | null;
  employeeCategory?: EmployeeCategory;
  employeePersonalDetails?: EmployeePersonalDetails;
  employeeWorkInformation?: EmployeeWorkInformation;
  employeeInsuranceDetails?: EmployeeInsuranceDetail;
  employeeAddresses?: EmployeeAddress;
  employeeIdentityInfos?: EmployeeIdentityInfo;
  employeeEducationDetail?: EmployeeEducationDetail[] | null;
  employeeRelationshipDetails?: EmployeeRelationshipDetail[] | null;
  employeeDocuments?: EmployeeDocuments[] | null;
  employeeLeaves?: EmployeeLeaveSummary[] | null;
};
export type EmployeeInsuranceDetail = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  employee?: Employee;
  employeeDesignationId?: number | null;
  employeeDesignation?: EmployeeDesignation;
  serialNumber: string | null;
  dateOfJoining?: string | null;
  dateOfBirth?: string | null;
  age?: number;
  grossSalary?: number;
  totalSIWider?: number;
  comprehensive?: number;
  risk?: string | null;
};
export type EmployeeModel = {
  id?: number;
  photoURL?: string | null;
  employeeNumber?: number | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  motherName: string | null;
  email: string | null;
  alternateEmail?: string | null;
  phoneNumber?: number | null;
  alternateNumber?: number | null;
  position?: string | null;
  isDeleted?: boolean | null;
  userId?: string | null;
  roleId: string;
  employeeCategoryId: number;
  employeeCategory?: EmployeeCategory;
  employeeDepartmentId?: number | null;
  employeeDepartment?: EmployeeDepartment;
  employeeDesignationId?: number | null;
  employeeDesignation?: EmployeeDesignation;
  employeePersonalDetails?: EmployeePersonalDetails;
  employeeWorkInformation?: EmployeeWorkInformation;
  employeeInsuranceDetails?: EmployeeInsuranceDetail;
  employeeAddresses?: EmployeeAddress;
  employeeIdentityInfos?: EmployeeIdentityInfo;
  employeeEducationDetail?: EmployeeEducationDetail[] | null;
  employeeRelationshipDetails?: EmployeeRelationshipDetail[] | null;
  employeeDocuments?: EmployeeDocuments[] | null;
  employeeLeaves?: EmployeeLeaveSummary[] | null;
};
export enum MaritalStatus {
  Unknown = "Unknown",
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
  Separated = "Separated",
  CommonLaw = "CommonLaw",
  CivilUnion = "CivilUnion",
  DomesticPartnership = "DomesticPartnership",
  Other = "Other",
}
export enum BloodGroup {
  OPositive = "OPositive",
  APositive = "APositive",
  BPositive = "BPositive",
  AbPositive = "ABPositive",
  AbNegative = "ABNegative",
  ANegative = "ANegative",
  BNegative = "BNegative",
  ONegative = "ONegative",
}
export enum RelationWithEmployee {
  Colleague = "Colleague",
  Supervisor = "Supervisor",
  Subordinate = "Subordinate",
  Manager = "Manager",
  Mentor = "Mentor",
  Friend = "Friend",
  FamilyMember = "FamilyMember",
  Other = "Other",
}
export enum SalaryType {
  M = "M",
  F = "F",
}
export enum RelationshipType {
  Parent = "Parent",
  Spouse = "Spouse",
  FamilyMember = "FamilyMember",
  Friend = "Friend",
  Other = "Other",
}
export enum FileType {
  Pdf = "PDF",
  Docx = "DOCX",
  Txt = "TXT",
  Zip = "ZIP",
  Xlsx = "XLSX",
  Csv = "CSV",
  Other = "Other",
}
export const {
  useGetApiProjectQuery,
  useLazyGetApiProjectQuery,
  usePostApiProjectMutation,
  useGetApiProjectByIdQuery,
  useLazyGetApiProjectByIdQuery,
  usePutApiProjectByIdMutation,
  useDeleteApiProjectByIdMutation,
} = injectedRtkApi;
