import React from 'react';
import { useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import AddressFields from './AddressFields';

export default function AddressInfoTab() {
  const { watch } = useFormContext();

  const useUserAddressForMailing = watch('employeeAddresses.useUserAddressForMailing');

  return (
    <div className="space-y-48">
      <AddressFields
        prefix="employeeAddresses.userAddress"
        sectionLabel="Residence Address"
      />
      <Typography variant="body1">
        {useUserAddressForMailing ? "Using the same address for mailing" : "Using a different mailing address"}
      </Typography>
      {!useUserAddressForMailing && (
        <AddressFields
          prefix="employeeAddresses.mailingAddress"
          sectionLabel="Mailing Address"
        />
      )}
    </div>
  );
}

