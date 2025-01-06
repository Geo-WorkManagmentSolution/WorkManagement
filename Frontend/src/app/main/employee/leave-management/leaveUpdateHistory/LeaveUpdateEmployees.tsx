/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { SalaryEmployeeDashboardModel, useGetApiEmployeesSalaryDashboardQuery } from '../../EmployeeApi';

function LeaveUpdateEmployees() {
	const { isLoading, data: Employees } = useGetApiEmployeesSalaryDashboardQuery();

	const columns = useMemo<MRT_ColumnDef<SalaryEmployeeDashboardModel>[]>(
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
						to={`${row.id}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{`${row.fullName}`}
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
				accessorFn: (row) => `${row.designationName}`
			},

			{
				accessorKey: 'department',
				header: 'Department',
				accessorFn: (row) => `${row.departmentName}`
			}
		],
		[]
	);

	if (
		isLoading
		
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
						Employee Leave History
					</Typography>
				</div>
				<PageBreadcrumb className="m-8" />
			</div>
			<Paper
				className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
				elevation={0}
			>
				<DataTable
					enableRowActions={false}
					enableRowSelection={false}
					data={Employees}
					columns={columns}
				/>
			</Paper>
		</>
	);
}

export default LeaveUpdateEmployees;
