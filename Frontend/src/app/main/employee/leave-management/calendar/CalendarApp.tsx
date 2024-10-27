'use client';

import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
	DateSelectArg,
	EventClickArg,
	DatesSetArg,
	EventAddArg,
	EventChangeArg,
	EventContentArg
} from '@fullcalendar/core';
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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';

// Hardcoded leave types
const leaveTypes = ['Vacation', 'Sick Leave', 'Personal Leave', 'Work From Home'];

// Event model
type Event = {
	id: string;
	title: string;
	start: Date;
	end: Date;
	allDay: boolean;
	extendedProps: {
		reason: string;
		summary: string;
		leaveType: string;
		halfDay: boolean;
		fullDay: boolean;
	};
};

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .container': {
		maxWidth: '100%!important'
	},
	'& a': {
		color: `${theme.palette.text.primary}!important`,
		textDecoration: 'none!important'
	},
	'&  .fc-media-screen': {
		minHeight: '100%',
		width: '100%'
	},
	'& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
		borderColor: `${theme.palette.divider}!important`
	},
	'&  .fc-scrollgrid-section > td': {
		border: 0
	},
	'& .fc-daygrid-day': {
		'&:last-child': {
			borderRight: 0
		}
	},
	'& .fc-col-header-cell': {
		borderWidth: '0 1px 0 1px',
		padding: '8px 0 0 0',
		'& .fc-col-header-cell-cushion': {
			color: theme.palette.text.secondary,
			fontWeight: 500,
			fontSize: 12,
			textTransform: 'uppercase'
		}
	},
	'& .fc-view ': {
		'& > .fc-scrollgrid': {
			border: 0
		}
	},
	'& .fc-daygrid-day.fc-day-today': {
		backgroundColor: 'transparent!important',
		'& .fc-daygrid-day-number': {
			borderRadius: '100%',
			backgroundColor: `${theme.palette.secondary.main}!important`,
			color: `${theme.palette.secondary.contrastText}!important`
		}
	},
	'& .fc-daygrid-day-top': {
		justifyContent: 'center',

		'& .fc-daygrid-day-number': {
			color: theme.palette.text.secondary,
			fontWeight: 500,
			fontSize: 12,
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: 26,
			height: 26,
			margin: '4px 0',
			borderRadius: '50%',
			float: 'none',
			lineHeight: 1
		}
	},
	'& .fc-h-event': {
		background: 'initial'
	},
	'& .fc-event': {
		border: 0,
		padding: '0 ',
		fontSize: 12,
		margin: '0 6px 4px 6px!important'
	}
}));

function CalendarHeader({ calendarRef, currentDate }) {
	return (
		<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-24">
			<h1 className="text-2xl font-semibold">Calendar</h1>
			<div className="flex items-center space-x-4">
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						calendarRef.current.getApi().today();
					}}
				>
					Today
				</Button>
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => {
						calendarRef.current.getApi().prev();
					}}
				>
					Prev
				</Button>
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => {
						calendarRef.current.getApi().next();
					}}
				>
					Next
				</Button>
			</div>
			<h2 className="text-xl">{currentDate?.view.title}</h2>
		</div>
	);
}

export default function CalendarApp() {
	const [events, setEvents] = useState<Event[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [isNewEvent, setIsNewEvent] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [currentDate, setCurrentDate] = useState<DatesSetArg | null>(null);
	const calendarRef = useRef<FullCalendar>(null);

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		setIsNewEvent(true);
		setSelectedEvent({
			id: String(Date.now()),
			title: '',
			start: selectInfo.start,
			end: selectInfo.end,
			allDay: selectInfo.allDay,
			extendedProps: {
				reason: '',
				summary: '',
				leaveType: leaveTypes[0],
				halfDay: false,
				fullDay: false
			}
		});
		setAnchorEl(selectInfo.jsEvent.target as HTMLElement);
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		setIsNewEvent(false);
		setSelectedEvent(clickInfo.event.toPlainObject() as Event);
		setAnchorEl(clickInfo.jsEvent.target as HTMLElement);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
		setSelectedEvent(null);
	};

	const handleSaveEvent = () => {
		if (selectedEvent) {
			if (isNewEvent) {
				setEvents([...events, selectedEvent]);
			} else {
				setEvents(events.map((event) => (event.id === selectedEvent.id ? selectedEvent : event)));
			}

			console.log('Event saved:', selectedEvent);
			handleClosePopover();
		}
	};

	const handleDeleteEvent = () => {
		if (selectedEvent) {
			setEvents(events.filter((event) => event.id !== selectedEvent.id));
			console.log('Event deleted:', selectedEvent);
			handleClosePopover();
		}
	};

	const handleDatesSet = (arg: DatesSetArg) => {
		setCurrentDate(arg);
	};

	const handleEventAdd = (arg: EventAddArg) => {
		console.log('Event added:', arg.event.toPlainObject());
	};

	const handleEventChange = (arg: EventChangeArg) => {
		console.log('Event changed:', arg.event.toPlainObject());
	};

	const handleEventContent = (arg: EventContentArg) => {
		return (
			<>
				<b>{arg.timeText}</b>
				<i>{arg.event.title}</i>
			</>
		);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Root
				header={
					<CalendarHeader
						calendarRef={calendarRef}
						currentDate={currentDate}
					/>
				}
				content={
					<div className="w-full">
						<FullCalendar
							plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
							headerToolbar={false}
							initialView="dayGridMonth"
							editable
							selectable
							selectMirror
							dayMaxEvents
							weekends
							events={events}
							select={handleDateSelect}
							eventClick={handleEventClick}
							datesSet={handleDatesSet}
							eventAdd={handleEventAdd}
							eventChange={handleEventChange}
							eventContent={handleEventContent}
							ref={calendarRef}
						/>

						<Popover
							open={Boolean(anchorEl)}
							anchorEl={anchorEl}
							onClose={handleClosePopover}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
						>
							{selectedEvent && (
								<div className="p-4 space-y-4">
									<TextField
										label="Reason"
										value={selectedEvent.extendedProps.reason}
										onChange={(e) =>
											setSelectedEvent({
												...selectedEvent,
												extendedProps: {
													...selectedEvent.extendedProps,
													reason: e.target.value
												}
											})
										}
										fullWidth
									/>
									<TextareaAutosize
										placeholder="Summary"
										value={selectedEvent.extendedProps.summary}
										onChange={(e) =>
											setSelectedEvent({
												...selectedEvent,
												extendedProps: {
													...selectedEvent.extendedProps,
													summary: e.target.value
												}
											})
										}
										minRows={3}
										className="w-full p-2 border rounded"
									/>
									<Select
										value={selectedEvent.extendedProps.leaveType}
										onChange={(e) =>
											setSelectedEvent({
												...selectedEvent,
												extendedProps: {
													...selectedEvent.extendedProps,
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
									<div className="flex justify-between">
										<FormControlLabel
											control={
												<Switch
													checked={selectedEvent.extendedProps.halfDay}
													onChange={(e) =>
														setSelectedEvent({
															...selectedEvent,
															extendedProps: {
																...selectedEvent.extendedProps,
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
													checked={selectedEvent.extendedProps.fullDay}
													onChange={(e) =>
														setSelectedEvent({
															...selectedEvent,
															extendedProps: {
																...selectedEvent.extendedProps,
																fullDay: e.target.checked
															}
														})
													}
												/>
											}
											label="Full Day"
										/>
									</div>
									<DateTimePicker
										label="From"
										value={selectedEvent.start}
										onChange={(date) => date && setSelectedEvent({ ...selectedEvent, start: date })}
									/>
									<DateTimePicker
										label="To"
										value={selectedEvent.end}
										onChange={(date) => date && setSelectedEvent({ ...selectedEvent, end: date })}
									/>
									<div className="flex justify-between">
										<Button
											onClick={handleSaveEvent}
											variant="contained"
											color="primary"
										>
											{isNewEvent ? 'Add' : 'Save'}
										</Button>
										{!isNewEvent && (
											<Button
												onClick={handleDeleteEvent}
												variant="contained"
												color="secondary"
											>
												Delete
											</Button>
										)}
									</div>
								</div>
							)}
						</Popover>
					</div>
				}
			/>
		</LocalizationProvider>
	);
}
