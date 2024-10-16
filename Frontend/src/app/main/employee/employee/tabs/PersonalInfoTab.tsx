import {
	FormControlLabel,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	Typography,
	Autocomplete,
	TextField,
	MenuItem
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { RelationWithEmployee, BloodGroup } from '../../EmployeeApi';

/**
 * The basic info tab.
 */
function PersonalInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="employeePersonalDetails.gender"
				control={control}
				render={({ field }) => (
					<FormControl
						component="fieldset"
						margin="normal"
						fullWidth
						required
						error={!!errors.employeePersonalDetails?.gender}
					>
						<FormLabel component="legend">Gender</FormLabel>
						<RadioGroup
							row
							{...field}
						>
							<FormControlLabel
								value="male"
								control={<Radio />}
								label="Male"
							/>
							<FormControlLabel
								value="female"
								control={<Radio />}
								label="Female"
							/>
							<FormControlLabel
								value="other"
								control={<Radio />}
								label="Other"
							/>
						</RadioGroup>
						{errors.employeePersonalDetails?.gender && (
							<Typography
								variant="caption"
								color="error"
							>
								{errors.employeePersonalDetails?.gender.message}
							</Typography>
						)}
					</FormControl>
				)}
			/>

			<Controller
				name="employeePersonalDetails.maritalStatus"
				control={control}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16 "
						freeSolo
						fullWidth
						options={['single', 'married', 'divorced']}
						value={value}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								value={params.value || ''}
								placeholder="Select Marital Status"
								label="Marital Status"
								required
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
				name="employeePersonalDetails.bloodGroup"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16 "
						select
						label="Blood Group"
						fullWidth
						error={!!errors.employeePersonalDetails?.bloodGroup}
						helperText={errors.employeePersonalDetails?.bloodGroup?.message as string}
					>
						{Object.values(BloodGroup).map((group) => (
							<MenuItem
								key={group}
								value={group}
							>
								{group}
							</MenuItem>
						))}
					</TextField>
				)}
			/>
			{/* <Controller
				name="employeePersonalDetails.relationWithEmployee"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16 "
						select
						label="Relation with Employee"
						fullWidth
						error={!!errors.employeePersonalDetails?.relationWithEmployee}
						helperText={errors.employeePersonalDetails?.relationWithEmployee?.message}
					>
						{Object.values(RelationWithEmployee).map((relation) => (
							<MenuItem
								key={relation}
								value={relation}
							>
								{relation}
							</MenuItem>
						))}
					</TextField>
				)}
			/> */}
			<Controller
				control={control}
				name="employeePersonalDetails.dateOfBirth"
				render={({ field: { value, onChange } }) => (
					<DatePicker
						value={new Date(value)}
						onChange={(val) => {
							onChange(val?.toISOString());
						}}
						className="mx-4"
						slotProps={{
							textField: {
								label: 'Date of Birth',
								InputLabelProps: {
									shrink: true
								},
								fullWidth: true,
								variant: 'outlined',
								error: !!errors?.employeePersonalDetails?.dateOfBirth,
								margin: 'normal',
								helperText: errors?.employeePersonalDetails?.dateOfBirth?.message as string
							},
							actionBar: {
								actions: ['clear']
							}
						}}
					/>
				)}
			/>
		</div>
	);
}

export default PersonalInfoTab;
