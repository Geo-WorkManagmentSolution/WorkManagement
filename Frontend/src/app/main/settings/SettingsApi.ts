import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    getApiLeavesSettingsHolidaysByYear: build.query<
      GetApiLeavesSettingsHolidaysByYearApiResponse,
      GetApiLeavesSettingsHolidaysByYearApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Leaves/settings/holidays/${queryArg.year}`,
      }),
    }),
    getApiLeavesSettingsLeaveTypes: build.query<
      GetApiLeavesSettingsLeaveTypesApiResponse,
      GetApiLeavesSettingsLeaveTypesApiArg
    >({
      query: () => ({ url: `/api/Leaves/settings/leaveTypes` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
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
export type GetApiLeavesSettingsHolidaysByYearApiResponse =
  /** status 200 OK */ EmployeeHoliday[];
export type GetApiLeavesSettingsHolidaysByYearApiArg = {
  year: number;
};
export type GetApiLeavesSettingsLeaveTypesApiResponse =
  /** status 200 OK */ EmployeeLeaveType[];
export type GetApiLeavesSettingsLeaveTypesApiArg = void;
export type DropdownModel = {
  category?: string | null;
  id?: number;
  name?: string | null;
};
export type EmployeeHoliday = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
  isFloater?: boolean;
  startDate?: string;
  endDate?: string;
};
export type DefaultLeaveModel = {
  id?: number | null;
  name?: string | null;
  jobLevelLeaveTypeId?: number;
  totalLeaves?: number;
};
export type EmployeeLeaveType = {
  id?: number;
  isDeleted?: boolean;
  name?: string | null;
  isPaid?: boolean;
};
export const {
  usePostApiEmployeesSettingsAddDropdownItemMutation,
  useDeleteApiEmployeesSettingsDeleteDropdownItemByIdAndDropdownNameMutation,
  usePutApiEmployeesSettingsUpdateDropdownItemMutation,
  usePostApiLeavesSettingsHolidaysMutation,
  usePutApiLeavesSettingsDefaultLeavesMutation,
  useDeleteApiLeavesSettingsDefaultLeavesByIdMutation,
  useGetApiLeavesSettingsHolidaysByYearQuery,
  useLazyGetApiLeavesSettingsHolidaysByYearQuery,
  useGetApiLeavesSettingsLeaveTypesQuery,
  useLazyGetApiLeavesSettingsLeaveTypesQuery,
} = injectedRtkApi;
