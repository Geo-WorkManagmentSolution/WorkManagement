import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormControl } from '@mui/material';
import { Autocomplete } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { countries, getStates, getCities } from './addressData';

type AddressFieldsProps = {
  prefix: 'employeeAddresses.userAddress' | 'employeeAddresses.mailingAddress';
  sectionLabel: string;
};

export default function AddressFields({ prefix, sectionLabel }: AddressFieldsProps) {
  const { control, watch, setValue } = useFormContext();
  const country = watch(`${prefix}.country`);
  const state = watch(`${prefix}.state`);

  const availableStates = getStates(country);
  const availableCities = getCities(state);

  React.useEffect(() => {
    if (!availableStates.includes(state)) {
      setValue(`${prefix}.state`, null);
      setValue(`${prefix}.city`, null);
    }
  }, [country, state, setValue, prefix, availableStates]);

  React.useEffect(() => {
    if (!availableCities.includes(watch(`${prefix}.city`))) {
      setValue(`${prefix}.city`, null);
    }
  }, [state, setValue, prefix, availableCities, watch]);

  return (
    <div className="space-y-16">
      <div className="flex items-center border-b-1 space-x-8 pb-8">
        <FuseSvgIcon color="action" size={24}>
          heroicons-outline:home
        </FuseSvgIcon>
        <Typography className="text-2xl" color="text.secondary">
          {sectionLabel}
        </Typography>
      </div>
      <Controller
        name={`${prefix}.addressLine1`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            label="Address Line 1"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name={`${prefix}.addressLine2`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            label="Address Line 2"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormControl>
          <Controller
            name={`${prefix}.country`}
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <Autocomplete
                {...rest}
                options={countries.map((c) => c.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                  />
                )}
                onChange={(_, data) => onChange(data)}
                value={value || null}
                isOptionEqualToValue={(option, value) => option === value}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <Controller
            name={`${prefix}.state`}
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <Autocomplete
                {...rest}
                options={availableStates}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State"
                  />
                )}
                onChange={(_, data) => onChange(data)}
                value={value || null}
                disabled={!country}
                isOptionEqualToValue={(option, value) => option === value}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <Controller
            name={`${prefix}.city`}
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <Autocomplete
                {...rest}
                options={availableCities}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                  />
                )}
                onChange={(_, data) => onChange(data)}
                value={value || null}
                disabled={!state}
                isOptionEqualToValue={(option, value) => option === value}
              />
            )}
          />
        </FormControl>
      </div>
      <Controller
        name={`${prefix}.pinCode`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            label="Pincode"
            type="number"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    </div>
  );
}
