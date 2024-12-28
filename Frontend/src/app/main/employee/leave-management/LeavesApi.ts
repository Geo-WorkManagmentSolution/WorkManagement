import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiEmployeesLeavesCurrent: build.query<
      GetApiEmployeesLeavesCurrentApiResponse,
      GetApiEmployeesLeavesCurrentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/leaves/current`,
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    postApiEmployeesLeavesAddLeave: build.mutation<
      PostApiEmployeesLeavesAddLeaveApiResponse,
      PostApiEmployeesLeavesAddLeaveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/leaves/addLeave`,
        method: "POST",
        body: queryArg.employeeLeaveModel,
      }),
    }),
    putApiEmployeesLeavesUpdateLeave: build.mutation<
      PutApiEmployeesLeavesUpdateLeaveApiResponse,
      PutApiEmployeesLeavesUpdateLeaveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/leaves/updateLeave`,
        method: "PUT",
        body: queryArg.employeeLeaveModel,
      }),
    }),
    deleteApiEmployeesLeavesCancelLeave: build.mutation<
      DeleteApiEmployeesLeavesCancelLeaveApiResponse,
      DeleteApiEmployeesLeavesCancelLeaveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/leaves/cancelLeave`,
        method: "DELETE",
        params: { employeeLeaveId: queryArg.employeeLeaveId },
      }),
    }),
    getApiLeavesHolidays: build.query<
      GetApiLeavesHolidaysApiResponse,
      GetApiLeavesHolidaysApiArg
    >({
      query: () => ({ url: `/api/Leaves/holidays` }),
    }),
    getApiLeavesLeavesAll: build.query<
      GetApiLeavesLeavesAllApiResponse,
      GetApiLeavesLeavesAllApiArg
    >({
      query: () => ({ url: `/api/Leaves/leaves/all` }),
    }),
    postApiLeavesLeavesEmployeeLeaveHistory: build.mutation<
      PostApiLeavesLeavesEmployeeLeaveHistoryApiResponse,
      PostApiLeavesLeavesEmployeeLeaveHistoryApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Leaves/leaves/employeeLeaveHistory`,
        method: "POST",
        body: queryArg.employeeLeaveHistoryDataModel,
      }),
    }),
    getApiLeavesDefaultLeavesByJobLevelId: build.query<
      GetApiLeavesDefaultLeavesByJobLevelIdApiResponse,
      GetApiLeavesDefaultLeavesByJobLevelIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Leaves/default-leaves/${queryArg.jobLevelId}`,
      }),
    }),
    postApiLeavesSettingsHolidays: build.mutation<
      PostApiLeavesSettingsHolidaysApiResponse,
      PostApiLeavesSettingsHolidaysApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Leaves/settings/holidays`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    putApiLeavesSettingsDefaultLeaves: build.mutation<
      PutApiLeavesSettingsDefaultLeavesApiResponse,
      PutApiLeavesSettingsDefaultLeavesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Leaves/settings/default-leaves`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteApiLeavesSettingsDefaultLeavesById: build.mutation<
      DeleteApiLeavesSettingsDefaultLeavesByIdApiResponse,
      DeleteApiLeavesSettingsDefaultLeavesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Leaves/settings/default-leaves/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiLeavesJoblevels: build.query<
      GetApiLeavesJoblevelsApiResponse,
      GetApiLeavesJoblevelsApiArg
    >({
      query: () => ({ url: `/api/Leaves/joblevels` }),
    }),
    getApiLeavesSettingsHolidaysByYear: build.query<
      GetApiLeavesSettingsHolidaysByYearApiResponse,
      GetApiLeavesSettingsHolidaysByYearApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Leaves/settings/holidays/${queryArg.year}`,
      }),
    }),
    getApiLeavesSettingsLeaveTypes: build.query<
      GetApiLeavesSettingsLeaveTypesApiResponse,
      GetApiLeavesSettingsLeaveTypesApiArg
    >({
      query: () => ({ url: `/api/Leaves/settings/leaveTypes` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiEmployeesLeavesCurrentApiResponse =
  /** status 200 OK */ EmployeeLeaveSummary[];
export type GetApiEmployeesLeavesCurrentApiArg = {
  employeeId?: number;
};
export type PostApiEmployeesLeavesAddLeaveApiResponse =
  /** status 200 OK */ EmployeeLeaveModel;
export type PostApiEmployeesLeavesAddLeaveApiArg = {
  employeeLeaveModel: EmployeeLeaveModel;
};
export type PutApiEmployeesLeavesUpdateLeaveApiResponse =
  /** status 200 OK */ EmployeeLeaveModel;
export type PutApiEmployeesLeavesUpdateLeaveApiArg = {
  employeeLeaveModel: EmployeeLeaveModel;
};
export type DeleteApiEmployeesLeavesCancelLeaveApiResponse =
  /** status 200 OK */ boolean;
export type DeleteApiEmployeesLeavesCancelLeaveApiArg = {
  employeeLeaveId?: number;
};
export type GetApiLeavesHolidaysApiResponse =
  /** status 200 OK */ EmployeeHoliday[];
export type GetApiLeavesHolidaysApiArg = void;
export type GetApiLeavesLeavesAllApiResponse =
  /** status 200 OK */ EmployeeLeaveModel[];
export type GetApiLeavesLeavesAllApiArg = void;
export type PostApiLeavesLeavesEmployeeLeaveHistoryApiResponse =
  /** status 200 OK */ EmployeeLeaveHistoryDto[];
export type PostApiLeavesLeavesEmployeeLeaveHistoryApiArg = {
  employeeLeaveHistoryDataModel: EmployeeLeaveHistoryDataModel;
};
export type GetApiLeavesDefaultLeavesByJobLevelIdApiResponse =
  /** status 200 OK */ EmployeeDefaultLeaveSummary[];
export type GetApiLeavesDefaultLeavesByJobLevelIdApiArg = {
  jobLevelId: number;
};
export type PostApiLeavesSettingsHolidaysApiResponse =
  /** status 200 OK */ boolean;
export type PostApiLeavesSettingsHolidaysApiArg = {
  body: EmployeeHoliday[];
};
export type PutApiLeavesSettingsDefaultLeavesApiResponse =
  /** status 200 OK */ boolean;
export type PutApiLeavesSettingsDefaultLeavesApiArg = {
  body: DefaultLeaveModel[];
};
export type DeleteApiLeavesSettingsDefaultLeavesByIdApiResponse = unknown;
export type DeleteApiLeavesSettingsDefaultLeavesByIdApiArg = {
  id: number;
};
export type GetApiLeavesJoblevelsApiResponse =
  /** status 200 OK */ JobLevelLeave[];
export type GetApiLeavesJoblevelsApiArg = void;
export type GetApiLeavesSettingsHolidaysByYearApiResponse =
  /** status 200 OK */ EmployeeHoliday[];
export type GetApiLeavesSettingsHolidaysByYearApiArg = {
  year: number;
};
export type GetApiLeavesSettingsLeaveTypesApiResponse =
  /** status 200 OK */ EmployeeLeaveType[];
export type GetApiLeavesSettingsLeaveTypesApiArg = void;
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
  dateOfBirth?: string | null;
  gender?: string | null;
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
  designation?: string | null;
  salaryType?: SalaryType;
  hireDate?: string | null;
  confirmationDate?: string | null;
  totalPreviousExperience?: number;
  useDefaultLeaves?: boolean;
  salary?: number;
  basic?: number;
  hrAllowances?: number;
  bonus?: number;
  gratuity?: number;
  pf?: number;
  esi?: number;
  pt?: number;
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
  employeeDesignationId?: number | null;
  employeeDesignation?: EmployeeDesignation;
  serialNumber?: string | null;
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
  userAddressLine1?: string | null;
  userAddressLine2?: string | null;
  userCity?: string | null;
  userCountry?: string | null;
  userState?: string | null;
  userAddressPinCode?: number | null;
  mailingAddressLine1?: string | null;
  mailingAddressLine2?: string | null;
  mailingCity?: string | null;
  mailingCountry?: string | null;
  mailingState?: string | null;
  mailingAddressPinCode?: number | null;
};
export type EmployeeIdentityInfo = {
  id?: number;
  isDeleted?: boolean;
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
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
};
export type EmployeeDocuments = {
  id?: number;
  isDeleted?: boolean;
  fileName?: string | null;
  filePath?: string | null;
  fileSize?: number | null;
  fileContent?: string | null;
  fileType?: FileType;
  employeeId?: number | null;
  employee?: Employee;
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
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  alternateEmail?: string | null;
  phoneNumber?: number | null;
  alternateNumber?: number | null;
  employeeDepartmentId?: number | null;
  employeeDesignationId?: number | null;
  employeeReportToId?: number | null;
  userId?: string;
  roleId?: string;
  employeeCategoryId?: number | null;
  employeePersonalDetailsId?: number | null;
  employeeWorkInformationId?: number | null;
  employeeInsuranceDetailsId?: number | null;
  employeeAddressesId?: number | null;
  employeeIdentityInfoId?: number | null;
  employeeDepartment?: EmployeeDepartment;
  employeeDesignation?: EmployeeDesignation;
  employeeReportTo?: Employee;
  applicationUser?: ApplicationUser;
  applicationRole?: ApplicationRole;
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
export type EmployeeLeaveModel = {
  id?: number;
  employeeId?: number;
  employeeNumber?: number;
  status?: LeaveStatus;
  description?: string | null;
  reason?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  leaveDays?: number;
  employeeLeaveTypeId?: number;
  leaveType?: string | null;
  employeeName?: string | null;
};
export type EmployeeHoliday = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
  isFloater?: boolean;
  startDate?: string;
  endDate?: string;
};
export type EmployeeLeaveHistoryDto = {
  employeeId?: number;
  name?: string | null;
  employeeLeaveId?: number;
  leaveTypeId?: number;
  description?: string | null;
  reason?: string | null;
  startDate?: string;
  endDate?: string;
  status?: LeaveStatus;
};
export type EmployeeLeaveHistoryDataModel = {
  employeeId?: number;
  getLeaveData?: boolean;
  getHolidayData?: boolean;
  getFutureLeaveData?: boolean;
};
export type JobLevelLeave = {
  id?: number;
  isDeleted?: boolean;
  jobLevel?: string | null;
};
export type EmployeeDefaultLeaveSummary = {
  id?: number;
  isDeleted?: boolean;
  employeeLeaveTypeId?: number | null;
  jobLevelLeaveId?: number | null;
  employeeLeaveTypes?: EmployeeLeaveType;
  jobLevelLeaves?: JobLevelLeave;
  totalLeaves?: number;
};
export type DefaultLeaveModel = {
  id?: number | null;
  name?: string | null;
  jobLevelLeaveTypeId?: number;
  totalLeaves?: number;
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
  OnRoll = "OnRoll",
  Consultant = "Consultant",
  Labour = "Labour",
  Apprentice = "Apprentice",
  VisitBased = "VisitBased",
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
  usePostApiEmployeesLeavesAddLeaveMutation,
  usePutApiEmployeesLeavesUpdateLeaveMutation,
  useDeleteApiEmployeesLeavesCancelLeaveMutation,
  useGetApiLeavesHolidaysQuery,
  useLazyGetApiLeavesHolidaysQuery,
  useGetApiLeavesLeavesAllQuery,
  useLazyGetApiLeavesLeavesAllQuery,
  usePostApiLeavesLeavesEmployeeLeaveHistoryMutation,
  useGetApiLeavesDefaultLeavesByJobLevelIdQuery,
  useLazyGetApiLeavesDefaultLeavesByJobLevelIdQuery,
  usePostApiLeavesSettingsHolidaysMutation,
  usePutApiLeavesSettingsDefaultLeavesMutation,
  useDeleteApiLeavesSettingsDefaultLeavesByIdMutation,
  useGetApiLeavesJoblevelsQuery,
  useLazyGetApiLeavesJoblevelsQuery,
  useGetApiLeavesSettingsHolidaysByYearQuery,
  useLazyGetApiLeavesSettingsHolidaysByYearQuery,
  useGetApiLeavesSettingsLeaveTypesQuery,
  useLazyGetApiLeavesSettingsLeaveTypesQuery,
} = injectedRtkApi;
