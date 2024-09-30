import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiProjectGetAllCopanies: build.query<
      GetApiProjectGetAllCopaniesApiResponse,
      GetApiProjectGetAllCopaniesApiArg
    >({
      query: () => ({ url: `/api/Project/GetAllCopanies` }),
    }),
    getApiProjectGetCopanyById: build.query<
      GetApiProjectGetCopanyByIdApiResponse,
      GetApiProjectGetCopanyByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/GetCopanyById`,
        params: { companyId: queryArg.companyId },
      }),
    }),
    getApiProjectGetAllProjects: build.query<
      GetApiProjectGetAllProjectsApiResponse,
      GetApiProjectGetAllProjectsApiArg
    >({
      query: () => ({ url: `/api/Project/GetAllProjects` }),
    }),
    getApiProjectGetProjectById: build.query<
      GetApiProjectGetProjectByIdApiResponse,
      GetApiProjectGetProjectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/GetProjectById`,
        params: { projectId: queryArg.projectId },
      }),
    }),
    postApiProjectSaveCompanyData: build.mutation<
      PostApiProjectSaveCompanyDataApiResponse,
      PostApiProjectSaveCompanyDataApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/SaveCompanyData`,
        method: "POST",
        body: queryArg.companyModel,
      }),
    }),
    putApiProjectSaveCompanyData: build.mutation<
      PutApiProjectSaveCompanyDataApiResponse,
      PutApiProjectSaveCompanyDataApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/SaveCompanyData`,
        method: "PUT",
        body: queryArg.companyModel,
      }),
    }),
    postApiProjectSaveProjectData: build.mutation<
      PostApiProjectSaveProjectDataApiResponse,
      PostApiProjectSaveProjectDataApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/SaveProjectData`,
        method: "POST",
        body: queryArg.projectModel,
      }),
    }),
    putApiProjectSaveProjectData: build.mutation<
      PutApiProjectSaveProjectDataApiResponse,
      PutApiProjectSaveProjectDataApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/SaveProjectData`,
        method: "PUT",
        body: queryArg.projectModel,
      }),
    }),
    deleteApiProjectDeleteProjectById: build.mutation<
      DeleteApiProjectDeleteProjectByIdApiResponse,
      DeleteApiProjectDeleteProjectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/DeleteProjectById`,
        method: "DELETE",
        params: { projectId: queryArg.projectId },
      }),
    }),
    deleteApiProjectDeleteCompanyById: build.mutation<
      DeleteApiProjectDeleteCompanyByIdApiResponse,
      DeleteApiProjectDeleteCompanyByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Project/DeleteCompanyById`,
        method: "DELETE",
        params: { companyId: queryArg.companyId },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiProjectGetAllCopaniesApiResponse =
  /** status 200 OK */ ResponseModel;
export type GetApiProjectGetAllCopaniesApiArg = void;
export type GetApiProjectGetCopanyByIdApiResponse =
  /** status 200 OK */ ResponseModel;
export type GetApiProjectGetCopanyByIdApiArg = {
  companyId?: number;
};
export type GetApiProjectGetAllProjectsApiResponse =
  /** status 200 OK */ ResponseModel;
export type GetApiProjectGetAllProjectsApiArg = void;
export type GetApiProjectGetProjectByIdApiResponse =
  /** status 200 OK */ ResponseModel;
export type GetApiProjectGetProjectByIdApiArg = {
  projectId?: number;
};
export type PostApiProjectSaveCompanyDataApiResponse =
  /** status 200 OK */ ResponseModel;
export type PostApiProjectSaveCompanyDataApiArg = {
  companyModel: CompanyModel;
};
export type PutApiProjectSaveCompanyDataApiResponse =
  /** status 200 OK */ ResponseModel;
export type PutApiProjectSaveCompanyDataApiArg = {
  companyModel: CompanyModel;
};
export type PostApiProjectSaveProjectDataApiResponse =
  /** status 200 OK */ ResponseModel;
export type PostApiProjectSaveProjectDataApiArg = {
  projectModel: ProjectModel;
};
export type PutApiProjectSaveProjectDataApiResponse =
  /** status 200 OK */ ResponseModel;
export type PutApiProjectSaveProjectDataApiArg = {
  projectModel: ProjectModel;
};
export type DeleteApiProjectDeleteProjectByIdApiResponse =
  /** status 200 OK */ ResponseModel;
export type DeleteApiProjectDeleteProjectByIdApiArg = {
  projectId?: number;
};
export type DeleteApiProjectDeleteCompanyByIdApiResponse =
  /** status 200 OK */ ResponseModel;
export type DeleteApiProjectDeleteCompanyByIdApiArg = {
  companyId?: number;
};
export type ResponseModel = {
  data?: any | null;
  success?: boolean;
  message?: string | null;
};
export type CompanyModel = {
  id?: number;
  companyName?: string | null;
  companyDescription?: string | null;
  companyFullAddress?: string | null;
  postalCode?: string | null;
  primaryPhoneNumber?: string | null;
  alternativePhoneNumber?: string | null;
  primaryEmailAddress?: string | null;
  alternativeEmailAddress?: string | null;
  totalEmployess?: number;
};
export type ProjectModel = {
  id?: number;
  projectName?: string | null;
  companyName?: string | null;
  projectIncharge?: string | null;
  workOrderNumber?: string | null;
  workOrderAmount?: number;
  workDescription?: number;
  startDate?: string;
  endDate?: string | null;
};
export const {
  useGetApiProjectGetAllCopaniesQuery,
  useGetApiProjectGetCopanyByIdQuery,
  useGetApiProjectGetAllProjectsQuery,
  useGetApiProjectGetProjectByIdQuery,
  usePostApiProjectSaveCompanyDataMutation,
  usePutApiProjectSaveCompanyDataMutation,
  usePostApiProjectSaveProjectDataMutation,
  usePutApiProjectSaveProjectDataMutation,
  useDeleteApiProjectDeleteProjectByIdMutation,
  useDeleteApiProjectDeleteCompanyByIdMutation,
} = injectedRtkApi;
