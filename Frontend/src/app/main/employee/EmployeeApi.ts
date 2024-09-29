import { apiService as api } from 'app/store/apiService';

const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getApiEmployees: build.query<GetApiEmployeesApiResponse, GetApiEmployeesApiArg>({
			query: () => ({ url: `/api/Employees` })
		}),
		postApiEmployees: build.mutation<PostApiEmployeesApiResponse, PostApiEmployeesApiArg>({
			query: (queryArg) => ({
				url: `/api/Employees`,
				method: 'POST',
				data: queryArg.employeeModel
			})
		}),
		getApiEmployeesById: build.query<GetApiEmployeesByIdApiResponse, GetApiEmployeesByIdApiArg>({
			query: (queryArg) => ({ url: `/api/Employees/${queryArg.id}` })
		}),
		putApiEmployeesById: build.mutation<PutApiEmployeesByIdApiResponse, PutApiEmployeesByIdApiArg>({
			query: (queryArg) => ({
				url: `/api/Employees/${queryArg.id}`,
				method: 'PUT',
				data: queryArg.employeeModel
			})
		}),
		deleteApiEmployeesById: build.mutation<DeleteApiEmployeesByIdApiResponse, DeleteApiEmployeesByIdApiArg>({
			query: (queryArg) => ({
				url: `/api/Employees/${queryArg.id}`,
				method: 'DELETE'
			})
		})
	}),
	overrideExisting: false
});
export { injectedRtkApi as enhancedApi };
export type GetApiEmployeesApiResponse = /** status 200 OK */ EmployeeModel[];
export type GetApiEmployeesApiArg = void;
export type PostApiEmployeesApiResponse = /** status 200 OK */ EmployeeModel;
export type PostApiEmployeesApiArg = {
	employeeModel: EmployeeModel;
};
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
export type EmployeePersonalDetailsModel = {
	dateOfBirth: string;
	gender?: string | null;
	maritalStatus?: string | null;
};
export type EmployeeModel = {
	id?: number;
	photoURL?: string | null;
	employeeNumber?: number | null;
	isActive?: boolean;
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	phoneNumber: string | null;
	position: string | null;
	role: string | null;
	employeeWorkInformation?: EmployeePersonalDetailsModel;
};
export const {
	useGetApiEmployeesQuery,
	usePostApiEmployeesMutation,
	useGetApiEmployeesByIdQuery,
	usePutApiEmployeesByIdMutation,
	useDeleteApiEmployeesByIdMutation
} = injectedRtkApi;
