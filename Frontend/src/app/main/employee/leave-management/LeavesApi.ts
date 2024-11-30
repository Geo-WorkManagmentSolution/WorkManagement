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
    postApiLeavesHolidays: build.mutation<
      PostApiLeavesHolidaysApiResponse,
      PostApiLeavesHolidaysApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Leaves/holidays`,
        method: "POST",
        body: queryArg.body,
      }),
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
    getApiLeavesDefaultLeaves: build.query<
      GetApiLeavesDefaultLeavesApiResponse,
      GetApiLeavesDefaultLeavesApiArg
    >({
      query: () => ({ url: `/api/Leaves/default-leaves` }),
    }),
    putApiLeavesDefaultLeaves: build.mutation<
      PutApiLeavesDefaultLeavesApiResponse,
      PutApiLeavesDefaultLeavesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Leaves/default-leaves`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getApiLeavesHolidaysByYear: build.query<
      GetApiLeavesHolidaysByYearApiResponse,
      GetApiLeavesHolidaysByYearApiArg
    >({
      query: (queryArg) => ({ url: `/api/Leaves/holidays/${queryArg.year}` }),
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
export type PostApiLeavesHolidaysApiResponse = /** status 200 OK */ boolean;
export type PostApiLeavesHolidaysApiArg = {
  body: EmployeeHoliday[];
};
export type GetApiLeavesLeavesAllApiResponse =
  /** status 200 OK */ EmployeeLeaveModel[];
export type GetApiLeavesLeavesAllApiArg = void;
export type PostApiLeavesLeavesEmployeeLeaveHistoryApiResponse =
  /** status 200 OK */ EmployeeLeaveHistoryDto[];
export type PostApiLeavesLeavesEmployeeLeaveHistoryApiArg = {
  employeeLeaveHistoryDataModel: EmployeeLeaveHistoryDataModel;
};
export type GetApiLeavesDefaultLeavesApiResponse =
  /** status 200 OK */ EmployeeDefaultLeaveSummary[];
export type GetApiLeavesDefaultLeavesApiArg = void;
export type PutApiLeavesDefaultLeavesApiResponse = /** status 200 OK */ boolean;
export type PutApiLeavesDefaultLeavesApiArg = {
  body: EmployeeDefaultLeaveSummary[];
};
export type GetApiLeavesHolidaysByYearApiResponse =
  /** status 200 OK */ EmployeeHoliday[];
export type GetApiLeavesHolidaysByYearApiArg = {
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
export type EmployeeDefaultLeaveSummary = {
  id?: number;
  isDeleted?: boolean;
  employeeLeaveTypeId?: number | null;
  employeeLeaveTypes?: EmployeeLeaveType;
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
  usePostApiLeavesHolidaysMutation,
  useGetApiLeavesLeavesAllQuery,
  useLazyGetApiLeavesLeavesAllQuery,
  usePostApiLeavesLeavesEmployeeLeaveHistoryMutation,
  useGetApiLeavesDefaultLeavesQuery,
  useLazyGetApiLeavesDefaultLeavesQuery,
  usePutApiLeavesDefaultLeavesMutation,
  useGetApiLeavesHolidaysByYearQuery,
  useLazyGetApiLeavesHolidaysByYearQuery,
} = injectedRtkApi;
