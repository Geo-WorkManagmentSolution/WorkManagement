import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddressFields from './AddressFields';

export default function AddressInfoTab() {
  const methods = useFormContext();
  const { watch, setValue } = methods;

  const useUserAddressForMailing = watch('employeeAddresses.useUserAddressForMailing');

  useEffect(() => {
    if (useUserAddressForMailing) {
      const userAddress = methods.getValues('employeeAddresses.userAddress');
      Object.keys(userAddress).forEach(key => {
        setValue(`employeeAddresses.mailingAddress.${key}`, userAddress[key]);
      });
    }
  }, [useUserAddressForMailing, methods, setValue]);

  return (
    <div className="space-y-48">
      <AddressFields
        prefix="employeeAddresses.userAddress"
        sectionLabel="Residence Address"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={useUserAddressForMailing}
            onChange={(e) => setValue('employeeAddresses.useUserAddressForMailing', e.target.checked)}
          />
        }
        label="Use the same address for mailing"
      />
      {!useUserAddressForMailing && (
        <AddressFields
          prefix="employeeAddresses.mailingAddress"
          sectionLabel="Mailing Address"
        />
      )}
    </div>
  );
}
