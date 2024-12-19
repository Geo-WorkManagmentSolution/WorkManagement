import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Box, InputAdornment, Drawer, Typography, Select, MenuItem, FormControl, InputLabel, FormHelperText, Autocomplete, Checkbox } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppDispatch } from 'app/store/hooks';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { DatePicker } from '@mui/x-date-pickers';
import TaskPrioritySelector from './TaskPrioritySelector';
import {
	usePostApiProjectProjectTaskMutation,
	usePutApiProjectProjectTaskByIdMutation,
	useDeleteApiProjectTaskByTaskIdAndProjectIdMutation,
	useGetApiProjectProjectTaskByIdQuery,
	TaskModel,
	ProjectTaskPriorityStatus,
	ProjectTaskStatus,
	useGetApiProjectByProjectIdEmployeesQuery,
	EmployeeTeamMemberList
} from '../../../ProjectApi';

const schema = z.object({
	id: z.number().optional(),
	title: z.string().nonempty('You must enter a title'),
	description: z.string().nonempty('Description is required'),
	notes: z.string().nullable().optional(),
	priority: z.nativeEnum(ProjectTaskPriorityStatus),
	startDate: z.string().nonempty('Start date is required'),
	endDate: z.string().nonempty('End date is required'),
	estimatedHours: z.number().nonnegative('Estimated hours must be non-negative'),
	remainingHours: z.number().nonnegative('Remaining hours must be non-negative').nullable().optional(),
	completedHours: z.number().nonnegative('Completed hours must be non-negative').nullable().optional(),
	assignedEmployees: z.array(z.number()).optional(),
	projectId: z.number(),
	status: z.nativeEnum(ProjectTaskStatus).optional()
}).refine((data) => {
	if (data.startDate && data.endDate) {
		return new Date(data.startDate) <= new Date(data.endDate);
	}
	return true;
}, {
	message: "Start date must be before or equal to end date",
	path: ["endDate"],
});

type TaskFormProps = {
	projectId: number;
	taskId?: number | null;
	open: boolean;
	onClose: () => void;
  taskData?: TaskModel | null;
};

function TaskForm({ projectId, taskId, open, onClose, taskData }: TaskFormProps) {
	const dispatch = useAppDispatch();
	const [createTask] = usePostApiProjectProjectTaskMutation();
	const [updateTask] = usePutApiProjectProjectTaskByIdMutation();
	const [deleteTask] = useDeleteApiProjectTaskByTaskIdAndProjectIdMutation();
	const { data: taskDataFromQuery, isLoading } = useGetApiProjectProjectTaskByIdQuery(
		{ id: taskId || 0 },
		{ skip: !taskId }
	);

	const {
		control,
		reset,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<TaskModel>({
		mode: 'onChange',
		resolver: zodResolver(schema),
		defaultValues: {
			title: '',
			description: '',
			notes: '',
			priority: ProjectTaskPriorityStatus.Medium,
			startDate: new Date().toISOString(),
			endDate: new Date().toISOString(),
			estimatedHours: 0,
			remainingHours: null,
			completedHours: null,
			assignedEmployees: [],
			projectId,
			status: ProjectTaskStatus.New
		}
	});

	useEffect(() => {
		if (taskData && taskId) {
			reset({
				...taskData,
				startDate: taskData.startDate || new Date().toISOString(),
				endDate: taskData.endDate || new Date().toISOString(),
				estimatedHours: taskData.estimatedHours || 0,
				remainingHours: taskData.remainingHours || null,
				completedHours: taskData.completedHours || null,
				assignedEmployees: taskData.assignedEmployees || [],
				status: taskData.status || ProjectTaskStatus.New
			});
		} else {
			reset({
				title: '',
				description: '',
				notes: '',
				priority: ProjectTaskPriorityStatus.Medium,
				startDate: new Date().toISOString(),
				endDate: new Date().toISOString(),
				estimatedHours: 0,
				remainingHours: null,
				completedHours: null,
				assignedEmployees: [],
				projectId,
				status: ProjectTaskStatus.New
			});
		}
	}, [taskData, reset, projectId, taskId]);

	const handleUpdate = async (data: TaskModel) => {
		if (!taskId) {
			console.error('No task to update or missing task ID');
			dispatch(showMessage({ message: 'Error: No task to update', variant: 'error' }));
			return;
		}

		try {
			await updateTask({
				id: taskId,
				taskModel: { ...data, id: taskId, projectId }
			}).unwrap();
			dispatch(showMessage({ message: 'Task updated successfully', variant: 'success' }));
			onClose();
		} catch (error) {
			console.error('Error updating task:', error);
			dispatch(showMessage({ message: 'Error updating task', variant: 'error' }));
		}
	};

	const onSubmit = async (data: TaskModel) => {
		try {
			await createTask({ taskModel: { ...data, projectId } }).unwrap();
			dispatch(showMessage({ message: 'Task created successfully', variant: 'success' }));
			onClose();
		} catch (error) {
			console.error('Error saving task:', error);
			dispatch(showMessage({ message: 'Error saving task', variant: 'error' }));
		}
	};

	const handleDelete = async () => {
		if (taskId) {
			try {
				await deleteTask({ taskId, projectId }).unwrap();
				dispatch(showMessage({ message: 'Task deleted successfully', variant: 'success' }));
				onClose();
			} catch (error) {
				console.error('Error deleting task:', error);
				dispatch(showMessage({ message: 'Error deleting task', variant: 'error' }));
			}
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: { width: '100%', maxWidth: 800 }
			}}
		>
			<div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
				<div className="flex items-center border-b-1 space-x-8 pb-8 mt-14">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:check-circle
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						{taskId ? 'Edit Task' : 'Add Task'}
					</Typography>
				</div>
				<form onSubmit={handleSubmit(taskId ? handleUpdate : onSubmit)}>
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-32"
								label="Title"
								value={field.value || ''}
								fullWidth
								required
								margin="normal"
								error={!!errors.title}
								helperText={errors.title?.message}
							/>
						)}
					/>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Description"
								fullWidth
								value={field.value || ''}
								required
								margin="normal"
								multiline
								rows={4}
								error={!!errors.description}
								helperText={errors.description?.message}
							/>
						)}
					/>
					<Controller
						name="notes"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Notes"
								fullWidth
								margin="normal"
								value={field.value || ''}
								multiline
								className="mt-32"
								rows={4}
								InputProps={{
									className: 'max-h-min h-min items-start',
									startAdornment: (
										<InputAdornment
											className="mt-16"
											position="start"
										>
											<FuseSvgIcon size={20}>heroicons-solid:bars-3-bottom-left</FuseSvgIcon>
										</InputAdornment>
									)
								}}
							/>
						)}
					/>

					<div className="flex w-full space-x-16 mt-32 mb-16 items-center">
						<Controller
							name="priority"
							control={control}
							render={({ field }) => (
								<TaskPrioritySelector
									{...field}
									className="mt-14"
								/>
							)}
						/>
						<Controller
							name="startDate"
							control={control}
							render={({ field }) => (
								<DatePicker
									label="Start Date"
									value={field.value ? new Date(field.value) : null}
									onChange={(date) => field.onChange(date?.toISOString())}
									slotProps={{
										textField: {
											fullWidth: true,
											// margin: 'normal',
											error: !!errors.startDate,
											helperText: errors.startDate?.message
										},
										actionBar: {
											actions: ['clear', 'today']
										}
									}}
								/>
							)}
						/>
						<Controller
							name="endDate"
							control={control}
							render={({ field }) => (
								<DatePicker
									label="End Date"
									value={field.value ? new Date(field.value) : null}
									onChange={(date) => field.onChange(date?.toISOString())}
									slotProps={{
										textField: {
											fullWidth: true,
											// margin: 'normal',
											error: !!errors.endDate,
											helperText: errors.endDate?.message
										},
										actionBar: {
											actions: ['clear', 'today']
										}
									}}
								/>
							)}
						/>
					</div>
					<div className='flex space-x-8'>
					<Controller
						name="estimatedHours"
						control={control}
						rules={{ required: 'Estimated hours is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								label="Estimated Hours"
								type="number"
								value={field.value || 0}
								fullWidth
								margin="normal"
								error={!!errors.estimatedHours}
								helperText={errors.estimatedHours?.message}
								onChange={(e) => field.onChange(parseFloat(e.target.value))}
							/>
						)}
					/>
					<Controller
						name="remainingHours"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Remaining Hours"
								type="number"
								value={field.value || 0}
								fullWidth
								margin="normal"
								error={!!errors.remainingHours}
								helperText={errors.remainingHours?.message}
								onChange={(e) => field.onChange(parseFloat(e.target.value))}
							/>
						)}
					/>
					<Controller
						name="completedHours"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Completed Hours"
								type="number"
								value={field.value || 0}
								fullWidth
								margin="normal"
								error={!!errors.completedHours}
								helperText={errors.completedHours?.message}
								onChange={(e) => field.onChange(parseFloat(e.target.value))}
							/>
						)}
					/>
					</div>
					{taskId && (
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<FormControl fullWidth margin="normal" error={!!errors.status}>
									<InputLabel id="status-label">Status</InputLabel>
									<Select
										{...field}
										labelId="status-label"
										label="Status"
									>
										{Object.values(ProjectTaskStatus).map((status) => (
											<MenuItem key={status} value={status}>
												{status}
											</MenuItem>
										))}
									</Select>
									{errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
								</FormControl>
							)}
						/>
					)}
					<Controller
						name="assignedEmployees"
						control={control}
						render={({ field: { onChange, value } }) => {
							const { data: employees } = useGetApiProjectByProjectIdEmployeesQuery({ projectId });
							return (
								<Autocomplete
									multiple
									id="assignedEmployees"
									options={employees || []}
									disableCloseOnSelect
									getOptionLabel={(option: EmployeeTeamMemberList) => option?.name || ''}
									renderOption={(props, option: EmployeeTeamMemberList, { selected }) => {
										const { key, ...propsWithoutKey } = props;
										return (
											<li {...propsWithoutKey}>
												<Checkbox
													style={{ marginRight: 8 }}
													checked={selected}
												/>
												{option?.name}
											</li>
										);
									}}
									value={value ? value.map((id) => employees?.find((emp) => emp.employeeId === id)) : []}
									onChange={(event, newValue) => {
										onChange(newValue.map((item: EmployeeTeamMemberList) => item.employeeId));
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Assigned Employees"
											placeholder="Select employees"
										/>
									)}
								/>
							);
						}}
					/>
					<Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							onClick={onClose}
							sx={{ mr: 1 }}
						>
							Cancel
						</Button>
						{taskId ? (
							<>
								<Button
									onClick={handleDelete}
									color="error"
									sx={{ mr: 1 }}
								>
									Delete
								</Button>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									disabled={!isValid}
								>
									Update
								</Button>
							</>
						) : (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={!isValid}
							>
								Create
							</Button>
						)}
					</Box>
				</form>
			</div>
		</Drawer>
	);
}

export default TaskForm;

