import {
	FormControlLabel,
	Radio,
	RadioGroup,
	FormControl,
	FormLabel,
	Select,
	MenuItem,
	Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
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
						<Select {...field} >
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
						className='w-full mt-16 mb-16'
						label="Date of Birth"
						{...field}
					/>
				)}
			/>
			{errors.employeePersonalDetails?.dateOfBirth && (
					<Typography
						variant="caption"
						color="error"
					>
						{errors.employeePersonalDetails.dateOfBirth.message}
					</Typography>
				)}

		</div>
	);
}

export default PersonalInfoTab;
