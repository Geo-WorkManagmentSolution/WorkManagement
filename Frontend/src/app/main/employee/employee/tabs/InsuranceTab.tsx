import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetApiEmployeesDesignationsQuery } from '../../EmployeeApi';
import { DatePicker } from '@mui/x-date-pickers';

/**
 * The basic info tab.
 */
function IdentityInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	const { data: employeesDesignationsOptions = [] } = useGetApiEmployeesDesignationsQuery();

	return (
		<div className="space-y-48">
			<div className="space-y-16">
				<div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:clipboard-document-list
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Insurance Information
					</Typography>
				</div>
				
				<div className="flex -mx-4">
					<Controller
						name="employeeInsuranceDetails.employeeDesignationId"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								fullWidth
								options={employeesDesignationsOptions}
								getOptionLabel={(option) => option?.name}
								isOptionEqualToValue={(option, value) => option.id === value}
								value={employeesDesignationsOptions?.find((c) => c.id === value) || null}
								onChange={(_, newValue) => {
									onChange(newValue ? newValue.id : null);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										value={params.value || ''}
										placeholder="Select Employee Designation"
										label="Employee Designation"
										variant="outlined"
										InputLabelProps={{
											shrink: true
										}}
										error={!!errors.employeeInsuranceDetails?.employeeDesignationId}
										helperText={errors.employeeInsuranceDetails?.employeeDesignationId?.message as string}
									
									/>
								)}
							/>
						)}
					/>

					<Controller
						name="employeeInsuranceDetails.serialNumber"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Serial Number"
								className=" mx-4"						
								fullWidth
								error={!!errors.employeeInsuranceDetails?.serialNumber}
								helperText={errors.employeeInsuranceDetails?.serialNumber?.message as string}
							/>
						)}
					/>
				</div>
				<div className="flex -mx-4">
					<Controller
						control={control}
						name="employeeInsuranceDetails.dateOfJoining"
						render={({ field: { value, onChange } }) => (
							<DatePicker
								value={new Date(value)}
								onChange={(val) => {
									onChange(val?.toISOString());
								}}
								className="mx-4"
								slotProps={{
									textField: {
										label: 'Date Of Joining',
										InputLabelProps: {
											shrink: true
										},
										fullWidth: true,
										variant: 'outlined',
										error: !!errors.employeeInsuranceDetails?.dateOfJoining,
										margin: 'normal',
										helperText: errors.employeeInsuranceDetails?.dateOfJoining?.message as string
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
						name="employeeInsuranceDetails.dateOfBirth"
						render={({ field: { value, onChange } }) => (
							<DatePicker
								value={new Date(value)}
								onChange={(val) => {
									onChange(val?.toISOString());
								}}
								className="mx-4"
								slotProps={{
									textField: {
										label: 'Date Of Birth',
										InputLabelProps: {
											shrink: true
										},
										fullWidth: true,
										variant: 'outlined',
										error: !!errors.employeeInsuranceDetails?.dateOfBirth,
										margin: 'normal',
										helperText: errors.employeeInsuranceDetails?.dateOfBirth?.message as string
									},
									actionBar: {
										actions: ['clear']
									}
								}}
							/>
						)}
					/>

					<Controller
						name="employeeInsuranceDetails.age"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value}
								label="Age"
								fullWidth
								type="number"
								margin="normal"
								variant="outlined"
								placeholder="Age"
								className="mx-4"
								error={!!errors.employeeInsuranceDetails?.age}
								helperText={errors?.employeeInsuranceDetails?.age?.message as string}
							/>
						)}
					/>
				</div>

				<div className="flex -mx-4">
				<Controller
						name="employeeInsuranceDetails.grossSalary"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value}
								label="Gross Salary"
								fullWidth
								type="number"
								margin="normal"
								variant="outlined"
								placeholder="Gross Salary"
								className="mx-4"
								error={!!errors.employeeInsuranceDetails?.grossSalary}
								helperText={errors?.employeeInsuranceDetails?.grossSalary?.message as string}
							/>
						)}
					/>

					<Controller
						name="employeeInsuranceDetails.totalSIWider"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value}
								label="Total SI Wider"
								fullWidth
								type="number"
								margin="normal"
								variant="outlined"
								placeholder="Total SI Wider"
								className="mx-4"
								error={!!errors.employeeInsuranceDetails?.totalSIWider}
								helperText={errors?.employeeInsuranceDetails?.totalSIWider?.message as string}
							/>
						)}
					/>

					<Controller
						name="employeeInsuranceDetails.comprehensive"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value}
								label="Comprehensive"
								fullWidth
								type="number"
								margin="normal"
								variant="outlined"
								placeholder="Comprehensive"
								className="mx-4"
								error={!!errors.employeeInsuranceDetails?.comprehensive}
								helperText={errors?.employeeInsuranceDetails?.comprehensive?.message as string}
							/>
						)}
					/>

<Controller
						name="employeeInsuranceDetails.risk"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value}
								label="Risk"
								fullWidth
								type="text"
								margin="normal"
								variant="outlined"
								placeholder="Risk"
								className="mx-4"
								error={!!errors.employeeInsuranceDetails?.risk}
								helperText={errors?.employeeInsuranceDetails?.risk?.message as string}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

export default IdentityInfoTab;
