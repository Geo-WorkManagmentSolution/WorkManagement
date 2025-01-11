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
    getApiEmployeesAllDeletedEmployees: build.query<
      GetApiEmployeesAllDeletedEmployeesApiResponse,
      GetApiEmployeesAllDeletedEmployeesApiArg
    >({
      query: () => ({ url: `/api/Employees/allDeletedEmployees` }),
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
    getApiEmployeesDeletedEmployeeByEmployeeId: build.query<
      GetApiEmployeesDeletedEmployeeByEmployeeIdApiResponse,
      GetApiEmployeesDeletedEmployeeByEmployeeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/deletedEmployee/${queryArg.employeeId}`,
      }),
    }),
    getApiEmployeesPartialByEmployeeId: build.query<
      GetApiEmployeesPartialByEmployeeIdApiResponse,
      GetApiEmployeesPartialByEmployeeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/partial/${queryArg.employeeId}`,
      }),
    }),
    putApiEmployeesSalaryApproveBySalaryId: build.mutation<
      PutApiEmployeesSalaryApproveBySalaryIdApiResponse,
      PutApiEmployeesSalaryApproveBySalaryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/SalaryApprove/${queryArg.salaryId}`,
        method: "PUT",
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    putApiEmployeesSalaryRejectBySalaryId: build.mutation<
      PutApiEmployeesSalaryRejectBySalaryIdApiResponse,
      PutApiEmployeesSalaryRejectBySalaryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/SalaryReject/${queryArg.salaryId}`,
        method: "PUT",
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    putApiEmployeesLeaveUpdateApproveByLeaveId: build.mutation<
      PutApiEmployeesLeaveUpdateApproveByLeaveIdApiResponse,
      PutApiEmployeesLeaveUpdateApproveByLeaveIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/LeaveUpdateApprove/${queryArg.leaveId}`,
        method: "PUT",
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    putApiEmployeesLeaveUpdateRejectByLeaveId: build.mutation<
      PutApiEmployeesLeaveUpdateRejectByLeaveIdApiResponse,
      PutApiEmployeesLeaveUpdateRejectByLeaveIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/LeaveUpdateReject/${queryArg.leaveId}`,
        method: "PUT",
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    getApiEmployeesSalaryPendingSalaryRequest: build.query<
      GetApiEmployeesSalaryPendingSalaryRequestApiResponse,
      GetApiEmployeesSalaryPendingSalaryRequestApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/Salary/PendingSalaryRequest`,
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    getApiEmployeesLeavePendingLeaveRequest: build.query<
      GetApiEmployeesLeavePendingLeaveRequestApiResponse,
      GetApiEmployeesLeavePendingLeaveRequestApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/Leave/PendingLeaveRequest`,
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    getApiEmployeesSalaryDashboard: build.query<
      GetApiEmployeesSalaryDashboardApiResponse,
      GetApiEmployeesSalaryDashboardApiArg
    >({
      query: () => ({ url: `/api/Employees/SalaryDashboard` }),
    }),
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
    putApiEmployeesApproveByLeaveId: build.mutation<
      PutApiEmployeesApproveByLeaveIdApiResponse,
      PutApiEmployeesApproveByLeaveIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/approve/${queryArg.leaveId}`,
        method: "PUT",
      }),
    }),
    putApiEmployeesRejectByLeaveId: build.mutation<
      PutApiEmployeesRejectByLeaveIdApiResponse,
      PutApiEmployeesRejectByLeaveIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/reject/${queryArg.leaveId}`,
        method: "PUT",
      }),
    }),
    postApiEmployeesSettingsAddDropdownItem: build.mutation<
      PostApiEmployeesSettingsAddDropdownItemApiResponse,
      PostApiEmployeesSettingsAddDropdownItemApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/settings/addDropdownItem`,
        method: "POST",
        body: queryArg.dropdownModel,
      }),
    }),
    deleteApiEmployeesSettingsDeleteDropdownItemByIdAndDropdownName:
      build.mutation<
        DeleteApiEmployeesSettingsDeleteDropdownItemByIdAndDropdownNameApiResponse,
        DeleteApiEmployeesSettingsDeleteDropdownItemByIdAndDropdownNameApiArg
      >({
        query: (queryArg) => ({
          url: `/api/Employees/settings/deleteDropdownItem/${queryArg.id}/${queryArg.dropdownName}`,
          method: "DELETE",
        }),
      }),
    putApiEmployeesSettingsUpdateDropdownItem: build.mutation<
      PutApiEmployeesSettingsUpdateDropdownItemApiResponse,
      PutApiEmployeesSettingsUpdateDropdownItemApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/settings/ updateDropdownItem`,
        method: "PUT",
        body: queryArg.dropdownModel,
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
    postApiEmployeesDocumnetUpload: build.mutation<
      PostApiEmployeesDocumnetUploadApiResponse,
      PostApiEmployeesDocumnetUploadApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/documnet/upload`,
        method: "POST",
        body: queryArg.body,
        params: { id: queryArg.id },
      }),
    }),
    deleteApiEmployeesDocumentByFileName: build.mutation<
      DeleteApiEmployeesDocumentByFileNameApiResponse,
      DeleteApiEmployeesDocumentByFileNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/document/${queryArg.fileName}`,
        method: "DELETE",
        params: { id: queryArg.id },
      }),
    }),
    getApiEmployeesDownloadByFileName: build.query<
      GetApiEmployeesDownloadByFileNameApiResponse,
      GetApiEmployeesDownloadByFileNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/download/${queryArg.fileName}`,
        params: { id: queryArg.id },
      }),
    }),
    getApiEmployeesProjectByEmployeeId: build.query<
      GetApiEmployeesProjectByEmployeeIdApiResponse,
      GetApiEmployeesProjectByEmployeeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/project/${queryArg.employeeId}`,
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
export type GetApiEmployeesApiResponse =
  /** status 200 OK */ EmployeeDashboardDataModel[];
export type GetApiEmployeesApiArg = void;
export type PostApiEmployeesApiResponse = /** status 200 OK */ EmployeeModel;
export type PostApiEmployeesApiArg = {
  employeeModel: EmployeeModel;
};
export type GetApiEmployeesAllDeletedEmployeesApiResponse =
  /** status 200 OK */ EmployeeDashboardDataModel[];
export type GetApiEmployeesAllDeletedEmployeesApiArg = void;
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
export type GetApiEmployeesDeletedEmployeeByEmployeeIdApiResponse =
  /** status 200 OK */ EmployeeModel;
export type GetApiEmployeesDeletedEmployeeByEmployeeIdApiArg = {
  employeeId: number;
};
export type GetApiEmployeesPartialByEmployeeIdApiResponse =
  /** status 200 OK */ SalaryEmployeeDashboardModel;
export type GetApiEmployeesPartialByEmployeeIdApiArg = {
  employeeId: number;
};
export type PutApiEmployeesSalaryApproveBySalaryIdApiResponse =
  /** status 200 OK */ EmployeeSalary;
export type PutApiEmployeesSalaryApproveBySalaryIdApiArg = {
  salaryId: number;
  employeeId?: number;
};
export type PutApiEmployeesSalaryRejectBySalaryIdApiResponse =
  /** status 200 OK */ EmployeeSalary;
export type PutApiEmployeesSalaryRejectBySalaryIdApiArg = {
  salaryId: number;
  employeeId?: number;
};
export type PutApiEmployeesLeaveUpdateApproveByLeaveIdApiResponse =
  /** status 200 OK */ EmployeeLeaveUpdatesTable;
export type PutApiEmployeesLeaveUpdateApproveByLeaveIdApiArg = {
  leaveId: number;
  employeeId?: number;
};
export type PutApiEmployeesLeaveUpdateRejectByLeaveIdApiResponse =
  /** status 200 OK */ EmployeeLeaveUpdatesTable;
export type PutApiEmployeesLeaveUpdateRejectByLeaveIdApiArg = {
  leaveId: number;
  employeeId?: number;
};
export type GetApiEmployeesSalaryPendingSalaryRequestApiResponse =
  /** status 200 OK */ EmployeeSalaryDataModel[];
export type GetApiEmployeesSalaryPendingSalaryRequestApiArg = {
  employeeId?: number;
};
export type GetApiEmployeesLeavePendingLeaveRequestApiResponse =
  /** status 200 OK */ EmployeeLeaveDataModel[];
export type GetApiEmployeesLeavePendingLeaveRequestApiArg = {
  employeeId?: number;
};
export type GetApiEmployeesSalaryDashboardApiResponse =
  /** status 200 OK */ SalaryEmployeeDashboardModel[];
export type GetApiEmployeesSalaryDashboardApiArg = void;
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
export type PutApiEmployeesApproveByLeaveIdApiResponse =
  /** status 200 OK */ EmployeeLeave;
export type PutApiEmployeesApproveByLeaveIdApiArg = {
  leaveId: number;
};
export type PutApiEmployeesRejectByLeaveIdApiResponse =
  /** status 200 OK */ EmployeeLeave;
export type PutApiEmployeesRejectByLeaveIdApiArg = {
  leaveId: number;
};
export type PostApiEmployeesSettingsAddDropdownItemApiResponse = unknown;
export type PostApiEmployeesSettingsAddDropdownItemApiArg = {
  dropdownModel: DropdownModel;
};
export type DeleteApiEmployeesSettingsDeleteDropdownItemByIdAndDropdownNameApiResponse =
  unknown;
export type DeleteApiEmployeesSettingsDeleteDropdownItemByIdAndDropdownNameApiArg =
  {
    id: number;
    dropdownName: string;
  };
export type PutApiEmployeesSettingsUpdateDropdownItemApiResponse = unknown;
export type PutApiEmployeesSettingsUpdateDropdownItemApiArg = {
  dropdownModel: DropdownModel;
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
export type PostApiEmployeesDocumnetUploadApiResponse =
  /** status 200 OK */ string;
export type PostApiEmployeesDocumnetUploadApiArg = {
  id?: number;
  body: {
    file?: Blob;
  };
};
export type DeleteApiEmployeesDocumentByFileNameApiResponse = unknown;
export type DeleteApiEmployeesDocumentByFileNameApiArg = {
  id?: number;
  fileName: string;
};
export type GetApiEmployeesDownloadByFileNameApiResponse = unknown;
export type GetApiEmployeesDownloadByFileNameApiArg = {
  id?: number;
  fileName: string;
};
export type GetApiEmployeesProjectByEmployeeIdApiResponse =
  /** status 200 OK */ ProjectModel[];
export type GetApiEmployeesProjectByEmployeeIdApiArg = {
  employeeId: number;
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
export type GetApiProjectDepartmentEmployeesByDepartmentIdApiResponse =
  /** status 200 OK */ EmployeeModel[];
export type GetApiProjectDepartmentEmployeesByDepartmentIdApiArg = {
  projectId?: number;
  departmentId: number;
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
  id?: number | null;
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
export type SalaryEmployeeDashboardModel = {
  id?: number;
  employeeNumber?: number;
  fullName?: string | null;
  email?: string | null;
  departmentName?: string | null;
  designationName?: string | null;
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
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  alternateEmail?: string | null;
  phoneNumber?: number | null;
  alternateNumber?: number | null;
  jobLevelLeaveType?: number | null;
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
export type EmployeeSalary = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  employee?: Employee;
  salaryType?: SalaryType;
  salaryStatus?: SalaryStatus;
  isApprovedByDepartmentHead?: boolean;
  isApprovedByHRHead?: boolean;
  currentSalary?: number;
  expectedToBeSalary?: number;
  basic?: number;
  hrAllowances?: number;
  bonus?: number;
  gratuity?: number;
  pf?: number;
  esi?: number;
  pt?: number;
  updatedBy?: number | null;
  updatedDateTime?: string | null;
};
export type EmployeeLeavesDeatils = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number;
  employee?: Employee;
  remainingLeaves?: number;
  employeeLeaveTypeId?: number | null;
  employeeLeaveTypes?: EmployeeLeaveType;
  totalLeaves?: number;
};
export type EmployeeLeaveUpdatesTable = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number | null;
  employee?: Employee;
  managerName?: string | null;
  employeeNumber?: number | null;
  status?: LeaveStatus;
  isApprovedByDepartmentHead?: boolean;
  isApprovedByHRHead?: boolean;
  jobLevelLeaveType?: number | null;
  useDefultLeaves?: boolean | null;
  employeeLeaveSummaryId?: number[] | null;
  employeeLeaveUpdateTableId?: number | null;
  updatedNewLeaves?: EmployeeLeavesDeatils[] | null;
  updatedBy?: number | null;
  updatedDateTime?: string | null;
};
export type EmployeeSalaryDataModel = {
  salaryid?: number;
  employeeId?: number | null;
  employeeName?: string | null;
  managerName?: string | null;
  salaryType?: SalaryType;
  salaryStatus?: SalaryStatus;
  isApprovedByDepartmentHead?: boolean;
  isApprovedByHRHead?: boolean;
  currentSalary?: number;
  expectedToBeSalary?: number;
  updatedBy?: number | null;
  updatedByUserName?: string | null;
  updatedDateTime?: string | null;
};
export type EmployeeLeaveDataModel = {
  leaveId?: number;
  employeeId?: number | null;
  employeeName?: string | null;
  employeeNumber?: number | null;
  managerName?: string | null;
  jobLevelLeaveType?: number | null;
  leaveStatus?: LeaveStatus;
  isApprovedByDepartmentHead?: boolean;
  isApprovedByHRHead?: boolean;
  currentLeaves?: EmployeeLeaveSummaryModel[] | null;
  updatedNewLeaves?: EmployeeLeaveSummaryModel[] | null;
  updatedBy?: number | null;
  updatedByUserName?: string | null;
  updatedDateTime?: string | null;
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
export type EmployeeLeave = {
  id?: number;
  isDeleted?: boolean;
  employeeId?: number;
  status?: LeaveStatus;
  description?: string | null;
  reason?: string | null;
  startDate?: string;
  endDate?: string;
  leaveDays?: number;
  employeeLeaveTypeId?: number;
};
export type DropdownModel = {
  category?: string | null;
  id?: number;
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
  employeeNumber?: number;
  designation?: string | null;
  employeeId?: number;
};
export type Criterion = {
  field?: string | null;
  operator?: string | null;
  value?: any | null;
  nextOperator?: string | null;
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
export enum SalaryStatus {
  Approved = "Approved",
  Pending = "Pending",
  Rejected = "Rejected",
}
export enum LeaveStatus {
  Approved = "Approved",
  Pending = "Pending",
  Rejected = "Rejected",
}
export enum ProjectStatus {
  Upcoming = "Upcoming",
  Ongoing = "Ongoing",
  Completed = "Completed",
  OnHold = "OnHold",
  Closed = "Closed",
}
export const {
  useGetApiEmployeesQuery,
  useLazyGetApiEmployeesQuery,
  usePostApiEmployeesMutation,
  useGetApiEmployeesAllDeletedEmployeesQuery,
  useLazyGetApiEmployeesAllDeletedEmployeesQuery,
  useGetApiEmployeesByIdQuery,
  useLazyGetApiEmployeesByIdQuery,
  usePutApiEmployeesByIdMutation,
  useDeleteApiEmployeesByIdMutation,
  useGetApiEmployeesDeletedEmployeeByEmployeeIdQuery,
  useLazyGetApiEmployeesDeletedEmployeeByEmployeeIdQuery,
  useGetApiEmployeesPartialByEmployeeIdQuery,
  useLazyGetApiEmployeesPartialByEmployeeIdQuery,
  usePutApiEmployeesSalaryApproveBySalaryIdMutation,
  usePutApiEmployeesSalaryRejectBySalaryIdMutation,
  usePutApiEmployeesLeaveUpdateApproveByLeaveIdMutation,
  usePutApiEmployeesLeaveUpdateRejectByLeaveIdMutation,
  useGetApiEmployeesSalaryPendingSalaryRequestQuery,
  useLazyGetApiEmployeesSalaryPendingSalaryRequestQuery,
  useGetApiEmployeesLeavePendingLeaveRequestQuery,
  useLazyGetApiEmployeesLeavePendingLeaveRequestQuery,
  useGetApiEmployeesSalaryDashboardQuery,
  useLazyGetApiEmployeesSalaryDashboardQuery,
  useGetApiEmployeesLeavesCurrentQuery,
  useLazyGetApiEmployeesLeavesCurrentQuery,
  usePostApiEmployeesLeavesAddLeaveMutation,
  usePutApiEmployeesLeavesUpdateLeaveMutation,
  useDeleteApiEmployeesLeavesCancelLeaveMutation,
  usePutApiEmployeesApproveByLeaveIdMutation,
  usePutApiEmployeesRejectByLeaveIdMutation,
  usePostApiEmployeesSettingsAddDropdownItemMutation,
  useDeleteApiEmployeesSettingsDeleteDropdownItemByIdAndDropdownNameMutation,
  usePutApiEmployeesSettingsUpdateDropdownItemMutation,
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
  useGetApiEmployeesCheckEmailExistsQuery,
  useLazyGetApiEmployeesCheckEmailExistsQuery,
  usePostApiEmployeesSendEmailMutation,
  usePostApiEmployeesSearchMutation,
  usePostApiEmployeesAddNewCategoryMutation,
  usePostApiEmployeesAddNewDepartmentMutation,
  usePostApiEmployeesAddNewSiteMutation,
  usePostApiEmployeesAddNewDesignationMutation,
  usePostApiEmployeesDocumnetUploadMutation,
  useDeleteApiEmployeesDocumentByFileNameMutation,
  useGetApiEmployeesDownloadByFileNameQuery,
  useLazyGetApiEmployeesDownloadByFileNameQuery,
  useGetApiEmployeesProjectByEmployeeIdQuery,
  useLazyGetApiEmployeesProjectByEmployeeIdQuery,
  useGetApiProjectByProjectIdEmployeesQuery,
  useLazyGetApiProjectByProjectIdEmployeesQuery,
  useDeleteApiProjectByProjectIdEmployeesAndEmployeeIdMutation,
  useGetApiProjectDepartmentEmployeesByDepartmentIdQuery,
  useLazyGetApiProjectDepartmentEmployeesByDepartmentIdQuery,
} = injectedRtkApi;
