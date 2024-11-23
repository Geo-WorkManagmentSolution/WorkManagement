// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
// import { Typography } from '@mui/material';
// import React from 'react';
// import { useParams } from 'react-router';
// import FuseLoading from '@fuse/core/FuseLoading';
// import { useGetApiEmployeesByIdQuery, useGetApiEmployeesDesignationsQuery } from '../../../EmployeeApi';

// function EmployeeLeaveHistory() {
//     const routeParams = useParams();
//     const { employeeId } = routeParams;

//     const { data: employee, isLoading: employeeLoading } = useGetApiEmployeesByIdQuery({ id: parseInt(employeeId) });
//     const { data: designations, isLoading: designationsLoading } = useGetApiEmployeesDesignationsQuery();
//     const designation = designations?.find((d) => d.id === employee?.employeeDesignationId);

//     if (employeeLoading || designationsLoading) {
//         return <FuseLoading />;
//     }

//     return (
//         <div className="w-full m-10 space-y-48">
//             <div className="space-y-16">
//                 <div className="flex items-center border-b-1 space-x-8 pb-8">
//                     <FuseSvgIcon color="action" size={24}>
//                         heroicons-outline:user-circle
//                     </FuseSvgIcon>
//                     <Typography className="text-2xl" color="text.secondary">
//                         Employee Leave History
//                     </Typography>
//                 </div>
//                 <div className="space-y-16">
//                     <div className="table-responsive border rounded-md">
//                         <table className="table dense simple">
//                             <thead>
//                                 <tr>
//                                     <th>
//                                         <Typography className="font-semibold">Name</Typography>
//                                     </th>
//                                     <th>
//                                         <Typography className="font-semibold">Employee Number</Typography>
//                                     </th>
//                                     <th>
//                                         <Typography className="font-semibold">Designation</Typography>
//                                     </th>
//                                     <th>
//                                         <Typography className="font-semibold">Email</Typography>
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>
//                                         <div className="flex items-center">
//                                             <Typography className="truncate mx-8">
//                                                 {employee?.firstName} {employee?.lastName}
//                                             </Typography>
//                                         </div>
//                                     </td>
//                                     <td>
//                                         <Typography className="truncate">{employee?.employeeNumber}</Typography>
//                                     </td>
//                                     <td>
//                                         <Typography className="truncate">{designation?.name || "Unknown"}</Typography>
//                                     </td>
//                                     <td>
//                                         <span className="truncate">{employee?.email}</span>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

// 			{/* ADD DATATABLE HERE */}

//             </div>
//         </div>
//     );
// }

// export default EmployeeLeaveHistory;
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Typography, Paper, MenuItem, ListItemIcon } from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import DataTable from 'app/shared-components/data-table/DataTable';
import { type MRT_ColumnDef } from 'material-react-table';
import { format } from 'date-fns';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import {
	useGetApiEmployeesByIdQuery,
	useGetApiEmployeesDesignationsQuery,
	usePutApiEmployeesApproveByLeaveIdMutation,
	usePutApiEmployeesRejectByLeaveIdMutation
} from '../../../EmployeeApi';
import { EmployeeLeaveModel, LeaveStatus, useGetApiLeavesLeavesAllQuery } from '../../LeavesApi';
import LeaveApprovalHeader from './LeaveApprovalHeader';

function EmployeeLeaveHistory() {
	const routeParams = useParams();
	const { employeeId } = routeParams;

	const { data: employee, isLoading: employeeLoading } = useGetApiEmployeesByIdQuery({ id: parseInt(employeeId) });
	const { data: designations, isLoading: designationsLoading } = useGetApiEmployeesDesignationsQuery();
	const designation = designations?.find((d) => d.id === employee?.employeeDesignationId);

	const { isLoading: leavesLoading, data: allLeaves, refetch } = useGetApiLeavesLeavesAllQuery();
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

	const columns = useMemo<MRT_ColumnDef<EmployeeLeaveModel>[]>(
		() => [
			{
				accessorKey: 'leaveType',
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
				header: 'End Date',
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

	if (employeeLoading || designationsLoading || leavesLoading || approveLoading || rejectLoading) {
		return <FuseLoading />;
	}

	const employeeLeaves = allLeaves?.filter((leave) => leave.employeeId === parseInt(employeeId));

	return (
		<div className="w-full m-10 space-y-48">
			<div className="space-y-16">
            <div className="w-full h-full flexpx-16">
	<LeaveApprovalHeader/>
</div>



				<div className="space-y-16">
					<Paper
						className="flex flex-col flex-auto shadow-1 rounded-xl overflow-hidden rounded-b-0 w-full h-full"
						elevation={0}
					>
						<div className="table-responsive border rounded-md">
							<table className="table dense simple">
								<thead>
									<tr>
										<th>
											<Typography className="font-semibold">Name</Typography>
										</th>
										<th>
											<Typography className="font-semibold">Employee Number</Typography>
										</th>
										<th>
											<Typography className="font-semibold">Designation</Typography>
										</th>
										<th>
											<Typography className="font-semibold">Email</Typography>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="flex items-center">
												<Typography className="truncate mx-8">
													{employee?.firstName} {employee?.lastName}
												</Typography>
											</div>
										</td>
										<td>
											<Typography className="truncate">{employee?.employeeNumber}</Typography>
										</td>
										<td>
											<Typography className="truncate">
												{designation?.name || 'Unknown'}
											</Typography>
										</td>
										<td>
											<span className="truncate">{employee?.email}</span>
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
						enableRowSelection={false}
						data={employeeLeaves}
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
								<ListItemIcon>
									<FuseSvgIcon>heroicons-outline:check</FuseSvgIcon>
								</ListItemIcon>
								Approve
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
								<ListItemIcon>
									<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
								</ListItemIcon>
								Reject
							</MenuItem>
						]}
					/>
				</Paper>
			</div>
		</div>
	);
}

export default EmployeeLeaveHistory;
