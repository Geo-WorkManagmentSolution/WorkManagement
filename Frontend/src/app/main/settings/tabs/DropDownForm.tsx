import React, { useState, useMemo, useEffect } from 'react';
import {
	Paper,
	Box,
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Typography,
	ListItemIcon
} from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import {
	useGetApiEmployeesDesignationsQuery,
	useGetApiEmployeesDepartmentsQuery,
	DropdownModel
} from '../../employee/EmployeeApi';
import {
	useDeleteApiEmployeesSettingsDeleteDropdownItemByIdAndDropdownNameMutation,
	usePostApiEmployeesSettingsAddDropdownItemMutation,
	usePutApiEmployeesSettingsUpdateDropdownItemMutation
} from '../SettingsApi';
import { useGetApiLeavesJoblevelsQuery } from '../../employee/leave-management/LeavesApi';

interface DropdownItem {
	id: number;
	name: string;
}

interface DropdownCategory {
	id: string;
	name: string;
	items: DropdownItem[];
}

const initialCategories: DropdownCategory[] = [
	{
		id: 'designation',
		name: 'Designation',
		items: []
	},
	{
		id: 'department',
		name: 'Department',
		items: []
	},
	{
		id: 'joblevel',
		name: 'Job Level',
		items: []
	}
];

function DropDownForm() {
	const [categories, setCategories] = useState<DropdownCategory[]>(initialCategories);
	const [selectedCategory, setSelectedCategory] = useState<string>('designation');
	const [itemName, setItemName] = useState<string>('');
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
	const dispatch = useDispatch();

	const {
		data: designations,
		isLoading: isLoadingDesignations,
		refetch: refetchDesignations
	} = useGetApiEmployeesDesignationsQuery();
	const {
		data: departments,
		isLoading: isLoadingDepartments,
		refetch: refetchDepartments
	} = useGetApiEmployeesDepartmentsQuery();
	const {
		data: jobLevels,
		isLoading: isLoadingJobLevels,
		refetch: refetchJobLevels
	} = useGetApiLeavesJoblevelsQuery();

	const [addDropdownItem] = usePostApiEmployeesSettingsAddDropdownItemMutation();
	const [deleteDropdownItem] = useDeleteApiEmployeesSettingsDeleteDropdownItemByIdAndDropdownNameMutation();
	const [updateDropdownItem] = usePutApiEmployeesSettingsUpdateDropdownItemMutation();

	useEffect(() => {
		if (designations && departments && jobLevels) {
			setCategories([
				{
					id: 'designation',
					name: 'Designation',
					items: designations.map((d) => ({ id: d.id, name: d.name }))
				},
				{
					id: 'department',
					name: 'Department',
					items: departments.map((d) => ({ id: d.id, name: d.name }))
				},
				{
					id: 'joblevel',
					name: 'Job Level For Default Leaves',
					items: jobLevels.map((d) => ({ id: d.id, name: d.jobLevel }))
				}
			]);
		}
	}, [designations, departments,jobLevels]);

	const handleAddItem = async () => {
		if (selectedCategory && itemName.trim()) {
			try {
				const newItem: DropdownModel = {
					category: selectedCategory,
					id: 0,
					name: itemName
				};
				console.log('saving new data', newItem);

				await addDropdownItem({ dropdownModel: newItem }).unwrap();
				dispatch(
					showMessage({
						message: 'Record has been added successfully',
						variant: 'success'
					})
				);
				setItemName('');
				refetchData();
			} catch (error) {
				console.error('Error adding Record:', error);
				dispatch(
					showMessage({
						message: 'error adding Record',
						variant: 'error'
					})
				);
			}
		}
	};

	const handleDeleteItem = async (itemId: number,dropdownType: string) => {
		try {
			await deleteDropdownItem({ id: itemId,dropdownName:dropdownType }).unwrap();
			dispatch(
				showMessage({
					message: 'Record has been deleted successfully',
					variant: 'success'
				})
			);
			refetchData();
		} catch (error) {
			console.error('Error deleting Record:', error);
			dispatch(
				showMessage({
					message: 'Cannot delete record',
					variant: 'error'
				})
			);
		}
	};

	const handleUpdateItem = async (item: DropdownItem) => {
		setItemName(item.name);
		setIsUpdating(true);
		setUpdatingItemId(item.id);
	};

	const handleSaveUpdate = async () => {
		if (updatingItemId !== null && itemName.trim()) {
			try {
				const updatedItem: DropdownModel = {
					id: updatingItemId,
					category: selectedCategory,
					name: itemName
				};
				console.log("updating data", updatedItem);
			
				await updateDropdownItem({ dropdownModel: updatedItem }).unwrap();
				dispatch(
					showMessage({
						message: 'Record has been Updated successfully',
						variant: 'success'
					})
				);
				setItemName('');
				setIsUpdating(false);
				setUpdatingItemId(null);
				refetchData();
			} catch (error) {
				console.error('Error updating item:', error);
				dispatch(
					showMessage({
						message: 'Error updating record',
						variant: 'error'
					})
				);
			}
		}
	};

	const refetchData = () => {
		if (selectedCategory === 'designation') {
			refetchDesignations();
		} else if (selectedCategory === 'department') {
			refetchDepartments();
		} else if (selectedCategory === 'joblevel') {
			refetchJobLevels();
		}
	};

	const columns = useMemo<MRT_ColumnDef<DropdownItem>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Name'
			}
		],
		[]
	);

	if (isLoadingDesignations || isLoadingDepartments || isLoadingJobLevels) {
		return <div>Loading...</div>;
	}

	return (
		<Paper className="p-24 max-w-5xl mx-auto">
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
					Dropdown Form
				</Typography>
			</div>
			<Box sx={{ mb: 3 }}>
				<FormControl
					fullWidth
					sx={{ mb: 2 }}
				>
					<InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
					<Select
						label="Category"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						{categories.map((category) => (
							<MenuItem
								key={category.id}
								value={category.id}
							>
								{category.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<TextField
						fullWidth
						label={isUpdating ? 'Update Name' : 'Add Name'}
						value={itemName}
						onChange={(e) => setItemName(e.target.value)}
						error={isUpdating &&!itemName.trim()}
						helperText = {isUpdating && !itemName.trim() ? 'Name is required': ""}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={isUpdating ? handleSaveUpdate : handleAddItem}
						startIcon={isUpdating ? <FuseSvgIcon>heroicons-outline:arrow-path</FuseSvgIcon> : <AddIcon />}
					>
						{isUpdating ? 'Update' : 'Add'}
					</Button>
				</Box>
			</Box>
			{selectedCategory && (
				<DataTable
					enableTopToolbar={false}
					enableRowSelection={false}
					data={categories.find((c) => c.id === selectedCategory)?.items || []}
					columns={columns}
					renderRowActionMenuItems={({ closeMenu, row, table }) => [
						<MenuItem
							key={`remove-${row.original.id}`}
							onClick={() => {
								handleDeleteItem(row.original.id, selectedCategory);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
							</ListItemIcon>
							Remove
						</MenuItem>,
						<MenuItem
							key={`update-${row.original.id}`}
							onClick={() => {
								handleUpdateItem(row.original);
								closeMenu();
								table.resetRowSelection();
							}}
						>
							<ListItemIcon>
								<FuseSvgIcon>heroicons-outline:arrow-path</FuseSvgIcon>
							</ListItemIcon>
							Update
						</MenuItem>
					]}
				/>
			)}
		</Paper>
	);
}

export default DropDownForm;
