/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import {ListItemIcon, MenuItem, Paper } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ProjectModel, useDeleteApiProjectByIdMutation, useGetApiProjectQuery } from '../ProjectApi';

function ProjectsTable() {
	const { data: projects, isLoading,} = useGetApiProjectQuery();
	const [removeProjects] = useDeleteApiProjectByIdMutation();

	const columns = useMemo<MRT_ColumnDef<ProjectModel>[]>(
		() => [
			{
				accessorKey: 'ProjectNumber',
				header: 'Project Number',
				accessorFn: (row) => `${row.projectNumber}`
			},
			{
				accessorKey: 'ProjectName',
				header: 'Project Name',
				accessorFn: (row) => `${row.projectName}`
			},
			{
				accessorKey: 'ProjectDescription',
				header: 'Project Description',
				accessorFn: (row) => `${row.projectDescription}`
			},
			{
				accessorKey: 'StartDate',
				header: 'Start Date',
				accessorFn: (row) => `${row.startDate}`
			},
			{
				accessorKey: 'EndDate',
				header: 'End Date',
				accessorFn: (row) => `${row.endDate}`
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
				data={projects}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							removeProjects({id:row.original.id});
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
