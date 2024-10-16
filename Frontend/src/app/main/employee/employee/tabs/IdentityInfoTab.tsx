import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The basic info tab.
 */
function IdentityInfoTab() {
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
						heroicons-outline:building-office
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Bank Information
					</Typography>
				</div>
				
				<div className="flex -mx-4">
				<Controller
					name="employeeIdentityInfos.accountHolderName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Account Holder Name"
							className=" mx-4"

							fullWidth
							error={!!errors.employeeIdentityInfos?.accountHolderName}
							helperText={errors.employeeIdentityInfos?.accountHolderName?.message as string}
						/>
					)}
				/>
					
					<Controller
						name="employeeIdentityInfos.bankAccountNumber"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Bank Account Number"
								fullWidth
								className=" mx-4"

								error={!!errors.employeeIdentityInfos?.bankAccountNumber}
								helperText={errors.employeeIdentityInfos?.bankAccountNumber?.message as string}
							/>
						)}
					/>
				</div>

				<div className="flex -mx-4">
				<Controller
						name="employeeIdentityInfos.bankName"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Bank Name"
								className=" mx-4"

								fullWidth
								error={!!errors.employeeIdentityInfos?.bankName}
								helperText={errors.employeeIdentityInfos?.bankName?.message as string}
							/>
						)}
					/>
					<Controller
						name="employeeIdentityInfos.branch"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Branch"
								className=" mx-4"

								fullWidth
								error={!!errors.employeeIdentityInfos?.branch}
								helperText={errors.employeeIdentityInfos?.branch?.message as string}
							/>
						)}
					/>

					<Controller
						name="employeeIdentityInfos.ifsc"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="IFSC"
								className=" mx-4"

								fullWidth
								error={!!errors.employeeIdentityInfos?.ifsc}
								helperText={errors.employeeIdentityInfos?.ifsc?.message as string}
							/>
						)}
					/>
				</div>

				
			</div>

			<div className="space-y-16">
				<div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:identification
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Identity Information
					</Typography>
				</div>
				<Controller
					name="employeeIdentityInfos.uid"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="UID"
							fullWidth
							error={!!errors.employeeIdentityInfos?.uid}
							helperText={errors.employeeIdentityInfos?.uid?.message as string}
						/>
					)}
				/>
				<Controller
					name="employeeIdentityInfos.pan"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="PAN"
							fullWidth
							error={!!errors.employeeIdentityInfos?.pan}
							helperText={errors.employeeIdentityInfos?.pan?.message as string}
						/>
					)}
				/>

				<Controller
					name="employeeIdentityInfos.providentFundNumber"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Provident Fund Number"
							fullWidth
							error={!!errors.employeeIdentityInfos?.providentFundNumber}
							helperText={errors.employeeIdentityInfos?.providentFundNumber?.message as string}
						/>
					)}
				/>

				<Controller
					name="employeeIdentityInfos.employeeStateInsuranceNumber"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Employee State Insurance Number"
							fullWidth
							error={!!errors.employeeIdentityInfos?.employeeStateInsuranceNumber}
							helperText={errors.employeeIdentityInfos?.employeeStateInsuranceNumber?.message as string}
						/>
					)}
				/>

				<Controller
					name="employeeIdentityInfos.biometricCode"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Biometric Code"
							fullWidth
							error={!!errors.employeeIdentityInfos?.biometricCode}
							helperText={errors.employeeIdentityInfos?.biometricCode?.message as string}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default IdentityInfoTab;
