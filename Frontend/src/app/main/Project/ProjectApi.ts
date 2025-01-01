import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiEmployeesProjectByEmployeeId: build.query<
      GetApiEmployeesProjectByEmployeeIdApiResponse,
      GetApiEmployeesProjectByEmployeeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/project/${queryArg.employeeId}`,
      }),
    }),
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
    getApiProjectProjectTaskById: build.query<
      GetApiProjectProjectTaskByIdApiResponse,
      GetApiProjectProjectTaskByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Project/projectTask/${queryArg.id}` }),
    }),
    putApiProjectProjectTaskById: build.mutation<
      PutApiProjectProjectTaskByIdApiResponse,
      PutApiProjectProjectTaskByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/projectTask/${queryArg.id}`,
        method: "PUT",
        body: queryArg.taskModel,
      }),
    }),
    getApiProjectProjectTasksByProjectId: build.query<
      GetApiProjectProjectTasksByProjectIdApiResponse,
      GetApiProjectProjectTasksByProjectIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/projectTasks/${queryArg.projectId}`,
      }),
    }),
    postApiProjectProjectTask: build.mutation<
      PostApiProjectProjectTaskApiResponse,
      PostApiProjectProjectTaskApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/projectTask`,
        method: "POST",
        body: queryArg.taskModel,
      }),
    }),
    deleteApiProjectTaskByTaskIdAndProjectId: build.mutation<
      DeleteApiProjectTaskByTaskIdAndProjectIdApiResponse,
      DeleteApiProjectTaskByTaskIdAndProjectIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/Task/${queryArg.taskId}/${queryArg.projectId}`,
        method: "DELETE",
      }),
    }),
    postApiProjectAssign: build.mutation<
      PostApiProjectAssignApiResponse,
      PostApiProjectAssignApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/assign`,
        method: "POST",
        params: {
          projectId: queryArg.projectId,
          employeeId: queryArg.employeeId,
        },
      }),
    }),
    getApiProjectByProjectIdEmployees: build.query<
      GetApiProjectByProjectIdEmployeesApiResponse,
      GetApiProjectByProjectIdEmployeesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/${queryArg.projectId}/employees`,
      }),
    }),
    deleteApiProjectByProjectIdEmployeesAndEmployeeId: build.mutation<
      DeleteApiProjectByProjectIdEmployeesAndEmployeeIdApiResponse,
      DeleteApiProjectByProjectIdEmployeesAndEmployeeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/${queryArg.projectId}/employees/${queryArg.employeeId}`,
        method: "DELETE",
      }),
    }),
    getApiProjectDocumentsByProjectId: build.query<
      GetApiProjectDocumentsByProjectIdApiResponse,
      GetApiProjectDocumentsByProjectIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/documents/${queryArg.projectId}`,
      }),
    }),
    postApiProjectDocumnetUpload: build.mutation<
      PostApiProjectDocumnetUploadApiResponse,
      PostApiProjectDocumnetUploadApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/documnet/upload`,
        method: "POST",
        body: queryArg.body,
        params: { id: queryArg.id },
      }),
    }),
    deleteApiProjectDocumentByFileName: build.mutation<
      DeleteApiProjectDocumentByFileNameApiResponse,
      DeleteApiProjectDocumentByFileNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/document/${queryArg.fileName}`,
        method: "DELETE",
        params: { id: queryArg.id },
      }),
    }),
    getApiProjectDownloadByFileName: build.query<
      GetApiProjectDownloadByFileNameApiResponse,
      GetApiProjectDownloadByFileNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/download/${queryArg.fileName}`,
        params: { id: queryArg.id },
      }),
    }),
    getApiProjectDepartmentEmployeesByDepartmentId: build.query<
      GetApiProjectDepartmentEmployeesByDepartmentIdApiResponse,
      GetApiProjectDepartmentEmployeesByDepartmentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/department-employees/${queryArg.departmentId}`,
        params: { projectId: queryArg.projectId },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiEmployeesProjectByEmployeeIdApiResponse =
  /** status 200 OK */ ProjectModel[];
export type GetApiEmployeesProjectByEmployeeIdApiArg = {
  employeeId: number;
};
export type GetApiProjectApiResponse =
  /** status 200 OK */ ProjectDashboardModel[];
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
export type GetApiProjectProjectTaskByIdApiResponse =
  /** status 200 OK */ TaskModel;
export type GetApiProjectProjectTaskByIdApiArg = {
  id: number;
};
export type PutApiProjectProjectTaskByIdApiResponse = unknown;
export type PutApiProjectProjectTaskByIdApiArg = {
  id: number;
  taskModel: TaskModel;
};
export type GetApiProjectProjectTasksByProjectIdApiResponse =
  /** status 200 OK */ TaskDashboardModel[];
export type GetApiProjectProjectTasksByProjectIdApiArg = {
  projectId: number;
};
export type PostApiProjectProjectTaskApiResponse =
  /** status 200 OK */ EmployeeModel;
export type PostApiProjectProjectTaskApiArg = {
  taskModel: TaskModel;
};
export type DeleteApiProjectTaskByTaskIdAndProjectIdApiResponse = unknown;
export type DeleteApiProjectTaskByTaskIdAndProjectIdApiArg = {
  taskId: number;
  projectId: number;
};
export type PostApiProjectAssignApiResponse = unknown;
export type PostApiProjectAssignApiArg = {
  projectId?: number;
  employeeId?: number;
};
export type GetApiProjectByProjectIdEmployeesApiResponse =
  /** status 200 OK */ EmployeeTeamMemberList[];
export type GetApiProjectByProjectIdEmployeesApiArg = {
  projectId: number;
};
export type DeleteApiProjectByProjectIdEmployeesAndEmployeeIdApiResponse =
  unknown;
export type DeleteApiProjectByProjectIdEmployeesAndEmployeeIdApiArg = {
  projectId: number;
  employeeId: number;
};
export type GetApiProjectDocumentsByProjectIdApiResponse =
  /** status 200 OK */ ProjectWorkOrders[];
export type GetApiProjectDocumentsByProjectIdApiArg = {
  projectId: number;
};
export type PostApiProjectDocumnetUploadApiResponse =
  /** status 200 OK */ string;
export type PostApiProjectDocumnetUploadApiArg = {
  id?: number;
  body: {
    file?: Blob;
  };
};
export type DeleteApiProjectDocumentByFileNameApiResponse = unknown;
export type DeleteApiProjectDocumentByFileNameApiArg = {
  id?: number;
  fileName: string;
};
export type GetApiProjectDownloadByFileNameApiResponse = unknown;
export type GetApiProjectDownloadByFileNameApiArg = {
  id?: number;
  fileName: string;
};
export type GetApiProjectDepartmentEmployeesByDepartmentIdApiResponse =
  /** status 200 OK */ EmployeeModel[];
export type GetApiProjectDepartmentEmployeesByDepartmentIdApiArg = {
  projectId?: number;
  departmentId: number;
};
export type ProjectModel = {
  id?: number;
  projectName?: string | null;
  projectNumber?: string | null;
  projectDescription?: string | null;
  startDate?: string;
  endDate?: string | null;
  workOrderNumber?: string | null;
  workOrderName?: string | null;
  workOrderAmount?: number | null;
  periodOfWorkInMonths?: number | null;
  status?: ProjectStatus;
  workOrderDate?: string | null;
};
export type ProjectDashboardModel = {
  id?: number;
  projectName?: string | null;
  projectNumber?: string | null;
  projectDescription?: string | null;
  workOrderNumber?: string | null;
  workOrderName?: string | null;
  workOrderAmount?: number | null;
  departmentName?: string | null;
  status?: ProjectStatus;
  startDate?: string | null;
  endDate?: string | null;
  workOrderDate?: string | null;
  periodOfWorkInMonths?: number;
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
  useDefaultLeaves?: boolean;
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
  employeeLeaveSummaryId?: number;
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
  jobLevelLeaveType?: number | null;
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
export type TaskModel = {
  id?: number;
  isDeleted?: boolean;
  title?: string | null;
  description?: string | null;
  notes?: string | null;
  status?: ProjectTaskStatus;
  priority?: ProjectTaskPriorityStatus;
  startDate?: string | null;
  endDate?: string | null;
  estimatedHours?: number | null;
  remainingHours?: number | null;
  completedHours?: number | null;
  assignedEmployees?: number[] | null;
  projectId?: number | null;
};
export type TaskDashboardModel = {
  id?: number;
  title?: string | null;
  description?: string | null;
  status?: ProjectTaskStatus;
  priority?: ProjectTaskPriorityStatus;
  startDate?: string | null;
  endDate?: string | null;
  estimatedHours?: number | null;
  remainingHours?: number | null;
  completedHours?: number | null;
};
export type EmployeeTeamMemberList = {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  employeeNumber?: number;
  designation?: string | null;
  employeeId?: number;
};
export type Project = {
  id?: number;
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string | null;
  lastModifiedOn?: string;
  isDeleted?: boolean;
  projectName: string;
  projectNumber?: string | null;
  projectDescription?: string | null;
  workOrderNumber?: string | null;
  workOrderName?: string | null;
  workOrderAmount?: number | null;
  periodOfWorkInMonths?: number | null;
  status?: ProjectStatus;
  startDate: string;
  endDate?: string | null;
  workOrderDate?: string | null;
};
export type ProjectWorkOrders = {
  id?: number;
  isDeleted?: boolean;
  fileName?: string | null;
  filePath?: string | null;
  fileSize?: number | null;
  fileContent?: string | null;
  fileType?: FileType;
  projectId?: number | null;
  project?: Project;
};
export enum ProjectStatus {
  Upcoming = "Upcoming",
  Ongoing = "Ongoing",
  Completed = "Completed",
  OnHold = "OnHold",
  Closed = "Closed",
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
export enum ProjectTaskStatus {
  New = "New",
  Active = "Active",
  Completed = "Completed",
  Removed = "Removed",
}
export enum ProjectTaskPriorityStatus {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}
export const {
  useGetApiEmployeesProjectByEmployeeIdQuery,
  useLazyGetApiEmployeesProjectByEmployeeIdQuery,
  useGetApiProjectQuery,
  useLazyGetApiProjectQuery,
  usePostApiProjectMutation,
  useGetApiProjectByIdQuery,
  useLazyGetApiProjectByIdQuery,
  usePutApiProjectByIdMutation,
  useDeleteApiProjectByIdMutation,
  useGetApiProjectProjectTaskByIdQuery,
  useLazyGetApiProjectProjectTaskByIdQuery,
  usePutApiProjectProjectTaskByIdMutation,
  useGetApiProjectProjectTasksByProjectIdQuery,
  useLazyGetApiProjectProjectTasksByProjectIdQuery,
  usePostApiProjectProjectTaskMutation,
  useDeleteApiProjectTaskByTaskIdAndProjectIdMutation,
  usePostApiProjectAssignMutation,
  useGetApiProjectByProjectIdEmployeesQuery,
  useLazyGetApiProjectByProjectIdEmployeesQuery,
  useDeleteApiProjectByProjectIdEmployeesAndEmployeeIdMutation,
  useGetApiProjectDocumentsByProjectIdQuery,
  useLazyGetApiProjectDocumentsByProjectIdQuery,
  usePostApiProjectDocumnetUploadMutation,
  useDeleteApiProjectDocumentByFileNameMutation,
  useGetApiProjectDownloadByFileNameQuery,
  useLazyGetApiProjectDownloadByFileNameQuery,
  useGetApiProjectDepartmentEmployeesByDepartmentIdQuery,
  useLazyGetApiProjectDepartmentEmployeesByDepartmentIdQuery,
} = injectedRtkApi;
