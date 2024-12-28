import React, { useEffect, useMemo, useState } from 'react';
import {
	TextField,
	MenuItem,
	InputAdornment,
	Typography,
	Autocomplete,
	FormControlLabel,
	Checkbox,
	FormControl,
	InputLabel,
	Select,
	IconButton,
	Button,
	FormHelperText
} from '@mui/material';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers';
import FuseLoading from '@fuse/core/FuseLoading';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import { ProjectStatusComponent } from 'src/app/main/Project/Projects/Projectstatus';
import { useDispatch } from 'react-redux';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import {
	useGetApiEmployeesDepartmentsQuery,
	useGetApiEmployeesDesignationsQuery,
	useGetApiEmployeesSitesQuery,
	usePostApiEmployeesAddNewDesignationMutation,
	usePostApiEmployeesAddNewSiteMutation,
	useGetApiEmployeesReportToEmployeeListQuery,
	ProjectModel,
	useGetApiEmployeesProjectByEmployeeIdQuery
} from '../../EmployeeApi';

import EnhancedAutocomplete from '../EnhancedAutocomplete';
import { SalaryType } from '../../models/EmployeeDropdownModels';
import {
	useGetApiLeavesJoblevelsQuery,
	useLazyGetApiLeavesDefaultLeavesByJobLevelIdQuery,
	useGetApiLeavesSettingsLeaveTypesQuery
} from '../../leave-management/LeavesApi';

function WorkInfoTab({ UserRole }) {
	const methods = useFormContext();
	const { control, watch, formState, setValue } = methods;
	const { errors } = formState;
	const { employeeId } = useParams();
	const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined;
	const departmentId = watch('employeeDepartmentId');
	const salaryType = watch('employeeWorkInformation.salaryType');
	const useDefaultLeaves = watch('employeeWorkInformation.useDefaultLeaves');
	const [selectedJobLevel, setSelectedJobLevel] = useState(null);
	const dispatch = useDispatch();

	const { data: employeesDepartmentsOptions = [], isLoading: departmentLoading } =
		useGetApiEmployeesDepartmentsQuery();
	const { data: employeesSiteOptions = [], isLoading: siteLoading } = useGetApiEmployeesSitesQuery();
	const { data: employeesDesignationsOptions = [], isLoading: designationLoading } =
		useGetApiEmployeesDesignationsQuery();
	const { data: jobLevels = [], isLoading: jobLevelsLoading } = useGetApiLeavesJoblevelsQuery();
	const [getDefaultLeaves, { isLoading: defaultLeavesLoading }] = useLazyGetApiLeavesDefaultLeavesByJobLevelIdQuery();
	const { data: leaveTypes = [], isLoading: leaveTypesLoading } = useGetApiLeavesSettingsLeaveTypesQuery();
	const { data: projects, isLoading: projectsLoading } = useGetApiEmployeesProjectByEmployeeIdQuery(
		{
			employeeId: parsedEmployeeId
		},
		{
			skip: !parsedEmployeeId
		}
	);

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'employeeLeaves',
		keyName: 'key'
	});

	const { data: employeesReportToOptions = [] } = useGetApiEmployeesReportToEmployeeListQuery(
		{
			departmentId,
			employeeId: parsedEmployeeId
		},
		{
			skip: !employeeId || employeeId === 'new'
		}
	);

	const [AddSite] = usePostApiEmployeesAddNewSiteMutation();
	const [AddDesignation] = usePostApiEmployeesAddNewDesignationMutation();

	useEffect(() => {
		if (selectedJobLevel) {
			fetchDefaultLeaves(selectedJobLevel);
		}
	}, [selectedJobLevel]);

	const fetchDefaultLeaves = async (jobLevelId) => {
		try {
			const result = await getDefaultLeaves({ jobLevelId }).unwrap();

			if (useDefaultLeaves) {
				setValue(
					'employeeLeaves',
					result.map((lt) => ({
						id: lt.employeeLeaveTypeId,
						employeeLeaveType: lt.employeeLeaveTypes.name,
						totalLeaves: lt.totalLeaves
					}))
				);
			}
		} catch (error) {
			console.error('Error fetching default leaves:', error);
		}
	};

	const handleOptionAdd = async (newOption: Omit<Option, 'id'>) => {
		try {
			const result = await AddSite({ site: newOption }).unwrap();
			return { ...newOption, id: result.id };
		} catch (error) {
			console.error('Failed to add new option:', error);
			throw error;
		}
	};

	const handleDesignationOptionAdd = async (newOption: Omit<Option, 'id'>) => {
		try {
			const result = await AddDesignation({
				employeeDesignation: newOption
			}).unwrap();
			return { ...newOption, id: result.id };
		} catch (error) {
			console.error('Failed to add new option:', error);
			throw error;
		}
	};

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

	const isDuplicateLeaveType = (leaveType: string, currentIndex: number) => {
		const leaves = watch('employeeLeaves');
		return leaves.some((leave, index) => index !== currentIndex && leave.employeeLeaveType === leaveType);
	};

	useEffect(() => {
		if(employeeId === 'new') {
		if (!useDefaultLeaves) {
			const leaves = watch('employeeLeaves');
			const validLeaves = leaves.filter((leave) => leave.id && leave.totalLeaves && leave.totalLeaves > 0);

			if (validLeaves.length === 0) {
				dispatch(
					showMessage({
						message: 'At least one leave type must be filled completely',
						autoHideDuration: 8000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'right'
						},
						variant: 'warning'
					})
				);
			} else {
				// Clear any existing error messages
				dispatch(showMessage({ message: '', variant: 'success' }));
			}
		}
	}
	}, [watch('employeeLeaves'), useDefaultLeaves, dispatch]);

	useEffect(() => {
		if (salaryType === 'OnRoll') {
			const calculateTotalSalary = () => {
				const basic = parseFloat(watch('employeeWorkInformation.basic') || '0');
				const pf = parseFloat(watch('employeeWorkInformation.pf') || '0');
				const hrAllowances = parseFloat(watch('employeeWorkInformation.hrAllowances') || '0');
				const gratuity = parseFloat(watch('employeeWorkInformation.gratuity') || '0');
				const bonus = parseFloat(watch('employeeWorkInformation.bonus') || '0');
				const esi = parseFloat(watch('employeeWorkInformation.esi') || '0');
				const pt = parseFloat(watch('employeeWorkInformation.pt') || '0');

				const totalSalary = basic + pf + hrAllowances + gratuity + bonus + esi + pt;
				setValue('employeeWorkInformation.salary', totalSalary);
			};

			calculateTotalSalary();
		}
	}, [
		salaryType,
		watch('employeeWorkInformation.basic'),
		watch('employeeWorkInformation.pf'),
		watch('employeeWorkInformation.hrAllowances'),
		watch('employeeWorkInformation.gratuity'),
		watch('employeeWorkInformation.bonus'),
		watch('employeeWorkInformation.esi'),
		watch('employeeWorkInformation.pt'),
		setValue
	]);

	if (
		designationLoading ||
		siteLoading ||
		departmentLoading ||
		jobLevelsLoading ||
		defaultLeavesLoading ||
		leaveTypesLoading
	) {
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
									error={!!errors.employeeDepartmentId}
									helperText={errors.employeeDepartmentId?.message as string}
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
									error={!!errors.employeeDesignationId}
									helperText={errors.employeeDesignationId?.message as string}
								/>
							)}
							attachedLabel="A Designation will be added to the database"
							onOptionAdd={handleDesignationOptionAdd}
						/>
					)}
				/>

				<Controller
					name="employeeReportToId"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
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
							onOptionAdd={handleOptionAdd}
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
				<div className="flex -mx-4">
					<Controller
						name="employeeWorkInformation.salaryType"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								select
								className="mx-4"
								label="Salary Type"
								value={field.value ?? ''}
								fullWidth
								required
								error={!!errors.employeeWorkInformation?.salaryType}
								helperText={errors.employeeWorkInformation?.salaryType?.message as string}
							>
								{Object.values(SalaryType).map((type) => (
									<MenuItem
										key={type}
										value={type}
									>
										{type}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
				</div>
				<div className="flex -mx-4">
					<Controller
						name="employeeWorkInformation.salary"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Salary"
								type="number"
								value={field.value ?? ''}
								className="mx-4"
								required
								InputProps={{
									inputProps: {
										min: 1,
										readOnly: salaryType === 'OnRoll'
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.salary}
								helperText={errors.employeeWorkInformation?.salary?.message as string}
							/>
						)}
					/>
					{salaryType === 'OnRoll' && (
						<>
							<Controller
								name="employeeWorkInformation.basic"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label="Basic"
										type="number"
										className="mx-4"
										InputProps={{
											inputProps: {
												min: 0
											},
											startAdornment: <InputAdornment position="start">₹</InputAdornment>
										}}
										fullWidth
										required
										error={!!errors.employeeWorkInformation?.basic}
										helperText={errors.employeeWorkInformation?.basic?.message as string}
									/>
								)}
							/>
							<Controller
								name="employeeWorkInformation.hrAllowances"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label="HR Allowances"
										type="number"
										className="mx-4"
										InputProps={{
											inputProps: {
												min: 0
											},
											startAdornment: <InputAdornment position="start">₹</InputAdornment>
										}}
										fullWidth
										required
										error={!!errors.employeeWorkInformation?.hrAllowances}
										helperText={errors.employeeWorkInformation?.hrAllowances?.message as string}
									/>
								)}
							/>
							<Controller
								name="employeeWorkInformation.bonus"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label="Bonus"
										value={field.value?? 0}
										type="number"
										className="mx-4"
										InputProps={{
											inputProps: {
												min: 0
											},
											startAdornment: <InputAdornment position="start">₹</InputAdornment>
										}}
										fullWidth
										error={!!errors.employeeWorkInformation?.bonus}
										helperText={errors.employeeWorkInformation?.bonus?.message as string}
									/>
								)}
							/>
						</>
					)}
				</div>
				{salaryType === 'OnRoll' && (
					<div className="flex -mx-4">
						<Controller
							name="employeeWorkInformation.gratuity"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Gratuity"
									type="number"
									className="mx-4"
									InputProps={{
										inputProps: {
											min: 0
										},
										startAdornment: <InputAdornment position="start">₹</InputAdornment>
									}}
									fullWidth
									required
									error={!!errors.employeeWorkInformation?.gratuity}
									helperText={errors.employeeWorkInformation?.gratuity?.message as string}
								/>
							)}
						/>
						<Controller
							name="employeeWorkInformation.pf"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="PF"
									type="number"
									className="mx-4"
									InputProps={{
										inputProps: {
											min: 0
										},
										startAdornment: <InputAdornment position="start">₹</InputAdornment>
									}}
									fullWidth
									required
									error={!!errors.employeeWorkInformation?.pf}
									helperText={errors.employeeWorkInformation?.pf?.message as string}
								/>
							)}
						/>
						<Controller
							name="employeeWorkInformation.esi"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="ESI"
									type="number"
									className="mx-4"
									InputProps={{
										inputProps: {
											min: 0
										},
										startAdornment: <InputAdornment position="start">₹</InputAdornment>
									}}
									fullWidth
									error={!!errors.employeeWorkInformation?.esi}
									helperText={errors.employeeWorkInformation?.esi?.message as string}
								/>
							)}
						/>
						<Controller
							name="employeeWorkInformation.pt"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="PT"
									type="number"
									className="mx-4"
									InputProps={{
										inputProps: {
											min: 0
										},
										startAdornment: <InputAdornment position="start">₹</InputAdornment>
									}}
									fullWidth
									error={!!errors.employeeWorkInformation?.pt}
									helperText={errors.employeeWorkInformation?.pt?.message as string}
								/>
							)}
						/>
					</div>
				)}
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

				{projectsLoading ? (
					<FuseLoading />
				) : projects && projects.length > 0 ? (
					<DataTable
						enableTopToolbar={false}
						enableRowActions={false}
						enableRowSelection={false}
						data={projects}
						columns={columns}
					/>
				) : (
					<Typography>No projects assigned.</Typography>
				)}
			</div>

			{/* Leave Information section */}
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
						Leave Information
					</Typography>
				</div>

				<Controller
					name="employeeWorkInformation.useDefaultLeaves"
					control={control}
					render={({ field }) => (
						<FormControlLabel
							control={
								<Checkbox
									{...field}
									checked={useDefaultLeaves}
									onChange={(e) => {
										field.onChange(e.target.checked);

										if (!e.target.checked) {
											setValue('jobLevelLeaveType', null);
											setValue('employeeLeaves', []);
										}
									}}
								/>
							}
							label="Use Default Leaves"
						/>
					)}
				/>

				{useDefaultLeaves && (
					<FormControl
						fullWidth
						error={!!errors.jobLevelLeaveType}
					>
						<InputLabel id="job-level-select-label">Job Level</InputLabel>
						<Controller
							name="jobLevelLeaveType"
							control={control}
							rules={{ required: 'Please select a job level' }}
							render={({ field }) => (
								<Select
									{...field}
									labelId="job-level-select-label"
									label="Job Level"
									// value={field.value || ''}
									onChange={(e) => {
										field.onChange(e.target.value);
										setSelectedJobLevel(e.target.value);
									}}
									error={!!errors.jobLevelLeaveType}
								>
									{jobLevels.map((jobLevel) => (
										<MenuItem
											key={jobLevel.id}
											value={jobLevel.id}
										>
											{jobLevel.jobLevel}
										</MenuItem>
									))}
								</Select>
							)}
						/>
						{errors.jobLevelLeaveType && (
							<FormHelperText error>
								{errors.jobLevelLeaveType?.message}
							</FormHelperText>
						)}
					</FormControl>
				)}

				{useDefaultLeaves && selectedJobLevel && (
					<div className="space-y-4">
						{fields.map((field, index) => (
							<div
								key={field.id}
								className="flex space-x-4 m-4"
							>
								<div className="flex-1 m-4">
									<TextField
										label="Leave Type"
										value={field.employeeLeaveType}
										fullWidth
										InputProps={{
											readOnly: true
										}}
									/>
								</div>
								<div className="flex-1 m-4">
									<TextField
										label="Total Leaves"
										value={field.totalLeaves}
										fullWidth
										InputProps={{
											readOnly: true
										}}
									/>
								</div>
							</div>
						))}
					</div>
				)}

				{!useDefaultLeaves && (
					<div className="space-y-4">
						{fields.map((field, index) => (
							<div
								key={field.key}
								className="flex space-x-4 m-4"
							>
								<div className="flex-1 m-4">
									<Controller
										name={`employeeLeaves.${index}.id`}
										control={control}
										rules={{
											validate: (value) => {
												if (index === 0 || value) {
													return (
														!isDuplicateLeaveType(value, index) ||
														'This leave type is already selected'
													);
												}

												return true;
											}
										}}
										render={({ field, fieldState: { error } }) => (
											<FormControl
												fullWidth
												error={!!error}
											>
												<InputLabel id={`leave-type-label-${index}`}>Leave Type</InputLabel>
												<Select
													{...field}
													labelId={`leave-type-label-${index}`}
													label="Leave Type"
													value={field.value || ''}
													onChange={(e) => {
														const selectedType = leaveTypes.find(
															(type) => type.id === e.target.value
														);
														field.onChange(e.target.value);
														setValue(
															`employeeLeaves.${index}.employeeLeaveType`,
															selectedType ? selectedType.name : ''
														);
													}}
												>
													{leaveTypes.map((type) => (
														<MenuItem
															key={type.id}
															value={type.id}
														>
															{type.name}
														</MenuItem>
													))}
												</Select>
												{error && <FormHelperText>{error.message}</FormHelperText>}
											</FormControl>
										)}
									/>
								</div>
								<div className="flex-1 m-4">
									<Controller
										name={`employeeLeaves.${index}.totalLeaves`}
										control={control}
										rules={{
											validate: (value) => {
												if (index === 0 || value) {
													return value > 0 || 'Total leaves must be greater than 0';
												}

												return true;
											}
										}}
										render={({ field, fieldState: { error } }) => (
											<TextField
												{...field}
												label="Total Leaves"
												type="number"
												fullWidth
												error={!!error}
												helperText={error?.message}
											/>
										)}
									/>
								</div>
								<IconButton
									aria-label="delete"
									color="error"
									type="button"
									onClick={() => remove(index)}
								>
									<DeleteIcon />
								</IconButton>
							</div>
						))}
						<Button
							type="button"
							startIcon={<AddIcon />}
							onClick={() => append({ id: '', employeeLeaveType: '', totalLeaves: '' })}
						>
							Add Leave Type
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default WorkInfoTab;

