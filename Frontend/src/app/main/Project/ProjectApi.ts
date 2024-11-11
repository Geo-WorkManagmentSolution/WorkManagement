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
export type EmployeeAddressModel = {
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  country?: string | null;
  state?: string | null;
  pinCode?: number | null;
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
  position?: string | null;
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
export const {
  useGetApiProjectQuery,
  useLazyGetApiProjectQuery,
  usePostApiProjectMutation,
  useGetApiProjectByIdQuery,
  useLazyGetApiProjectByIdQuery,
  usePutApiProjectByIdMutation,
  useDeleteApiProjectByIdMutation,
} = injectedRtkApi;
