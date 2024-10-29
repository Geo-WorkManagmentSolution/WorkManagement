import React, { useState, useRef, useEffect } from 'react';
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
import { string } from 'zod';

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
	const [events, setEvents] = useState<Event[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [isNewEvent, setIsNewEvent] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [leaveAnchor, setLeaveAnchor] = useState<HTMLElement | null>(null);
	const [currentDate, setCurrentDate] = useState<DatesSetArg | null>(null);
	const [selectedLabels, setSelectedLabels] = useState(leaveTypes.map((type) => type.leaveType));
	// const [snackbarOpen, setSnackbarOpen] = useState(false);
	// const [snackbarMessage, setSnackbarMessage] = useState('');
	const calendarRef = useRef<FullCalendar>(null);
	const theme = useTheme();

	useEffect(() => {
		const storedEvents = localStorage.getItem('calendarEvents');

		if (storedEvents) {
			setEvents(JSON.parse(storedEvents));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('calendarEvents', JSON.stringify(events));
	}, [events]);

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		setIsNewEvent(true);
		setSelectedEvent({
			id: String(Date.now()),
			reason: '',
			summary: '',
			leaveType: 'Vacation',
			halfDay: false,
			fullDay: false,
			start: selectInfo.start,
			end: selectInfo.end
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
		  leaveType: eventData.extendedProps.leaveType || 'Vacation',
		  halfDay: eventData.extendedProps.halfDay || false,
		  fullDay: eventData.extendedProps.fullDay || false,
		  start: eventData.start || new Date(),
		  end: eventData.end || new Date()
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

	const handleSaveEvent = (event: Event) => {
		// const conflictingEvent = checkConflictingEvent(event);

		// if (conflictingEvent) {
		// 	setSnackbarMessage(
		// 		`Conflicting leave: ${conflictingEvent.leaveType} from ${conflictingEvent.start.toLocaleString()} to ${conflictingEvent.end.toLocaleString()}`
		// 	);
		// 	setSnackbarOpen(true);
		// } else {
		if (isNewEvent) {
			setEvents([...events, event]);
		} else {
			setEvents(events.map((e) => (e.id === event.id ? event : e)));
		}

		handleClosePopover();
		// }
	};

	const handleDeleteEvent = (eventId: string) => {
		setEvents(events.filter((e) => e.id !== eventId));
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
  const filteredEvents = allEvents.filter(
    (event) => selectedLabels.includes(event.leaveType)
  );
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
						events={filteredEvents}
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
					<EventDialog
						event={selectedEvent}
						isNewEvent={isNewEvent}
						anchorEl={anchorEl}
						onClose={handleClosePopover}
						onSave={handleSaveEvent}
						onDelete={handleDeleteEvent}
						// events={events}
					/>
					<LeaveTypeSelector
						anchorEl={leaveAnchor}
						onClose={handleLeaveSelectorPopOver}
						selectedLabels={selectedLabels}
						toggleSelectedLabels={toggleSelectedLabels}
					/>
					{/* <Snackbar
						open={snackbarOpen}
						autoHideDuration={6000}
						onClose={() => setSnackbarOpen(false)}
						message={snackbarMessage}
					/> */}
				</>
			}
		/>
	);
}
