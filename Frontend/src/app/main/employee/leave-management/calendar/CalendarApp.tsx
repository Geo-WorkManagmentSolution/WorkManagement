import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';

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

import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import FusePageSimple from '@fuse/core/FusePageSimple';
import CalendarHeader from './CalendarHeader';
import EventDialog from './EventDialog';
import { Event, holidays, leaveTypes } from './types';
import LeaveTypeSelector from './LeaveTypeSelctor';
import {
	addLeave,
	updateLeave,
	cancelLeave,
	setInitialEvents,
	selectEvents,
	selectLeaveBalance
} from './LeaveManagementSlice';

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

export default function CalendarApp() {
	const dispatch = useAppDispatch();
	const events = useAppSelector(selectEvents);
	const leaveBalance = useAppSelector(selectLeaveBalance);
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [isNewEvent, setIsNewEvent] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [leaveAnchor, setLeaveAnchor] = useState<HTMLElement | null>(null);
	const [currentDate, setCurrentDate] = useState<DatesSetArg | null>(null);
	const [selectedLabels, setSelectedLabels] = useState(leaveTypes.map((type) => type.leaveType));
	// const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [alertopen, setAlertOpen] = useState(false);

	const [alertMessage, setAlertMessage] = useState('');
	const calendarRef = useRef<FullCalendar>(null);
	const theme = useTheme();

	useEffect(() => {
		const storedEvents: string = localStorage.getItem('calendarEvents');

		if (storedEvents) {
			dispatch(setInitialEvents(JSON.parse(storedEvents)));
		}
	}, [dispatch]);

	useEffect(() => {
		localStorage.setItem('calendarEvents', JSON.stringify(events));
	}, [events]);

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		const start = new Date(selectInfo.start);
		let end = new Date(selectInfo.end);

		// Adjust end date to be inclusive
		end.setDate(end.getDate() - 1);

		// If it's a single day selection, set both start and end to the same day
		if (start.getTime() === end.getTime()) {
			end = new Date(start);
		}

		setIsNewEvent(true);
		setSelectedEvent({
			id: String(Date.now()),
			reason: '',
			summary: '',
			leaveType: 'Casual Leave',
			halfDay: false,
			fullDay: false,
			start,
			end
		});
		setAnchorEl(selectInfo.jsEvent.target as HTMLElement);
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		setIsNewEvent(false);
		const eventData = clickInfo.event;
		setSelectedEvent({
			id: eventData.id,
			reason: eventData.extendedProps.reason || '',
			summary: eventData.extendedProps.summary || '',
			leaveType: eventData.extendedProps.leaveType || 'Casual Leave',
			halfDay: eventData.extendedProps.halfDay || false,
			fullDay: eventData.extendedProps.fullDay || false,
			start: clickInfo.event.start || new Date(),
			end: eventData.end 
		});
		setAnchorEl(clickInfo.jsEvent.target as HTMLElement);
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
		setSelectedEvent(null);
	};

	const handleLeaveSelectorPopOver = () => {
		setLeaveAnchor(null);
	};

	// const handleSaveEvent = (event: Event) => {
	// 	const existingLeave = events.find((e) => e.start <= event.end && e.end >= event.start && e.id !== event.id);

	// 	if (existingLeave) {
	// 		setAlertMessage('A leave already exists for the selected date range.');
	// 		setAlertOpen(true);
	// 		return;
	// 	}

	// 	if (isNewEvent) {
	// 		dispatch(addLeave(event));
	// 	} else {
	// 		dispatch(updateLeave(event));
	// 	}

	// 	handleClosePopover();
	// };


	const handleSaveEvent = (event: Event) => {
		const existingLeave = events.find((e) => 
		  (new Date(e.start) <= new Date(event.end) && 
		   new Date(e.end) >= new Date(event.start) && 
		   e.id !== event.id)
		);
	
		if (existingLeave) {
		  setAlertMessage('A leave already exists for the selected date range.');
		  setAlertOpen(true);
		  return;
		}
	
		// Create a new event object with adjusted end date for rendering
		const adjustedEvent = {
		  ...event,
		  // Add one day to end date for FullCalendar rendering
		  displayEnd: new Date(new Date(event.end).setDate(new Date(event.end).getDate() + 1))
		};
	
		if (isNewEvent) {
		  dispatch(addLeave(event)); // Save original dates to store
		} else {
		  dispatch(updateLeave(event)); // Save original dates to store
		}
	
		handleClosePopover();
	  };	













	const handleDeleteEvent = (eventId: string) => {
		dispatch(cancelLeave(eventId));
		handleClosePopover();
	};

	const handleDatesSet = (arg: DatesSetArg) => {
		setCurrentDate(arg);
	};

	const handleEventAdd = (arg: EventAddArg) => {
		arg.event.toPlainObject();
		// console.log('Event added:', );
	};

	const handleEventChange = (arg: EventChangeArg) => {
		arg.event.toPlainObject();
		// console.log('Event changed:', arg.event.toPlainObject());
	};

	const handleEventContent = (arg: EventContentArg) => {
		const leaveType = leaveTypes.find((leave) => leave.leaveType === arg.event.extendedProps.leaveType);
		const backgroundColor = leaveType ? leaveType.color : '#808080';
	
		return (
		  <Box
			sx={{
			  backgroundColor,
			  color: theme.palette.getContrastText(backgroundColor)
			}}
			className={clsx('flex items-center w-full rounded px-8 py-2 h-22 text-white')}
		  >
			<Typography className="text-md font-semibold">{arg.event.extendedProps.leaveType}</Typography>
			<Typography className="text-md px-4 truncate">{arg.event.extendedProps.reason}</Typography>
		  </Box>
		);
	  };

	const handleAddEventClick = () => {
		setIsNewEvent(true);
		setSelectedEvent({
			id: String(Date.now()),
			reason: '',
			summary: '',
			leaveType: 'Vacation',
			halfDay: false,
			fullDay: false,
			start: new Date(),
			end: new Date()
		});
		setAnchorEl(document.body);
	};

	const handleLeaveSelectorDetails = () => {
		setLeaveAnchor(document.body);
	};

	const toggleSelectedLabels = (leaveType: string) => {
		setSelectedLabels((prev) =>
			prev.includes(leaveType) ? prev.filter((label) => label !== leaveType) : [...prev, leaveType]
		);
	};

	const allEvents = [...events, ...holidays];
	const filteredEvents = allEvents.filter((event) => selectedLabels.includes(event.leaveType));
	return (
		<Root
			header={
				<CalendarHeader
					currentDate={currentDate}
					calendarRef={calendarRef}
					onAddEventClick={handleAddEventClick}
					onShowLeaveSelectorDetails={handleLeaveSelectorDetails}
				/>
			}
			content={
				<>
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
						headerToolbar={false}
						initialView="dayGridMonth"
						editable
						selectable
						selectMirror
						dayMaxEvents
						weekends
						events={filteredEvents.map(event => ({
							...event,
							// Adjust end date for display purposes
							end: new Date(new Date(event.end).setDate(new Date(event.end).getDate() + 1))
						  }))}
						select={handleDateSelect}
						eventClick={(clickInfo) => {
							if (clickInfo.event.extendedProps.isHoliday) {
								// Prevent editing for holiday events
								return;
							}

							handleEventClick(clickInfo);
						}}
						datesSet={handleDatesSet}
						eventAdd={handleEventAdd}
						eventChange={handleEventChange}
						eventContent={handleEventContent}
						ref={calendarRef}
					/>
					{selectedEvent && (
						<EventDialog
							event={selectedEvent}
							isNewEvent={isNewEvent}
							anchorEl={anchorEl}
							onClose={handleClosePopover}
							onSave={handleSaveEvent}
							onDelete={handleDeleteEvent}
							leaveBalance={leaveBalance}
							alertMessage={alertMessage}
							alertopen={alertopen}
							setAlertOpen={setAlertOpen}
						/>
					)}
					<LeaveTypeSelector
						anchorEl={leaveAnchor}
						onClose={handleLeaveSelectorPopOver}
						selectedLabels={selectedLabels}
						toggleSelectedLabels={toggleSelectedLabels}
					/>
				</>
			}
		/>
	);
}
