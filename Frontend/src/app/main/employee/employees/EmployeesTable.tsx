/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { Chip, ListItemIcon, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { EmployeeModel, useDeleteApiEmployeesByIdMutation, useGetApiEmployeesQuery } from '../EmployeeApi';

function EmployeesTable() {
	const { data: employees, isLoading,} = useGetApiEmployeesQuery();
	const [removeEmployees] = useDeleteApiEmployeesByIdMutation();

	const columns = useMemo<MRT_ColumnDef<EmployeeModel>[]>(
		() => [
			{
				accessorKey: 'employeeNumber',
				header: 'Employee Number',
				accessorFn: (row) => `${row.employeeNumber}`
			},
			{
				accessorFn: (row) => row.photoURL,
				id: 'photoURL',
				header: '',
				enableColumnFilter: false,
				enableColumnDragging: false,
				size: 64,
				enableSorting: false,
				Cell: ({ row }) => (
					<div className="flex items-center justify-center">
						{ row.original.photoURL ? (
							<img
								className="w-full max-h-36 max-w-36 block rounded"
								src={row.original.photoURL}
								alt=""
							/>
						) : (
							<img
								className="w-full max-h-36 max-w-36 block rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt=""
							/>
						)}
					</div>
				)
			},
			{
				accessorKey: 'name',
				header: 'Name',
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/employees/employeesDetails/${row.original.id}}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{row.original.employeeWorkInformation?.firstName + row.original.employeeWorkInformation?.lastName}
					</Typography>
				)
			},
			{
				accessorKey: 'email',
				header: 'Email',
				accessorFn: (row) => `${row.employeeWorkInformation?.email}`
			},
			{
				accessorKey: 'isActive',
				header: 'Active',
				accessorFn: (row) => (
					<div className="flex items-center">
						{row.isActive ? (
							<FuseSvgIcon
								className="text-green"
								size={20}
							>
								heroicons-outline:check-circle
							</FuseSvgIcon>
						) : (
							<FuseSvgIcon
								className="text-red"
								size={20}
							>
								heroicons-outline:minus-circle
							</FuseSvgIcon>
						)}
					</div>
				)
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
