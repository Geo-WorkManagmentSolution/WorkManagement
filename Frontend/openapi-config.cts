import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
	schemaFile: 'http://localhost:5071/swagger/v1/swagger.json',
	apiImport:'apiService',
	apiFile: 'app/store/apiService.ts',
	outputFiles: {
		'./src/app/main/employee/EmployeeApi.ts': {
			filterEndpoints: [/Employees/i]
		},
		'./src/app/auth/services/AuthApi.ts': {
			filterEndpoints: [/Auth/i]
		},
		'./src/app/main/project/ProjectApi.ts': {
			filterEndpoints: [/Project/i]
		}
	},
	hooks: true
};

export default config;
