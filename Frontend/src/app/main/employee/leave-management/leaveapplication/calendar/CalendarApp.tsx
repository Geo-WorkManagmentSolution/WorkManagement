import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, DatesSetArg, EventContentArg } from '@fullcalendar/core';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import FusePageSimple from '@fuse/core/FusePageSimple';
import CalendarHeader from './CalendarHeader';
import EventDialog from './EventDialog';
import LeaveTypeSelector from './LeaveTypeSelctor';
import LeaveSummury from './LeaveSummury';
import {
	useGetApiLeavesHolidaysQuery,
	useDeleteApiEmployeesByEmployeeIdLeavesCancelLeaveMutation,
	useGetApiEmployeesByEmployeeIdLeavesUpdateLeaveQuery,
	EmployeeLeave,
	EmployeeHoliday,
	LeaveStatus,
	usePutApiEmployeesLeavesAddLeaveMutation
} from '../../LeavesApi';
import { useGetApiEmployeesLeavesCurrentQuery } from '../../../EmployeeApi';

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
	'& .fc': {
		height: '800px'
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
	const [selectedEvent, setSelectedEvent] = useState<EmployeeLeave | null>(null);
	const [isNewEvent, setIsNewEvent] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [leaveAnchor, setLeaveAnchor] = useState<HTMLElement | null>(null);
	const [currentDate, setCurrentDate] = useState<DatesSetArg | null>(null);
	const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
	const [tabValue, setTabValue] = useState('Calendar View');
	const [alertMessage, setAlertMessage] = useState('');
	const [alertOpen, setAlertOpen] = useState(false);
	const calendarRef = useRef<FullCalendar>(null);
	const theme = useTheme();

	// API hooks
	const { data: holidaysData, isLoading: isHolidaysLoading } = useGetApiLeavesHolidaysQuery();
	const { data: currentLeaves, isLoading: isCurrentLeavesLoading } = useGetApiEmployeesLeavesCurrentQuery();
	const [addLeaveApi] = usePutApiEmployeesLeavesAddLeaveMutation();
	const [cancelLeaveApi] = useDeleteApiEmployeesByEmployeeIdLeavesCancelLeaveMutation();
	const { refetch: updateLeaveApi } = useGetApiEmployeesByEmployeeIdLeavesUpdateLeaveQuery(
		{ employeeId: '1', employeeLeave: {} as EmployeeLeave },
		{ skip: true }
	);

	React.useEffect(() => {
		if (currentLeaves) {
			setSelectedLabels(currentLeaves.map((leave) => leave.employeeLeaveType || ''));
		}
	}, [currentLeaves]);

	const openEventDialoge = (event: EmployeeLeave) => {
		setIsNewEvent(false);
		setSelectedEvent(event);
		setAnchorEl(document.body);
	};

	const handleDateSelect = (selectInfo: DateSelectArg) => {
		const start = new Date(selectInfo.start);
		let end = new Date(selectInfo.end);

		end.setDate(end.getDate() - 1);

		if (start.getTime() === end.getTime()) {
			end = new Date(start);
		}

		setIsNewEvent(true);
		setSelectedEvent({
			id: 0,
			status: LeaveStatus.Pending,
			description: '',
			reason: '',
			startDate: start.toISOString(),
			endDate: end.toISOString(),
			employeeLeaveTypeId: currentLeaves?.[0]?.id || 1,
			leaveDays: 1,
		});
		setAnchorEl(selectInfo.jsEvent.target as HTMLElement);
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		const eventData = clickInfo.event;

		if (eventData.extendedProps.isHoliday) {
			// Don't open dialog for holidays
			return;
		}

		setIsNewEvent(false);
		setSelectedEvent({
			id: Number(eventData.id),
			status: eventData.extendedProps.status as LeaveStatus,
			description: eventData.extendedProps.description || '',
			reason: eventData.extendedProps.reason || '',
			startDate: eventData.start?.toISOString() || new Date().toISOString(),
			endDate: eventData.end?.toISOString() || new Date().toISOString(),
			leaveDays: eventData.extendedProps.leaveDays,
			employeeLeaveTypeId: eventData.extendedProps.employeeLeaveTypeId,
		
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

	const refreshCalendar = () => {
		if (calendarRef.current) {
			calendarRef.current.getApi().refetchEvents();
		}
	};

	const handleSaveEvent = async (data: EmployeeLeave) => {
		try {
			console.log('Event data received:', data);

			const eventToSave = {
				...data,
				employeeLeaveTypes: {
					id: data.employeeLeaveTypeId,
					isDeleted: false,
					name:
						currentLeaves?.find((leave) => leave.id === data.employeeLeaveTypeId)?.employeeLeaveType || '',
					isPaid: true // You might want to get this value from somewhere else
				} as EmployeeLeaveType,
				leaveDays: data.leaveDays || 1
			};

			console.log('Event data to be sent:', eventToSave);

			if (isNewEvent) {
				const response = await addLeaveApi({
					employeeLeave: eventToSave
				}).unwrap();
				console.log('API Response for new event:', response);
			} else {
				const response = await updateLeaveApi({
					employeeLeave: eventToSave
				});
				console.log('API Response for update:', response);
			}

			handleClosePopover();
			refreshCalendar();
			setAlertMessage('Leave request saved successfully.');
			setAlertOpen(true);
		} catch (error) {
			console.error('Error saving event:', error);
			setAlertMessage('Failed to save event. Please try again.');
			setAlertOpen(true);
		}
	};

	const handleDeleteEvent = async (eventId: number) => {
		try {
			await cancelLeaveApi({ employeeId: '1', employeeLeaveId: eventId });
			handleClosePopover();
			refreshCalendar();
			setAlertMessage('Leave request cancelled successfully.');
			setAlertOpen(true);
		} catch (error) {
			console.error('Error deleting event:', error);
			setAlertMessage('Failed to delete event. Please try again.');
			setAlertOpen(true);
		}
	};

	const handleDatesSet = (arg: DatesSetArg) => {
		setCurrentDate(arg);
	};

	const handleEventContent = (arg: EventContentArg) => {
		const leaveType = currentLeaves?.find((leave) => leave.id === arg.event.extendedProps.employeeLeaveTypeId);
		const backgroundColor = leaveType ? '#0dc8e0' : '#FFA500'; // Default color for holidays

		return (
			<Box
				sx={{
					backgroundColor,
					color: theme.palette.getContrastText(backgroundColor)
				}}
				className={clsx('flex items-center w-full rounded px-8 py-2 h-22 text-white')}
			>
				<Typography className="text-md font-semibold">
					{leaveType ? leaveType.employeeLeaveType : 'Holiday'} -{' '}
				</Typography>
				<Typography className="text-md px-4 font-extrabold">{arg.event.extendedProps.reason}</Typography>
			</Box>
		);
	};

	const handleAddEventClick = () => {
		setIsNewEvent(true);
		setSelectedEvent({
			id: 0,
			status: LeaveStatus.Pending,
			description: '',
			reason: '',
			startDate: new Date().toISOString(),
			endDate: new Date().toISOString(),
			employeeLeaveTypeId: currentLeaves?.[0]?.id || 1,
			leaveDays: 1,
			
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

	const allEvents = [
		...(currentLeaves || []).map((leave: EmployeeLeave) => ({
			id: leave.id,
			title: leave.reason,
			start: leave.startDate,
			end: leave.endDate,
			extendedProps: {
				...leave,
				isHoliday: false
			}
		})),
		...(holidaysData || []).map((holiday: EmployeeHoliday) => ({
			id: holiday.id,
			title: holiday.name,
			start: holiday.startDate,
			end: holiday.endDate,
			extendedProps: {
				...holiday,
				isHoliday: true
			}
		}))
	];

	const filteredEvents = allEvents.filter(
		(event) => event.extendedProps.isHoliday || selectedLabels.includes(event.extendedProps.employeeLeaveType || '')
	);

	const showCalender = () => {
		setTabValue('Calendar View');
		setTimeout(refreshCalendar, 0);
	};

	const showSummury = () => {
		setTabValue('Summury View');
	};

	return (
		<Root
			header={
				<CalendarHeader
					currentDate={currentDate}
					calendarRef={calendarRef}
					onAddEventClick={handleAddEventClick}
					onShowLeaveSelectorDetails={handleLeaveSelectorDetails}
					showCalander={showCalender}
					showLeaveSummury={showSummury}
				/>
			}
			content={
				<>
					<div className={`${tabValue !== 'Calendar View' ? 'hidden' : ''} w-full`}>
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
							eventClick={handleEventClick}
							datesSet={handleDatesSet}
							eventContent={handleEventContent}
							ref={calendarRef}
						/>
					</div>
					<div className={`${tabValue !== 'Summury View' ? 'hidden' : ''} w-full`}>
						<LeaveSummury
							events={currentLeaves || []}
							holidays={holidaysData || []}
							openDialoge={openEventDialoge}
						/>
					</div>

					{selectedEvent && (
						<EventDialog
							event={selectedEvent}
							isNewEvent={isNewEvent}
							anchorEl={anchorEl}
							onClose={handleClosePopover}
							onSave={handleSaveEvent}
							onDelete={handleDeleteEvent}
							leaveBalance={{}}
							alertMessage={alertMessage}
							alertOpen={alertOpen}
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
