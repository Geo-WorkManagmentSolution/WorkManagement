import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The basic info tab.
 */
function AddressInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div className="space-y-48">
			<div className="space-y-16">
				<Controller
					name="employeeAddresses.addressLine1"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Address Line 1"
							fullWidth
							required
							error={!!errors.employeeAddresses?.addressLine1}
							helperText={errors.employeeAddresses?.addressLine1?.message as string}
						/>
					)}
				/>

				<Controller
					name="employeeAddresses.addressLine2"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Address Line 2"
							fullWidth
							error={!!errors.employeeAddresses?.addressLine2}
							helperText={errors.employeeAddresses?.addressLine2?.message as string}
						/>
					)}
				/>

				<div className="flex -mx-4">
					<Controller
						name="employeeAddresses.city"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mx-4"
								label="City"
								fullWidth
								required
								error={!!errors.employeeAddresses?.city}
								helperText={errors.employeeAddresses?.city?.message as string}
							/>
						)}
					/>

					<Controller
						name="employeeAddresses.state"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="State"
								fullWidth
								required
								className="mx-4"
								error={!!errors.employeeAddresses?.state}
								helperText={errors.employeeAddresses?.state?.message as string}
							/>
						)}
					/>

					<Controller
						name="employeeAddresses.country"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Country"
								fullWidth
								className="mx-4"
								required
								error={!!errors.employeeAddresses?.country}
								helperText={errors.employeeAddresses?.country?.message as string}
							/>
						)}
					/>
				</div>
				<Controller
					name="employeeAddresses.pinCode"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Pin Code"
							fullWidth
							required
							type="number"
							error={!!errors.employeeAddresses?.pinCode}
							helperText={errors.employeeAddresses?.pinCode?.message as string}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default AddressInfoTab;
