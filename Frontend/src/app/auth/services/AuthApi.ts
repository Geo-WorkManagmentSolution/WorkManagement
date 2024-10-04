import { apiService as api } from "app/store/apiService";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiAuthSignIn: build.mutation<
      PostApiAuthSignInApiResponse,
      PostApiAuthSignInApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Auth/signIn`,
        method: "POST",
        body: queryArg.userloginModel,
      }),
    }),
    getApiAuthUser: build.query<
      GetApiAuthUserApiResponse,
      GetApiAuthUserApiArg
    >({
      query: () => ({ url: `/api/Auth/user` }),
    }),
    postApiAuthRegister: build.mutation<
      PostApiAuthRegisterApiResponse,
      PostApiAuthRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Auth/register`,
        method: "POST",
        body: queryArg.userRegistrationModel,
      }),
    }),
    postApiAuthAccesstoken: build.mutation<
      PostApiAuthAccesstokenApiResponse,
      PostApiAuthAccesstokenApiArg
    >({
      query: (queryArg) => ({
        url: `/api/Auth/accesstoken`,
        method: "POST",
        params: { accesstoken: queryArg.accesstoken },
      }),
    }),
    getApiAuthRoles: build.query<
      GetApiAuthRolesApiResponse,
      GetApiAuthRolesApiArg
    >({
      query: () => ({ url: `/api/Auth/roles` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type PostApiAuthSignInApiResponse = unknown;
export type PostApiAuthSignInApiArg = {
  userloginModel: UserloginModel;
};
export type GetApiAuthUserApiResponse = unknown;
export type GetApiAuthUserApiArg = void;
export type PostApiAuthRegisterApiResponse = unknown;
export type PostApiAuthRegisterApiArg = {
  userRegistrationModel: UserRegistrationModel;
};
export type PostApiAuthAccesstokenApiResponse = unknown;
export type PostApiAuthAccesstokenApiArg = {
  accesstoken?: string;
};
export type GetApiAuthRolesApiResponse = /** status 200 OK */ ApplicationRole[];
export type GetApiAuthRolesApiArg = void;
export type UserloginModel = {
  email?: string | null;
  password?: string | null;
};
export type UserRegistrationModel = {
  email: string;
  displayName: string;
  password: string;
};
export type ApplicationRole = {
  id?: string;
  name?: string | null;
  normalizedName?: string | null;
  concurrencyStamp?: string | null;
};
export const {
  usePostApiAuthSignInMutation,
  useGetApiAuthUserQuery,
  useLazyGetApiAuthUserQuery,
  usePostApiAuthRegisterMutation,
  usePostApiAuthAccesstokenMutation,
  useGetApiAuthRolesQuery,
  useLazyGetApiAuthRolesQuery,
} = injectedRtkApi;
