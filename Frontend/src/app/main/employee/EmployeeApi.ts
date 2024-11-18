import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiEmployees: build.query<
      GetApiEmployeesApiResponse,
      GetApiEmployeesApiArg
    >({
      query: () => ({ url: `/api/Employees` }),
    }),
    postApiEmployees: build.mutation<
      PostApiEmployeesApiResponse,
      PostApiEmployeesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees`,
        method: "POST",
        body: queryArg.employeeModel,
      }),
    }),
    getApiEmployeesCategories: build.query<
      GetApiEmployeesCategoriesApiResponse,
      GetApiEmployeesCategoriesApiArg
    >({
      query: () => ({ url: `/api/Employees/categories` }),
    }),
    getApiEmployeesDepartments: build.query<
      GetApiEmployeesDepartmentsApiResponse,
      GetApiEmployeesDepartmentsApiArg
    >({
      query: () => ({ url: `/api/Employees/departments` }),
    }),
    getApiEmployeesDesignations: build.query<
      GetApiEmployeesDesignationsApiResponse,
      GetApiEmployeesDesignationsApiArg
    >({
      query: () => ({ url: `/api/Employees/designations` }),
    }),
    getApiEmployeesSites: build.query<
      GetApiEmployeesSitesApiResponse,
      GetApiEmployeesSitesApiArg
    >({
      query: () => ({ url: `/api/Employees/sites` }),
    }),
    getApiEmployeesReportToEmployeeList: build.query<
      GetApiEmployeesReportToEmployeeListApiResponse,
      GetApiEmployeesReportToEmployeeListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/ReportToEmployeeList`,
        params: {
          departmentId: queryArg.departmentId,
          employeeId: queryArg.employeeId,
        },
      }),
    }),
    getApiEmployeesTeamMembersList: build.query<
      GetApiEmployeesTeamMembersListApiResponse,
      GetApiEmployeesTeamMembersListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/TeamMembersList`,
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    getApiEmployeesById: build.query<
      GetApiEmployeesByIdApiResponse,
      GetApiEmployeesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Employees/${queryArg.id}` }),
    }),
    putApiEmployeesById: build.mutation<
      PutApiEmployeesByIdApiResponse,
      PutApiEmployeesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/${queryArg.id}`,
        method: "PUT",
        body: queryArg.employeeModel,
      }),
    }),
    deleteApiEmployeesById: build.mutation<
      DeleteApiEmployeesByIdApiResponse,
      DeleteApiEmployeesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiEmployeesCheckEmailExists: build.query<
      GetApiEmployeesCheckEmailExistsApiResponse,
      GetApiEmployeesCheckEmailExistsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/CheckEmailExists`,
        params: { email: queryArg.email },
      }),
    }),
    postApiEmployeesSendEmail: build.mutation<
      PostApiEmployeesSendEmailApiResponse,
      PostApiEmployeesSendEmailApiArg
    >({
      query: () => ({ url: `/api/Employees/sendEmail`, method: "POST" }),
    }),
    postApiEmployeesSearch: build.mutation<
      PostApiEmployeesSearchApiResponse,
      PostApiEmployeesSearchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/Search`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postApiEmployeesAddNewCategory: build.mutation<
      PostApiEmployeesAddNewCategoryApiResponse,
      PostApiEmployeesAddNewCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/AddNewCategory`,
        method: "POST",
        body: queryArg.employeeCategory,
      }),
    }),
    postApiEmployeesAddNewDepartment: build.mutation<
      PostApiEmployeesAddNewDepartmentApiResponse,
      PostApiEmployeesAddNewDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/AddNewDepartment`,
        method: "POST",
        body: queryArg.employeeDepartment,
      }),
    }),
    postApiEmployeesAddNewSite: build.mutation<
      PostApiEmployeesAddNewSiteApiResponse,
      PostApiEmployeesAddNewSiteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/AddNewSite`,
        method: "POST",
        body: queryArg.site,
      }),
    }),
    postApiEmployeesAddNewDesignation: build.mutation<
      PostApiEmployeesAddNewDesignationApiResponse,
      PostApiEmployeesAddNewDesignationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/AddNewDesignation`,
        method: "POST",
        body: queryArg.employeeDesignation,
      }),
    }),
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
    putApiEmployeesLeavesUpdateLeave: build.mutation<
      PutApiEmployeesLeavesUpdateLeaveApiResponse,
      PutApiEmployeesLeavesUpdateLeaveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/leaves/updateLeave`,
        method: "PUT",
        body: queryArg.employeeLeave,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiEmployeesApiResponse =
  /** status 200 OK */ EmployeeDashboardDataModel[];
export type GetApiEmployeesApiArg = void;
export type PostApiEmployeesApiResponse = /** status 200 OK */ EmployeeModel;
export type PostApiEmployeesApiArg = {
  employeeModel: EmployeeModel;
};
export type GetApiEmployeesCategoriesApiResponse =
  /** status 200 OK */ EmployeeCategory[];
export type GetApiEmployeesCategoriesApiArg = void;
export type GetApiEmployeesDepartmentsApiResponse =
  /** status 200 OK */ EmployeeDepartment[];
export type GetApiEmployeesDepartmentsApiArg = void;
export type GetApiEmployeesDesignationsApiResponse =
  /** status 200 OK */ EmployeeDesignation[];
export type GetApiEmployeesDesignationsApiArg = void;
export type GetApiEmployeesSitesApiResponse = /** status 200 OK */ Site[];
export type GetApiEmployeesSitesApiArg = void;
export type GetApiEmployeesReportToEmployeeListApiResponse =
  /** status 200 OK */ EmployeeReportToModel[];
export type GetApiEmployeesReportToEmployeeListApiArg = {
  departmentId?: number;
  employeeId?: number;
};
export type GetApiEmployeesTeamMembersListApiResponse =
  /** status 200 OK */ EmployeeTeamMemberList[];
export type GetApiEmployeesTeamMembersListApiArg = {
  employeeId?: number;
};
export type GetApiEmployeesByIdApiResponse = /** status 200 OK */ EmployeeModel;
export type GetApiEmployeesByIdApiArg = {
  id: number;
};
export type PutApiEmployeesByIdApiResponse = unknown;
export type PutApiEmployeesByIdApiArg = {
  id: number;
  employeeModel: EmployeeModel;
};
export type DeleteApiEmployeesByIdApiResponse = unknown;
export type DeleteApiEmployeesByIdApiArg = {
  id: number;
};
export type GetApiEmployeesCheckEmailExistsApiResponse =
  /** status 200 OK */ boolean;
export type GetApiEmployeesCheckEmailExistsApiArg = {
  email?: string;
};
export type PostApiEmployeesSendEmailApiResponse = unknown;
export type PostApiEmployeesSendEmailApiArg = void;
export type PostApiEmployeesSearchApiResponse =
  /** status 200 OK */ EmployeeModel[];
export type PostApiEmployeesSearchApiArg = {
  body: Criterion[];
};
export type PostApiEmployeesAddNewCategoryApiResponse = unknown;
export type PostApiEmployeesAddNewCategoryApiArg = {
  employeeCategory: EmployeeCategory;
};
export type PostApiEmployeesAddNewDepartmentApiResponse = unknown;
export type PostApiEmployeesAddNewDepartmentApiArg = {
  employeeDepartment: EmployeeDepartment;
};
export type PostApiEmployeesAddNewSiteApiResponse = unknown;
export type PostApiEmployeesAddNewSiteApiArg = {
  site: Site;
};
export type PostApiEmployeesAddNewDesignationApiResponse = unknown;
export type PostApiEmployeesAddNewDesignationApiArg = {
  employeeDesignation: EmployeeDesignation;
};
export type GetApiEmployeesLeavesCurrentApiResponse =
  /** status 200 OK */ EmployeeLeaveSummaryModel[];
export type GetApiEmployeesLeavesCurrentApiArg = void;
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
export type EmployeeDashboardDataModel = {
  id?: number;
  employeeNumber?: number | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  motherName?: string | null;
  email?: string | null;
  phoneNumber?: number | null;
  gender?: string | null;
  departmentName?: string | null;
  designationName?: string | null;
  categoryName?: string | null;
  site?: string | null;
  hireDate?: string | null;
};
export type EmployeePersonalDetailsModel = {
  dateOfBirth?: string | null;
  gender?: string | null;
  maritalStatus?: MaritalStatus;
  bloodGroup?: BloodGroup;
};
export type EmployeeWorkInformationModel = {
  designation?: string | null;
  grpHead?: string | null;
  siteId?: number | null;
  salaryType?: SalaryType;
  salary?: number;
  basic?: number;
  hrAllowances?: number;
  bonus?: number;
  gratuity?: number;
  pf?: number;
  esi?: number;
  pt?: number;
  hireDate?: string | null;
  confirmationDate?: string | null;
  totalPreviousExperience?: number;
};
export type EmployeeInsuranceDetailModel = {
  employeeDesignationId?: number | null;
  serialNumber?: string | null;
  dateOfJoining?: string | null;
  dateOfBirth?: string | null;
  age?: number | null;
  grossSalary?: number | null;
  totalSIWider?: number | null;
  comprehensive?: number | null;
  risk?: string | null;
};
export type AddressModel = {
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  pinCode?: number | null;
};
export type EmployeeAddressModel = {
  useUserAddressForMailing?: boolean;
  userAddress?: AddressModel;
  mailingAddress?: AddressModel;
};
export type EmployeeBankingDataModel = {
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
export type EmployeeEducationDetailModel = {
  type?: string | null;
  passingYear?: string | null;
  degreeCertificateDate?: string | null;
  university?: string | null;
  grade?: string | null;
};
export type EmployeeRelationshipDetailModel = {
  relationshipType?: RelationshipType;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
};
export type EmployeeDocumentsModel = {
  fileName?: string | null;
  fileSize?: number | null;
  fileContent?: string | null;
  fileType?: FileType;
};
export type EmployeeLeaveSummaryModel = {
  id?: number;
  employeeLeaveType?: string | null;
  totalLeaves?: number;
  remainingLeaves?: number;
};
export type EmployeeModel = {
  id?: number;
  photoURL?: string | null;
  employeeNumber?: number | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  email?: string | null;
  alternateEmail?: string | null;
  phoneNumber?: number | null;
  alternateNumber?: number | null;
  isDeleted?: boolean | null;
  userId?: string | null;
  roleId?: string;
  employeeCategoryId?: number | null;
  employeeDepartmentId?: number | null;
  employeeReportToId?: number | null;
  employeeDesignationId?: number | null;
  employeePersonalDetails?: EmployeePersonalDetailsModel;
  employeeWorkInformation?: EmployeeWorkInformationModel;
  employeeInsuranceDetails?: EmployeeInsuranceDetailModel;
  employeeAddresses?: EmployeeAddressModel;
  employeeIdentityInfos?: EmployeeBankingDataModel;
  employeeEducationDetail?: EmployeeEducationDetailModel[] | null;
  employeeRelationshipDetails?: EmployeeRelationshipDetailModel[] | null;
  employeeDocuments?: EmployeeDocumentsModel[] | null;
  employeeLeaves?: EmployeeLeaveSummaryModel[] | null;
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
export type Site = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
};
export type EmployeeReportToModel = {
  name?: string | null;
  id?: number;
};
export type EmployeeTeamMemberList = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
};
export type Criterion = {
  field?: string | null;
  operator?: string | null;
  value?: any | null;
  nextOperator?: string | null;
};
export type EmployeeLeaveModel = {
  employeeLeaveId?: number;
  employeeId?: number;
  status?: LeaveStatus;
  description?: string | null;
  reason?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  leaveDays?: number;
  employeeLeaveTypeId?: number;
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
  useGetApiEmployeesQuery,
  useLazyGetApiEmployeesQuery,
  usePostApiEmployeesMutation,
  useGetApiEmployeesCategoriesQuery,
  useLazyGetApiEmployeesCategoriesQuery,
  useGetApiEmployeesDepartmentsQuery,
  useLazyGetApiEmployeesDepartmentsQuery,
  useGetApiEmployeesDesignationsQuery,
  useLazyGetApiEmployeesDesignationsQuery,
  useGetApiEmployeesSitesQuery,
  useLazyGetApiEmployeesSitesQuery,
  useGetApiEmployeesReportToEmployeeListQuery,
  useLazyGetApiEmployeesReportToEmployeeListQuery,
  useGetApiEmployeesTeamMembersListQuery,
  useLazyGetApiEmployeesTeamMembersListQuery,
  useGetApiEmployeesByIdQuery,
  useLazyGetApiEmployeesByIdQuery,
  usePutApiEmployeesByIdMutation,
  useDeleteApiEmployeesByIdMutation,
  useGetApiEmployeesCheckEmailExistsQuery,
  useLazyGetApiEmployeesCheckEmailExistsQuery,
  usePostApiEmployeesSendEmailMutation,
  usePostApiEmployeesSearchMutation,
  usePostApiEmployeesAddNewCategoryMutation,
  usePostApiEmployeesAddNewDepartmentMutation,
  usePostApiEmployeesAddNewSiteMutation,
  usePostApiEmployeesAddNewDesignationMutation,
  useGetApiEmployeesLeavesCurrentQuery,
  useLazyGetApiEmployeesLeavesCurrentQuery,
  usePutApiEmployeesLeavesAddLeaveMutation,
  useDeleteApiEmployeesLeavesCancelLeaveMutation,
  usePutApiEmployeesLeavesUpdateLeaveMutation,
} = injectedRtkApi;
