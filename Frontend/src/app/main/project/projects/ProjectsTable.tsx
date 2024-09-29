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
import { ProjectModel, useDeleteApiProjectDeleteProjectByIdMutation, useGetApiProjectGetAllProjectsQuery, useGetApiProjectGetAllCopaniesQuery } from '../ProjectApi';

function ProjectsTable() {
	const { data: projectResponse, isLoading,} = useGetApiProjectGetAllProjectsQuery();
	const [removeProjects] = useDeleteApiProjectDeleteProjectByIdMutation();

	const columns = useMemo<MRT_ColumnDef<ProjectModel>[]>(
		() => [
			{
				accessorKey: 'projectName',
				header: 'Project Name',
				accessorFn: (row) => `${row.projectName}`
			},
            {
				accessorKey: 'companyName',
				header: 'Company Name',
				accessorFn: (row) => `${row.companyName}`
			},
            {
				accessorKey: 'projectIncharge',
				header: 'Project Incharge',
				accessorFn: (row) => `${row.projectIncharge}`
			},
            {
				accessorKey: 'workOrderNumber',
				header: 'Work Order Number',
				accessorFn: (row) => `${row.workOrderNumber}`
			},
            {
				accessorKey: 'workOrderAmount',
				header: 'Work Order Amount',
				accessorFn: (row) => `${row.workOrderAmount}`
			},
            {
				accessorKey: 'startDate',
				header: 'Start Date',
				accessorFn: (row) => `${row.startDate}`
			},
            {
				accessorKey: 'endDate',
				header: 'End Date',
				accessorFn: (row) => `${row.endDate}`
			},
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
				data={projectResponse.data}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							removeProjects({projectId:row.original.id});
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

export default ProjectsTable;
