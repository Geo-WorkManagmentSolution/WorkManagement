/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemIcon, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/store/hooks';
import { closeDialog, openDialog } from '@fuse/core/FuseDialog/fuseDialogSlice';

import { EmployeeDashboardDataModel, useDeleteApiEmployeesByIdMutation, useGetApiEmployeesQuery } from '../EmployeeApi';

function EmployeesTable() {
	const dispatch = useAppDispatch();
	const {
		data: employees,
		isLoading,
		refetch
	} = useGetApiEmployeesQuery(undefined, {
		refetchOnMountOrArgChange: true
	});
	const [removeEmployees] = useDeleteApiEmployeesByIdMutation();
	React.useEffect(() => {
		refetch();
	}, [refetch]);

	const handleRemoveEmployee =  (id: number) => {
		dispatch(
			openDialog({
				children: (
					<>
						<DialogTitle id="alert-dialog-title">
							Are you sure you want to delete this Employee ?
						</DialogTitle>
						<DialogContent>
						<DialogContentText id="alert-dialog-description">
													You are going to remove selected Employee. Are you sure you want to
													continue?
												</DialogContentText>
						</DialogContent>
						<DialogActions className='p-16'>
							<Button
								onClick={() => {
									dispatch(closeDialog());
								}}
								
								
								color="warning"
							>
								Cancel
							</Button>
							<Button
								onClick={ async() => {
									dispatch(closeDialog());

									await removeEmployees({ id });
									refetch(); // Refetch data after deletion
								}}
								color="primary"
								autoFocus
							>
								Yes
							</Button>
						</DialogActions>
					</>
				)
			})
		);
	};

	const columns = useMemo<MRT_ColumnDef<EmployeeDashboardDataModel>[]>(
		() => [
			{
				accessorKey: 'employeeNumber',
				header: 'Employee Number',
				accessorFn: (row) => `${row.employeeNumber}`
			},
			{
				accessorKey: 'name',
				header: 'Name',
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/employees/employeesSearch/${row.original.id}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{`${row.original?.firstName}  ${row.original?.lastName}`}
					</Typography>
				)
			},
			{
				accessorKey: 'email',
				header: 'Email',
				accessorFn: (row) => `${row?.email}`
			},
			{
				accessorKey: 'phoneNumber',
				header: 'Phone Number',
				accessorFn: (row) => `${row?.phoneNumber}`
			},
			{
				accessorKey: 'gender',
				header: 'Gender',
				accessorFn: (row) => `${row?.gender}`
			},
			{
				accessorKey: 'departmentName',
				header: 'Department',
				accessorFn: (row) => `${row?.departmentName}`
			},
			{
				accessorKey: 'designationName',
				header: 'Designation',
				accessorFn: (row) => `${row?.designationName}`
			},
			{
				accessorKey: 'employeeCategory',
				header: 'Category',
				accessorFn: (row) => `${row?.categoryName}`
			},
			{
				accessorKey: 'site',
				header: 'Site',
				accessorFn: (row) => `${row?.site}`
			},
			{
				accessorKey: 'hireDate',
				header: 'Hire Date',
				accessorFn: (row) => `${row?.hireDate}`
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				enableMultiRemove={false}
				data={employees}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							handleRemoveEmployee(row.original.id);
							closeMenu();
							table.resetRowSelection();
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
						</ListItemIcon>
						Delete
					</MenuItem>
				]}
			/>
		</Paper>
	);
}

export default EmployeesTable;
