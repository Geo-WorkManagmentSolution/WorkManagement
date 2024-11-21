/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { format } from 'date-fns';
import { EmployeeLeaveModel, useGetApiLeavesLeavesAllQuery } from '../../LeavesApi';
import {
	usePutApiEmployeesApproveByLeaveIdMutation,
	usePutApiEmployeesRejectByLeaveIdMutation
} from '../../../EmployeeApi';

function LeaveApprovalTable() {
	const { isLoading, data: allLeaves, refetch } = useGetApiLeavesLeavesAllQuery();
	const [leaveApprove] = usePutApiEmployeesApproveByLeaveIdMutation();
	const [leaveReject] = usePutApiEmployeesRejectByLeaveIdMutation();

	const approveLeave = async (id: number) => {
		console.log(id);
		
		await leaveApprove({ leaveId: id });
		refetch();
	};

	const rejectLeave = async (id: number) => {
		await leaveReject({ leaveId: id });
		refetch();
	};

	const columns = useMemo<MRT_ColumnDef<EmployeeLeaveModel>[]>(
		() => [
			{
				accessorKey: 'employeeNumber',
				header: 'Employee Number',
				accessorFn: (row) => `${row.employeeNumber}`
			},
			{
				accessorKey: 'employeeName',
				header: 'Employee Name',
				accessorFn: (row) => `${row.employeeName}`
			},
			{
				accessorKey: 'employeeLeaveTypes',
				header: 'Leave Type',
				accessorFn: (row) => `${row.leaveType}`
			},
			{
				accessorKey: 'startDate',
				header: 'Start Date',
				accessorFn: (row) => format(new Date(row.startDate), 'dd/MM/yyyy')
			},
			{
				accessorKey: 'endDate',
				header: 'EndDate',
				accessorFn: (row) => format(new Date(row.endDate), 'dd/MM/yyyy')
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
				Cell: ({ row }) => {
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
				enableRowSelection={false}
				data={allLeaves}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<>
						<MenuItem
							key={0}
							onClick={() => {
								approveLeave(row.original.id);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:check</FuseSvgIcon>
							</ListItemIcon>
							Approve
						</MenuItem>
						<MenuItem
							key={0}
							onClick={() => {
								rejectLeave(row.original.id);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
							</ListItemIcon>
							Reject
						</MenuItem>
					</>
				]}
			/>
		</Paper>
	);
}

export default LeaveApprovalTable;
