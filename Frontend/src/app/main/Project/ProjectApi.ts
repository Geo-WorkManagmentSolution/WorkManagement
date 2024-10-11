import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiProject: build.query<GetApiProjectApiResponse, GetApiProjectApiArg>({
      query: () => ({ url: `/api/Project` }),
    }),
    postApiProject: build.mutation<
      PostApiProjectApiResponse,
      PostApiProjectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project`,
        method: "POST",
        body: queryArg.projectModel,
      }),
    }),
    getApiProjectById: build.query<
      GetApiProjectByIdApiResponse,
      GetApiProjectByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/Project/${queryArg.id}` }),
    }),
    putApiProjectById: build.mutation<
      PutApiProjectByIdApiResponse,
      PutApiProjectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/${queryArg.id}`,
        method: "PUT",
        body: queryArg.projectModel,
      }),
    }),
    deleteApiProjectById: build.mutation<
      DeleteApiProjectByIdApiResponse,
      DeleteApiProjectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiProjectApiResponse = /** status 200 OK */ ProjectModel[];
export type GetApiProjectApiArg = void;
export type PostApiProjectApiResponse = /** status 200 OK */ EmployeeModel;
export type PostApiProjectApiArg = {
  projectModel: ProjectModel;
};
export type GetApiProjectByIdApiResponse = /** status 200 OK */ ProjectModel;
export type GetApiProjectByIdApiArg = {
  id: number;
};
export type PutApiProjectByIdApiResponse = unknown;
export type PutApiProjectByIdApiArg = {
  id: number;
  projectModel: ProjectModel;
};
export type DeleteApiProjectByIdApiResponse = unknown;
export type DeleteApiProjectByIdApiArg = {
  id: number;
};
export type ProjectModel = {
  id?: number;
  projectName?: string | null;
  projectNumber?: string | null;
  projectDescription?: string | null;
  startDate?: string;
  endDate?: string | null;
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
  phoneNumber?: string | null;
  position?: string | null;
  userId?: string;
  roleId: string;
  employeeCategoryId: number;
  employeePersonalDetailsId?: number | null;
  employeePersonalDetails?: EmployeePersonalDetails;
};
export const {
  useGetApiProjectQuery,
  useLazyGetApiProjectQuery,
  usePostApiProjectMutation,
  useGetApiProjectByIdQuery,
  useLazyGetApiProjectByIdQuery,
  usePutApiProjectByIdMutation,
  useDeleteApiProjectByIdMutation,
} = injectedRtkApi;
