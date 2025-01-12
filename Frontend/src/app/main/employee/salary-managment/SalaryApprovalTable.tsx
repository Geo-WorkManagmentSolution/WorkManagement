import { useEffect, useMemo } from 'react';
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
import SalaryHeader from './SalaryHeader';

// Define SalaryStatusCell outside of SalaryApprovalTable
function SalaryStatusCell({ row }) {
	return <SalaryStatusComponent status={row.original.salaryStatus} />;
}

function isApprovedByDepartmentHead({ row }) {
	return (
		<>
			{row.original.isApprovedByDepartmentHead === true ? (
				<FuseSvgIcon color="success" size={28}>heroicons-outline:check-circle</FuseSvgIcon>
			) : (
				<FuseSvgIcon color="error" size={28}>heroicons-outline:minus-circle</FuseSvgIcon>
			)}
		</>
	);
}

function isApprovedByHRHead({ row }) {
	return (
		<>
			{row.original.isApprovedByHRHead === true ? (
				<FuseSvgIcon color="success" size={28}>heroicons-outline:check-circle</FuseSvgIcon>
			) : (
				<FuseSvgIcon color="error" size={28} >heroicons-outline:minus-circle</FuseSvgIcon>
			)}
		</>
	);
}

function SalaryApprovalTable() {
	const dispatch = useDispatch();
	const { isLoading, data: pendingSalaries, refetch } = useGetApiEmployeesSalaryPendingSalaryRequestQuery({});
	const [approveSalary, { isLoading: approveLoading }] = usePutApiEmployeesSalaryApproveBySalaryIdMutation();
	const [rejectSalary, { isLoading: rejectLoading }] = usePutApiEmployeesSalaryRejectBySalaryIdMutation();

	const handleSalaryAction = async (action: 'approve' | 'reject', salaryId: number,employeeId:number) => {
		try {
			if (action === 'approve') {
				await approveSalary({ salaryId,employeeId }).unwrap();
			} else {
				await rejectSalary({ salaryId,employeeId }).unwrap();
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
				accessorFn: (row) => `₹ ${row.currentSalary?.toFixed(2)}`
			},
			{
				accessorKey: 'expectedToBeSalary',
				header: 'Expected Salary',
				accessorFn: (row) => ` ₹ ${row.expectedToBeSalary?.toFixed(2)}`
			},{
				accessorKey: 'status',
				header: 'Status',
				Cell: SalaryStatusCell // Use SalaryStatusCell here
			},
			{
				accessorKey: 'isApprovedByDepartmentHead',
				header: 'Approved By Department Head',
				Cell: isApprovedByDepartmentHead // Use isApprovedByDepartmentHead here
			},
			{
				accessorKey: 'isApprovedByHRHead',
				header: 'Approved By HR Head',
				Cell: isApprovedByHRHead
			},
			{
				accessorKey: 'updatedDateTime',
				header: 'Updated Date',
				accessorFn: (row) => format(new Date(row.updatedDateTime || ''), 'dd/MM/yyyy')
			},{
				accessorKey: 'updatedByUserName',
				header: 'Updated By',
				accessorFn: (row) => row.updatedByUserName
			}
			
		],
		[]
	);

useEffect(()=>{
	refetch()
},[refetch])


	if (isLoading || approveLoading || rejectLoading) {
		return <FuseLoading />;
	}

	return (
		<>
		<div className="m-10">
			<SalaryHeader/>
		</div>
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
							handleSalaryAction('approve',row.original.salaryid, row.original.employeeId);
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
							handleSalaryAction('reject',row.original.salaryid , row.original.employeeId);
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
		</>
	);
}

export default SalaryApprovalTable;
