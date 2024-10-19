/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { TextField } from '@mui/material';
// import { Controller, useFormContext } from 'react-hook-form';

// /**
//  * The basic info tab.
//  */
// function AddressInfoTab() {
// 	const methods = useFormContext();
// 	const { control, formState } = methods;
// 	const { errors } = formState;

// 	return (
// 		<div className="space-y-48">
// 			<div className="space-y-16">
// 				<Controller
// 					name="employeeAddresses.addressLine1"
// 					control={control}
// 					render={({ field }) => (
// 						<TextField
// 							{...field}
// 							label="Address Line 1"
// 							fullWidth
// 							required
// 							error={!!errors.employeeAddresses?.addressLine1}
// 							helperText={errors.employeeAddresses?.addressLine1?.message as string}
// 						/>
// 					)}
// 				/>

// 				<Controller
// 					name="employeeAddresses.addressLine2"
// 					control={control}
// 					render={({ field }) => (
// 						<TextField
// 							{...field}
// 							label="Address Line 2"
// 							fullWidth
// 							error={!!errors.employeeAddresses?.addressLine2}
// 							helperText={errors.employeeAddresses?.addressLine2?.message as string}
// 						/>
// 					)}
// 				/>

// 				<div className="flex -mx-4">
// 					<Controller
// 						name="employeeAddresses.city"
// 						control={control}
// 						render={({ field }) => (
// 							<TextField
// 								{...field}
// 								className="mx-4"
// 								label="City"
// 								fullWidth
// 								required
// 								error={!!errors.employeeAddresses?.city}
// 								helperText={errors.employeeAddresses?.city?.message as string}
// 							/>
// 						)}
// 					/>

// 					<Controller
// 						name="employeeAddresses.state"
// 						control={control}
// 						render={({ field }) => (
// 							<TextField
// 								{...field}
// 								label="State"
// 								fullWidth
// 								required
// 								className="mx-4"
// 								error={!!errors.employeeAddresses?.state}
// 								helperText={errors.employeeAddresses?.state?.message as string}
// 							/>
// 						)}
// 					/>

// 					<Controller
// 						name="employeeAddresses.country"
// 						control={control}
// 						render={({ field }) => (
// 							<TextField
// 								{...field}
// 								label="Country"
// 								fullWidth
// 								className="mx-4"
// 								required
// 								error={!!errors.employeeAddresses?.country}
// 								helperText={errors.employeeAddresses?.country?.message as string}
// 							/>
// 						)}
// 					/>
// 				</div>
// 				<Controller
// 					name="employeeAddresses.pinCode"
// 					control={control}
// 					render={({ field }) => (
// 						<TextField
// 							{...field}
// 							label="Pin Code"
// 							fullWidth
// 							required
// 							type="number"
// 							error={!!errors.employeeAddresses?.pinCode}
// 							helperText={errors.employeeAddresses?.pinCode?.message as string}
// 						/>
// 					)}
// 				/>
// 			</div>
// 		</div>
// 	);
// }

// export default AddressInfoTab;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

// Note: You need to replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export default function AddressInfoTab() {
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;

	const [googleLoaded, setGoogleLoaded] = useState(false);
	const userAddressRef = useRef<HTMLInputElement>(null);
	const mailingAddressRef = useRef<HTMLInputElement>(null);

	const useUserAddressForMailing = watch('employeeAddresses.useUserAddressForMailing');

	useEffect(() => {
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
		script.async = true;
		script.onload = () => setGoogleLoaded(true);
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	useEffect(() => {
		if (googleLoaded && window.google) {
			initAutocomplete(userAddressRef.current, 'employeeAddresses.userAddress');
			initAutocomplete(mailingAddressRef.current, 'employeeAddresses.mailingAddress');
		}
	}, [googleLoaded]);

	const initAutocomplete = (
		input: HTMLInputElement | null,
		addressType: 'employeeAddresses.userAddress' | 'employeeAddresses.mailingAddress'
	) => {
		if (!input || !window.google) return;

		const autocomplete = new window.google.maps.places.Autocomplete(input, { types: ['address'] });
		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();

			if (!place.address_components) return;

			let addressLine1 = '';
			let city = '';
			let state = '';
			let country = '';
			let pincode = '';

			for (const component of place.address_components) {
				const componentType = component.types[0];

				switch (componentType) {
					case 'street_number':
						addressLine1 = `${component.long_name} ${addressLine1}`;
						break;
					case 'route':
						addressLine1 += component.short_name;
						break;
					case 'postal_code':
						pincode = component.long_name;
						break;
					case 'locality':
						city = component.long_name;
						break;
					case 'administrative_area_level_1':
						state = component.long_name;
						break;
					case 'country':
						country = component.long_name;
						break;
				}
			}

			setValue(`${addressType}.addressLine1`, addressLine1);
			setValue(`${addressType}.city`, city);
			setValue(`${addressType}.state`, state);
			setValue(`${addressType}.country`, country);
			setValue(`${addressType}.pincode`, pincode);
		});
	};

	function AddressFields({
		prefix,
		sectionLabel
	}: {
		prefix: 'employeeAddresses.userAddress' | 'employeeAddresses.mailingAddress';
		sectionLabel: string;
	}) {
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
					render={({ field, fieldState: { error } }) => (
						<TextField
							{...field}
							fullWidth
							label="Address Line 1"
							error={!!error}
							helperText={error?.message}
							inputRef={prefix === 'employeeAddresses.userAddress' ? userAddressRef : mailingAddressRef}
						/>
					)}
				/>

				<Controller
					name={`${prefix}.addressLine2`}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<TextField
							{...field}
							fullWidth
							label="Address Line 2"
							error={!!error}
							helperText={error?.message}
						/>
					)}
				/>

				<div className="flex -mx-4">
					<Controller
						name={`${prefix}.city`}
						control={control}
						render={({ field, fieldState: { error } }) => (
							<TextField
								{...field}
								fullWidth
								className="mx-4"
								label="City"
								error={!!errors.employeeAddresses?.city}
								helperText={errors.employeeAddresses?.city?.message as string}
							/>
						)}
					/>

					<Controller
						name={`${prefix}.state`}
						control={control}
						render={({ field, fieldState: { error } }) => (
							<TextField
								{...field}
								fullWidth
								className="mx-4"
								label="State"

								error={!!errors.employeeAddresses?.state}
								helperText={errors.employeeAddresses?.state?.message as string}
							/>
						)}
					/>

					<Controller
						name={`${prefix}.country`}
						control={control}
						render={({ field, fieldState: { error } }) => (
							<TextField
								{...field}
								fullWidth
								className="mx-4"
								label="Country"
								error={!!errors.employeeAddresses?.country}
								helperText={errors.employeeAddresses?.country?.message as string}
							/>
						)}
					/>
				</div>

				<Controller
					name={`${prefix}.pincode`}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<TextField
							{...field}
							fullWidth
							required
							label="Pincode"
							type="number"
							error={!!errors.employeeAddresses?.pinCode}
							helperText={errors.employeeAddresses?.pinCode?.message as string}
						/>
					)}
				/>
			</div>
		);
	}

	return (
		<div className="space-y-48">
			<AddressFields
				prefix="employeeAddresses.userAddress"
				sectionLabel="Residance Address"
			/>
			<Controller
				name="employeeAddresses.useUserAddressForMailing"
				control={control}
				render={({ field }) => (
					<FormControlLabel
						control={<Checkbox {...field} />}
						label="Use the same address for mailing"
					/>
				)}
			/>

			{!useUserAddressForMailing && (
				<AddressFields
					prefix="employeeAddresses.mailingAddress"
					sectionLabel="Mailing Address"
				/>
			)}
		</div>
	);
}
