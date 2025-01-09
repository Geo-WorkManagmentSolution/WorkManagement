import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Button, ListItemIcon, MenuItem, Paper, Popover, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { format, isValid } from 'date-fns';
import { useDispatch } from 'react-redux';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import {
	EmployeeLeaveDataModel,
	LeaveStatus,
	useGetApiEmployeesLeavePendingLeaveRequestQuery,
	usePutApiEmployeesLeaveUpdateApproveByLeaveIdMutation,
	usePutApiEmployeesLeaveUpdateRejectByLeaveIdMutation,
	useLazyGetApiEmployeesLeavesCurrentQuery
} from '../../EmployeeApi';
import LeaveStatusComponent from './LeaveStatusComponent';

import LeaveInfoPopover from './LeaveInfoPopover';
import LeaveApprovalHeader from '../LeaveDetailsHeader';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';

function LeaveStatusCell({ row }) {
	return <LeaveStatusComponent status={row.original.leaveStatus} />;
}

function isApprovedByDepartmentHead({ row }) {
	return (
		<div>
			{row.original.isApprovedByDepartmentHead === true ? (
				<FuseSvgIcon
					color="success"
					size={28}
				>
					heroicons-outline:check-circle
				</FuseSvgIcon>
			) : (
				<FuseSvgIcon
					color="error"
					size={28}
				>
					heroicons-outline:minus-circle
				</FuseSvgIcon>
			)}
		</div>
	);
}

function isApprovedByHRHead({ row }) {
	return (
		<div>
			{row.original.isApprovedByHRHead === true ? (
				<FuseSvgIcon
					color="success"
					size={28}
				>
					heroicons-outline:check-circle
				</FuseSvgIcon>
			) : (
				<FuseSvgIcon
					color="error"
					size={28}
				>
					heroicons-outline:minus-circle
				</FuseSvgIcon>
			)}
		</div>
	);
}

function LeaveUpdateRequest() {
	const dispatch = useDispatch();
	const { isLoading, data: pendingLeaves, refetch } = useGetApiEmployeesLeavePendingLeaveRequestQuery({});
	const [approveLeave, { isLoading: approveLoading }] = usePutApiEmployeesLeaveUpdateApproveByLeaveIdMutation();
	const [rejectLeave, { isLoading: rejectLoading }] = usePutApiEmployeesLeaveUpdateRejectByLeaveIdMutation();
	const [getCurrentLeaves] = useLazyGetApiEmployeesLeavesCurrentQuery();

	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedLeave, setSelectedLeave] = useState(null);

	const handleLeaveAction = async (action: 'approve' | 'reject', leaveId: number, employeeId: number) => {
		try {
			if (action === 'approve') {
				await approveLeave({ leaveId, employeeId }).unwrap();
			} else {
				await rejectLeave({ leaveId, employeeId }).unwrap();
			}

			dispatch(
				showMessage({
					message: `Leave ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
					autoHideDuration: 8000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					},
					variant: 'success'
				})
			);
			refetch();
		} catch (error) {
			dispatch(
				showMessage({
					message: `Failed to ${action} leave`,
					autoHideDuration: 8000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					},
					variant: 'error'
				})
			);
		}
	};

	const handleLeaveInfoClick = async (event, leave) => {
		setAnchorEl(event.currentTarget);
		setSelectedLeave(leave);
		const currentLeaves = await getCurrentLeaves({ employeeId: leave.employeeId }).unwrap();
		setSelectedLeave({ ...leave, currentLeaves });
	};

	const handleClosePopover = () => {
		setAnchorEl(null);
		setSelectedLeave(null);
	};

	const columns = useMemo<MRT_ColumnDef<EmployeeLeaveDataModel>[]>(
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
				accessorKey: 'managerName',
				header: 'Manager Name',
				accessorFn: (row) => `${row.managerName}`
			},
			{
                accessorKey: 'currentLeaves',
                header: 'Leave Information',
                Cell: ({ row }) => (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={(e) => handleLeaveInfoClick(e, row.original)}
                    startIcon={<FuseSvgIcon size={20}>heroicons-outline:eye</FuseSvgIcon>}
                  >
                    View Details
                  </Button>
                )
              },
			{
				accessorKey: 'leaveStatus',
				header: 'Status',
				Cell: LeaveStatusCell
			},
			{
				accessorKey: 'isApprovedByDepartmentHead',
				header: 'Approved By Department Head',
				Cell: isApprovedByDepartmentHead
			},
			{
				accessorKey: 'isApprovedByHRHead',
				header: 'Approved By HR Head',
				Cell: isApprovedByHRHead
			},
			{
				accessorKey: 'updatedDateTime',
				header: 'Updated Date',
				accessorFn: (row) => {
					const date = new Date(row.updatedDateTime || '');
					return isValid(date) ? format(date, 'dd/MM/yyyy') : '';
				}
			},
			{
				accessorKey: 'updatedByUserName',
				header: 'Updated By',
				accessorFn: (row) => row.updatedByUserName
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
          
		<div className="flex items-center border-b-1 space-x-8">
			<FuseSvgIcon
				color="action"
				size={24}
			>
				heroicons-outline:user-circle
			</FuseSvgIcon>
			<Typography
				className="text-2xl"
				color="text.secondary"
			>
				Leave Update Requests
			</Typography>

			
		</div>
        <PageBreadcrumb className="m-8" />
      
			</div>
			<Paper
				className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
				elevation={0}
			>
				<DataTable
					enableRowSelection={false}
					data={pendingLeaves || []}
					columns={columns}
					renderRowActionMenuItems={({ closeMenu, row, table }) => [
						<MenuItem
							key={`approve-${row.original.employeeId}`}
							onClick={() => {
								handleLeaveAction('approve', row.original.leaveId, row.original.employeeId);
								closeMenu();
								table.resetRowSelection();
							}}
							disabled={row.original.leaveStatus === LeaveStatus.Approved}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:check</FuseSvgIcon>
							</ListItemIcon>
							Approve
						</MenuItem>,
						<MenuItem
							key={`reject-${row.original.employeeId}`}
							onClick={() => {
								handleLeaveAction('reject', row.original.leaveId, row.original.employeeId);
								closeMenu();
								table.resetRowSelection();
							}}
							disabled={row.original.leaveStatus === LeaveStatus.Rejected}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
							</ListItemIcon>
							Reject
						</MenuItem>
					]}
				/>
			</Paper>
			<Popover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClosePopover}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'center',
					horizontal: 'center'
				}}
			>
				{selectedLeave && <LeaveInfoPopover leave={selectedLeave} />}
			</Popover>
		</>
	);
}

export default LeaveUpdateRequest;
