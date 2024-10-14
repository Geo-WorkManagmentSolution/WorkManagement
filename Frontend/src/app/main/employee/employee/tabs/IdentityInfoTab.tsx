import { TextField } from '@mui/material';
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
				name="employeeIdentityInfos.bankAccountNumber"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						label="Bank Account Number"
						fullWidth
						error={!!errors.employeeIdentityInfos?.bankAccountNumber}
						helperText={errors.employeeIdentityInfos?.bankAccountNumber?.message as string}
					/>
				)}
			/>

			<Controller
				name="employeeIdentityInfos.bankName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						label="Bank Name"
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
						fullWidth
						error={!!errors.employeeIdentityInfos?.ifsc}
						helperText={errors.employeeIdentityInfos?.ifsc?.message as string}
					/>
				)}
			/>

			<Controller
				name="employeeIdentityInfos.accountHolderName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						label="Account Holder Name"
						fullWidth
						error={!!errors.employeeIdentityInfos?.accountHolderName}
						helperText={errors.employeeIdentityInfos?.accountHolderName?.message as string}
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
