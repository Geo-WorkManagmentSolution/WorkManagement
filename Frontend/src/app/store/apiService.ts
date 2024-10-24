import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';

const axiosBaseQuery =
	(): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig['method'];
			data?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
			body?: unknown; // Add this to match RTK Query's generated code
		},
		unknown,
		AxiosError
	> =>
	async ({ url, method, data, params, body }) => {
		try {
			// Axios.defaults.baseURL = '/api';
			const result = await Axios({
				url,
				method,
				data: body || data,
				params
			});
			return { data: result.data };
		} catch (axiosError) {
			const error = axiosError as AxiosError;
			return {
				error
			};
		}
	};
// useEffect(() => {
// 	if (config.updateTokenFromHeader && isAuthenticated) {
// 		axios.interceptors.response.use(
// 			(response) => {
// 				const newAccessToken = response?.headers?.['New-Access-Token'] as string;

// 				if (newAccessToken) {
// 					setSession(newAccessToken);
// 				}

// 				return response;
// 			},
// 			(error) => {
// 				const axiosError = error as AxiosError;

// 				if (axiosError?.response?.status === 401) {
// 					signOut();
// 					// eslint-disable-next-line no-console
// 					console.warn('Unauthorized request. User was signed out.');
// 				}

// 				if (axiosError?.response?.status === 500) {
// 					console.warn('Server Error!.');
// 					dispatch(showMessage({ message: 'User settings saved with the api' }));
// 				}

// 				return Promise.reject(axiosError);
// 			}
// 		);
// 	}
// }, [isAuthenticated]);
export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
	reducerPath: 'apiService'
});

export default apiService;
