import React from 'react';
import {
	Button,
	TextField,
	Switch,
	FormControlLabel,
	TextareaAutosize,
	Popover,
	Typography,
	Box,
	Collapse,
	Alert,
	IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { GridCloseIcon } from '@mui/x-data-grid';
import { Event, LeaveBalance } from './types';
import EventLabelSelect from './EventLabelSelect';

interface EventDialogProps {
	event: Event | null;
	isNewEvent: boolean;
	anchorEl: HTMLElement | null;
	onClose: () => void;
	onSave: (event: Event) => void;
	onDelete: (eventId: string) => void;
	leaveBalance: LeaveBalance;
	alertMessage: string;
	setAlertOpen: (value: boolean) => void;
	alertopen: boolean;
}

const eventSchema = z.object({
	id: z.string(),
	start: z.date(),
	end: z.date(),
	reason: z.string().nonempty({ message: 'Reason is required' }),
	summary: z.string().nonempty({ message: 'Summary is required' }),
	leaveType: z.string(),
	halfDay: z.boolean(),
	fullDay: z.boolean()
});

export default function EventDialog({
	event,
	isNewEvent,
	anchorEl,
	onClose,
	onSave,
	onDelete,
	leaveBalance,
	alertMessage,
	alertopen,
	setAlertOpen
}: EventDialogProps) {
	const {
		control,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors }
	} = useForm<Event>({
		resolver: zodResolver(eventSchema),
		defaultValues: event || {
			id: '',
			start: new Date(),
			end: new Date(),
			reason: '',
			summary: '',
			leaveType: 'Casual Leave',
			halfDay: false,
			fullDay: false
		}
	});

	React.useEffect(() => {
		reset(
			event || {
				id: '',
				start: new Date(),
				end: new Date(),
				reason: '',
				summary: '',
				leaveType: 'Casual Leave',
				halfDay: false,
				fullDay: false
			}
		);
	}, [event, reset]);

	const handleSave = (data: Event) => {
		onSave(data);
	};

	const handleDelete = () => {
		if (event) {
			onDelete(event.id);
		}

		onClose();
	};

	const reasonValue = watch('reason');
	const summaryValue = watch('summary');
	const fullDay = watch('fullDay');
	const halfDay = watch('halfDay');
	const leaveType = watch('leaveType');

	const isSaveButtonDisabled = !reasonValue || !summaryValue;

	const handleFullDayChange = (checked: boolean) => {
		setValue('fullDay', checked);

		if (checked) {
			setValue('halfDay', false);
		}
	};

	const handleHalfDayChange = (checked: boolean) => {
		setValue('halfDay', checked);

		if (checked) {
			setValue('fullDay', false);
		}
	};

	return (
		<Popover
			open={Boolean(anchorEl)}
			anchorEl={anchorEl}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
		>
			{alertMessage !== '' && (
				<Box sx={{ position: 'absolute', width: 'full' }}>
					<Collapse in={alertopen}>
						<Alert
							severity="error"
							action={
								<IconButton
									aria-label="close"
									color="error"
									size="small"
									onClick={() => {
										setAlertOpen(false);
									}}
								>
									<GridCloseIcon fontSize="medium" />
								</IconButton>
							}
							sx={{ mb: 2 }}
						>
							{alertMessage}
						</Alert>
					</Collapse>
				</Box>
			)}

			<form
				onSubmit={handleSubmit(handleSave)}
				className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480"
			>
				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex mt-16"
						color="action"
					>
						heroicons-outline:calendar
					</FuseSvgIcon>
					<div className="w-full">
						<div className="flex flex-column sm:flex-row w-full items-center space-x-16">
							<Controller
								name="start"
								control={control}
								render={({ field }) => (
									<DatePicker
										className="mt-8 mb-16 w-full"
										label="From"
										value={field.value}
										onChange={(date) => field.onChange(date)}
									/>
								)}
							/>
							<Controller
								name="end"
								control={control}
								render={({ field }) => (
									<DatePicker
										className="mt-8 mb-16 w-full"
										label="To"
										value={field.value}
										onChange={(date) => field.onChange(date)}
									/>
								)}
							/>
						</div>

						<Controller
							name="fullDay"
							control={control}
							render={({ field }) => (
								<FormControlLabel
									control={
										<Switch
											checked={field.value}
											onChange={(e) => handleFullDayChange(e.target.checked)}
										/>
									}
									label="Full Day"
								/>
							)}
						/>
						<Controller
							name="halfDay"
							control={control}
							render={({ field }) => (
								<FormControlLabel
									control={
										<Switch
											checked={field.value}
											onChange={(e) => handleHalfDayChange(e.target.checked)}
										/>
									}
									label="Half Day"
								/>
							)}
						/>
					</div>
				</div>
				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex mt-16"
						color="action"
					>
						heroicons-outline:tag
					</FuseSvgIcon>
					<Controller
						name="leaveType"
						control={control}
						render={({ field }) => (
							<EventLabelSelect
								onChange={field.onChange}
								value={field.value}
							/>
						)}
					/>
				</div>
				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex mt-16"
						color="action"
					>
						heroicons-outline:pencil-square
					</FuseSvgIcon>
					<Controller
						name="reason"
						control={control}
						render={({ field }) => (
							<TextField
								size="medium"
								label="Reason"
								variant="outlined"
								autoFocus
								required
								fullWidth
								{...field}
								error={!!errors?.reason}
								helperText={errors.reason?.message}
							/>
						)}
					/>
				</div>
				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex mt-16"
						color="action"
					>
						heroicons-outline:bars-3-bottom-left
					</FuseSvgIcon>
					<Controller
						name="summary"
						control={control}
						render={({ field }) => (
							<TextareaAutosize
								placeholder="Summary"
								className="mt-8 mb-16 w-full p-2 border rounded bg-inherit"
								minRows={3}
								autoFocus
								required
								{...field}
							/>
						)}
					/>
					{errors?.summary && (
						<span style={{ color: 'red', marginTop: '-15px' }}>{errors.summary?.message}</span>
					)}
				</div>
				<div className="flex sm:space-x-24 mb-16">
					<FuseSvgIcon
						className="hidden sm:inline-flex "
						color="action"
					>
						heroicons-outline:information-circle
					</FuseSvgIcon>
					<Typography>
						Available {leaveType} Balance:{' '}
						{leaveBalance && leaveBalance[leaveType] !== undefined ? leaveBalance[leaveType] : 'N/A'}
					</Typography>
				</div>
				<div className="flex justify-between">
					<Button
						disabled={isSaveButtonDisabled}
						type="submit"
						variant="contained"
						color="primary"
					>
						{isNewEvent ? 'Add' : 'Update'}
					</Button>
					{!isNewEvent && (
						<Button
							onClick={handleDelete}
							variant="contained"
							color="secondary"
						>
							Cancel Leave
						</Button>
					)}
				</div>
			</form>
		</Popover>
	);
}
