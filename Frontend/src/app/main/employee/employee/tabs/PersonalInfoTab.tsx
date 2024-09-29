import {
	FormControlLabel,
	TextField,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	Select,
	MenuItem,
	Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useFormContext } from 'react-hook-form';

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
					render={({ field }) => (
						<FormControl
							fullWidth
							required
							margin="normal"
							error={!!errors.employeePersonalDetails?.maritalStatus}
						>
							<FormLabel>Marital Status</FormLabel>
							<Select {...field}>
								<MenuItem value="single">Single</MenuItem>
								<MenuItem value="married">Married</MenuItem>
								<MenuItem value="divorced">Divorced</MenuItem>
								<MenuItem value="widowed">Widowed</MenuItem>
							</Select>
							{errors.employeePersonalDetails?.maritalStatus && (
								<Typography
									variant="caption"
									color="error"
								>
									{errors.employeePersonalDetails.maritalStatus.message}
								</Typography>
							)}
						</FormControl>
					)}
				/>
			<Controller
				name="employeePersonalDetails.dateOfBirth"
				control={control}
				render={({ field }) => (
					<DatePicker
						label="Date of Birth"
						{...field}
						slots={{
							textField: (textFieldProps) => (
								<TextField
									required
									{...textFieldProps}
									margin="normal"
									error={!!errors.employeePersonalDetails?.dateOfBirth}
									helperText={errors.employeePersonalDetails?.dateOfBirth?.message}
								/>
							)
						}}
					/>
				)}
			/>
		</div>
	);
}

export default PersonalInfoTab;
