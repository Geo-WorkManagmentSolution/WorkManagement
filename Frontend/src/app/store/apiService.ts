import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

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

export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
	reducerPath: 'apiService'
});

export default apiService;
