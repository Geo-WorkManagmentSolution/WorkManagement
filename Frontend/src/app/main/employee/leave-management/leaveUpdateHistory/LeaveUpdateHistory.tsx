import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Button, Paper, Popover, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { format, isValid } from 'date-fns';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import { useParams } from 'react-router';
import {
	EmployeeLeaveDataModel,
	useGetApiEmployeesLeavePendingLeaveRequestQuery,
	useGetApiEmployeesPartialByEmployeeIdQuery,
	useLazyGetApiEmployeesLeavesCurrentQuery
} from '../../EmployeeApi';
import LeaveStatusComponent from '../leaveupdates/LeaveStatusComponent';

import LeaveInfoPopover from '../leaveupdates/LeaveInfoPopover';

function LeaveStatusCell({ row }) {
	return <LeaveStatusComponent status={row.original.leaveStatus} />;
}

function isApprovedByDepartmentHead({ row }) {
	return (
		<div className='justify-center'>
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

function LeaveUpdateHistory() {
	const routeParams = useParams();
	const { employeeId } = routeParams;
	const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined;

	// const dispatch = useDispatch();
	const {
		isLoading,
		data: pendingLeaves,
		refetch
	} = useGetApiEmployeesLeavePendingLeaveRequestQuery({ employeeId: parsedEmployeeId });
	const { isLoading: employeeLoading, data: SalaryEmployeeDashboardModel } =
			useGetApiEmployeesPartialByEmployeeIdQuery({ employeeId: parsedEmployeeId });
	// const [approveLeave, { isLoading: approveLoading }] = usePutApiEmployeesLeaveUpdateApproveByLeaveIdMutation();
	// const [rejectLeave, { isLoading: rejectLoading }] = usePutApiEmployeesLeaveUpdateRejectByLeaveIdMutation();
	const [getCurrentLeaves] = useLazyGetApiEmployeesLeavesCurrentQuery();

	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedLeave, setSelectedLeave] = useState(null);

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

	if (isLoading || employeeLoading
		// || approveLoading || rejectLoading
	) {
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

			<div className="mb-10">
				<Paper
					className="flex flex-col flex-auto shadow-1 rounded-xl overflow-hidden rounded-b-0 w-full h-full"
					elevation={0}
				>
					<div className="table-responsive border rounded-md">
						<table className="table dense simple">
							<thead>
								<tr>
									
									<th>
										<Typography className="font-semibold">Full Name</Typography>
									</th>
									<th>
										<Typography className="font-semibold">Employee Number</Typography>
									</th>

									<th>
										<Typography className="font-semibold">Email</Typography>
									</th>
									<th>
										<Typography className="font-semibold">Designation</Typography>
									</th>
									<th>
										<Typography className="font-semibold">Department</Typography>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div className="flex items-center">
											<Typography className="truncate mx-8">
												{SalaryEmployeeDashboardModel.fullName}
											</Typography>
										</div>
									</td>
									<td>
										<Typography className="truncate">
											{SalaryEmployeeDashboardModel.employeeNumber}
										</Typography>
									</td>

									<td>
										<span className="truncate">{SalaryEmployeeDashboardModel?.email}</span>
									</td>
									<td>
										<span className="truncate">
											{SalaryEmployeeDashboardModel?.designationName}
										</span>
									</td>
									<td>
										<span className="truncate">{SalaryEmployeeDashboardModel?.departmentName}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</Paper>
			</div>













			<Paper
				className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
				elevation={0}
			>
				<DataTable
					enableRowActions={false}
					enableRowSelection={false}
					data={pendingLeaves || []}
					columns={columns}
					
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

export default LeaveUpdateHistory;
