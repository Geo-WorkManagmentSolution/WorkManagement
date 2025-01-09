import { Avatar, Box, Typography, InputAdornment, Grid, Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useGetApiEmployeesCategoriesQuery, usePostApiEmployeesAddNewCategoryMutation } from '../../../EmployeeApi';
import { useGetApiAuthRolesQuery } from 'src/app/auth/services/AuthApi';
import { useParams } from 'react-router';
import EnhancedAutocomplete from '../../../employee/EnhancedAutocomplete';

function BasicInfoTab() {
	const { data: employeesCategoriesOptions = [] } = useGetApiEmployeesCategoriesQuery();
		// const { data: employeesCategoriesOptions,refetch } = useGetApiEmployeesCategoriesQuery();
		// const relationShipTypes = ['Parent', 'Spouse', 'Family', 'Friend', 'Other'];
		const { data: employeesRolesOptions = [] } = useGetApiAuthRolesQuery();
		const [AddCategory] = usePostApiEmployeesAddNewCategoryMutation();
		const { employeeId } = useParams();
	const { control } = useFormContext();

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
						<Controller
							name="photoURL"
							control={control}
							render={({ field: { value } }) => (
								<Box
									sx={{
										width: 150,
										height: 150,
										mb: 2,
									}}
								>
									<Avatar
										src={value || 'undefined'}
										sx={{
											width: '100%',
											height: '100%',
										}}
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
										className="mx-4"
										label="Employee Number"
										fullWidth
										margin="normal"
										InputProps={{
											readOnly: true,
										}}
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
										readOnly
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
												
											/>
										)}
										attachedLabel="Category will be added to the database"
										
									/>
								)}
							/>
							 <Controller
        name="roleId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
		  readOnly
            className="mt-8 mb-16 mx-4"
            fullWidth
            options={employeesRolesOptions}
            getOptionLabel={(option) => option?.name || ''}
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
										className="mx-4"
										label="First Name"
										fullWidth
										margin="normal"
										InputProps={{
											readOnly: true,
										}}
									/>
								)}
							/>

							<Controller
								name="middleName"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mx-4"
										label="Middle Name"
										fullWidth
										margin="normal"
										InputProps={{
											readOnly: true,
										}}
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mx-4"
										label="Last Name"
										fullWidth
										margin="normal"
										InputProps={{
											readOnly: true,
										}}
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
								label="Email"
								type="email"
								fullWidth
								margin="normal"
								className="mx-4"
								InputProps={{
									readOnly: true,
									startAdornment: (
										<InputAdornment position="start">
											<FuseSvgIcon size={20}>heroicons-solid:envelope</FuseSvgIcon>
										</InputAdornment>
									)
								}}
							/>
						)}
					/>
					<Controller
						name="alternateEmail"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Alternate Email"
								fullWidth
								type="email"
								margin="normal"
								className="mx-4"
								InputProps={{
									readOnly: true,
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
								label="Phone Number"
								fullWidth
								margin="normal"
								className="mx-4"
								InputProps={{
									readOnly: true,
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
								label="Alternate Number"
								className="mx-4"
								margin="normal"
								fullWidth
								InputProps={{
									readOnly: true,
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
				<Controller
					name="employeeRelationshipDetails"
					control={control}
					render={({ field: { value } }) => (
						<>
							{value && value.map((relationship, index) => (
								<Box
									key={index}
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
											<TextField
												fullWidth
												label="Relationship Type"
												value={relationship.relationshipType || ''}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Grid>
										<Grid
											item
											xs={12}
											sm={6}
										>
											<TextField
												fullWidth
												label="Name"
												value={relationship.name || ''}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Grid>
										<Grid
											item
											xs={12}
											sm={6}
										>
											<TextField
												fullWidth
												label="Email"
												value={relationship.email || ''}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Grid>
										<Grid
											item
											xs={12}
											sm={6}
										>
											<TextField
												fullWidth
												label="Phone Number"
												value={relationship.phoneNumber || ''}
												InputProps={{
													readOnly: true,
												}}
											/>
										</Grid>
									</Grid>
								</Box>
							))}
						</>
					)}
				/>
			</div>
		</div>
	);
}

export default BasicInfoTab;

