import {
	Typography,
	TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

function PersonalInfoTab() {
	const { control } = useFormContext();

	return (
		<div>
			<Controller
				name="employeePersonalDetails.gender"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						label="Gender"
						margin="normal"
						InputProps={{
							readOnly: true,
						}}
					/>
				)}
			/>

			<Controller
				name="employeePersonalDetails.maritalStatus"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						label="Marital Status"
						margin="normal"
						InputProps={{
							readOnly: true,
						}}
					/>
				)}
			/>

			<Controller
				name="employeePersonalDetails.bloodGroup"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						label="Blood Group"
						margin="normal"
						InputProps={{
							readOnly: true,
						}}
					/>
				)}
			/>
			<Controller
				control={control}
				name="employeePersonalDetails.dateOfBirth"
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						label="Date of Birth"
						margin="normal"
						InputProps={{
							readOnly: true,
						}}
					/>
				)}
			/>
		</div>
	);
}

export default PersonalInfoTab;

