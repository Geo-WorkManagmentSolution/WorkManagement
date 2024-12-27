import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { ListItemIcon, MenuItem, Paper } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import {
	EmployeeSalaryDataModel,
	SalaryStatus,
	useGetApiEmployeesSalaryPendingSalaryRequestQuery,
	usePutApiEmployeesSalaryApproveBySalaryIdMutation,
	usePutApiEmployeesSalaryRejectBySalaryIdMutation
} from '../EmployeeApi';
import SalaryStatusComponent from './SalaryStatusComponent';

// Define SalaryStatusCell outside of SalaryApprovalTable
function SalaryStatusCell({ row }) {
	return <SalaryStatusComponent status={row.original.salaryStatus} />;
}

function SalaryApprovalTable() {
	const dispatch = useDispatch();
	const { isLoading, data: pendingSalaries, refetch } = useGetApiEmployeesSalaryPendingSalaryRequestQuery({});
	const [approveSalary, { isLoading: approveLoading }] = usePutApiEmployeesSalaryApproveBySalaryIdMutation();
	const [rejectSalary, { isLoading: rejectLoading }] = usePutApiEmployeesSalaryRejectBySalaryIdMutation();

	const handleSalaryAction = async (action: 'approve' | 'reject', salaryId: number) => {
		try {
			if (action === 'approve') {
				await approveSalary({ salaryId }).unwrap();
			} else {
				await rejectSalary({ salaryId }).unwrap();
			}

			dispatch(
				showMessage({
					message: `Salary ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
					autoHideDuration: 8000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					},
					variant: 'success'
				})
			);
			refetch();
		} catch (error) {
			dispatch(
				showMessage({
					message: `Failed to ${action} salary`,
					autoHideDuration: 8000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					},
					variant: 'error'
				})
			);
		}
	};

	const columns = useMemo<MRT_ColumnDef<EmployeeSalaryDataModel>[]>(
		() => [
			{
				accessorKey: 'employeeId',
				header: 'Employee ID',
				accessorFn: (row) => `${row.employeeId}`
			},
			{
				accessorKey: 'employeeName',
				header: 'Employee Name',
				accessorFn: (row) => `${row.employeeName}`
			},
			{
				accessorKey: 'managerName',
				header: 'Manager Name',
				accessorFn: (row) => `${row.managerName}`
			},
			{
				accessorKey: 'currentSalary',
				header: 'Current Salary',
				accessorFn: (row) => `$${row.currentSalary?.toFixed(2)}`
			},
			{
				accessorKey: 'expectedToBeSalary',
				header: 'Expected Salary',
				accessorFn: (row) => `$${row.expectedToBeSalary?.toFixed(2)}`
			},
			{
				accessorKey: 'isApprovedByDepartmentHead',
				header: 'Approved By Department Head',
				accessorFn: (row) => row.isApprovedByDepartmentHead
			},
			{
				accessorKey: 'isApprovedByHRHead',
				header: 'Approved By HR Head',
				accessorFn: (row) => row.isApprovedByHRHead
			},
			{
				accessorKey: 'updatedDateTime',
				header: 'Updated Date',
				accessorFn: (row) => format(new Date(row.updatedDateTime || ''), 'dd/MM/yyyy')
			},
			{
				accessorKey: 'status',
				header: 'Status',
				Cell: SalaryStatusCell // Use SalaryStatusCell here
			}
		],
		[]
	);

	if (isLoading || approveLoading || rejectLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				enableRowSelection={false}
				data={pendingSalaries || []}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={`approve-${row.original.employeeId}`}
						onClick={() => {
							handleSalaryAction('approve', row.original.employeeId || 0);
							closeMenu();
							table.resetRowSelection();
						}}
						disabled={row.original.salaryStatus === SalaryStatus.Approved}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:check</FuseSvgIcon>
						</ListItemIcon>
						Approve
					</MenuItem>,
					<MenuItem
						key={`reject-${row.original.employeeId}`}
						onClick={() => {
							handleSalaryAction('reject', row.original.employeeId || 0);
							closeMenu();
							table.resetRowSelection();
						}}
						disabled={row.original.salaryStatus === SalaryStatus.Rejected}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
						</ListItemIcon>
						Reject
					</MenuItem>
				]}
			/>
		</Paper>
	);
}

export default SalaryApprovalTable;
