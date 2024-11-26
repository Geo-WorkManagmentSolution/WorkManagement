import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

import FuseLoading from '@fuse/core/FuseLoading';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { useDispatch } from 'react-redux';
import {
	useGetApiLeavesDefaultLeavesQuery,
	usePutApiLeavesDefaultLeavesMutation,
	EmployeeDefaultLeaveSummary,
	PutApiLeavesDefaultLeavesApiArg
} from '../../employee/leave-management/LeavesApi';

function DefaultLeaveForm() {
	const { data: defaultLeaves, isLoading, isError } = useGetApiLeavesDefaultLeavesQuery();
	const [updateDefaultLeaves, { isLoading: isUpdating }] = usePutApiLeavesDefaultLeavesMutation();
	const [leaveTypes, setLeaveTypes] = useState<EmployeeDefaultLeaveSummary[]>([]);
	// const [snackbarOpen, setSnackbarOpen] = useState(false);
	// const [snackbarMessage, setSnackbarMessage] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		if (leaveTypes.length === 0) {
			setLeaveTypes([
				{ employeeLeaveTypes: { name: '' }, totalLeaves: 0 },
				{ employeeLeaveTypes: { name: '' }, totalLeaves: 0 },
				{ employeeLeaveTypes: { name: '' }, totalLeaves: 0 }
			]);
		}
	}, []);

	// useEffect(() => {
	//     if (snackbarOpen) {
	//         setTimeout(() => {
	//             setSnackbarOpen(false);
	//         }, 3000);
	//     }
	// }, [snackbarOpen]);

	useEffect(() => {
		if (defaultLeaves) {
			setLeaveTypes(defaultLeaves);
		}
	}, [defaultLeaves]);

	const handleInputChange = (index: number, field: 'name' | 'totalLeaves', value: string | number) => {
		const updatedLeaveTypes = [...leaveTypes];

		if (field === 'name') {
			updatedLeaveTypes[index] = {
				...updatedLeaveTypes[index],
				employeeLeaveTypes: { ...updatedLeaveTypes[index].employeeLeaveTypes, name: value as string }
			};
		} else {
			updatedLeaveTypes[index] = { ...updatedLeaveTypes[index], [field]: value as number };
		}

		setLeaveTypes(updatedLeaveTypes);
	};

	const handleRemoveField = (index: number) => {
		setLeaveTypes(leaveTypes.filter((_, i) => i !== index));
	};

	const handleAddField = () => {
		setLeaveTypes([...leaveTypes, { employeeLeaveTypes: { name: '' }, totalLeaves: 0 }]);
	};

	const handleSave = async () => {
		try {
			const arg: PutApiLeavesDefaultLeavesApiArg = { body: leaveTypes };
			await updateDefaultLeaves(arg).unwrap();
			dispatch(
				showMessage({
					message: 'Default leaves updated successfully',
					autoHideDuration: 6000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center'
					},
					variant: 'success'
				})
			);
		} catch (error) {
			console.error('Error updating default leaves:', error);
			dispatch(
				showMessage({
					message: 'Failed to update default leaves',
					autoHideDuration: 6000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center'
					},
					variant: 'error'
				})
			);
		}
	};

	if (isLoading || isUpdating) return <FuseLoading />;

	return (
		<div>
			<Paper
				className="flex flex-col flex-auto shadow-1 rounded-2xl overflow-hidden rounded-xl w-full h-full p-10"
				elevation={0}
			>
				<div className="flex items-center border-b-1 space-x-8 m-10">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:adjustments-horizontal
					</FuseSvgIcon>
					<Typography
						className="text-2xl mb-3"
						color="text.secondary"
					>
						Default Leave Form
					</Typography>
				</div>
				<div className="m-10 p-10">
					{leaveTypes.map((leaveType, index) => (
						<div
							key={index}
							style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '3rem' }}
						>
							<TextField
								label="Leave Type"
								value={leaveType.employeeLeaveTypes.name}
								onChange={(e) => handleInputChange(index, 'name', e.target.value)}
								error={!leaveType.employeeLeaveTypes.name}
								helperText={!leaveType.employeeLeaveTypes.name ? 'Leave Type is required' : ''}
								style={{ marginRight: '1rem' }}
							/>
							<TextField
								label="Total Leaves"
								type="number"
								value={leaveType.totalLeaves}
								onChange={(e) => handleInputChange(index, 'totalLeaves', parseInt(e.target.value))}
								error={leaveType.totalLeaves <= 0}
								helperText={leaveType.totalLeaves <= 0 ? 'Total Leaves must be greater than 0' : ''}
								style={{ marginRight: '1rem' }}
							/>
							<Button
								onClick={() => handleRemoveField(index)}
								variant="outlined"
								color="error"
								startIcon={<DeleteIcon />}
							>
								Remove
							</Button>
						</div>
					))}
				</div>
				<Button
					startIcon={<AddIcon />}
					onClick={handleAddField}
				>
					Add Leave Type
				</Button>
				<Button
					className="ml-10 w-20"
					variant="contained"
					color="primary"
					onClick={handleSave}
					disabled={isUpdating || leaveTypes.some((lt) => !lt.employeeLeaveTypes.name || lt.totalLeaves <= 0)}
					style={{ marginTop: '1rem' }}
				>
					{isUpdating ? 'Saving...' : 'Save'}
				</Button>
			</Paper>
		</div>
	);
}

export default DefaultLeaveForm;
