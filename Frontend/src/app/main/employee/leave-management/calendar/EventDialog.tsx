import React from 'react';
import {
	Button,
	TextField,
	Switch,
	FormControlLabel,
	Select,
	MenuItem,
	TextareaAutosize,
	Popover
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Event, leaveTypes } from './types';

interface EventDialogProps {
	event: Event | null;
	isNewEvent: boolean;
	anchorEl: HTMLElement | null;
	onClose: () => void;
	onSave: (event: Event) => void;
	onDelete: (event: Event) => void;
}

export default function EventDialog({ event, isNewEvent, anchorEl, onClose, onSave, onDelete }: EventDialogProps) {
	const [localEvent, setLocalEvent] = React.useState<Event | null>(event);

	React.useEffect(() => {
		setLocalEvent(event);
	}, [event]);

	if (!localEvent) return null;

	const handleSave = () => {
		if (localEvent) {
			onSave(localEvent);
		}
	};

	const handleDelete = () => {
		if (localEvent) {
			onDelete(localEvent);
		}
	};

	return (
		<Popover
			open={Boolean(anchorEl)}
			anchorEl={anchorEl}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
		>
			<div className="bg-white p-24">
				<div className="p-4 space-y-4">
					<div className="space-x-16">
						<DatePicker
							label="From"
							value={localEvent.start}
							onChange={(date) => date && setLocalEvent({ ...localEvent, start: date })}
						/>
						<DatePicker
							label="To"
							value={localEvent.end}
							onChange={(date) => date && setLocalEvent({ ...localEvent, end: date })}
						/>
					</div>
					<div>
						<Select
							value={localEvent.extendedProps.leaveType}
							onChange={(e) =>
								setLocalEvent({
									...localEvent,
									extendedProps: {
										...localEvent.extendedProps,
										leaveType: e.target.value
									}
								})
							}
							fullWidth
						>
							{leaveTypes.map((type) => (
								<MenuItem
									key={type}
									value={type}
								>
									{type}
								</MenuItem>
							))}
						</Select>
					</div>

					<TextField
						label="Reason"
						value={localEvent.extendedProps.reason}
						onChange={(e) =>
							setLocalEvent({
								...localEvent,
								extendedProps: {
									...localEvent.extendedProps,
									reason: e.target.value
								}
							})
						}
						fullWidth
					/>
					<TextareaAutosize
						placeholder="Summary"
						value={localEvent.extendedProps.summary}
						onChange={(e) =>
							setLocalEvent({
								...localEvent,
								extendedProps: {
									...localEvent.extendedProps,
									summary: e.target.value
								}
							})
						}
						minRows={3}
						className="w-full p-2 border rounded"
					/>

					<div className="flex justify-between">
						<FormControlLabel
							control={
								<Switch
									checked={localEvent.extendedProps.halfDay}
									onChange={(e) =>
										setLocalEvent({
											...localEvent,
											extendedProps: {
												...localEvent.extendedProps,
												halfDay: e.target.checked
											}
										})
									}
								/>
							}
							label="Half Day"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={localEvent.extendedProps.fullDay}
									onChange={(e) =>
										setLocalEvent({
											...localEvent,
											extendedProps: {
												...localEvent.extendedProps,
												fullDay: e.target.checked
											}
										})
									}
								/>
							}
							label="Full Day"
						/>
					</div>

					<div className="flex justify-between">
						<Button
							onClick={handleSave}
							variant="contained"
							color="primary"
						>
							{isNewEvent ? 'Add' : 'Save'}
						</Button>
						{!isNewEvent && (
							<Button
								onClick={handleDelete}
								variant="contained"
								color="secondary"
							>
								Delete
							</Button>
						)}
					</div>
				</div>
			</div>
		</Popover>
	);
}
