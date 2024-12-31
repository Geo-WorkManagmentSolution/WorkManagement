import React, { useState, useEffect, useMemo } from 'react';
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
  Box,
  Divider,
  CircularProgress
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

// Define an interface for the permission categories
interface PermissionCategory {
  id: number;
  name: string;
}

// Mock data for permission categories (replace this with actual data from your API)
const permissionCategories: PermissionCategory[] = [
  { id: 1, name: 'Project Module' },
  { id: 2, name: 'Employee Module' },
  { id: 3, name: 'Integration Module' },
  { id: 4, name: 'Leave Module' },
  { id: 5, name: 'Setting Module' },
];

export default function PermissionManager() {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: roles, isLoading: isLoadingRoles } = useGetApiAuthRolesQuery();
  const { data: permissionActions, isLoading: isLoadingPermissionActions } =
    useGetApiPermissionsPermissionActionsQuery();
  const { 
    data: rolePermissions, 
    isLoading: isLoadingRolePermissions,
    refetch: refetchRolePermissions
  } = useGetApiPermissionsRoleByRoleIdQuery(
    { roleId: selectedRole || '' },
    { skip: !selectedRole }
  );
  const [updatePermissions] = usePutApiPermissionsAssignRoleByRoleIdMutation();

  const { control, handleSubmit, reset } = useForm<Record<number, boolean>>();

  useEffect(() => {
    if (roles && roles.length > 0 && !selectedRole) {
      setSelectedRole(roles[0].id);
    }
  }, [roles, selectedRole]);

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

  const groupedPermissions = useMemo(() => {
    if (!permissionActions) return {};
    return permissionActions.reduce(
      (acc, permission) => {
        const categoryId = permission.permissionCategoryId;
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(permission);
        return acc;
      },
      {} as Record<number, PermissionAction[]>
    );
  }, [permissionActions]);

  const onSubmit = async (data: Record<number, boolean>) => {
    if (selectedRole) {
      setIsSubmitting(true);
      const enabledPermissionIds = Object.entries(data)
        .filter(([_, isEnabled]) => isEnabled)
        .map(([id, _]) => parseInt(id));

      try {
        await updatePermissions({ roleId: selectedRole, body: enabledPermissionIds }).unwrap();
        dispatch(showMessage({ message: 'Permissions saved successfully', variant: 'success' }));
        await refetchRolePermissions();
      } catch (error) {
        console.error('Error saving permissions:', error);
        dispatch(showMessage({ message: 'Error saving permissions', variant: 'error' }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleRoleChange = async (newRole: string | null) => {
    setSelectedRole(newRole);
    if (newRole) {
      await refetchRolePermissions();
    }
  };

  if (isLoadingRoles || isLoadingPermissionActions || (selectedRole && isLoadingRolePermissions)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 1000, margin: 'auto', p: 2 }}
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
        value={roles?.find(role => role.id === selectedRole) || null}
        onChange={(_, value) => handleRoleChange(value?.id || null)}
        sx={{ mb: 2 }}
      />

      {selectedRole && (
        <>
          {permissionCategories.map((category) => (
            <Accordion key={category.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {category.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {groupedPermissions[category.id]?.map((permission, index, array) => (
                  <React.Fragment key={permission.id}>
                    <Controller
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
                          label={permission.description || permission.name}
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
                    {index < array.length - 1 && <Divider sx={{ my: 1 }} />}
                  </React.Fragment>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Permissions'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

