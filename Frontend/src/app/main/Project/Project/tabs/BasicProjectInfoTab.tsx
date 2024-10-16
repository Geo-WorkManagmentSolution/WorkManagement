import {
	TextField
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The basic info tab.
 */

function BasicProjectInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
	return (
		<div>
			<div className="flex -mx-4">
				<Controller
					name="projectName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							value={field.value || ''}
							className=" mx-4"
							required
							label="Project Name"
							fullWidth
							margin="normal"
							error={!!errors?.projectName}
							helperText={errors?.projectName?.message as string}
						/>
					)}
				/>

				<Controller
					name="projectNumber"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							value={field.value || ''}
							className=" mx-4"
							label="Project Number"
							fullWidth
							margin="normal"
							error={!!errors?.projectNumber}
							helperText={errors?.projectNumber?.message as string}
						/>
					)}
				/>
			</div>
			<div className="flex -mx-8">
				<Controller
					name="projectDescription"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							value={field.value || ''}
							label="Project Description"
							fullWidth
							margin="normal"
							className="mx-4"
							error={!!errors.projectDescription}
							helperText={errors?.projectDescription?.message as string}
						/>
					)}
				/>
			</div>
			<div className="flex -mx-4">
				<Controller
					control={control}
					name="startDate"
					render={({ field: { value, onChange } }) => (
						<DateTimePicker
							value={new Date(value)}
							onChange={(val) => {
								onChange(val?.toISOString());
							}}
							className="mx-4"
							slotProps={{
								textField: {
									id: 'startDate',
									label: 'Start Date',
									InputLabelProps: {
										shrink: true
									},
									fullWidth: true,
									variant: 'outlined',
									error: !!errors.startDate,
									margin:"normal",
									helperText: errors?.startDate?.message
								},
								actionBar: {
									actions: ['clear', 'today']
								}
							}}
						/>
					)}
				/>
				<Controller
					control={control}
					name="endDate"
					render={({ field: { value, onChange } }) => (
						<DateTimePicker
							
							value={new Date(value)}
							onChange={(val) => {
								onChange(val?.toISOString());
							}}
							className="mx-4"
							slotProps={{
								textField: {
									id: 'endDate',
									label: 'End Date',
									InputLabelProps: {
										shrink: true
									},
									fullWidth: true,
									variant: 'outlined',
									error: !!errors.endDate,
									margin:"normal",
									helperText: errors?.endDate?.message
								},
								actionBar: {
									actions: ['clear', 'today']
								}
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default BasicProjectInfoTab;
