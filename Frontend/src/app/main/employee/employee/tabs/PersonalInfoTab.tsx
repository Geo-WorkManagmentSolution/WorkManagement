import {
	FormControlLabel,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	Typography,
	Autocomplete,
	TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { BloodGroup, MaritalStatus } from '../../models/EmployeeDropdownModels';

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
						options={Object.values(MaritalStatus)}
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
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16 "
						freeSolo
						fullWidth
						options={Object.values(BloodGroup)}
						value={value}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								value={params.value || ''}
								placeholder="Select Blood Group"
								label="Blood Group"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
								error={!!errors.employeePersonalDetails?.bloodGroup}
								helperText={errors.employeePersonalDetails?.bloodGroup?.message as string}		
							/>
						)}
					/>
				)}
			/>
			<Controller
				control={control}
				name="employeePersonalDetails.dateOfBirth"
				render={({ field: { value, onChange } }) => (
					<DatePicker
						value={new Date(value)}
						onChange={(val) => {
							onChange(val?.toISOString());
						}}
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
