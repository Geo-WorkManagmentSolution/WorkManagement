import { useState, useEffect, useMemo } from 'react';
import { Button, TextField, MenuItem, Paper, ListItemIcon, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useForm, Controller } from 'react-hook-form';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { useDispatch } from 'react-redux';
import {
	EmployeeHoliday,
	useGetApiLeavesHolidaysByYearQuery,
	usePostApiLeavesHolidaysMutation
} from '../../employee/leave-management/LeavesApi';

function HolidayForm() {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, touchedFields },
		setError,
		clearErrors,
		setValue
	} = useForm<EmployeeHoliday>();
	const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
	const [holidays, setHolidays] = useState<EmployeeHoliday[]>([]);
	const [editingHoliday, setEditingHoliday] = useState<EmployeeHoliday | null>(null);
	const [isUpdate, setIsUpdate] = useState(false);
	const dispatch = useDispatch();
	const { data: holidaysData, refetch } = useGetApiLeavesHolidaysByYearQuery({ year: selectedYear });
	const [addHolidays] = usePostApiLeavesHolidaysMutation();
	useEffect(() => {
		if (holidaysData) {
			setHolidays(holidaysData);
		} else {
			setHolidays([]);
		}
	}, [holidaysData]);
	const adjustDateForTimezone = (date: Date): Date => {
		const userTimezoneOffset = date.getTimezoneOffset() * 60000;
		return new Date(date.getTime() - userTimezoneOffset);
	};
	const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedYear(Number(event.target.value));
		reset();
		setIsUpdate(false);
	};
	const handleAddHoliday = (data: EmployeeHoliday) => {
		const startDate = adjustDateForTimezone(new Date(data.startDate));
		const endDate = adjustDateForTimezone(new Date(data.endDate));
		
		const holidayExists = holidays.some(
			(holiday) =>
				holiday.id !== editingHoliday?.id && // Exclude the currently editing holiday
				(new Date(holiday.startDate).toDateString() === startDate.toDateString() ||
					new Date(holiday.endDate).toDateString() === endDate.toDateString() ||
					(startDate >= new Date(holiday.startDate) && startDate <= new Date(holiday.endDate)) ||
					(endDate >= new Date(holiday.startDate) && endDate <= new Date(holiday.endDate)))
		);

		if (holidayExists) {
			setError('startDate', { type: 'manual', message: 'A holiday already exists on this date range' });
			setError('endDate', { type: 'manual', message: 'A holiday already exists on this date range' });
			dispatch(
				showMessage({
					message: 'Holiday already exists on this date range',
					autoHideDuration: 6000,
					anchorOrigin: { vertical: 'top', horizontal: 'center' },
					variant: 'error'
				})
			);
			return;
		}

		if (isUpdate && editingHoliday) {
			setHolidays(
				holidays.map((holiday) =>
					holiday.id === editingHoliday.id
						? {
								...holiday,
								name: data.name,
								startDate: startDate.toISOString(),
								endDate: endDate.toISOString()
							}
						: holiday
				)
			);
			setEditingHoliday(null);
			setIsUpdate(false);
		} else {
			const holidayToAdd: EmployeeHoliday = {
				...data,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString()
			};
			setHolidays([...holidays, holidayToAdd]);
		}

		reset();
		clearErrors();
	};
	const handleSaveHolidays = async () => {
		const modifiedHolidays = holidays.map(({ id, ...rest }) => ({ ...rest }));
		try {
			await addHolidays({ body: modifiedHolidays });
			refetch();
			dispatch(
				showMessage({
					message: 'Holidays saved successfully',
					autoHideDuration: 6000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center'
					},
					variant: 'success'
				})
			);
		} catch (error) {
			console.error('Failed to save holidays:', error);
			dispatch(
				showMessage({
					message: 'Failed to save holidays',
					autoHideDuration: 6000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center'
					},
					variant: 'error'
				})
			);
		}
	};

	const updateHoliday = (holidayId: number) => {
		const holidayToEdit = holidays.find((holiday) => holiday.id === holidayId);

		if (holidayToEdit) {
			setEditingHoliday(holidayToEdit);
			setValue('name', holidayToEdit.name);
			setValue('startDate', new Date(holidayToEdit.startDate.toString()));
			setValue('endDate', new Date(holidayToEdit.endDate.toString()));
			setIsUpdate(true);
		}
	};

	const removeHoliday = (holidayId: number) => {
		setHolidays(holidays.filter((holiday) => holiday.id !== holidayId));
	};

	const columns = useMemo<MRT_ColumnDef<EmployeeHoliday>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Holiday Name',
				accessorFn: (row) => `${row.name}`
			},
			{
				accessorKey: 'startDate',
				header: 'Start Date',
				accessorFn: (row) => new Date(row.startDate).toLocaleDateString()
			},
			{
				accessorKey: 'endDate',
				header: 'End Date',
				accessorFn: (row) => new Date(row.endDate).toLocaleDateString()
			}
		],
		[]
	);

	return (
		<Paper className="p-24 max-w-5xl mx-auto">
			<div className="flex items-center border-b-1 space-x-8 m-10">
				<FuseSvgIcon
					color="action"
					size={24}
				>
					heroicons-outline:adjustments-horizontal
				</FuseSvgIcon>
				<Typography
					className="text-2xl mb-3"
					color="text.secondary"
				>
					Holiday Form
				</Typography>
			</div>
			<form onSubmit={handleSubmit(handleAddHoliday)}>
				<div className="flex flex-col gap-16 mb-24">
					<div className="flex justify-start gap-16">
						<TextField
							select
							label="Year"
							value={selectedYear}
							onChange={handleYearChange}
							className="w-1/4"
						>
							{[...Array(20)].map((_, i) => (
								<MenuItem
									key={i}
									value={new Date().getFullYear() + i}
								>
									{new Date().getFullYear() + i}
								</MenuItem>
							))}
						</TextField>
					</div>
					<div className="flex gap-16">
						<Controller
							name="name"
							control={control}
							rules={{ required: 'Holiday name is required' }}
							render={({ field }) => (
								<TextField
									{...field}
									variant="outlined"
									value={field.value || ''}
									label="Holiday Name"
									error={touchedFields.name && !!errors.name}
									helperText={touchedFields.name && errors.name?.message}
								/>
							)}
						/>
						<Controller
							name="startDate"
							control={control}
							rules={{ required: 'Start date is required' }}
							render={({ field }) => (
								<DatePicker
									{...field}
									label="Start Date"
									value={field.value || null}
									minDate={new Date(selectedYear, 0, 1)}
									maxDate={new Date(selectedYear, 11, 31)}
									slotProps={{
										textField: {
											error: touchedFields.startDate && !!errors.startDate,
											helperText: touchedFields.startDate && errors.startDate?.message
										}
									}}
								/>
							)}
						/>
						<Controller
							name="endDate"
							control={control}
							rules={{ required: 'End date is required' }}
							render={({ field }) => (
								<DatePicker
									{...field}
									label="End Date"
									value={field.value || null}
									minDate={new Date(selectedYear, 0, 1)}
									maxDate={new Date(selectedYear, 11, 31)}
									slotProps={{
										textField: {
											error: touchedFields.endDate && !!errors.endDate,
											helperText: touchedFields.endDate && errors.endDate?.message
										}
									}}
								/>
							)}
						/>
						{!isUpdate ? (
							<Button
								variant="contained"
								type="submit"
								startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
								color="info"
							>
								Add
							</Button>
						) : (
							<Button
								variant="contained"
								type="submit"
								startIcon={<FuseSvgIcon>heroicons-outline:arrow-path</FuseSvgIcon>}
								color="info"
							>
								Update
							</Button>
						)}
					</div>
				</div>
			</form>
			<DataTable
				// enableColumnOrdering={true}
				enableRowSelection={false}
				data={holidays}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<>
						<MenuItem
							key={`remove-${row.original.id}`}
							onClick={() => {
								removeHoliday(row.original.id);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
							</ListItemIcon>
							Remove
						</MenuItem>
						<MenuItem
							key={`remove-${row.original.id}`}
							onClick={() => {
								updateHoliday(row.original.id);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:arrow-path</FuseSvgIcon>
							</ListItemIcon>
							Update
						</MenuItem>
					</>
				]}
			/>
			{}
			<Button
				variant="contained"
				onClick={handleSaveHolidays}
				className="mt-24"
				style={{ backgroundColor: '#1976d2', color: 'white' }}
			>
				Save
			</Button>
		</Paper>
	);
}

export default HolidayForm;

