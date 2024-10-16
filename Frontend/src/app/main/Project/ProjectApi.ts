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
export type EmployeeDepartment = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
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
  middleName?: string | null;
  lastName: string | null;
  motherName: string | null;
  email: string | null;
  phoneNumber?: number | null;
  alternateNumber?: number | null;
  position?: string | null;
  userId?: string;
  roleId: string;
  employeeCategoryId: number;
  employeeDepartmentId?: number | null;
  employeeDepartment?: EmployeeDepartment;
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
  useGetApiProjectQuery,
  useLazyGetApiProjectQuery,
  usePostApiProjectMutation,
  useGetApiProjectByIdQuery,
  useLazyGetApiProjectByIdQuery,
  usePutApiProjectByIdMutation,
  useDeleteApiProjectByIdMutation,
} = injectedRtkApi;
