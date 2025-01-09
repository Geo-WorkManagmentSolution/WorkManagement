import React, { useMemo } from 'react';
import { TextField, Typography, Autocomplete, Paper } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { DatePicker } from '@mui/x-date-pickers';
import FuseLoading from '@fuse/core/FuseLoading';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import { ProjectStatusComponent } from 'src/app/main/Project/Projects/Projectstatus';
import { format } from 'date-fns';
import {
	useGetApiEmployeesDepartmentsQuery,
	useGetApiEmployeesDesignationsQuery,
	useGetApiEmployeesSitesQuery,
	useGetApiEmployeesReportToEmployeeListQuery,
	ProjectModel,
	useGetApiEmployeesProjectByEmployeeIdQuery,
	useGetApiEmployeesSalaryPendingSalaryRequestQuery,
	EmployeeSalaryDataModel
} from '../../../EmployeeApi';

import EnhancedAutocomplete from '../../../employee/EnhancedAutocomplete';
import SalaryStatusComponent from '../../../salary-managment/SalaryStatusComponent';

function SalaryStatusCell({ row }) {
	return <SalaryStatusComponent status={row.original.salaryStatus} />;
}

function isApprovedByDepartmentHead({ row }) {
	return (
		<>
			{row.original.isApprovedByDepartmentHead === true ? (
				<FuseSvgIcon
					color="success"
					size={28}
				>
					heroicons-outline:check-circle
				</FuseSvgIcon>
			) : (
				<FuseSvgIcon
					color="error"
					size={28}
				>
					heroicons-outline:minus-circle
				</FuseSvgIcon>
			)}
		</>
	);
}

function isApprovedByHRHead({ row }) {
	return (
		<>
			{row.original.isApprovedByHRHead === true ? (
				<FuseSvgIcon
					color="success"
					size={28}
				>
					heroicons-outline:check-circle
				</FuseSvgIcon>
			) : (
				<FuseSvgIcon
					color="error"
					size={28}
				>
					heroicons-outline:minus-circle
				</FuseSvgIcon>
			)}
		</>
	);
}

function WorkInfoTab({ UserRole }) {
	const methods = useFormContext();
	const { control, watch, formState } = methods;
	const { errors } = formState;
	const { employeeId } = useParams();
	const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined;
	const departmentId = watch('employeeDepartmentId');

	const { data: employeesDepartmentsOptions = [], isLoading: departmentLoading } =
		useGetApiEmployeesDepartmentsQuery();
	const { data: employeesSiteOptions = [], isLoading: siteLoading } = useGetApiEmployeesSitesQuery();
	const { data: employeesDesignationsOptions = [], isLoading: designationLoading } =
		useGetApiEmployeesDesignationsQuery();

	const { data: projects, isLoading: projectsLoading } = useGetApiEmployeesProjectByEmployeeIdQuery(
		{
			employeeId: parsedEmployeeId
		},
		{
			skip: !parsedEmployeeId
		}
	);

	const idOfEmployee = employeeId === 'new' ? null : parsedEmployeeId;
	const { data: employeesReportToOptions = [], refetch } = useGetApiEmployeesReportToEmployeeListQuery({
		departmentId,
		employeeId: idOfEmployee
	});
	const { isLoading: dataLoading, data: pendingSalaries } = useGetApiEmployeesSalaryPendingSalaryRequestQuery({
		employeeId: parsedEmployeeId
	});

	const salaryColumns = useMemo<MRT_ColumnDef<EmployeeSalaryDataModel>[]>(
		() => [
			{
				accessorKey: 'currentSalary',
				header: 'Current Salary',
				accessorFn: (row) => `₹ ${row.currentSalary?.toFixed(2)}`
			},
			{
				accessorKey: 'expectedToBeSalary',
				header: 'Expected Salary',
				accessorFn: (row) => ` ₹ ${row.expectedToBeSalary?.toFixed(2)}`
			},
			{
				accessorKey: 'status',
				header: 'Status',
				Cell: SalaryStatusCell // Use SalaryStatusCell here
			},
			{
				accessorKey: 'managerName',
				header: 'Manager Name',
				accessorFn: (row) => `${row.managerName}`
			},

			{
				accessorKey: 'isApprovedByDepartmentHead',
				header: 'Approved By Department Head',
				Cell: isApprovedByDepartmentHead // Use isApprovedByDepartmentHead here
			},
			{
				accessorKey: 'isApprovedByHRHead',
				header: 'Approved By HR Head',
				Cell: isApprovedByHRHead
			},
			{
				accessorKey: 'updatedDateTime',
				header: 'Updated Date',
				accessorFn: (row) => format(new Date(row.updatedDateTime || ''), 'dd/MM/yyyy')
			},
			{
				accessorKey: 'updatedByUserName',
				header: 'Updated By',
				accessorFn: (row) => row.updatedByUserName
			}
		],
		[]
	);

	const columns = useMemo<MRT_ColumnDef<ProjectModel>[]>(
		() => [
			{
				accessorKey: 'projectNumber',
				header: 'Project Number',
				accessorFn: (row) => row?.projectNumber ?? 'N/A'
			},
			{
				accessorKey: 'projectName',
				header: 'Project Name',
				accessorFn: (row) => row?.projectName ?? 'N/A'
			},
			{
				accessorKey: 'projectDiscription',
				header: 'Project Description',
				accessorFn: (row) => row?.projectDescription ?? 'N/A'
			},
			{
				accessorKey: 'status',
				header: 'Project Status',
				Cell: ({ row }) => <ProjectStatusComponent status={row.original?.status ?? 'Unknown'} />
			}
		],
		[]
	);

	if (designationLoading || siteLoading || departmentLoading ||dataLoading || projectsLoading	) {
		return (
			<div className="flex justify-center h-screen w-screen">
				<FuseLoading />
			</div>
		);
	}

	return (
		<div className="space-y-48">
			{/* Job profile section */}
			<div className="space-y-16">
				<div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:user-circle
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Job profile
					</Typography>
				</div>
				<Controller
					name="employeeDepartmentId"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							fullWidth
							readOnly
							options={employeesDepartmentsOptions}
							getOptionLabel={(option) => option?.name}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							value={employeesDepartmentsOptions?.find((c) => c.id === value) || null}
							onChange={(_, newValue) => {
								onChange(newValue ? newValue.id : null);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									value={params.value || ''}
									placeholder="Select Employee Department"
									label="Department"
									variant="outlined"
									required
									InputLabelProps={{
										shrink: true
									}}
								/>
							)}
						/>
					)}
				/>
				<Controller
					name="employeeDesignationId"
					control={control}
					render={({ field }) => (
						<EnhancedAutocomplete
							{...field}
							fullWidth
							readOnly
							value={field.value ?? ''}
							label="Select or add Designation"
							options={employeesDesignationsOptions}
							onChange={(_, newValue) => {
								field.onChange(newValue ? newValue.id : null);
							}}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							placeholder="Type to search or add"
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select or Add Designation"
									label="Designation"
									required
									value={field.value ?? ''}
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
							)}
						/>
					)}
				/>

				<Controller
					name="employeeReportToId"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							readOnly
							fullWidth
							options={employeesReportToOptions}
							getOptionLabel={(option) => option?.name}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							value={employeesReportToOptions?.find((c) => c.id === value) || null}
							onChange={(_, newValue) => {
								onChange(newValue ? newValue.id : null);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									value={params.value || ''}
									placeholder="Select Employee Report To"
									label="Report To"
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
									error={!!errors.employeeReportToId}
									helperText={errors.employeeReportToId?.message as string}
								/>
							)}
						/>
					)}
				/>
				<Controller
					name="employeeWorkInformation.siteId"
					control={control}
					render={({ field }) => (
						<EnhancedAutocomplete
							{...field}
							fullWidth
							readOnly
							label="Select or add Site"
							options={employeesSiteOptions}
							onChange={(_, newValue) => {
								field.onChange(newValue ? newValue.id : null);
							}}
							isOptionEqualToValue={(option, value) => option.id === value}
							placeholder="Type to search or add"
							renderInput={(params) => (
								<TextField
									{...params}
									value={params.value || ''}
									placeholder="Select or Add Site"
									label="Site"
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
									error={!!errors?.siteId}
									helperText={errors?.siteId?.message as string}
								/>
							)}
							attachedLabel="A site will be added to the database"
						/>
					)}
				/>
			</div>

			{/* Salary Information section */}
			<div className="space-y-16">
				<div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:user-circle
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Salary Information
					</Typography>
				</div>
				<Paper
					className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
					elevation={0}
				>
					<DataTable
						enableTopToolbar={false}
						enableBottomToolbar={false}
						enableRowActions={false}
						enableRowSelection={false}
						data={pendingSalaries || []}
						columns={salaryColumns}
					/>
				</Paper>
			</div>

			{/* Hiring Information section */}
			<div className="space-y-16">
				<div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:user-circle
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Hiring Information
					</Typography>
				</div>

				<div className="flex -mx-4">
					<Controller
						control={control}
						name="employeeWorkInformation.hireDate"
						render={({ field: { value, onChange } }) => (
							<DatePicker
								readOnly
								format="dd/MM/yyyy"
								value={value ? new Date(value) : null}
								onChange={(val) => {
									onChange(val?.toISOString());
								}}
								className="mx-4"
								slotProps={{
									textField: {
										label: 'Hire Date',
										required: true,
										InputLabelProps: {
											shrink: true
										},
										fullWidth: true,
										variant: 'outlined',
										error: !!errors.employeeWorkInformation?.hireDate,
										margin: 'normal',
										helperText: errors.employeeWorkInformation?.hireDate?.message as string
									},
									actionBar: {
										actions: ['clear']
									}
								}}
							/>
						)}
					/>

					<Controller
						control={control}
						name="employeeWorkInformation.confirmationDate"
						render={({ field: { value, onChange } }) => (
							<DatePicker
								readOnly
								format="dd/MM/yyyy"
								value={new Date(value)}
								onChange={(val) => {
									onChange(val?.toISOString());
								}}
								className="mx-4"
								slotProps={{
									textField: {
										label: 'Confirmation Date',
										InputLabelProps: {
											shrink: true
										},
										fullWidth: true,
										variant: 'outlined',
										error: !!errors.employeeWorkInformation?.confirmationDate,
										margin: 'normal',
										helperText: errors.employeeWorkInformation?.confirmationDate?.message as string
									},
									actionBar: {
										actions: ['clear']
									}
								}}
							/>
						)}
					/>

					<Controller
						name="employeeWorkInformation.totalPreviousExperience"
						control={control}
						render={({ field }) => (
							<TextField
								readOnly
								{...field}
								value={field.value}
								label="Total Years of Previous Experience"
								fullWidth
								type="number"
								margin="normal"
								variant="outlined"
								placeholder="Total Years of Previous Experience"
								className="mx-4"
								error={!!errors.employeeWorkInformation?.totalPreviousExperience}
								helperText={errors?.employeeWorkInformation?.totalPreviousExperience?.message as string}
							/>
						)}
					/>
				</div>
			</div>

			<div className="space-y-16">
				<div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:presentation-chart-bar
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Assiegned Projects
					</Typography>
				</div>

				<DataTable
					enableTopToolbar={false}
					enableRowActions={false}
					enableRowSelection={false}
					data={projects}
					columns={columns}
				/>
			</div>

			{/* Leave Information section */}
			{/* <div className="space-y-16">
				<div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:user-circle
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Leave Information
					</Typography>
				</div>

				
			</div> */}
		</div>
	);
}

export default WorkInfoTab;
