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
export type PostApiEmployeesSendEmailApiResponse = unknown;
export type PostApiEmployeesSendEmailApiArg = void;
export type PostApiEmployeesSearchApiResponse =
  /** status 200 OK */ EmployeeModel[];
export type PostApiEmployeesSearchApiArg = {
  body: Criterion[];
};
export type EmployeePersonalDetails = {
  id?: number;
  isDeleted?: boolean;
  dateOfBirth: string;
  gender: string | null;
  maritalStatus: string | null;
  bloodGroup?: BloodGroup;
  relationWithEmployee?: RelationWithEmployee;
};
export type EmployeeWorkInformation = {
  id?: number;
  isDeleted?: boolean;
  designation?: string | null;
  salaryType?: SalaryType;
  hireDate?: string;
  salary?: number;
  site?: string | null;
  bond?: number | null;
  previousDateOfJoiningInGDR?: string | null;
  previousDateOfLeavingInGDR?: string | null;
  grpHead?: string | null;
};
export type EmployeeAddress = {
  id?: number;
  isDeleted?: boolean;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  pinCode?: string | null;
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
  type?: string | null;
  passingYear?: string | null;
  university?: string | null;
  grade?: string | null;
};
export type EmployeeDocuments = {
  id?: number;
  isDeleted?: boolean;
  fileName?: string | null;
  fileSize?: number;
  fileContent?: string | null;
  fileType?: FileType;
};
export type EmployeeModel = {
  id?: number;
  photoURL?: string | null;
  employeeNumber?: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber?: string | null;
  position?: string | null;
  userId?: string;
  roleId: string;
  employeeCategoryId: number;
  employeePersonalDetailsId?: number | null;
  employeePersonalDetails?: EmployeePersonalDetails;
  employeeWorkInformationId?: number | null;
  employeeWorkInformation?: EmployeeWorkInformation;
  employeeAddressId?: number | null;
  employeeAddresses?: EmployeeAddress;
  employeeIdentityInfoId?: number | null;
  employeeIdentityInfos?: EmployeeIdentityInfo;
  employeeEducationDetailIds?: number | null;
  employeeEducationDetail?: EmployeeEducationDetail[] | null;
  employeeDocumentsIds?: number | null;
  employeeDocuments?: EmployeeDocuments[] | null;
};
export type EmployeeCategory = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
};
export type Criterion = {
  field?: string | null;
  operator?: string | null;
  value?: any | null;
  nextOperator?: string | null;
};
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
  useGetApiEmployeesQuery,
  useLazyGetApiEmployeesQuery,
  usePostApiEmployeesMutation,
  useGetApiEmployeesCategoriesQuery,
  useLazyGetApiEmployeesCategoriesQuery,
  useGetApiEmployeesByIdQuery,
  useLazyGetApiEmployeesByIdQuery,
  usePutApiEmployeesByIdMutation,
  useDeleteApiEmployeesByIdMutation,
  usePostApiEmployeesSendEmailMutation,
  usePostApiEmployeesSearchMutation,
} = injectedRtkApi;
