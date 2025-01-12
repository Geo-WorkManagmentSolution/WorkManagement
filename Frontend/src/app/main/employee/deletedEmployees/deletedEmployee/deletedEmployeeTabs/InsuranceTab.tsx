/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import {
  useGetApiEmployeesDesignationsQuery,
  
} from "../../../EmployeeApi";
import EnhancedAutocomplete from "../../../employee/EnhancedAutocomplete";

/**
 * The basic info tab.
 */
function IdentityInfoTab({UserRole}) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const { data: employeesDesignationsOptions = [] } =
    useGetApiEmployeesDesignationsQuery();

  

  return (
    <div className="space-y-48">
      <div className="space-y-16">
        <div className="flex items-center border-b-1 space-x-8 pb-8">
          <FuseSvgIcon color="action" size={24}>
            heroicons-outline:clipboard-document-list
          </FuseSvgIcon>
          <Typography className="text-2xl" color="text.secondary">
            Insurance Information
          </Typography>
        </div>

        <div className="flex -mx-4">
          <Controller
            name="employeeInsuranceDetails.employeeDesignationId"
            
            control={control}
            render={({ field }) => (
              <EnhancedAutocomplete
              readOnly
                {...field}
                fullWidth
                label="Select or add Designation"
                options={employeesDesignationsOptions}
                onChange={(_, newValue) => {
                  field.onChange(newValue ? newValue.id : null);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                placeholder="Type to search or add"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={params.value || ""}
                    placeholder="Select or Add Designation"
                    label="Designation"
                    required
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors?.siteId}
                    helperText={errors?.siteId?.message as string}
                  />
                )}
                attachedLabel="A Designation will be added to the database"
                
              />
            )}
          />
        </div>
        <div className="flex -mx-4">
          <Controller
            name="employeeInsuranceDetails.serialNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Serial Number"
                className=" mx-4"
                fullWidth
                value={field.value || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          />
        </div>
        <div className="flex -mx-4">
          <Controller
            control={control}
            name="employeeInsuranceDetails.dateOfJoining"
            render={({ field: { value, onChange } }) => (
              <DatePicker
              readOnly
              
              format='dd/MM/yyyy'
                
                value={new Date(value)}
                onChange={(val) => {
                  onChange(val?.toISOString());
                }}
                className="mx-4"
                slotProps={{
                  textField: {
                    label: "Date Of Joining",
                    InputLabelProps: {
                      shrink: true,
                    
                    },
                    fullWidth: true,
                    variant: "outlined",
                   margin: "normal",
                  actionBar: {
                    actions: ["clear"],
                  },
                }}}
              />
            )}
          />

          <Controller
            control={control}
            name="employeeInsuranceDetails.dateOfBirth"
            render={({ field: { value, onChange } }) => (
              <DatePicker
              readOnly
              format='dd/MM/yyyy'
                
                value={new Date(value)}
                onChange={(val) => {
                  onChange(val?.toISOString());
                }}
                className="mx-4"
                slotProps={{
                  textField: {
                    label: "Date Of Birth",
                    InputLabelProps: {
                      shrink: true,
                    },
                    fullWidth: true,
                    variant: "outlined",
                    margin: "normal",
                    
                  },
                  actionBar: {
                    actions: ["clear"],
                  },
                }}
              />
            )}
          />

          <Controller
            name="employeeInsuranceDetails.age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                label="Age"
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                placeholder="Age"
                className="mx-4"
                InputProps={{
                  readOnly: true,
                }}
               
              />
            )}
          />
        </div>

        <div className="flex -mx-4">
          <Controller
            name="employeeInsuranceDetails.grossSalary"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                label="Gross Salary"
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                placeholder="Gross Salary"
                className="mx-4"
                InputProps={{
                  readOnly: true,
                }}
                
              />
            )}
          />

          <Controller
            name="employeeInsuranceDetails.totalSIWider"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                label="Total SI Wider"
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                placeholder="Total SI Wider"
                className="mx-4"
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          />

          <Controller
            name="employeeInsuranceDetails.comprehensive"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                label="Comprehensive"
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                placeholder="Comprehensive"
                className="mx-4"
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          />

          <Controller
            name="employeeInsuranceDetails.risk"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                label="Risk"
                fullWidth
                type="text"
                margin="normal"
                variant="outlined"
                placeholder="Risk"
                className="mx-4"
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default IdentityInfoTab;
