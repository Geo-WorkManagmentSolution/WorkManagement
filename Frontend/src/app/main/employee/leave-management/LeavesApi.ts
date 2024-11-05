import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiEmployeesLeavesCurrent: build.query<
      GetApiEmployeesLeavesCurrentApiResponse,
      GetApiEmployeesLeavesCurrentApiArg
    >({
      query: () => ({ url: `/api/Employees/leaves/current` }),
    }),
    putApiEmployeesLeavesAddLeave: build.mutation<
      PutApiEmployeesLeavesAddLeaveApiResponse,
      PutApiEmployeesLeavesAddLeaveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/leaves/addLeave`,
        method: "PUT",
        body: queryArg.employeeLeave,
      }),
    }),
    deleteApiEmployeesByEmployeeIdLeavesCancelLeave: build.mutation<
      DeleteApiEmployeesByEmployeeIdLeavesCancelLeaveApiResponse,
      DeleteApiEmployeesByEmployeeIdLeavesCancelLeaveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/${queryArg.employeeId}/leaves/cancelLeave`,
        method: "DELETE",
        params: { employeeLeaveId: queryArg.employeeLeaveId },
      }),
    }),
    getApiEmployeesByEmployeeIdLeavesUpdateLeave: build.query<
      GetApiEmployeesByEmployeeIdLeavesUpdateLeaveApiResponse,
      GetApiEmployeesByEmployeeIdLeavesUpdateLeaveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/${queryArg.employeeId}/leaves/updateLeave`,
        body: queryArg.employeeLeave,
      }),
    }),
    getApiLeavesHolidays: build.query<
      GetApiLeavesHolidaysApiResponse,
      GetApiLeavesHolidaysApiArg
    >({
      query: () => ({ url: `/api/Leaves/holidays` }),
    }),
    getApiLeavesLeavesHistory: build.query<
      GetApiLeavesLeavesHistoryApiResponse,
      GetApiLeavesLeavesHistoryApiArg
    >({
      query: () => ({ url: `/api/Leaves/leaves/history` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiEmployeesLeavesCurrentApiResponse =
  /** status 200 OK */ EmployeeLeaveSummaryModel[];
export type GetApiEmployeesLeavesCurrentApiArg = void;
export type PutApiEmployeesLeavesAddLeaveApiResponse =
  /** status 200 OK */ EmployeeLeave;
export type PutApiEmployeesLeavesAddLeaveApiArg = {
  employeeLeave: EmployeeLeave;
};
export type DeleteApiEmployeesByEmployeeIdLeavesCancelLeaveApiResponse =
  /** status 200 OK */ boolean;
export type DeleteApiEmployeesByEmployeeIdLeavesCancelLeaveApiArg = {
  employeeLeaveId?: number;
  employeeId: string;
};
export type GetApiEmployeesByEmployeeIdLeavesUpdateLeaveApiResponse =
  /** status 200 OK */ EmployeeLeave;
export type GetApiEmployeesByEmployeeIdLeavesUpdateLeaveApiArg = {
  employeeId: string;
  employeeLeave: EmployeeLeave;
};
export type GetApiLeavesHolidaysApiResponse =
  /** status 200 OK */ EmployeeHoliday[];
export type GetApiLeavesHolidaysApiArg = void;
export type GetApiLeavesLeavesHistoryApiResponse =
  /** status 200 OK */ EmployeeLeave[];
export type GetApiLeavesLeavesHistoryApiArg = void;
export type EmployeeLeaveSummaryModel = {
  id?: number;
  employeeLeaveType?: string | null;
  totalLeaves?: number;
  remainingLeaves?: number;
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
export type EmployeeCategory = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
};
export type EmployeePersonalDetails = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  employee?: Employee;
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
export type EmployeeAddress = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  employee?: Employee;
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
  employeeLeaveTypeId?: number | null;
  employeeLeaveTypes?: EmployeeLeaveType;
  totalLeaves?: number;
  employeeId?: number;
  employee?: Employee;
  remainingLeaves?: number;
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
export type EmployeeLeave = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number;
  employee?: Employee;
  status?: LeaveStatus;
  description?: string | null;
  reason?: string | null;
  startDate?: string;
  endDate?: string;
  leaveDays?: number;
  employeeLeaveTypeId?: number | null;
  employeeLeaveTypes?: EmployeeLeaveType;
};
export type EmployeeHoliday = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
  isFloater?: boolean;
  startDate?: string;
  endDate?: string;
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
export enum LeaveStatus {
  Approved = "Approved",
  Pending = "Pending",
  Rejected = "Rejected",
}
export const {
  useGetApiEmployeesLeavesCurrentQuery,
  useLazyGetApiEmployeesLeavesCurrentQuery,
  usePutApiEmployeesLeavesAddLeaveMutation,
  useDeleteApiEmployeesByEmployeeIdLeavesCancelLeaveMutation,
  useGetApiEmployeesByEmployeeIdLeavesUpdateLeaveQuery,
  useLazyGetApiEmployeesByEmployeeIdLeavesUpdateLeaveQuery,
  useGetApiLeavesHolidaysQuery,
  useLazyGetApiLeavesHolidaysQuery,
  useGetApiLeavesLeavesHistoryQuery,
  useLazyGetApiLeavesLeavesHistoryQuery,
} = injectedRtkApi;
