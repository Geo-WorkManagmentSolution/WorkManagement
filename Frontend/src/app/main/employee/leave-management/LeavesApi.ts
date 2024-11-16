import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    getApiLeavesHolidays: build.query<
      GetApiLeavesHolidaysApiResponse,
      GetApiLeavesHolidaysApiArg
    >({
      query: () => ({ url: `/api/Leaves/holidays` }),
    }),
    getApiLeavesLeavesHistory: build.query<
      GetApiLeavesLeavesHistoryApiResponse,
      GetApiLeavesLeavesHistoryApiArg
    >({
      query: () => ({ url: `/api/Leaves/leaves/history` }),
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
export type PutApiEmployeesLeavesAddLeaveApiResponse =
  /** status 200 OK */ EmployeeLeave;
export type PutApiEmployeesLeavesAddLeaveApiArg = {
  employeeLeave: EmployeeLeave;
};
export type DeleteApiEmployeesLeavesCancelLeaveApiResponse =
  /** status 200 OK */ boolean;
export type DeleteApiEmployeesLeavesCancelLeaveApiArg = {
  employeeLeaveId?: number;
};
export type PutApiEmployeesLeavesUpdateLeaveApiResponse =
  /** status 200 OK */ EmployeeLeave;
export type PutApiEmployeesLeavesUpdateLeaveApiArg = {
  employeeLeave: EmployeeLeave;
};
export type GetApiLeavesHolidaysApiResponse =
  /** status 200 OK */ EmployeeHoliday[];
export type GetApiLeavesHolidaysApiArg = void;
export type GetApiLeavesLeavesHistoryApiResponse =
  /** status 200 OK */ EmployeeLeave[];
export type GetApiLeavesLeavesHistoryApiArg = void;
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
  employeeLeaveTypeId: number;
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
export enum LeaveStatus {
  Approved = "Approved",
  Pending = "Pending",
  Rejected = "Rejected",
}
export const {
  useGetApiEmployeesLeavesCurrentQuery,
  useLazyGetApiEmployeesLeavesCurrentQuery,
  usePutApiEmployeesLeavesAddLeaveMutation,
  useDeleteApiEmployeesLeavesCancelLeaveMutation,
  usePutApiEmployeesLeavesUpdateLeaveMutation,
  useGetApiLeavesHolidaysQuery,
  useLazyGetApiLeavesHolidaysQuery,
  useGetApiLeavesLeavesHistoryQuery,
  useLazyGetApiLeavesLeavesHistoryQuery,
  usePostApiLeavesLeavesEmployeeLeaveHistoryMutation,
} = injectedRtkApi;
