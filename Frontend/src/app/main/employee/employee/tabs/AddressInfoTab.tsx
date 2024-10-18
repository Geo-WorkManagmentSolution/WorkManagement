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
								className="mx-4"
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
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default AddressInfoTab;
