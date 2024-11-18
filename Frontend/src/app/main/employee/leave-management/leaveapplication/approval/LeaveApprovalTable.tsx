/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import {ListItemIcon, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
// import { EmployeeModel, useDeleteApiEmployeesByIdMutation, useGetApiEmployeesQuery } from '../EmployeeApi';
import { EmployeeLeave,useGetApiEmployeesLeavesCurrentQuery } from '../../LeavesApi';

function LeaveApprovalTable() {
	// const { data: employees, isLoading,} = useGetApiEmployeesQuery();
	// const [removeEmployees] = useDeleteApiEmployeesByIdMutation();

	const columns = useMemo<MRT_ColumnDef<EmployeeLeave>[]>(
		() => [
			{
				accessorKey: 'employeeLeaveTypes',
				header: 'Leave Type',
				accessorFn: (row) => `${row.employeeLeaveTypes}`
			},
			{
				accessorKey: 'startDate',
				header: 'Start Date',
				accessorFn: (row) => `${row.startDate}`
			},
			{
				accessorKey: 'endDate',
				header: 'EndDate',
				accessorFn: (row) => `${row.endDate}`
			},
			{
				accessorKey: 'leaveDays',
				header: 'Leave Days',
				accessorFn: (row) => `${row.leaveDays}`
			},
			{
				accessorKey: 'reason',
				header: 'Reason',
				accessorFn: (row) => `${row.reason}`
			},
			{
				accessorKey: 'description',
				header: 'Description',
				accessorFn: (row) => `${row.description}`
			},
			{
				accessorKey: 'status',
				header: 'Status',
				accessorFn: (row) => `${row.status}`
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
				enableMultiRemove= {false}
				data={employees}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							removeEmployees({id:row.original.id});
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

export default LeaveApprovalTable;
