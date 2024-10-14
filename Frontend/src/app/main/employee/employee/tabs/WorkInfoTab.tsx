/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TextField, MenuItem, InputAdornment, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { SalaryType } from '../../EmployeeApi';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

/**
 * The basic info tab.
 */
function WorkInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

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
					name="employeeWorkInformation.designation"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Designation"
							fullWidth
							error={!!errors.employeeWorkInformation?.designation}
							helperText={errors.employeeWorkInformation?.designation?.message as string}
						/>
					)}
				/>
				<Controller
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
				/>
								<Controller
					name="employeeWorkInformation.site"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Site"
							fullWidth
							error={!!errors.employeeWorkInformation?.site}
							helperText={errors.employeeWorkInformation?.site?.message as string}
						/>
					)}
				/>

				<Controller
					name="employeeDepartments.departmentName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Department Name"
							fullWidth
							error={!!errors.employeeDepartments?.departmentName}
							helperText={errors.employeeDepartments?.departmentName?.message as string}
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
				<Controller
					name="employeeWorkInformation.bond"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Bond"
							type="number"
							fullWidth
							error={!!errors.employeeWorkInformation?.bond}
							helperText={errors.employeeWorkInformation?.bond?.message as string}
						/>
					)}
				/>
				<Controller
					name="employeeWorkInformation.salaryType"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							select
							label="Salary Type"
							fullWidth
							error={!!errors.employeeWorkInformation?.salaryType}
							helperText={errors.employeeWorkInformation?.salaryType?.message as string}
						>
							{Object.values({ SalaryType }).map((type) => (
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
				<Controller
					name="employeeWorkInformation.salary"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Salary"
							type="number"
							InputProps={{
								startAdornment: <InputAdornment position="start">₹</InputAdornment>
							}}
							fullWidth
							error={!!errors.employeeWorkInformation?.salary}
							helperText={errors.employeeWorkInformation?.salary?.message as string}
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
						Hiring Information
					</Typography>
				</div>

				<Controller
					name="employeeWorkInformation.hireDate"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Hire Date"
							type="date"
							fullWidth
							InputLabelProps={{ shrink: true }}
							error={!!errors.employeeWorkInformation?.hireDate}
							helperText={errors.employeeWorkInformation?.hireDate?.message as string}
						/>
					)}
				/>

				<Controller
					name="employeeWorkInformation.previousDateOfJoiningInGDR"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Previous Date of Joining in GDR"
							type="date"
							fullWidth
							InputLabelProps={{ shrink: true }}
							error={!!errors.employeeWorkInformation?.previousDateOfJoiningInGDR}
							helperText={errors.employeeWorkInformation?.previousDateOfJoiningInGDR?.message as string}
						/>
					)}
				/>
				<Controller
					name="employeeWorkInformation.previousDateOfLeavingInGDR"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Previous Date of Leaving in GDR"
							type="date"
							fullWidth
							InputLabelProps={{ shrink: true }}
							error={!!errors.employeeWorkInformation?.previousDateOfLeavingInGDR}
							helperText={errors.employeeWorkInformation?.previousDateOfLeavingInGDR?.message as string}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default WorkInfoTab;
