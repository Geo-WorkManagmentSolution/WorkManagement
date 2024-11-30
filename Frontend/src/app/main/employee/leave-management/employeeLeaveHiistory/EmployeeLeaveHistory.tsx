import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
	Typography,
	Paper,
	MenuItem,
	ListItemIcon,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataTable from 'app/shared-components/data-table/DataTable';
import { type MRT_ColumnDef } from 'material-react-table';
import { format } from 'date-fns';

import {
	useGetApiEmployeesByIdQuery,
	useGetApiEmployeesDesignationsQuery,
	usePutApiEmployeesApproveByLeaveIdMutation,
	usePutApiEmployeesRejectByLeaveIdMutation
} from '../../EmployeeApi';
import {
	EmployeeLeaveModel,
	EmployeeLeaveSummaryModel,
	LeaveStatus,
	useGetApiEmployeesLeavesCurrentQuery,
	useGetApiLeavesLeavesAllQuery
} from '../LeavesApi';
import LeaveApprovalHeader from '../LeaveDetailsHeader';

function EmployeeLeaveHistory() {
	const routeParams = useParams();
	const { employeeId } = routeParams;
	const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined;
	console.log("employee id ", employeeId);
	
	const { data: currentLeaves, isLoading: leavesBalanceLoading } = useGetApiEmployeesLeavesCurrentQuery({ employeeId: parsedEmployeeId })
	console.log("currunt leaves",currentLeaves);
	
	const { data: employee, isLoading: employeeLoading } = useGetApiEmployeesByIdQuery({ id: parsedEmployeeId });
	const { data: designations, isLoading: designationsLoading } = useGetApiEmployeesDesignationsQuery();
	const designation = designations?.find((d) => d.id === employee?.employeeDesignationId);

	const { isLoading: leavesLoading, data: allLeaves, refetch } = useGetApiLeavesLeavesAllQuery();
	// const [leaveApprove, { isLoading: approveLoading }] = usePutApiEmployeesApproveByLeaveIdMutation();
	// const [leaveReject, { isLoading: rejectLoading }] = usePutApiEmployeesRejectByLeaveIdMutation();

	// const approveLeave = async (id: number) => {
	// 	await leaveApprove({ leaveId: id });
	// 	refetch();
	// };

	// const rejectLeave = async (id: number) => {
	// 	await leaveReject({ leaveId: id });
	// 	refetch();
	// };

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

	if (employeeLoading || designationsLoading || leavesLoading 
        // || approveLoading || rejectLoading
        ) {
		return <FuseLoading />;
	}

	const employeeLeaves = allLeaves?.filter((leave) => leave.employeeId === parseInt(employeeId));

	return (
		<div className="w-full m-10 space-y-48">
			<div className="space-y-16">
				<div className="w-full h-full flexpx-16">
					<LeaveApprovalHeader />
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
				{/* <Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1-content"
						id="panel1-header"
					> */}
						<Typography>Employee Leave Balance</Typography>
					{/* </AccordionSummary>
					<AccordionDetails> */}
                    <Paper className=' shadow-1 rounded-xl overflow-hidden rounded-b-0 w-full h-full p-20'
                    elevation={0}
                    >
						<div className="flex justify-between ">
							{leavesBalanceLoading ? (
								<FuseLoading />
							) : (
								currentLeaves?.map((eachData: EmployeeLeaveSummaryModel) => (
									<div
										key={eachData.id}
										className="grid grid-cols-1  "
									>
										<Paper className="flex flex-col flex-auto shadow-md rounded-xl overflow-hidden bg-white p-6 w-224">
											<div className="flex items-center justify-between px-8 pt-8">
												<Typography
													className="px-12 text-lg font-medium tracking-tight leading-6 truncate"
													color="text.secondary"
												>
													{eachData.employeeLeaveType} :
												</Typography>
												{/* <IconButton aria-label="more">
													<FuseSvgIcon>heroicons-outline:ellipsis-vertical</FuseSvgIcon>
												</IconButton> */}
											</div>
											<div className="text-center mt-16">
												<Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-yellow-700">
													{eachData.remainingLeaves}
												</Typography>
												<Typography className="text-lg font-medium text-yellow-600">
													Remaining Leaves
												</Typography>
											</div>
                                            <Typography
												className="flex items-baseline justify-center w-full mt-20 mb-24 space-x-8"
												color="text.secondary"
											>
                                      

                                      <span className="truncate">Booked Leaves : </span>
                                      <b>{eachData.totalLeaves-eachData.remainingLeaves}</b>
											</Typography>
											<Typography
												className="flex items-baseline justify-center w-full  mb-24 space-x-8"
												color="text.secondary"
											>
                                      

												<span className="truncate">Openning Balance : </span>
												<b>{eachData.totalLeaves}</b>
											</Typography>
										</Paper>
									</div>
								))
							)}
						</div>
                        </Paper>
					{/* </AccordionDetails>
				</Accordion> */}

				<Paper
					className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
					elevation={0}
				>
					<DataTable
			 enableRowActions={false}  
						enableRowSelection={false}
						data={employeeLeaves}
						columns={columns}
						// renderRowActionMenuItems={({ closeMenu, row, table }) => [
						// 	<MenuItem
						// 		disabled={row.original.status === LeaveStatus.Rejected}
						// 		key={`approve-${row.original.id}`}
						// 		onClick={() => {
						// 			approveLeave(row.original.id);
						// 			closeMenu();
						// 			table.resetRowSelection();
						// 		}}
						// 	>
						// 		<ListItemIcon>
						// 			<FuseSvgIcon>heroicons-outline:check</FuseSvgIcon>
						// 		</ListItemIcon>
						// 		Approve
						// 	</MenuItem>,
						// 	<MenuItem
						// 		key={`reject-${row.original.id}`}
						// 		disabled={row.original.status === LeaveStatus.Rejected}
						// 		onClick={() => {
						// 			rejectLeave(row.original.id);
						// 			closeMenu();
						// 			table.resetRowSelection();
						// 		}}
						// 	>
						// 		<ListItemIcon>
						// 			<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
						// 		</ListItemIcon>
						// 		Reject
						// 	</MenuItem>
						// ]}
					/>
				</Paper>
			</div>
		</div>
	);
}

export default EmployeeLeaveHistory;
