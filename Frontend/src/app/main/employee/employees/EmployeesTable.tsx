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
import { EmployeeDashboardDataModel, useDeleteApiEmployeesByIdMutation, useGetApiEmployeesQuery } from '../EmployeeApi';

function EmployeesTable() {
	const { data: employees, isLoading,} = useGetApiEmployeesQuery();
	const [removeEmployees] = useDeleteApiEmployeesByIdMutation();

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

export default EmployeesTable;
