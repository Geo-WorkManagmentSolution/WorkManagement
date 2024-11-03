/* eslint-disable no-nested-ternary */
import React, { useState, useMemo } from 'react';
import {
	FormControl,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Typography,
	Box,
	IconButton,
	ListItemIcon
} from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import { Event } from '../types';

interface LeaveSummuryProps {
	events: Event[];
	holidays: any;
	openDialoge: (event: Event) => void;
}

function LeaveSummury({ events, holidays, openDialoge }: LeaveSummuryProps) {
	const [upcomingOptions, setUpcomingOptions] = useState('Upcoming Leaves');
	const [pastOptions, setPastOptions] = useState('Past Leaves');
	const pastOptionsarray = ['Past Leaves', 'Past Holidays', 'Past Leave and Holidays'];
	const upcomingOptionsarray = ['Upcoming Leaves', 'Upcoming Holidays', 'Upcoming Leave and Holidays'];

	const columns = useMemo<MRT_ColumnDef<Event>[]>(() => [
		{
			accessorKey: 'start',
			accessorFn: (row) => new Date(row.start).toLocaleDateString(), // Format the date
			header: 'From',
			enableColumnFilter: false,
			enableColumnDragging: false,

			enableSorting: false
		},
		{
			accessorKey: 'end',
			header: 'To',
			enableColumnFilter: false,
			enableColumnDragging: false,
			accessorFn: (row) => new Date(row.end).toLocaleDateString() // Format the date
		},
		{
			accessorKey: 'leaveType',
			header: 'Type of leave',
			accessorFn: (row) => row.leaveType
		},
		{
			accessorKey: 'reason',
			accessorFn: (row) => row.reason,
			header: 'Reason'
		},
		{
			accessorKey: 'isApproved',
			accessorFn: (row) =>
				row.leaveType === 'Holiday' ? (
					<Typography variant="body1">N/A</Typography>
				) : (
					<Typography
						variant="body1"
						sx={{
							textAlign:'center',
							backgroundColor: row.isApproved ? 'success.main' : 'info.main',
							color: row.isApproved ? 'success.contrastText' : 'info.contrastText',
							padding: '2px 4px',
							borderRadius: '4px'
						}}
					>
						{row.isApproved ? 'Approved' : 'Under Review'}
					</Typography>
				),
			header: 'Status'
		}
	]);

	const handleFutureOptionChange = (event: SelectChangeEvent) => {
		setUpcomingOptions(event.target.value);
	};
	const handlePastOptionChange = (event: SelectChangeEvent) => {
		setPastOptions(event.target.value);
	};
	const calculateLeaveDays = (event: Event) => {
		const startDate = new Date(event.start);
		const endDate = new Date(event.end);
		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Ensure to include both start and end dates

		if (event.halfDay) {
			return 0.5;
		}

		return diffDays;
	};

	const sortedFutureEvents = useMemo(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		console.log('Today:', today);

		let filteredEvents: Event[] = [];

		if (upcomingOptions === 'Upcoming Leaves' || upcomingOptions === 'Upcoming Leave and Holidays') {
			filteredEvents = [
				...filteredEvents,
				...events.filter((event) => {
					const eventStart = new Date(event.start);
					const includeEvent = eventStart >= today && event.leaveType !== 'Holiday';
					console.log('Event:', event);
					console.log('Event Start:', eventStart);
					console.log('Include Event:', includeEvent);
					return includeEvent;
				})
			];
		}

		if (upcomingOptions === 'Upcoming Holidays' || upcomingOptions === 'Upcoming Leave and Holidays') {
			filteredEvents = [
				...filteredEvents,
				...holidays.filter((holiday) => {
					const holidayStart = new Date(holiday.start);
					const includeHoliday = holidayStart >= today;
					console.log('Holiday:', holiday);
					console.log('Holiday Start:', holidayStart);
					console.log('Include Holiday:', includeHoliday);
					return includeHoliday;
				})
			];
		}

		console.log('Filtered Events:', filteredEvents);

		return filteredEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
	}, [events, holidays, upcomingOptions]);

	const sortedPastEvents = useMemo(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		let filteredEvents: Event[] = [];

		if (pastOptions === 'Past Leaves' || pastOptions === 'Past Leave and Holidays') {
			filteredEvents = [
				...filteredEvents,
				...events.filter((event) => new Date(event.start) <= today && event.leaveType !== 'Holiday')
			];
		}

		if (pastOptions === 'Past Holidays' || pastOptions === 'Past Leave and Holidays') {
			filteredEvents = [...filteredEvents, ...holidays.filter((holiday) => new Date(holiday.start) <= today)];
		}

		return filteredEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
	}, [events, holidays, pastOptions]);

	const getLeaveTypeColor = (leaveType: string) => {
		const leaveTypeColors = {
			'Casual Leave': '#FF5733',
			'Sick Leave': '#33FF57',
			'Privillage Leave': '#3357FF',
			'Work From Home': '#FF33A1',
			'Leave without pay': '#2b0047',
			Holiday: '#FFA500'
		};
		return leaveTypeColors[leaveType] || '#000000';
	};
	const renderEventDetails = (event: Event) => {
		const startDate = new Date(event.start).toLocaleDateString();
		const endDate = new Date(event.end).toLocaleDateString();
		const isHoliday = event.leaveType === 'Holiday';
		const leaveDays = calculateLeaveDays(event);

		return (
			<Box
				key={event.id}
				sx={{
					display: 'flex',
					alignItems: 'center',

					p: 3,
					border: '1px solid #ccc',
					borderRadius: '8px',
					boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
				}}
			>
				<Typography
					variant="subtitle1"
					sx={{ flex: 0.5 }}
				>
					{startDate} {startDate !== endDate && `- ${endDate}`}
				</Typography>

				<Typography
					variant="subtitle1"
					sx={{ flex: 0.5 }}
				>
					• {leaveDays} {leaveDays > 1 ? 'days' : 'day'}
				</Typography>

				<Typography
					variant="subtitle1"
					sx={{ flex: 0.5 }}
				>
					{event.reason || (isHoliday ? event.reason : 'N/A')}
				</Typography>

				<Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
					<Box
						sx={{
							width: 12,
							height: 12,
							backgroundColor: getLeaveTypeColor(event.leaveType),
							borderRadius: '50%',
							mr: 1
						}}
					/>
					<Typography
						variant="body1"
						sx={{ flex: 1 }}
					>
						{event.leaveType}
					</Typography>

					{!isHoliday ? (
						event.isApproved ? (
							<Typography
								variant="body1"
								sx={{ flex: 1 }}
								color="success"
							>
								Approved
							</Typography>
						) : (
							<Typography
								variant="body1"
								sx={{ flex: 1 }}
								color="info"
							>
								Under Review
							</Typography>
						)
					) : null}

					{!isHoliday ? (
						<IconButton
							sx={{ flex: 1 }}
							size="small"
							onClick={() => openDialoge(event)}
							// value={event}
						>
							<FuseSvgIcon size={20}>heroicons-solid:pencil-square</FuseSvgIcon>
						</IconButton>
					) : null}
				</Box>
			</Box>
		);
	};

	return (
		<>
			<Paper
				elevation={3}
				className="w-full p-5 mb-10"
			>
				<div className="m-10">
					<FormControl>
						<Select
							id="select"
							value={upcomingOptions}
							onChange={handleFutureOptionChange}
						>
							{upcomingOptionsarray.map((eachOption) => (
								<MenuItem
									value={eachOption}
									key={eachOption}
								>
									{eachOption}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="w-full h-auto bg-grey-200 m-12 rounded-2xl p-6">
					<DataTable
						enableMultiRemove={false}
						data={sortedFutureEvents}
						columns={columns}
						renderRowActionMenuItems={({ row }) =>
							row.original.leaveType !== 'Holiday' ? (
								<MenuItem
									key={0}
									onClick={() => {
										openDialoge(row.original);
										closeMenu();
										table.resetRowSelection();
									}}
								>
									<ListItemIcon>
										<FuseSvgIcon>heroicons-outline:pencil-square</FuseSvgIcon>
									</ListItemIcon>
									Update
								</MenuItem>
							) : (
								<Typography
									key={0}
									variant="body1"
									sx={{ flex: 1, p: '5px' }}
								>
									N/A
								</Typography>
							)
						}
					/>
				</div>
			</Paper>
			{/* //add another division exectly same as defined over */}
			<Paper
				elevation={3}
				className="w-full p-5"
			>
				<div className="m-10">
					<FormControl>
						<Select
							id="select"
							value={pastOptions}
							onChange={handlePastOptionChange}
						>
							{pastOptionsarray.map((eachOption) => (
								<MenuItem
									value={eachOption}
									key={eachOption}
								>
									{eachOption}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="w-full h-auto bg-grey-200 m-12 rounded-2xl p-6">
					<DataTable
						enableMultiRemove={false}
						data={sortedPastEvents}
						columns={columns}
						renderRowActionMenuItems={({ row }) =>
							row.original.leaveType !== 'Holiday' ? (
								<MenuItem
									key={0}
									onClick={() => {
										openDialoge(row.original);
										closeMenu();
										table.resetRowSelection();
									}}
								>
									<ListItemIcon>
										<FuseSvgIcon>heroicons-outline:pencil-square</FuseSvgIcon>
									</ListItemIcon>
									Update
								</MenuItem>
							) : (
								<Typography
									key={0}
									variant="body1"
									sx={{ flex: 1, p: '5px' }}
								>
									N/A
								</Typography>
							)
						}
					/>
				</div>
			</Paper>
		</>
	);
}

export default LeaveSummury;
