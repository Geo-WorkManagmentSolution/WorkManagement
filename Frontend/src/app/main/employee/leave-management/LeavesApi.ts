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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiEmployeesLeavesCurrentApiResponse =
  /** status 200 OK */ EmployeeLeaveSummaryModel[];
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
export type EmployeeLeaveSummaryModel = {
  employeeLeaveSummaryId?: number;
  id?: number;
  employeeLeaveType?: string | null;
  totalLeaves?: number;
  remainingLeaves?: number;
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
export type EmployeeLeaveType = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
  isPaid?: boolean;
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
} = injectedRtkApi;
