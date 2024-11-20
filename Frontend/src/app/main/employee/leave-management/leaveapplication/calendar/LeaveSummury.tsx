import React, { useState, useMemo, useEffect } from 'react';
import { FormControl, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import {
	EmployeeLeave,
	usePostApiLeavesLeavesEmployeeLeaveHistoryMutation,
	EmployeeLeaveHistoryDto
} from '../../LeavesApi';

interface LeaveSummaryProps {
	openDialoge: (event: EmployeeLeaveHistoryDto) => void;
	onSave: (event: EmployeeLeave) => Promise<void>;
	onDelete: (eventId: number) => Promise<void>;
	refetchEvents: () => Promise<void>;
	eventColors: Record<number, string>;
}

function LeaveSummary({ openDialoge, onSave, onDelete, refetchEvents, eventColors }: LeaveSummaryProps) {
	const [upcomingOptions, setUpcomingOptions] = useState('Upcoming Leaves');
	const [pastOptions, setPastOptions] = useState('Past Leaves');
	const pastOptionsArray = ['Past Leaves', 'Past Holidays', 'Past Leave and Holidays'];
	const upcomingOptionsArray = ['Upcoming Leaves', 'Upcoming Holidays', 'Upcoming Leave and Holidays'];

	const [upcomingRequestBody, setUpcomingRequestBody] = useState({
		getLeaveData: true,
		getHolidayData: false,
		getFutureLeaveData: true
	});

	const [pastRequestBody, setPastRequestBody] = useState({
		getLeaveData: true,
		getHolidayData: false,
		getFutureLeaveData: false
	});

	const [postLeaveHistory] = usePostApiLeavesLeavesEmployeeLeaveHistoryMutation();

	const [upcomingEvents, setUpcomingEvents] = useState<EmployeeLeaveHistoryDto[]>([]);
	const [pastEvents, setPastEvents] = useState<EmployeeLeaveHistoryDto[]>([]);

	const fetchUpcomingEvents = async () => {
		try {
			const response = await postLeaveHistory({
				employeeLeaveHistoryDataModel: upcomingRequestBody
			}).unwrap();
			setUpcomingEvents(response);
		} catch (error) {
			console.error('Error fetching upcoming events:', error);
		}
	};

	const fetchPastEvents = async () => {
		try {
			const response = await postLeaveHistory({ employeeLeaveHistoryDataModel: pastRequestBody }).unwrap();
			setPastEvents(response);
		} catch (error) {
			console.error('Error fetching past events:', error);
		}
	};

	useEffect(() => {
		fetchUpcomingEvents();
	}, [upcomingRequestBody]);

	useEffect(() => {
		fetchPastEvents();
	}, [pastRequestBody]);

	const columns = useMemo<MRT_ColumnDef<EmployeeLeaveHistoryDto>[]>(
		() => [
			{
				accessorKey: 'startDate',
				header: 'From',
				accessorFn: (row) => new Date(row.startDate || '').toLocaleDateString()
			},
			{
				accessorKey: 'endDate',
				header: 'To',
				accessorFn: (row) => new Date(row.endDate || '').toLocaleDateString()
			},
			{
				accessorKey: 'name',
				header: 'Type of leave',
				Cell: ({ row }) => (
					<div className="flex items-center">
						<div
							className="w-10 h-10  rounded-full mr-7"
							style={{ backgroundColor: eventColors[row.original.leaveTypeId] || '#0dc8e0' }}
						/>
						{row.original.name}
					</div>
				)
			},
			{
				accessorKey: 'reason',
				header: 'Reason',
				Cell: ({ row }) => (row.original.name === 'Holiday' ? 'N/A' : row.original.reason)
			},
			{
				accessorKey: 'description',
				header: 'Description'
			},
			{
				accessorKey: 'status',
				header: 'Status',
				Cell: ({ row }) => {
					if (row.original.name === 'Holiday') {
						return <Typography variant="body1">N/A</Typography>;
					}

					return (
						<Typography
							variant="body1"
							sx={{
								textAlign: 'center',
								backgroundColor:
									row.original.status === 'Approved'
										? 'success.main'
										: row.original.status === 'Rejected'
											? 'red'
											: 'info.main',
								color:
									row.original.status === 'Approved' ? 'success.contrastText' : 'info.contrastText',
								padding: '2px 4px',
								borderRadius: '4px'
							}}
						>
							{row.original.status}
						</Typography>
					);
				}
			}
		],
		[eventColors]
	);

	const handleFutureOptionChange = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setUpcomingOptions(newValue);
		setUpcomingRequestBody((prev) => ({
			...prev,
			getLeaveData: newValue.includes('Leaves') || newValue.includes('Leave and Holidays'),
			getHolidayData: newValue.includes('Holidays') || newValue.includes('Leave and Holidays'),
			getFutureLeaveData: true
		}));
	};

	const handlePastOptionChange = (event: SelectChangeEvent) => {
		const newValue = event.target.value;
		setPastOptions(newValue);
		setPastRequestBody((prev) => ({
			...prev,
			getLeaveData: newValue.includes('Leaves') || newValue.includes('Leave and Holidays'),
			getHolidayData: newValue.includes('Holidays') || newValue.includes('Leave and Holidays'),
			getFutureLeaveData: false
		}));
	};

	const handleDelete = async (eventId: number) => {
		await onDelete(eventId);
		await refetchEvents();
		await fetchUpcomingEvents();
		await fetchPastEvents();
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
							id="upcoming-select"
							value={upcomingOptions}
							onChange={handleFutureOptionChange}
						>
							{upcomingOptionsArray.map((eachOption) => (
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
						enableRowSelection={false}
						enableMultiRemove={false}
						data={upcomingEvents}
						columns={columns}
						renderRowActionMenuItems={({ row, closeMenu }) => {
							if (row.original.name === 'Holiday') {
								return (
									<MenuItem
										key="na"
										onClick={closeMenu}
									>
										<span className="ml-2">N/A</span>
									</MenuItem>
								);
							}

							return (
								<>
									<MenuItem
										key="edit"
										onClick={() => {
											openDialoge(row.original);
											closeMenu();
										}}
									>
										<FuseSvgIcon size={20}>heroicons-outline:pencil-square</FuseSvgIcon>
										<span className="ml-2">Update</span>
									</MenuItem>
									<MenuItem
										key="delete"
										onClick={() => {
											handleDelete(row.original.employeeLeaveId);
											closeMenu();
										}}
									>
										<FuseSvgIcon size={20}>heroicons-outline:trash</FuseSvgIcon>
										<span className="ml-2">Cancel Leave</span>
									</MenuItem>
								</>
							);
						}}
					/>
				</div>
			</Paper>
			<Paper
				elevation={3}
				className="w-full p-5"
			>
				<div className="m-10">
					<FormControl>
						<Select
							id="past-select"
							value={pastOptions}
							onChange={handlePastOptionChange}
						>
							{pastOptionsArray.map((eachOption) => (
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
						enableRowSelection={false}
						enableMultiRemove={false}
						data={pastEvents}
						columns={columns}
						renderRowActionMenuItems={({ row, closeMenu }) => {
							if (row.original.name === 'Holiday') {
								return (
									<MenuItem
										key="na"
										onClick={closeMenu}
									>
										<span className="ml-2">N/A</span>
									</MenuItem>
								);
							}

							return (
								<MenuItem
									key={0}
									onClick={() => {
										openDialoge(row.original);
										closeMenu();
									}}
								>
									<FuseSvgIcon size={20}>heroicons-outline:eye</FuseSvgIcon>
									<span className="ml-2">View</span>
								</MenuItem>
							);
						}}
					/>
				</div>
			</Paper>
		</>
	);
}

export default LeaveSummary;
