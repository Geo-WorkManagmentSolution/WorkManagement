import { Avatar, Box, Autocomplete, Typography, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useGetApiAuthRolesQuery } from 'src/app/auth/services/AuthApi';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useGetApiEmployeesCategoriesQuery } from '../../EmployeeApi';

/**
 * The basic info tab.
 */
function BasicInfoTab() {
	const { data: employeesCategoriesOptions = [] } = useGetApiEmployeesCategoriesQuery();
	const { data: employeesRolesOptions = [] } = useGetApiAuthRolesQuery();

	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handlePhotoUpload = (file: File | null, onChange: (value: string) => void) => {
		const MAX_FILE_SIZE = 5000000; // 5MB
		const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

		if (file) {
			if (file.size > MAX_FILE_SIZE) {
				alert('File size should be less than 5MB');
				return;
			}

			if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
				alert('File type should be JPEG, JPG, PNG, or WEBP');
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				const dataUrl = reader.result as string;
				onChange(dataUrl);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-48">
			<div className="space-y-16">
				<div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:user-circle
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Basic Information
					</Typography>
				</div>

				<div className="flex flex-row">
					<div>
						{' '}
						<Controller
							name="photoURL"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Box
									sx={{
										position: 'relative',
										width: 150,
										height: 150,
										mb: 2,
										cursor: 'pointer',
										'&:hover .MuiAvatar-root': {
											opacity: 0.3
										},
										'&:hover .camera-icon': {
											opacity: 1
										}
									}}
									onClick={() => fileInputRef.current?.click()}
								>
									<Avatar
										src={value || 'undefined'}
										sx={{
											width: '100%',
											height: '100%',
											transition: 'opacity 0.3s'
										}}
									/>
									<Box
										className="camera-icon"
										sx={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											transform: 'translate(-50%, -50%)',
											opacity: 0,
											transition: 'opacity 0.3s',
											color: 'white'
										}}
									>
										<CameraAltIcon sx={{ fontSize: 40 }} />
									</Box>
									<input
										ref={fileInputRef}
										type="file"
										hidden
										onChange={(e) => handlePhotoUpload(e.target.files?.[0] || null, onChange)}
										accept="image/*"
									/>
								</Box>
							)}
						/>
					</div>
					<div className="flex flex-col mx-20">
						<div className="flex -mx-4">
							<Controller
								name="employeeCategoryId"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
										className="mt-8 mb-16 mx-4"
										fullWidth
										options={employeesCategoriesOptions}
										getOptionLabel={(option) => option?.name}
										isOptionEqualToValue={(option, value) => option.id === value}
										value={employeesCategoriesOptions.find((c) => c.id === value) || null}
										onChange={(_, newValue) => {
											onChange(newValue ? newValue.id : null);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												value={params.value || ''}
												placeholder="Select Employee categories"
												label="Category"
												required
												variant="outlined"
												InputLabelProps={{
													shrink: true
												}}
											/>
										)}
									/>
								)}
							/>
							<Controller
								name="roleId"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
										className="mt-8 mb-16 mx-4"
										fullWidth
										getOptionLabel={(option) => option?.name}
										options={employeesRolesOptions}
										isOptionEqualToValue={(option, value) => option.id === value}
										value={employeesRolesOptions.find((c) => c.id === value) || null}
										onChange={(_, newValue) => {
											onChange(newValue ? newValue.id : null);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												value={params.value || ''}
												placeholder="Select role"
												label="Role"
												required
												// InputProps={{
												// 	startAdornment: (
												// 		<InputAdornment position="start">
												// 			<FuseSvgIcon size={20}>heroicons-solid:briefcase</FuseSvgIcon>
												// 		</InputAdornment>
												// 	)
												// }}
												variant="outlined"
												InputLabelProps={{
													shrink: true
												}}
											/>
										)}
									/>
								)}
							/>
						</div>

						<div className="flex -mx-4">
							<Controller
								name="firstName"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										value={field.value || ''}
										className=" mx-4"
										required
										label="First Name"
										fullWidth
										margin="normal"
										error={!!errors?.firstName}
										helperText={errors?.firstName?.message as string}
									/>
								)}
							/>

									<Controller
										name="middleName"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												value={field.value || ''}
												className="mx-4"
												label="Middle Name"
												fullWidth
												margin="normal"
												error={!!errors?.surname}
												helperText={errors?.surname?.message as string}
											/>
										)}
									/>
							<Controller
								name="lastName"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										value={field.value || ''}
										required
										className=" mx-4"
										label="Last Name"
										fullWidth
										margin="normal"
										error={!!errors?.lastName}
										helperText={errors?.lastName?.message as string}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="space-y-16">
				<div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:user-circle
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Contact Information
					</Typography>
				</div>
				<div className="flex -mx-4">
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value || ''}
								label="Email"
								type="email"
								required
								fullWidth
								margin="normal"
								className=" mx-4"
								placeholder="Email"
								variant="outlined"
								error={!!errors?.email}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon size={20}>heroicons-solid:envelope</FuseSvgIcon>
										</InputAdornment>
									)
								}}
								helperText={errors?.email?.message as string}
							/>
						)}
					/>

					<Controller
						name="phoneNumber"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value}
								label="Phone Number"
								fullWidth
								type="number"
								margin="normal"
								variant="outlined"
								placeholder="Phone Number"
								className="mx-4"
								error={!!errors.phoneNumber}
								helperText={errors?.phoneNumber?.message as string}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon size={20}>heroicons-solid:phone</FuseSvgIcon>
										</InputAdornment>
									)
								}}
							/>
						)}
					/>

					<Controller
						name="alternateNumber"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value}
								label="Alternate Number"
								type="number"
								className="mx-4"
								variant="outlined"
								placeholder="Phone Number"
								margin="normal"
								fullWidth
								error={!!errors.alternateNumber}
								helperText={errors.alternateNumber?.message as string}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon size={20}>heroicons-solid:phone</FuseSvgIcon>
										</InputAdornment>
									)
								}}
							/>
						)}
					/>
				</div>
				<Controller
					name="motherName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Mother Name"
							fullWidth
							required
							error={!!errors.motherName}
							helperText={errors.motherName?.message as string}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default BasicInfoTab;
