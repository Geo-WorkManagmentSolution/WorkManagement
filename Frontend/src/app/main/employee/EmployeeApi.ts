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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiEmployeesApiResponse = /** status 200 OK */ EmployeeModel[];
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
  employeeCategory?: EmployeeCategory;
  employeePersonalDetails?: EmployeePersonalDetails;
  employeeWorkInformation?: EmployeeWorkInformation;
  employeeInsuranceDetails?: EmployeeInsuranceDetail;
  employeeAddresses?: EmployeeAddress;
  employeeIdentityInfos?: EmployeeIdentityInfo;
  employeeEducationDetail?: EmployeeEducationDetail[] | null;
  employeeRelationshipDetails?: EmployeeRelationshipDetail[] | null;
  employeeDocuments?: EmployeeDocuments[] | null;
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
};
export type Criterion = {
  field?: string | null;
  operator?: string | null;
  value?: any | null;
  nextOperator?: string | null;
};
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
} = injectedRtkApi;
