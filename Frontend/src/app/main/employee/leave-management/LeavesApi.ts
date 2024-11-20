import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiEmployeesLeavesCurrent: build.query<
      GetApiEmployeesLeavesCurrentApiResponse,
      GetApiEmployeesLeavesCurrentApiArg
    >({
      query: () => ({ url: `/api/Employees/leaves/current` }),
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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
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
export type GetApiLeavesHolidaysApiResponse =
  /** status 200 OK */ EmployeeHoliday[];
export type GetApiLeavesHolidaysApiArg = void;
export type GetApiLeavesLeavesAllApiResponse =
  /** status 200 OK */ EmployeeLeave[];
export type GetApiLeavesLeavesAllApiArg = void;
export type PostApiLeavesLeavesEmployeeLeaveHistoryApiResponse =
  /** status 200 OK */ EmployeeLeaveHistoryDto[];
export type PostApiLeavesLeavesEmployeeLeaveHistoryApiArg = {
  employeeLeaveHistoryDataModel: EmployeeLeaveHistoryDataModel;
};
export type EmployeeLeaveSummaryModel = {
  id?: number;
  employeeLeaveType?: string | null;
  totalLeaves?: number;
  remainingLeaves?: number;
};
export type EmployeeLeaveModel = {
  id?: number;
  employeeId?: number;
  status?: LeaveStatus;
  description?: string | null;
  reason?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  leaveDays?: number;
  employeeLeaveTypeId?: number;
};
export type EmployeeHoliday = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
  isFloater?: boolean;
  startDate?: string;
  endDate?: string;
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
} = injectedRtkApi;
