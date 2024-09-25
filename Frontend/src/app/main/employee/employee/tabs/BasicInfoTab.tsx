import { Checkbox, FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The basic info tab.
 */
function BasicInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="photoURL"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						label="Photo URL"
						fullWidth
						margin="normal"
						error={!!errors.photoURL}
						helperText={errors.photoURL?.message as string}
					/>
				)}
			/>
			<Controller
				name="isActive"
				control={control}
				render={({ field }) => (
					<FormControlLabel
						control={
							<Checkbox
								{...field}
								checked={field.value as boolean}
							/>
						}
						label="Is Active"
					/>
				)}
			/>
			<Controller
				name="employeeNumber"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						label="Employee Number"
						type="number"
						fullWidth
						margin="normal"
						error={!!errors.employeeNumber}
						helperText={errors.employeeNumber?.message as string}
					/>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
