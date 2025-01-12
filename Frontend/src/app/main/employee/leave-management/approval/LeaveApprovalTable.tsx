/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { EmployeeLeaveModel, LeaveStatus, useGetApiLeavesLeavesAllQuery } from '../LeavesApi';
import {
	usePutApiEmployeesApproveByLeaveIdMutation,
	usePutApiEmployeesRejectByLeaveIdMutation
} from '../../EmployeeApi';
import LeaveApprovalHeader from '../LeaveDetailsHeader';

function LeaveApprovalTable() {
	const { isLoading, data: allLeaves, refetch } = useGetApiLeavesLeavesAllQuery();
	const [leaveApprove, { isLoading: approveLoading }] = usePutApiEmployeesApproveByLeaveIdMutation();
	const [leaveReject, { isLoading: rejectLoading }] = usePutApiEmployeesRejectByLeaveIdMutation();

	const approveLeave = async (id: number) => {
		await leaveApprove({ leaveId: id });
		refetch();
	};

	const rejectLeave = async (id: number) => {
		await leaveReject({ leaveId: id });
		refetch();
	};

	useEffect(()=>{
		refetch();
	},[refetch])
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
				accessorFn: (row) => (
					<Typography
						component={Link}
						to={`${row.employeeId}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{`${row.employeeName}`}
					</Typography>
				)
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
									// eslint-disable-next-line no-nested-ternary
									row.original.status === LeaveStatus.Approved
										? 'success.main'
										: row.original.status === LeaveStatus.Rejected
											? 'red'
											: 'info.main',
								color:
									row.original.status === LeaveStatus.Approved
										? 'success.contrastText'
										: 'info.contrastText',
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

	if (isLoading || approveLoading || rejectLoading) {
		return <FuseLoading />;
	}

	return (
		<>
			<div className="m-10">
				<LeaveApprovalHeader />
			</div>
			<Paper
				className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
				elevation={0}
			>
				<DataTable
					enableRowSelection={false}
					data={allLeaves}
					columns={columns}
					renderRowActionMenuItems={({ closeMenu, row, table }) => [
						<MenuItem
							disabled={row.original.status === LeaveStatus.Rejected}
							key={`approve-${row.original.id}`}
							onClick={() => {
								approveLeave(row.original.id);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							{' '}
							<ListItemIcon>
								{' '}
								<FuseSvgIcon>heroicons-outline:check</FuseSvgIcon>{' '}
							</ListItemIcon>{' '}
							Approve{' '}
						</MenuItem>,
						<MenuItem
							key={`reject-${row.original.id}`}
							disabled={row.original.status === LeaveStatus.Rejected}
							onClick={() => {
								rejectLeave(row.original.id);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							{' '}
							<ListItemIcon>
								{' '}
								<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>{' '}
							</ListItemIcon>{' '}
							Reject{' '}
						</MenuItem>
					]}
				/>
			</Paper>
		</>
	);
}

export default LeaveApprovalTable;
