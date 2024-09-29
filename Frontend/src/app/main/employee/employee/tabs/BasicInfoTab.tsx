import { Avatar, Box, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

/**
 * The basic info tab.
 */
function BasicInfoTab() {
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
		<div>
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
							src={value || undefined}
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
			<div className="flex -mx-4">
				<Controller
					name="employeeNumber"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Employee Number"
							type="number"
							margin="normal"
							fullWidth
							error={!!errors.employeeNumber}
							helperText={errors.employeeNumber?.message as string}
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
							className="basis-1/4 mt-8 mx-4"
							label="Is Active"
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
					name="lastName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
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
			<div className="flex -mx-4">
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Email"
							type="email"
							required
							fullWidth
							margin="normal"
							className=" mx-4"
							error={!!errors?.email}
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
							label="Phone Number"
							fullWidth
							margin="normal"
							className="mx-4"
							error={!!errors.phoneNumber}
							helperText={errors?.phoneNumber?.message as string}
						/>
					)}
				/>
			</div>
			<div className="flex -mx-4">
				<Controller
					name="position"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Position"
							fullWidth
							className="mx-4"
							margin="normal"
							error={!!errors.position}
							helperText={errors?.position?.message as string}
						/>
					)}
				/>

				<Controller
					name="role"
					control={control}
					defaultValue={[]}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 mx-4"
							freeSolo
							fullWidth
							options={['admin', 'user']}
							value={value}
							onChange={(event, newValue) => {
								onChange(newValue);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder="Select role"
									label="Role"
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
			</div>
		</div>
	);
}

export default BasicInfoTab;
