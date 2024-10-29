import React from 'react';
import { Button, TextField, Switch, FormControlLabel, TextareaAutosize, Popover } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Event } from './types';
import EventLabelSelect from './EventLabelSelect';

interface EventDialogProps {
	event: Event | null;
	isNewEvent: boolean;
	anchorEl: HTMLElement | null;
	onClose: () => void;
	onSave: (event: Event) => void;
	onDelete: (eventId: string) => void;
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

export default function EventDialog({ event, isNewEvent, anchorEl, onClose, onSave, onDelete }: EventDialogProps) {
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
			leaveType: 'Vacation',
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
				leaveType: 'Vacation',
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
									<DateTimePicker
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
									<DateTimePicker
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
