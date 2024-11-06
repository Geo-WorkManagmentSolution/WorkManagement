/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TextField, MenuItem, InputAdornment, Typography, Autocomplete } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import {useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { DatePicker } from '@mui/x-date-pickers';
import { useGetApiEmployeesDepartmentsQuery, useGetApiEmployeesDesignationsQuery, 
		useGetApiEmployeesSitesQuery, usePostApiEmployeesAddNewDesignationMutation, 
		usePostApiEmployeesAddNewSiteMutation, useGetApiEmployeesReportToEmployeeListQuery } from '../../EmployeeApi';
import EnhancedAutocomplete from '../EnhancedAutocomplete';
import {SalaryType} from '../../models/EmployeeDropdownModels';


/**
 * The basic info tab.
 */

function WorkInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	const { data: employeesDepartmentsOptions = [] } = useGetApiEmployeesDepartmentsQuery();
	//const { data: employeesReportToOptions = [] } = useGetApiEmployeesReportToEmployeeListQuery();
	const { data: employeesSiteOptions = [] } = useGetApiEmployeesSitesQuery();
	const { data: employeesDesignationsOptions = [] } = useGetApiEmployeesDesignationsQuery();

	const routeParams = useParams();
	const { employeeId } = routeParams as unknown;
	
	const {
		data: employeesReportToOptions,
		isLoading,
		isError
	} = useGetApiEmployeesReportToEmployeeListQuery(
		{ departmentId: employeeId, employeeId: employeeId},
		{
			skip: !employeeId || employeeId === 'new'
		}
	);

	const [AddSite] = usePostApiEmployeesAddNewSiteMutation();
	const [AddDesignation] = usePostApiEmployeesAddNewDesignationMutation();

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
			const result = await AddDesignation({ employeeDesignation: newOption }).unwrap();
			return { ...newOption, id: result.id };
		} catch (error) {
			console.error('Failed to add new option:', error);
			throw error;
		}
	};
	return (
		<div className="space-y-48">
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
							isOptionEqualToValue={(option, value) => option.id === value}
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
						name="employeeWorkInformation.designation"
						control={control}
						render={({ field }) => (
							<EnhancedAutocomplete
								{...field}
								fullWidth
								label="Select or add Designation"
								options={employeesDesignationsOptions}
								onChange={(_, newValue) => {
									field.onChange(newValue ? newValue.id : null);
								}}
								isOptionEqualToValue={(option, value) => option.id === value}
								placeholder="Type to search or add"
								renderInput={(params) => (
									<TextField
										{...params}
										value={params.value || ''}
										placeholder="Select or Add Designation"
										label="Designation"
										required
										variant="outlined"
										InputLabelProps={{
											shrink: true
										}}
										error={!!errors.employeeWorkInformation?.designation}
										helperText={errors.employeeWorkInformation?.designation?.message as string}
									/>
								)}
								attachedLabel="A Designation will be added to the database"
								onOptionAdd={handleDesignationOptionAdd}
							/>
						)}
					/>
				{/* <Controller
					name="employeeWorkInformation.grpHead"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="GRP Head"
							fullWidth
							error={!!errors.employeeWorkInformation?.grpHead}
							helperText={errors.employeeWorkInformation?.grpHead?.message as string}
						/>
					)}
				/> */}

				<Controller
					name="employeeReportToId"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							fullWidth
							options={employeesReportToOptions}
							getOptionLabel={(option) => option?.name}
							isOptionEqualToValue={(option, value) => option.id === value}
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
				{/* <Controller
					name="employeeWorkInformation.bond"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Bond"
							type="number"
							fullWidth
							InputProps={{
								inputProps: {
									min: 1
								}
							}}
							error={!!errors.employeeWorkInformation?.bond}
							helperText={errors.employeeWorkInformation?.bond?.message as string}
						/>
					)}
				/> */}
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
								className="mx-4"
								required
								InputProps={{
									inputProps: {
										min: 1
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.salary}
								helperText={errors.employeeWorkInformation?.salary?.message as string}
							/>
						)}
					/>
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
										min: 1
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.basic}
								helperText={errors.employeeWorkInformation?.basic?.message as string}
							/>
						)}
					/>
					<Controller
						name="employeeWorkInformation.HRAllowances"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="HR Allowances"
								type="number"
								className="mx-4"
								InputProps={{
									inputProps: {
										min: 1
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.HRAllowances}
								helperText={errors.employeeWorkInformation?.HRAllowances?.message as string}
							/>
						)}
					/>
					<Controller
						name="employeeWorkInformation.Bonus"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Bonus"
								type="number"
								className="mx-4"
								InputProps={{
									inputProps: {
										min: 1
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.Bonus}
								helperText={errors.employeeWorkInformation?.Bonus?.message as string}
							/>
						)}
					/>
				</div>
				<div className="flex -mx-4">
					<Controller
						name="employeeWorkInformation.Gratuity"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Gratuity"
								type="number"
								className="mx-4"
								InputProps={{
									inputProps: {
										min: 1
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.Gratuity}
								helperText={errors.employeeWorkInformation?.Gratuity?.message as string}
							/>
						)}
					/>
					<Controller
						name="employeeWorkInformation.PF"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="PF"
								type="number"
								className="mx-4"
								InputProps={{
									inputProps: {
										min: 1
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.PF}
								helperText={errors.employeeWorkInformation?.PF?.message as string}
							/>
						)}
					/>
					<Controller
						name="employeeWorkInformation.ESI"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="ESI"
								type="number"
								className="mx-4"
								InputProps={{
									inputProps: {
										min: 1
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.ESI}
								helperText={errors.employeeWorkInformation?.ESI?.message as string}
							/>
						)}
					/>
					<Controller
						name="employeeWorkInformation.PT"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="PT"
								type="number"
								className="mx-4"
								InputProps={{
									inputProps: {
										min: 1
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.PT}
								helperText={errors.employeeWorkInformation?.PT?.message as string}
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
								value={new Date(value)}
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
		</div>
	);
}

export default WorkInfoTab;

