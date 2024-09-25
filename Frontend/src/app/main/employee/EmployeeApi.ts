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
				body: queryArg.employee
			})
		}),
		getApiEmployeesById: build.query<GetApiEmployeesByIdApiResponse, GetApiEmployeesByIdApiArg>({
			query: (queryArg) => ({ url: `/api/Employees/${queryArg.id}` })
		}),
		putApiEmployeesById: build.mutation<PutApiEmployeesByIdApiResponse, PutApiEmployeesByIdApiArg>({
			query: (queryArg) => ({
				url: `/api/Employees/${queryArg.id}`,
				method: 'PUT',
				body: queryArg.employee
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
	employee: Employee;
};
export type GetApiEmployeesByIdApiResponse = /** status 200 OK */ EmployeeModel;
export type GetApiEmployeesByIdApiArg = {
	id: number;
};
export type PutApiEmployeesByIdApiResponse = unknown;
export type PutApiEmployeesByIdApiArg = {
	id: number;
	employee: Employee;
};
export type DeleteApiEmployeesByIdApiResponse = unknown;
export type DeleteApiEmployeesByIdApiArg = {
	id: number;
};
export type EmployeePersonalDetailsModel = {
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	dateOfBirth: string;
	gender: string | null;
	maritalStatus: string | null;
};
export type EmployeeModel = {
	id?: number;
	photoURL?: string | null;
	isActive?: boolean;
	employeeNumber?: number | null;
	employeeWorkInformation?: EmployeePersonalDetailsModel;
};
export type EmployeePersonalDetails = {
	id?: number;
	isDeleted?: boolean;
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	dateOfBirth: string;
	gender: string | null;
	maritalStatus: string | null;
};
export type Employee = {
	id?: number;
	createdBy?: string;
	createdOn?: string;
	lastModifiedBy?: string | null;
	lastModifiedOn?: string | null;
	isDeleted?: boolean;
	photoURL?: string | null;
	employeeNumber?: number | null;
	isActive?: boolean;
	employeeWorkInformation?: EmployeePersonalDetails;
};
export const {
	useGetApiEmployeesQuery,
	usePostApiEmployeesMutation,
	useGetApiEmployeesByIdQuery,
	usePutApiEmployeesByIdMutation,
	useDeleteApiEmployeesByIdMutation
} = injectedRtkApi;
