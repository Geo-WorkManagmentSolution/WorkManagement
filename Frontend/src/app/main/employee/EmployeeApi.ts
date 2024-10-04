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
    getApiEmployeesCategories: build.query<
      GetApiEmployeesCategoriesApiResponse,
      GetApiEmployeesCategoriesApiArg
    >({
      query: () => ({ url: `/api/Employees/categories` }),
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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiEmployeesApiResponse = /** status 200 OK */ EmployeeModel[];
export type GetApiEmployeesApiArg = void;
export type PostApiEmployeesApiResponse = /** status 200 OK */ EmployeeModel;
export type PostApiEmployeesApiArg = {
  employeeModel: EmployeeModel;
};
export type GetApiEmployeesCategoriesApiResponse =
  /** status 200 OK */ EmployeeCategory[];
export type GetApiEmployeesCategoriesApiArg = void;
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
export type PostApiEmployeesSearchApiResponse =
  /** status 200 OK */ EmployeeModel[];
export type PostApiEmployeesSearchApiArg = {
  body: Criterion[];
};
export type EmployeePersonalDetails = {
  id?: number;
  isDeleted?: boolean;
  dateOfBirth: string;
  gender: string | null;
  maritalStatus: string | null;
};
export type EmployeeModel = {
  id?: number;
  photoURL?: string | null;
  employeeNumber?: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  position: string | null;
  userId: string;
  roleId: string;
  employeeCategoryId: number;
  employeePersonalDetailsId?: number | null;
  employeePersonalDetails?: EmployeePersonalDetails;
};
export type EmployeeCategory = {
  id?: number;
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string | null;
  lastModifiedOn?: string;
  isDeleted?: boolean;
  name?: string | null;
};
export type Criterion = {
  field?: string | null;
  operator?: string | null;
  value?: any | null;
  nextOperator?: string | null;
};
export const {
  useGetApiEmployeesQuery,
  useLazyGetApiEmployeesQuery,
  usePostApiEmployeesMutation,
  useGetApiEmployeesCategoriesQuery,
  useLazyGetApiEmployeesCategoriesQuery,
  useGetApiEmployeesByIdQuery,
  useLazyGetApiEmployeesByIdQuery,
  usePutApiEmployeesByIdMutation,
  useDeleteApiEmployeesByIdMutation,
  usePostApiEmployeesSearchMutation,
} = injectedRtkApi;
