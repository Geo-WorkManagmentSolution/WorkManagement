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
}
export enum PermissionActionEnum {
  EmployeeModuleView = "EmployeeModule_View",
  EmployeeModuleEdit = "EmployeeModule_Edit",
  EmployeeModuleAdd = "EmployeeModule_Add",
  EmployeeModuleDelete = "EmployeeModule_Delete",
  ProjectModuleView = "ProjectModule_View",
  ProjectModuleEdit = "ProjectModule_Edit",
  ProjectModuleAdd = "ProjectModule_Add",
  ProjectModuleDelete = "ProjectModule_Delete",
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
