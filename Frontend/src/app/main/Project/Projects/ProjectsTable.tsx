/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import {ListItemIcon, MenuItem, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from 'app/store/hooks';
import { closeDialog, openDialog } from '@fuse/core/FuseDialog/fuseDialogSlice';
import { ProjectModel, useDeleteApiProjectByIdMutation, useGetApiProjectQuery } from '../ProjectApi';
import { ProjectStatusComponent } from './Projectstatus';


function ProjectsTable() {
	const { data: projects, isLoading,} = useGetApiProjectQuery();
	const [removeProjects] = useDeleteApiProjectByIdMutation();
	const dispatch = useAppDispatch();

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
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/projects/projectSearch/${row.original.id}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{`${row.original?.projectName} `}
					</Typography>
				)
			},
			{
				accessorKey: 'ProjectDescription',
				header: 'Project Description',
				accessorFn: (row) => `${row.projectDescription}`
			},
			{
				accessorKey: 'StartDate',
				header: 'Start Date',
				accessorFn: (row) => new Date(row.startDate || '').toLocaleDateString()
			},
			{
				accessorKey: 'EndDate',
				header: 'End Date',
				accessorFn: (row) => new Date(row.endDate || '').toLocaleDateString()
			},
			{
				accessorKey: 'workOrderName',
                header: 'Work Order Name',
				accessorFn: (row) => `${row.workOrderName}`
			},
			{
				accessorKey:'workOrderNumber',
				header: 'Work Order Number',
                accessorFn: (row) => `${row.workOrderNumber}`
			},
			{
				accessorKey:"PeriodOfWorkInMonths",
				header: 'Period of Work (in Months)',
                accessorFn: (row) => `${row.periodOfWorkInMonths}`
			},
			{
				accessorKey: 'status',
                header: 'Project Status',
                Cell: ({ row }) => (
                    <ProjectStatusComponent status={row.original.status} />
                  )
			},
			{
				accessorKey: 'workOrderAmount',
                header: 'Work Order Amount',
                accessorFn: (row) => `$  ${row.workOrderAmount}`
			},
			{
				accessorKey: 'workOrderDate',
				header: 'Work Order Date',
                accessorFn: (row) => new Date(row.workOrderDate || '').toLocaleDateString()
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
							dispatch(
								openDialog({
									children: (
										<>
											<DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
											<DialogContent>
												<DialogContentText id="alert-dialog-description">
													You are going to remove selected project. Are you sure you want to continue?
												</DialogContentText>
											</DialogContent>
											<DialogActions>
												<Button
													onClick={() => dispatch(closeDialog())}
													color="primary"
												>
													Disagree
												</Button>
												<Button
													onClick={() => {removeProjects({id:row.original.id});
																	dispatch(closeDialog());
																	table.resetRowSelection();
												}}
													color="primary"
													autoFocus
												>
													Agree
												</Button>
											</DialogActions>
										</>
									)
								})
							)


							// removeProjects({id:row.original.id});
							// closeMenu();
							// table.resetRowSelection();
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
