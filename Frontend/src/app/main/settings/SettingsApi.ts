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
    deleteApiEmployeesSettingsDeleteDropdownItemById: build.mutation<
      DeleteApiEmployeesSettingsDeleteDropdownItemByIdApiResponse,
      DeleteApiEmployeesSettingsDeleteDropdownItemByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Employees/settings/deleteDropdownItem/${queryArg.id}`,
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
export type PostApiEmployeesSettingsAddDropdownItemApiResponse = unknown;
export type PostApiEmployeesSettingsAddDropdownItemApiArg = {
  dropdownModel: DropdownModel;
};
export type DeleteApiEmployeesSettingsDeleteDropdownItemByIdApiResponse =
  unknown;
export type DeleteApiEmployeesSettingsDeleteDropdownItemByIdApiArg = {
  id: number;
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
export type GetApiLeavesSettingsHolidaysByYearApiResponse =
  /** status 200 OK */ EmployeeHoliday[];
export type GetApiLeavesSettingsHolidaysByYearApiArg = {
  year: number;
};
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
  name?: string | null;
  jobLevelLeaveTypeId?: number;
  totalLeaves?: number;
};
export const {
  usePostApiEmployeesSettingsAddDropdownItemMutation,
  useDeleteApiEmployeesSettingsDeleteDropdownItemByIdMutation,
  usePutApiEmployeesSettingsUpdateDropdownItemMutation,
  usePostApiLeavesSettingsHolidaysMutation,
  usePutApiLeavesSettingsDefaultLeavesMutation,
  useGetApiLeavesSettingsHolidaysByYearQuery,
  useLazyGetApiLeavesSettingsHolidaysByYearQuery,
} = injectedRtkApi;