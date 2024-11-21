'use client';

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, DatesSetArg, EventContentArg, EventSourceFunc } from '@fullcalendar/core';
import { styled, useTheme } from '@mui/material/styles';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import clsx from 'clsx';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { isSameDay, parseISO } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import EventDialog from './EventDialog';

import LeaveTypeSelector from './LeaveTypeSelctor';
import LeaveSummary from './LeaveSummury';
import {
	LeaveStatus,
	usePostApiEmployeesLeavesAddLeaveMutation,
	useDeleteApiEmployeesLeavesCancelLeaveMutation,
	usePostApiLeavesLeavesEmployeeLeaveHistoryMutation,
	EmployeeLeaveHistoryDto,
	useGetApiEmployeesLeavesCurrentQuery,
	usePutApiEmployeesLeavesUpdateLeaveMutation,
	EmployeeLeaveModel
} from '../../LeavesApi';

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
	const [selectedEvent, setSelectedEvent] = useState<EmployeeLeaveModel | null>(null);
	const [isNewEvent, setIsNewEvent] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [leaveAnchor, setLeaveAnchor] = useState<HTMLElement | null>(null);
	const [currentDate, setCurrentDate] = useState<DatesSetArg | null>(null);
	const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
	const [tabValue, setTabValue] = useState('Calendar View');
	const [alertInfo, setAlertInfo] = useState<{
		message: string;
		severity: 'success' | 'error';
	} | null>(null);
	// const [alertOpen, setAlertOpen] = useState(false);
	const [allEvents, setAllEvents] = useState<EmployeeLeaveHistoryDto[]>([]);
	const [eventColors, setEventColors] = useState<Record<number, string>>({});
	const calendarRef = useRef<FullCalendar>(null);
	const theme = useTheme();

	// API hooks
	const { data: currentLeaves, refetch: refetchCurrentLeaves } = useGetApiEmployeesLeavesCurrentQuery();
	const [addLeaveApi] = usePostApiEmployeesLeavesAddLeaveMutation();
	const [cancelLeaveApi] = useDeleteApiEmployeesLeavesCancelLeaveMutation();
	const [postLeaveHistory] = usePostApiLeavesLeavesEmployeeLeaveHistoryMutation();
	const [updateLeaveApi] = usePutApiEmployeesLeavesUpdateLeaveMutation();

	useEffect(() => {
		if (currentLeaves) {
			setSelectedLabels(currentLeaves.map((leave) => leave.employeeLeaveType || ''));

			// Generate and set colors for each leave type
			const colors: Record<number, string> = {};
			currentLeaves.forEach((leave, index) => {
				colors[leave.id] = `hsl(${(index * 137.5) % 360}, 80%, 50%)`;
			});
			setEventColors(colors);
		}
	}, [currentLeaves]);

	const openEventDialog = (event: EmployeeLeaveHistoryDto) => {
		setIsNewEvent(false);

		setSelectedEvent({
			employeeLeaveTypeId: event.leaveTypeId,
			id: event.employeeLeaveId,
			...event
		});
		setAnchorEl(document.body);
	};
	const handleDateSelect = (selectInfo: DateSelectArg) => {
		const start = new Date(selectInfo.start);
		const end = new Date(selectInfo.end);

		// Adjust the end date
		end.setDate(end.getDate() - 1);

		// Ensure start and end dates are in the local timezone
		const startDate = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()));
		const endDate = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()));
		setIsNewEvent(true);
		setSelectedEvent({
			id: 0,
			status: LeaveStatus.Pending,
			description: '',
			reason: '',
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
			employeeLeaveTypeId: currentLeaves?.[0]?.id || 1,
			leaveDays: 1
		});
		setAnchorEl(selectInfo.jsEvent.target as HTMLElement);
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		const eventData = clickInfo.event;

		if (eventData.extendedProps.name === 'Holiday') {
			return;
		}

		setIsNewEvent(false);
		setSelectedEvent({
			id: eventData.extendedProps.employeeLeaveId,
			status: eventData.extendedProps.status as LeaveStatus,
			description: eventData.extendedProps.description || '',
			reason: eventData.extendedProps.reason || '',
			startDate: eventData.extendedProps.startDate || new Date().toISOString(),
			endDate: eventData.extendedProps.endDate,
			leaveDays: eventData.extendedProps.leaveDays,
			employeeLeaveTypeId: eventData.extendedProps.leaveTypeId
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

	const refreshCalendar = useCallback(() => {
		if (calendarRef.current) {
			calendarRef.current.getApi().refetchEvents();
		}
	}, []);

	const handleSaveEvent = async (data: EmployeeLeaveModel) => {
		

		try {
			const newStartDate = parseISO(data.startDate);
			const newEndDate = parseISO(data.endDate);

			// Function to check if two date ranges overlap
			const dateRangesOverlap = (start1: Date, end1: Date, start2: Date, end2: Date) => {
				return (
					(start1 <= end2 && end1 >= start2) ||
					(start2 <= end1 && end2 >= start1) ||
					isSameDay(start1, start2) ||
					isSameDay(end1, end2)
				);
			};

			// Check for conflicts with holidays
			const holidayConflict = allEvents.find(
				(event) =>
					event.name === 'Holiday' &&
					dateRangesOverlap(newStartDate, newEndDate, parseISO(event.startDate), parseISO(event.endDate))
			);

			if (holidayConflict) {
				setAlertInfo({
					message: `Cannot apply leave on holiday`,
					severity: 'error'
				});
				return;
			}

			// Check for conflicts with existing leaves
			const leaveConflict = allEvents.find(
				(event) =>
					event.name !== 'Holiday' &&
					event.employeeLeaveId !== data.id && // Exclude the current leave being edited
					dateRangesOverlap(newStartDate, newEndDate, parseISO(event.startDate), parseISO(event.endDate))
			);

			if (leaveConflict) {
				setAlertInfo({
					message: 'You have already applied leave for selected dates',
					severity: 'error'
				});
				return;
			}

			const employeeLeaveModel: EmployeeLeaveModel = {
				id: data.id,
				employeeId: data.employeeId,
				status: data.status,
				description: data.description,
				reason: data.reason,
				startDate: data.startDate,
				endDate: data.endDate,
				leaveDays: data.leaveDays,
				employeeLeaveTypeId: data.employeeLeaveTypeId
			};
			

			if (isNewEvent) {
				await addLeaveApi({ employeeLeaveModel }).unwrap();
			} else {
				await updateLeaveApi({ employeeLeaveModel }).unwrap();
			}

			handleClosePopover();
			await fetchEvents(currentDate?.start || new Date(), currentDate?.end || new Date());
			await refetchCurrentLeaves();
			refreshCalendar();
			setAlertInfo({ message: 'Leave request saved successfully.', severity: 'success' });
		} catch (error) {
			console.error('Error saving event:', error);

			if (error instanceof Error) {
				setAlertInfo({ message: error.message, severity: 'error' });
			} else {
				setAlertInfo({ message: 'An unknown error occurred', severity: 'error' });
			}
		}
	};

	const handleDeleteEvent = async (eventId: number) => {
		try {
			await cancelLeaveApi({ employeeLeaveId: eventId });
			handleClosePopover();
			// Remove the event from allEvents state
			setAllEvents((prevEvents) => prevEvents.filter((event) => event.employeeLeaveId !== eventId));

			// Remove the event from the calendar
			if (calendarRef.current) {
				const calendarApi = calendarRef.current.getApi();
				const eventToRemove = calendarApi.getEventById(eventId.toString());

				if (eventToRemove) {
					eventToRemove.remove();
				}
			}

			await refetchCurrentLeaves(); // refethch updated leaves
			setAlertInfo({
				message: 'Leave request cancelled successfully.',
				severity: 'success'
			});
			// setAlertOpen(true);
		} catch (error) {
			console.error('Error deleting event:', error);
			setAlertInfo({
				message: 'Failed to delete event. Please try again.',
				severity: 'error'
			});
			// setAlertOpen(true);
		}
	};
	const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertInfo(null);
	};

	const fetchEvents = useCallback(
		async (start: Date, end: Date) => {
			try {
				const pastData = await postLeaveHistory({
					employeeLeaveHistoryDataModel: {
						getLeaveData: true,
						getHolidayData: true,
						getFutureLeaveData: false
						// startDate: start.toISOString(),
						// endDate: end.toISOString()
					}
				}).unwrap();

				const futureData = await postLeaveHistory({
					employeeLeaveHistoryDataModel: {
						getLeaveData: true,
						getHolidayData: true,
						getFutureLeaveData: true
						// startDate: start.toISOString(),
						// endDate: end.toISOString()
					}
				}).unwrap();

				const newEvents = [...pastData, ...futureData];
				setAllEvents(newEvents);

				if (calendarRef.current) {
					calendarRef.current.getApi().removeAllEvents();
					calendarRef.current.getApi().addEventSource(newEvents);
				}

				const newLabels = [...new Set(newEvents.map((event) => event.name || ''))];
				setSelectedLabels((prevLabels) => [...new Set([...prevLabels, ...newLabels])]);
			} catch (error) {
				console.error('Error fetching events:', error);
				// setAlertMessage('Failed to fetch events. Please try again.');
				// setAlertOpen(true);
			}
		},
		[postLeaveHistory]
	);

	const handleDatesSet = useCallback(
		(arg: DatesSetArg) => {
			setCurrentDate(arg);
			fetchEvents(arg.start, arg.end);
		},
		[fetchEvents]
	);

	const handleEventContent = (arg: EventContentArg) => {
		const backgroundColor = arg.event.extendedProps.isHoliday
			? '#FFA500'
			: eventColors[arg.event.extendedProps.leaveTypeId] || '#0dc8e0';

		return (
			<Box
				sx={{
					backgroundColor,
					color: theme.palette.getContrastText(backgroundColor)
				}}
				className={clsx('flex items-center w-full rounded px-8 py-2 h-22 text-white')}
			>
				<Typography className="text-md font-semibold">{arg.event.extendedProps.name} -</Typography>
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
			leaveDays: 1
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

	const filteredEvents = useMemo(
		() => allEvents.filter((event) => selectedLabels.includes(event.name || '')),
		[allEvents, selectedLabels]
	);

	const calendarEvents = useMemo(
		() =>
			filteredEvents.map((event) => ({
				id: event.employeeId?.toString(),
				title: event.name,
				start: event.startDate,
				// end: event.endDate,
				end: new Date(new Date(event.endDate).setDate(new Date(event.endDate).getDate() + 1)),
				extendedProps: {
					...event
				}
			})),
		[filteredEvents]
	);

	const eventSource: EventSourceFunc = useCallback(
		(fetchInfo, successCallback) => {
			const relevantEvents = calendarEvents.filter(
				(event) => new Date(event.start) >= fetchInfo.start && new Date(event.end) <= fetchInfo.end
			);
			successCallback(relevantEvents);
		},
		[calendarEvents]
	);

	const showCalendar = () => {
		setTabValue('Calendar View');
		setTimeout(refreshCalendar, 0);
	};

	const showSummary = () => {
		setTabValue('Summary View');
	};

	return (
		<Root
			header={
				<CalendarHeader
					currentDate={currentDate}
					calendarRef={calendarRef}
					onAddEventClick={handleAddEventClick}
					onShowLeaveSelectorDetails={handleLeaveSelectorDetails}
					showCalander={showCalendar}
					showLeaveSummury={showSummary}
				/>
			}
			content={
				<>
					<Snackbar
						className="absolute top-11"
						open={!!alertInfo}
						autoHideDuration={4000}
						onClose={handleCloseAlert}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					>
						<Alert
							onClose={handleCloseAlert}
							severity={alertInfo?.severity}
							sx={{ width: '100%' }}
						>
							{alertInfo?.message}
						</Alert>
					</Snackbar>
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
							events={eventSource}
							select={handleDateSelect}
							eventClick={handleEventClick}
							datesSet={handleDatesSet}
							eventContent={handleEventContent}
							ref={calendarRef}
						/>
					</div>
					<div className={`${tabValue !== 'Summary View' ? 'hidden' : ''} w-full`}>
						<LeaveSummary
							openDialoge={openEventDialog}
							onSave={handleSaveEvent}
							onDelete={handleDeleteEvent}
							refetchEvents={() =>
								fetchEvents(currentDate?.start || new Date(), currentDate?.end || new Date())
							}
							eventColors={eventColors}
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
							leaveBalance={currentLeaves?.reduce(
								(acc, leave) => ({ ...acc, [leave.id]: leave.remainingLeaves }),
								{}
							)}
							eventColors={eventColors}
							currentLeaves={currentLeaves}
						/>
					)}
					<LeaveTypeSelector
						anchorEl={leaveAnchor}
						onClose={handleLeaveSelectorPopOver}
						selectedLabels={selectedLabels}
						toggleSelectedLabels={toggleSelectedLabels}
						eventColors={eventColors}
						currentLeaves={currentLeaves}
					/>
				</>
			}
		/>
	);
}
