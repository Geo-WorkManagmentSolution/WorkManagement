import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Autocomplete,
	Button,
	FormControlLabel,
	Switch,
	TextField,
	Typography,
	Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import {
	useGetApiPermissionsPermissionActionsQuery,
	usePutApiPermissionsAssignRoleByRoleIdMutation,
	useGetApiPermissionsRoleByRoleIdQuery,
	PermissionCategoryEnum,
	PermissionAction
} from '../PermissionsApi';
import { useGetApiAuthRolesQuery } from '../../../auth/services/AuthApi';

export default function PermissionManager() {
	const dispatch = useDispatch();
	const [selectedRole, setSelectedRole] = useState<string | null>(null);
	const { data: roles, isLoading: isLoadingRoles } = useGetApiAuthRolesQuery();
	const { data: permissionActions, isLoading: isLoadingPermissionActions } =
		useGetApiPermissionsPermissionActionsQuery();
	const { data: rolePermissions, isLoading: isLoadingRolePermissions } = useGetApiPermissionsRoleByRoleIdQuery(
		{ roleId: selectedRole || '' },
		{ skip: !selectedRole }
	);
	const [updatePermissions] = usePutApiPermissionsAssignRoleByRoleIdMutation();

	const { control, handleSubmit, reset } = useForm<Record<number, boolean>>();

	useEffect(() => {
		if (permissionActions && rolePermissions) {
			const initialFormState = permissionActions.reduce(
				(acc, action) => {
					acc[action.id] = rolePermissions.some((rp) => rp.permissionActionId === action.id);
					return acc;
				},
				{} as Record<number, boolean>
			);
			reset(initialFormState);
		}
	}, [permissionActions, rolePermissions, reset]);

	const groupPermissionsByCategory = (permissions: PermissionAction[]) => {
		return permissions.reduce(
			(acc, permission) => {
				const category = permission.value?.split('_')[0] as keyof typeof PermissionCategoryEnum;

				if (!acc[category]) {
					acc[category] = [];
				}

				acc[category].push(permission);
				return acc;
			},
			{} as Record<keyof typeof PermissionCategoryEnum, PermissionAction[]>
		);
	};

	const onSubmit = async (data: Record<number, boolean>) => {
		if (selectedRole) {
			const enabledPermissionIds = Object.entries(data)
				.filter(([_, isEnabled]) => isEnabled)
				.map(([id, _]) => parseInt(id));

			try {
				await updatePermissions({ roleId: selectedRole, body: enabledPermissionIds }).unwrap();
				dispatch(showMessage({ message: 'Permissions saved successfully', variant: 'success' }));
			} catch (error) {
				console.error('Error saving permissions:', error);
				dispatch(showMessage({ message: 'Error saving permissions', variant: 'error' }));
			}
		}
	};

	if (isLoadingRoles || isLoadingPermissionActions || (selectedRole && isLoadingRolePermissions)) {
		return <Typography>Loading...</Typography>;
	}

	const groupedPermissions = permissionActions ? groupPermissionsByCategory(permissionActions) : {};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ maxWidth: 1000, margin: 'auto' }}
		>
			<Autocomplete
				options={roles || []}
				getOptionLabel={(option) => option.name}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Select Role"
					/>
				)}
				onChange={(_, value) => setSelectedRole(value?.id || null)}
				sx={{ mb: 2 }}
			/>

			{selectedRole && (
				<>
					{Object.entries(groupedPermissions).map(([category, permissions]) => (
						<Accordion key={category}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>
									{PermissionCategoryEnum[category as keyof typeof PermissionCategoryEnum]}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{permissions.map((permission) => (
									<Controller
										key={permission.id}
										name={`${permission.id}`}
										control={control}
										defaultValue={false}
										render={({ field }) => (
											<FormControlLabel
												control={
													<Switch
														checked={field.value}
														onChange={(e) => field.onChange(e.target.checked)}
													/>
												}
												label={permission.name}
												labelPlacement="start"
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													width: '100%',
													mb: 1
												}}
											/>
										)}
									/>
								))}
							</AccordionDetails>
						</Accordion>
					))}
					<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Save Permissions
						</Button>
					</Box>
				</>
			)}
		</Box>
	);
}
