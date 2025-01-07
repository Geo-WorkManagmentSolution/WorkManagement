import React from 'react';
import { Typography, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

function DeletedPersonalInfoTab() {
  const { control } = useFormContext();

  return (
    <div>
      <Typography variant="h6" gutterBottom>Personal Information</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="employeePersonalDetails.gender"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Gender"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        <Controller
          name="employeePersonalDetails.maritalStatus"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Marital Status"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        <Controller
          name="employeePersonalDetails.bloodGroup"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Blood Group"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
        <Controller
          name="employeePersonalDetails.dateOfBirth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Birth"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export default DeletedPersonalInfoTab;
