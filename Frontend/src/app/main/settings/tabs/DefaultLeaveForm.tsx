import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { useDispatch } from 'react-redux';
import {
	useGetApiLeavesJoblevelsQuery,
	useLazyGetApiLeavesDefaultLeavesByJobLevelIdQuery
} from '../../employee/leave-management/LeavesApi';
import {
	DefaultLeaveModel,
	useDeleteApiLeavesSettingsDefaultLeavesByIdMutation,
	usePutApiLeavesSettingsDefaultLeavesMutation
} from '../SettingsApi';

// interface DefaultLeaveModel {
//     id: number;
//     name: string;
//     jobLevelLeaveTypeId: number;
//     totalLeaves: number;
// }

function DefaultLeaveForm() {
	const [selectedJobLevel, setSelectedJobLevel] = useState<number | null>(null);
	const [leaveTypes, setLeaveTypes] = useState<DefaultLeaveModel[]>([]);
	const [originalLeaveTypes, setOriginalLeaveTypes] = useState<DefaultLeaveModel[]>([]);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
	const dispatch = useDispatch();

	const { data: jobLevels, isLoading: isLoadingJobLevels } = useGetApiLeavesJoblevelsQuery();
	const [updateDefaultLeaves, { isLoading: isUpdating }] = usePutApiLeavesSettingsDefaultLeavesMutation();
	const [getDefaultLeaves, { isLoading: isLoadingDefaultLeaves }] =
		useLazyGetApiLeavesDefaultLeavesByJobLevelIdQuery();
	const [deleteDefaultLeave, { isLoading: isDeleting }] = useDeleteApiLeavesSettingsDefaultLeavesByIdMutation();

	useEffect(() => {
		if (selectedJobLevel) {
			fetchDefaultLeaves(selectedJobLevel);
		}
	}, [selectedJobLevel]);

	const fetchDefaultLeaves = async (jobLevelId: number) => {
		try {
			const result = await getDefaultLeaves({ jobLevelId }).unwrap();
			console.log("result of default leave",result);
			
			const formattedLeaveTypes = result.map((leave) => ({
				id: leave.id,
				name: leave.employeeLeaveTypes?.name || '',
				jobLevelLeaveTypeId: leave.jobLevelLeaveId || 0,
				totalLeaves: leave.totalLeaves
			}));
			console.log("formatted leave types",formattedLeaveTypes);
			
			setLeaveTypes(formattedLeaveTypes);
			setOriginalLeaveTypes(formattedLeaveTypes);
		} catch (error) {
			console.error('Error fetching default leaves:', error);
			dispatch(
				showMessage({
					message: 'Failed to fetch default leaves',
					autoHideDuration: 6000,
					anchorOrigin: { vertical: 'top', horizontal: 'center' },
					variant: 'error'
				})
			);
		}
	};

	const handleJobLevelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		if (hasUnsavedChanges) {
			dispatch(
				showMessage({
					message: 'Please save your changes before switching job levels, or your updates will be lost.',
					autoHideDuration: 6000,
					anchorOrigin: { vertical: 'top', horizontal: 'center' },
					variant: 'warning'
				})
			);
			return;
		}

		const jobLevelId = event.target.value as number;
		setSelectedJobLevel(jobLevelId);
		setHasUnsavedChanges(false);
	};

	const handleInputChange = (index: number, field: 'name' | 'totalLeaves', value: string | number) => {
		const updatedLeaveTypes = [...leaveTypes];
		updatedLeaveTypes[index] = { ...updatedLeaveTypes[index], [field]: value };
		setLeaveTypes(updatedLeaveTypes);
		setHasUnsavedChanges(true);
	};

	const handleRemoveField = async (index: number) => {
		const leaveToRemove = leaveTypes[index];
		console.log("Id oof leave to remove",leaveToRemove.id);
		
		try {
			await deleteDefaultLeave({ id: leaveToRemove.id }).unwrap();

			const updatedLeaveTypes = leaveTypes.filter((_, i) => i !== index);
			setLeaveTypes(updatedLeaveTypes);
			setOriginalLeaveTypes(updatedLeaveTypes);
			dispatch(
				showMessage({
					message: 'Default leave removed successfully',
					autoHideDuration: 6000,
					anchorOrigin: { vertical: 'top', horizontal: 'center' },
					variant: 'success'
				})
			);
		} catch (error) {
			console.error('Error removing default leave:', error);
			dispatch(
				showMessage({
					message: 'Failed to remove default leave',
					autoHideDuration: 6000,
					anchorOrigin: { vertical: 'top', horizontal: 'center' },
					variant: 'error'
				})
			);
		}
	};

	const handleAddField = () => {
		if (selectedJobLevel) {
			setLeaveTypes([
				...leaveTypes,
				{
					id: 0, // This will be assigned by the backend
					name: '',
					jobLevelLeaveTypeId: selectedJobLevel,
					totalLeaves: 0
				}
			]);
			setHasUnsavedChanges(true);
		}
	};

	const handleSave = async () => {
		if (!selectedJobLevel) return;

		try {
			const result = await updateDefaultLeaves({ body: leaveTypes }).unwrap();

			if (result) {
				setOriginalLeaveTypes(leaveTypes);
				dispatch(
					showMessage({
						message: 'Leave types updated successfully',
						autoHideDuration: 6000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center'
						},
						variant: 'success'
					})
				);
				setHasUnsavedChanges(false);
			} else {
				throw new Error('Failed to update leave types');
			}
		} catch (error) {
			console.error('Error updating leave types:', error);
			dispatch(
				showMessage({
					message: 'Failed to update leave types',
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

	const handleReset = () => {
		if (selectedJobLevel) {
			setLeaveTypes([...originalLeaveTypes]);
		}

		setHasUnsavedChanges(false);
	};

	if (isLoadingJobLevels || isUpdating || isLoadingDefaultLeaves || isDeleting) return <FuseLoading />;

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
					<FormControl
						fullWidth
						style={{ marginBottom: '2rem' }}
					>
						<InputLabel id="job-level-select-label">Job Level</InputLabel>
						<Select
							labelId="job-level-select-label"
							id="job-level-select"
							value={selectedJobLevel || ''}
							label="Job Level"
							onChange={handleJobLevelChange}
						>
							{jobLevels?.map((jobLevel) => (
								<MenuItem
									key={jobLevel.id}
									value={jobLevel.id}
								>
									{jobLevel.jobLevel}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{leaveTypes.map((leaveType, index) => (
						<div
							key={index}
							style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '3rem' }}
						>
							<TextField
								label="Leave Type"
								value={leaveType.name}
								onChange={(e) => handleInputChange(index, 'name', e.target.value)}
								error={!leaveType.name}
								helperText={!leaveType.name ? 'Leave Type is required' : ''}
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
					disabled={!selectedJobLevel}
				>
					Add Leave Type
				</Button>
				<div className="flex justify-end mt-4 space-x-4">
					{hasUnsavedChanges && (
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleReset}
						>
							Reset
						</Button>
					)}
					<Button
						variant="contained"
						color="primary"
						onClick={handleSave}
						disabled={!selectedJobLevel || leaveTypes.some((lt) => !lt.name || lt.totalLeaves <= 0)}
					>
						Save
					</Button>
				</div>
			</Paper>
		</div>
	);
}

export default DefaultLeaveForm;
