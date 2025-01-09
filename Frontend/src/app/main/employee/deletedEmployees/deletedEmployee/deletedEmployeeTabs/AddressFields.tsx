import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

type AddressFieldsProps = {
	prefix: 'employeeAddresses.userAddress' | 'employeeAddresses.mailingAddress';
	sectionLabel: string;
};

export default function AddressFields({ prefix, sectionLabel }: AddressFieldsProps) {
	const { control } = useFormContext();

	return (
		<div className="space-y-16">
			<div className="flex items-center border-b-1 space-x-8 pb-8">
				<FuseSvgIcon
					color="action"
					size={24}
				>
					heroicons-outline:home
				</FuseSvgIcon>
				<Typography
					className="text-2xl"
					color="text.secondary"
				>
					{sectionLabel}
				</Typography>
			</div>
			<Controller
				name={`${prefix}.addressLine1`}
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						label="Address Line 1"
						InputProps={{
							readOnly: true,
						}}
					/>
				)}
			/>
			<Controller
				name={`${prefix}.addressLine2`}
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						label="Address Line 2"
						InputProps={{
							readOnly: true,
						}}
					/>
				)}
			/>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Controller
					name={`${prefix}.country`}
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							fullWidth
							label="Country"
							InputProps={{
								readOnly: true,
							}}
						/>
					)}
				/>
				<Controller
					name={`${prefix}.state`}
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							fullWidth
							label="State"
							InputProps={{
								readOnly: true,
							}}
						/>
					)}
				/>
				<Controller
					name={`${prefix}.city`}
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							fullWidth
							label="City"
							InputProps={{
								readOnly: true,
							}}
						/>
					)}
				/>
			</div>
			<Controller
				name={`${prefix}.pinCode`}
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						label="Pincode"
						InputProps={{
							readOnly: true,
						}}
					/>
				)}
			/>
		</div>
	);
}

