import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    putApiPermissionsAssignRoleByRoleId: build.mutation<
      PutApiPermissionsAssignRoleByRoleIdApiResponse,
      PutApiPermissionsAssignRoleByRoleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Permissions/assign/role/${queryArg.roleId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    postApiPermissionsAssignRoleAll: build.mutation<
      PostApiPermissionsAssignRoleAllApiResponse,
      PostApiPermissionsAssignRoleAllApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Permissions/assign/role/all`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiPermissionsClaimsByUserId: build.query<
      GetApiPermissionsClaimsByUserIdApiResponse,
      GetApiPermissionsClaimsByUserIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Permissions/claims/${queryArg.userId}`,
      }),
    }),
    getApiPermissionsRoleByRoleId: build.query<
      GetApiPermissionsRoleByRoleIdApiResponse,
      GetApiPermissionsRoleByRoleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Permissions/role/${queryArg.roleId}`,
      }),
    }),
    getApiPermissionsUserByUserId: build.query<
      GetApiPermissionsUserByUserIdApiResponse,
      GetApiPermissionsUserByUserIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Permissions/user/${queryArg.userId}`,
      }),
    }),
    getApiPermissionsPermissionActions: build.query<
      GetApiPermissionsPermissionActionsApiResponse,
      GetApiPermissionsPermissionActionsApiArg
    >({
      query: () => ({ url: `/api/Permissions/PermissionActions` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type PutApiPermissionsAssignRoleByRoleIdApiResponse =
  /** status 200 OK */ RolePermission[];
export type PutApiPermissionsAssignRoleByRoleIdApiArg = {
  roleId: string;
  body: number[];
};
export type PostApiPermissionsAssignRoleAllApiResponse =
  /** status 200 OK */ RolePermission[];
export type PostApiPermissionsAssignRoleAllApiArg = {
  body: RolePermissionModel[];
};
export type GetApiPermissionsClaimsByUserIdApiResponse =
  /** status 200 OK */ PermissionCategoryClaim[];
export type GetApiPermissionsClaimsByUserIdApiArg = {
  userId: string;
};
export type GetApiPermissionsRoleByRoleIdApiResponse =
  /** status 200 OK */ RolePermission[];
export type GetApiPermissionsRoleByRoleIdApiArg = {
  roleId: string;
};
export type GetApiPermissionsUserByUserIdApiResponse =
  /** status 200 OK */ RolePermission[];
export type GetApiPermissionsUserByUserIdApiArg = {
  userId: string;
};
export type GetApiPermissionsPermissionActionsApiResponse =
  /** status 200 OK */ PermissionAction[];
export type GetApiPermissionsPermissionActionsApiArg = void;
export type RolePermission = {
  id?: number;
  isDeleted?: boolean;
  roleId: string;
  permissionActionId: number;
};
export type RolePermissionModel = {
  roleId?: string;
  permissionActionIds?: number[] | null;
};
export type PermissionActionClaim = {
  name?: string | null;
  id?: PermissionActionEnum;
};
export type PermissionCategoryClaim = {
  permissionCategoryName?: string | null;
  permissionCategoryId?: PermissionCategoryEnum;
  actions?: PermissionActionClaim[] | null;
};
export type PermissionAction = {
  id?: number;
  name?: string | null;
  description?: string | null;
  value?: PermissionActionEnum;
  permissionCategoryId?: number | null;
};
export enum PermissionCategoryEnum {
  EmployeeModule = "EmployeeModule",
  ProjectModule = "ProjectModule",
  IntegrationModule = "IntegrationModule",
  LeaveModule = "LeaveModule",
  SettingModule = "SettingModule",
}
export enum PermissionActionEnum {
  EmployeeModuleAdd = "EmployeeModule_Add",
  EmployeeModuleUpdate = "EmployeeModule_Update",
  EmployeeModuleDelete = "EmployeeModule_Delete",
  EmployeeModuleSalaryUpdate = "EmployeeModule_Salary_Update",
  EmployeeModuleLeaveUpdate = "EmployeeModule_Leave_Update",
  EmployeeModuleDashboard = "EmployeeModule_Dashboard",
  ProjectModuleAdd = "ProjectModule_Add",
  ProjectModuleUpdate = "ProjectModule_Update",
  ProjectModuleDelete = "ProjectModule_Delete",
  ProjectModuleDashboard = "ProjectModule_Dashboard",
  ProjectModuleEmployeeAdd = "ProjectModule_Employee_Add",
  ProjectModuleEmployeeDelete = "ProjectModule_Employee_Delete",
  ProjectModuleEmployeeUpdate = "ProjectModule_Employee_Update",
  ProjectModuleLinkAdd = "ProjectModule_Link_Add",
  ProjectModuleLinkDelete = "ProjectModule_Link_Delete",
  ProjectModuleLinkUpdate = "ProjectModule_Link_Update",
  LeaveModuleAdd = "LeaveModule_Add",
  LeaveModuleDelete = "LeaveModule_Delete",
  LeaveModuleUpdate = "LeaveModule_Update",
  LeaveModuleApprovals = "LeaveModule_Approvals",
  LeaveModuleEmployeeLeaveHistory = "LeaveModule_Employee_LeaveHistory",
  SettingModuleDropDownSettings = "SettingModule_DropDownSettings",
  SettingModuleLeaveTypeAdd = "SettingModule_LeaveType_Add",
  SettingModuleLeaveTypeUpdate = "SettingModule_LeaveType_Update",
  SettingModuleLeaveTypeDelete = "SettingModule_LeaveType_Delete",
  SettingModuleHolidaysAdd = "SettingModule_Holidays_Add",
  SettingModuleHolidaysUpdate = "SettingModule_Holidays_Update",
  SettingModuleHolidaysDelete = "SettingModule_Holidays_Delete",
  IntegrationModuleUploadCsv = "IntegrationModule_UploadCSV",
}
export const {
  usePutApiPermissionsAssignRoleByRoleIdMutation,
  usePostApiPermissionsAssignRoleAllMutation,
  useGetApiPermissionsClaimsByUserIdQuery,
  useLazyGetApiPermissionsClaimsByUserIdQuery,
  useGetApiPermissionsRoleByRoleIdQuery,
  useLazyGetApiPermissionsRoleByRoleIdQuery,
  useGetApiPermissionsUserByUserIdQuery,
  useLazyGetApiPermissionsUserByUserIdQuery,
  useGetApiPermissionsPermissionActionsQuery,
  useLazyGetApiPermissionsPermissionActionsQuery,
} = injectedRtkApi;
