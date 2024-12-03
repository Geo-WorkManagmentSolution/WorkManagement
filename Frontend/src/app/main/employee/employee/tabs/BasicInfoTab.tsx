/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Avatar, Box, Autocomplete, Typography, InputAdornment, Grid, Button, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useGetApiAuthRolesQuery } from 'src/app/auth/services/AuthApi';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useGetApiEmployeesCategoriesQuery, usePostApiEmployeesAddNewCategoryMutation } from '../../EmployeeApi';
import EnhancedAutocomplete from '../EnhancedAutocomplete';
import { RelationshipType } from '../../models/EmployeeDropdownModels';
import EmailCheckerInput from '../EmailChecker';

/**
 * The basic info tab.
 */
function BasicInfoTab({UserRole}) {
	const { data: employeesCategoriesOptions = [] } = useGetApiEmployeesCategoriesQuery();
	// const { data: employeesCategoriesOptions,refetch } = useGetApiEmployeesCategoriesQuery();
	// const relationShipTypes = ['Parent', 'Spouse', 'Family', 'Friend', 'Other'];
	const { data: employeesRolesOptions = [] } = useGetApiAuthRolesQuery();
	const [AddCategory] = usePostApiEmployeesAddNewCategoryMutation();
	const { employeeId } = useParams();
	const handleOptionAdd = async (newOption: Omit<Option, 'id'>) => {
		try {
			const result = await AddCategory({
				employeeCategory: newOption
			}).unwrap();
			return { ...newOption, id: result.id };
		} catch (error) {
			console.error('Failed to add new option:', error);
			throw error;
		}
	};

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

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'employeeRelationshipDetails'
	});

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
								name="employeeNumber"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										value={field.value || ''}
										className=" mx-4"
										disabled
										label="Employee Number"
										fullWidth
										margin="normal"
										error={!!errors?.employeeNumber}
										helperText={errors?.employeeNumber?.message as string}
									/>
								)}
							/>
						</div>
						<div className="flex -mx-4">
							<Controller
								name="employeeCategoryId"
								control={control}
								render={({ field }) => (
									<EnhancedAutocomplete
										{...field}
										fullWidth
										label="Select or add an category"
										options={employeesCategoriesOptions}
										// value={employeesCategoriesOptions?.find((c) => c.id === field.value) || null}
										// getOptionLabel={(option) => option?.name}
										onChange={(_, newValue) => {
											field.onChange(newValue ? newValue.id : null);
										}}
										isOptionEqualToValue={(option, value) => option.id === value}
										className="mt-8 mb-16 mx-4"
										placeholder="Type to search or add"
										renderInput={(params) => (
											<TextField
												{...params}
												value={params.value || ''}
												placeholder="Select or Add Employee categories"
												label="Category"
												required
												variant="outlined"
												InputLabelProps={{
													shrink: true
												}}
												error={!!errors?.employeeCategoryId}
												helperText={errors?.employeeCategoryId?.message as string}
											/>
										)}
										attachedLabel="Category will be added to the database"
										onOptionAdd={handleOptionAdd}
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
            options={employeesRolesOptions}
            getOptionLabel={(option) => option?.name || ''}
			disabled={UserRole === 'Employee'}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            value={employeesRolesOptions.find((c) => c.id === value) || null}
            onChange={(_, newValue) => {
              onChange(newValue ? newValue.id : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Role"
                required
                variant="outlined"
                error={!!errors?.roleId}
                helperText={errors?.roleId?.message as string}
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
										required
										margin="normal"
										error={!!errors?.middleName}
										helperText={errors?.middleName?.message as string}
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
					{/* <Controller
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
					/> */}
					 <EmailCheckerInput disabled={employeeId !== 'new'} />
					<Controller
						name="alternateEmail"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value || ""}
								label="Alternate Email"
								fullWidth
								type="email"
								margin="normal"
								variant="outlined"
								placeholder="Alternate Email"
								className="mx-4"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon size={20}>heroicons-solid:envelope</FuseSvgIcon>
										</InputAdornment>
									)
								}}
							/>
						)}
					/>
				</div>
				<div className="flex -mx-4">
					<Controller
						name="phoneNumber"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value || ""}
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
								value={field.value || ""}
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
						Relationship Information
					</Typography>
				</div>
				{/* <form onSubmit={handleSubmit(onSubmit)}> */}
				{fields.map((field, index) => (
					<Box
						key={field.id}
						sx={{ mb: 4 }}
					>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Controller
									name={`employeeRelationshipDetails.${index}.relationshipType`}
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											select
											fullWidth
											label="Relationship Type"
											SelectProps={{
												MenuProps: {
													disableScrollLock: false,
													autoFocus: true
												}
											}}
										>
											{Object.values(RelationshipType).map((option) => (
												<MenuItem
													key={option}
													value={option}
												>
													{option}
												</MenuItem>
											))}
										</TextField>
									)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Controller
									name={`employeeRelationshipDetails.${index}.name`}
									control={control}
									rules={{ required: 'Name is required' }}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											label="Name"
										/>
									)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Controller
									name={`employeeRelationshipDetails.${index}.email`}
									control={control}
									rules={{ required: 'Email is required' }}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											label="Email"
										/>
									)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Controller
									name={`employeeRelationshipDetails.${index}.phoneNumber`}
									control={control}
									rules={{ required: 'Phone Number is required' }}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											label="Phone Number"
										/>
									)}
								/>
							</Grid>
						</Grid>

						<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
							<Button
								className={index > 0 ? 'hideAddContextButton' : ''}
								variant="contained"
								color="secondary"
								size="small"
								onClick={() =>
									append({
										relationshipType: '',
										name: '',
										email: '',
										phoneNumber: ''
									})
								}
							>
								<FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
								<span className="mx-4 sm:mx-8">Add Contact</span>
							</Button>
							{index > 0 && (
								<Button
									variant="outlined"
									color="error"
									startIcon={<DeleteIcon />}
									onClick={() => remove(index)}
								>
									Remove
								</Button>
							)}
						</Box>
					</Box>
				))}

				{/* </form> */}
			</div>
		</div>
	);
}

export default BasicInfoTab;
