/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TextField, MenuItem, InputAdornment, Typography, Autocomplete, FormControlLabel, Checkbox } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { DatePicker } from '@mui/x-date-pickers';
import { SalaryType, useGetApiEmployeesDepartmentsQuery, useGetApiEmployeesLeavesCurrentQuery, useGetApiEmployeesSitesQuery, usePostApiEmployeesAddNewSiteMutation } from '../../EmployeeApi';
import EnhancedAutocomplete from '../EnhancedAutocomplete';
import { useState } from 'react';

/**
 * The basic info tab.
 */

function WorkInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	const { data: employeesDepartmentsOptions = [] } = useGetApiEmployeesDepartmentsQuery();
	const { data: employeesSiteOptions = [] } = useGetApiEmployeesSitesQuery();
	const { data: employeeLeaveTypes = [] } = useGetApiEmployeesLeavesCurrentQuery();

	const [useDefaultLeaves, setUseDefaultLeaves] = useState(true);

	
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'employeeLeaves'
	});

	const [AddSite] = usePostApiEmployeesAddNewSiteMutation();

	const handleOptionAdd = async (newOption: Omit<Option, 'id'>) => {
		try {
			const result = await AddSite({ site: newOption }).unwrap();
			return { ...newOption, id: result.id };
		} catch (error) {
			console.error('Failed to add new option:', error);
			throw error;
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
						Job profile
					</Typography>
				</div>
				<Controller
					name="employeeWorkInformation.designation"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Designation"
							fullWidth
							error={!!errors.employeeWorkInformation?.designation}
							helperText={errors.employeeWorkInformation?.designation?.message as string}
						/>
					)}
				/>
				<Controller
					name="employeeWorkInformation.grpHead"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="GRP Head"
							fullWidth
							error={!!errors.employeeWorkInformation?.grpHead}
							helperText={errors.employeeWorkInformation?.grpHead?.message as string}
						/>
					)}
				/>
				{/* <Controller
					name="employeeWorkInformation.site"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Site"
							fullWidth
							error={!!errors.employeeWorkInformation?.site}
							helperText={errors.employeeWorkInformation?.site?.message as string}
						/>
					)}
				/> */}

				<Controller
					name="employeeWorkInformation.siteId"
					control={control}
					render={({ field }) => (
						<EnhancedAutocomplete
							{...field}
							fullWidth
							label="Select or add Site"
							options={employeesSiteOptions}
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
									placeholder="Select or Add Site"
									label="Site"
									required
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
									error={!!errors?.siteId}
									helperText={errors?.siteId?.message as string}
								/>
							)}
							attachedLabel="A site will be added to the database"
							onOptionAdd={handleOptionAdd}

						/>
					)}
				/>

				<Controller
					name="employeeDepartmentId"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							fullWidth
							options={employeesDepartmentsOptions}
							getOptionLabel={(option) => option?.name}
							isOptionEqualToValue={(option, value) => option.id === value}
							value={employeesDepartmentsOptions?.find((c) => c.id === value) || null}
							onChange={(_, newValue) => {
								onChange(newValue ? newValue.id : null);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									value={params.value || ''}
									placeholder="Select Employee Department"
									label="Department"
									variant="outlined"
									required
									InputLabelProps={{
										shrink: true
									}}
									error={!!errors.employeeDepartmentId}
									helperText={errors.employeeDepartmentId?.message as string}
								/>
							)}
						/>
					)}
				/>
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
						Salary Information
					</Typography>
				</div>
				<Controller
					name="employeeWorkInformation.bond"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Bond"
							type="number"
							fullWidth
							InputProps={{
								inputProps: {
									min: 1
								}
							}}
							error={!!errors.employeeWorkInformation?.bond}
							helperText={errors.employeeWorkInformation?.bond?.message as string}
						/>
					)}
				/>
				<div className="flex -mx-4">
					<Controller
						name="employeeWorkInformation.salaryType"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								select
								className="mx-4"
								label="Salary Type"
								fullWidth
								required
								error={!!errors.employeeWorkInformation?.salaryType}
								helperText={errors.employeeWorkInformation?.salaryType?.message as string}
							>
								{Object.values(SalaryType).map((type) => (
									<MenuItem
										key={type}
										value={type}
									>
										{type}
									</MenuItem>
								))}
							</TextField>
						)}
					/>

					<Controller
						name="employeeWorkInformation.salary"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Salary"
								type="number"
								className="mx-4"
								required
								InputProps={{
									inputProps: {
										min: 1
									},
									startAdornment: <InputAdornment position="start">₹</InputAdornment>
								}}
								fullWidth
								error={!!errors.employeeWorkInformation?.salary}
								helperText={errors.employeeWorkInformation?.salary?.message as string}
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
						Hiring Information
					</Typography>
				</div>

				<div className="flex -mx-4">
					<Controller
						control={control}
						name="employeeWorkInformation.hireDate"
						render={({ field: { value, onChange } }) => (
							<DatePicker
								value={new Date(value)}
								onChange={(val) => {
									onChange(val?.toISOString());
								}}
								className="mx-4"
								slotProps={{
									textField: {
										label: 'Hire Date',
										required: true,
										InputLabelProps: {
											shrink: true
										},
										fullWidth: true,
										variant: 'outlined',
										error: !!errors.employeeWorkInformation?.hireDate,
										margin: 'normal',
										helperText: errors.employeeWorkInformation?.hireDate?.message as string
									},
									actionBar: {
										actions: ['clear']
									}
								}}
							/>
						)}
					/>

					<Controller
						control={control}
						name="employeeWorkInformation.confirmationDate"
						render={({ field: { value, onChange } }) => (
							<DatePicker
								value={new Date(value)}
								onChange={(val) => {
									onChange(val?.toISOString());
								}}
								className="mx-4"
								slotProps={{
									textField: {
										label: 'Confirmation Date',
										InputLabelProps: {
											shrink: true
										},
										fullWidth: true,
										variant: 'outlined',
										error: !!errors.employeeWorkInformation?.confirmationDate,
										margin: 'normal',
										helperText: errors.employeeWorkInformation?.confirmationDate?.message as string
									},
									actionBar: {
										actions: ['clear']
									}
								}}
							/>
						)}
					/>

					<Controller
						name="employeeWorkInformation.totalPreviousExperience"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								value={field.value}
								label="Total Years of Previous Experience"
								fullWidth
								type="number"
								margin="normal"
								variant="outlined"
								placeholder="Total Years of Previous Experience"
								className="mx-4"
								error={!!errors.employeeWorkInformation?.totalPreviousExperience}
								helperText={errors?.employeeWorkInformation?.totalPreviousExperience?.message as string}
							/>
						)}
					/>
				
				</div>
			</div>
			<div className="space-y-16">
        <div className="flex items-center border-b-1 space-x-8 pb-8">
          <FuseSvgIcon color="action" size={24}>
            heroicons-outline:user-circle
          </FuseSvgIcon>
          <Typography className="text-2xl" color="text.secondary">
            Leave Information 
          </Typography>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={useDefaultLeaves}
              onChange={(e) => setUseDefaultLeaves(e.target.checked)}
            />
          }
          label="Use Default Leaves"
        />
        {!useDefaultLeaves && (
          <div className="space-y-4">
            {employeeLeaveTypes.map((field1, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <Controller
                    name={`employeeLeaves.${index}.employeeLeaveTypeId`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={field1.employeeLeaveType}
                        label="Employee Leave Type"
                        fullWidth
                        type="text"
						InputLabelProps={{ shrink: true, }}
                        InputProps={{
                          readOnly: true,
                        }}
                        margin="normal"
                        className="mx-4"
                      />
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Controller
                    name={`employeeLeaves.${index}.totalLeaves`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
						
                        label="Total Leaves"
                        type="number"
                        margin="normal"
                        variant="outlined"
						InputLabelProps={{ shrink: !!field1.totalLeaves,}}
                        placeholder="Total Leaves"
                        className="mx-4"
                      />
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

		</div>
	);
}

export default WorkInfoTab;

