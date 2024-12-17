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
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { permissionApi } from '../permissionApi';
import { Role } from '../permissionTypes';

export default function PermissionManager() {
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { control, handleSubmit, reset } = useForm<Role>();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const fetchedRoles = await permissionApi.getRoles();
        setRoles(fetchedRoles);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (selectedRole) {
        try {
          const data = await permissionApi.getRolePermissions(selectedRole);
          setPermissions(data);
          reset(data);
        } catch (error) {
          console.error('Error fetching permissions:', error);
          setPermissions(null);
        }
      } else {
        setPermissions(null);
      }
    };

    fetchPermissions();
  }, [selectedRole, reset]);

  const onSubmit = async (data: Role) => {
    if (selectedRole) {
      try {
        await permissionApi.updatePermissions(selectedRole, data);
        setPermissions(data); // Update local state
        alert('Permissions saved successfully!');
      } catch (error) {
        console.error('Error saving permissions:', error);
        alert('Error saving permissions. Please try again.');
      }
    }
  };

  const handleResetToInitialValues = async () => {
    try {
      await permissionApi.resetToInitialValues();
      if (selectedRole) {
        const data = await permissionApi.getRolePermissions(selectedRole);
        setPermissions(data);
        reset(data);
      }
      alert('Permissions reset to initial values successfully!');
    } catch (error) {
      console.error('Error resetting permissions:', error);
      alert('Error resetting permissions. Please try again.');
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, margin: 'auto' }}>
      <Autocomplete
        options={roles}
        renderInput={(params) => <TextField {...params} label="Select Role" />}
        onChange={(_, value) => setSelectedRole(value)}
        sx={{ mb: 2 }}
      />

      {permissions && (
        <>
          {Object.entries(permissions).map(([module, actions]) => (
            <Accordion key={module}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{module}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Object.entries(actions).map(([action, value]) => (
                  <Controller
                    key={action}
                    name={`${module}.${action}` as any}
                    control={control}
                    defaultValue={value}
                    render={({ field }) => (
                      <FormControlLabel
                      labelPlacement="start"
                      label={action.charAt(0).toUpperCase() + action.slice(1)}
                        control={
                          <Switch
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        }
                        label={action}
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}
                      />
                    )}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" color="primary">
              Save Permissions
            </Button>
            <Button onClick={handleResetToInitialValues} variant="outlined" color="secondary">
              Reset to Initial Values
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

