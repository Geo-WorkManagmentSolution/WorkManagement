/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {} from '../LeavesApi';
import { useGetApiEmployeesTeamMembersListQuery, EmployeeTeamMemberList } from '../../EmployeeApi';
import LeaveApprovalHeader from '../LeaveDetailsHeader';

function EmployeesLeaveHistories() {
	const { isLoading, data: teamMember } = useGetApiEmployeesTeamMembersListQuery({ employeeId: null });

	const columns = useMemo<MRT_ColumnDef<EmployeeTeamMemberList>[]>(
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
						{`${row.name}`}
					</Typography>
				)
			},
			{
				accessorKey: 'email',
				header: 'Email',
				accessorFn: (row) => `${row.email}`
			},
			{
				accessorKey: 'designation',
				header: 'Designation',
				accessorFn: (row) => `${row.designation}`
			}
		],
		[]
	);

	if (
		isLoading
		// || approveLoading || rejectLoading
	) {
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
					enableRowActions={false}
					enableRowSelection={false}
					data={teamMember}
					columns={columns}
				/>
			</Paper>
		</>
	);
}

export default EmployeesLeaveHistories;
