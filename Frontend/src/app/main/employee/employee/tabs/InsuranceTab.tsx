/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import {
  useGetApiEmployeesDesignationsQuery,
  usePostApiEmployeesAddNewDesignationMutation,
} from "../../EmployeeApi";
import EnhancedAutocomplete from "../EnhancedAutocomplete";

/**
 * The basic info tab.
 */
function IdentityInfoTab() {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const { data: employeesDesignationsOptions = [] } =
    useGetApiEmployeesDesignationsQuery();
  const [AddDesignation] = usePostApiEmployeesAddNewDesignationMutation();

  const handleOptionAdd = async (newOption: Omit<Option, "id">) => {
    try {
      const result = await AddDesignation({
        employeeDesignation: newOption,
      }).unwrap();
      console.log(result);
      
      return { ...newOption, id: result };
    } catch (error) {
      console.error("Failed to add new option:", error);
      throw error;
    }
  };

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
            disabled
            control={control}
            render={({ field }) => (
              <EnhancedAutocomplete
                {...field}
                fullWidth
                label="Select or add Designation"
                options={employeesDesignationsOptions}
                onChange={(_, newValue) => {
                  field.onChange(newValue ? newValue.id : null);
                }}
                isOptionEqualToValue={(option, value) => option.id === value}
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
                onOptionAdd={handleOptionAdd}
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
                error={!!errors.employeeInsuranceDetails?.serialNumber}
                helperText={
                  errors.employeeInsuranceDetails?.serialNumber
                    ?.message as string
                }
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
                disabled
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
                    error: !!errors.employeeInsuranceDetails?.dateOfJoining,
                    margin: "normal",
                    helperText: errors.employeeInsuranceDetails?.dateOfJoining
                      ?.message as string,
                  },
                  actionBar: {
                    actions: ["clear"],
                  },
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="employeeInsuranceDetails.dateOfBirth"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                disabled
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
                    error: !!errors.employeeInsuranceDetails?.dateOfBirth,
                    margin: "normal",
                    helperText: errors.employeeInsuranceDetails?.dateOfBirth
                      ?.message as string,
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
                value={field.value}
                label="Age"
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                placeholder="Age"
                className="mx-4"
                disabled
                error={!!errors.employeeInsuranceDetails?.age}
                helperText={
                  errors?.employeeInsuranceDetails?.age?.message as string
                }
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
                value={field.value}
                label="Gross Salary"
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                placeholder="Gross Salary"
                className="mx-4"
                disabled
                error={!!errors.employeeInsuranceDetails?.grossSalary}
                helperText={
                  errors?.employeeInsuranceDetails?.grossSalary
                    ?.message as string
                }
              />
            )}
          />

          <Controller
            name="employeeInsuranceDetails.totalSIWider"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value}
                label="Total SI Wider"
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                placeholder="Total SI Wider"
                className="mx-4"
                error={!!errors.employeeInsuranceDetails?.totalSIWider}
                helperText={
                  errors?.employeeInsuranceDetails?.totalSIWider
                    ?.message as string
                }
              />
            )}
          />

          <Controller
            name="employeeInsuranceDetails.comprehensive"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value}
                label="Comprehensive"
                fullWidth
                type="number"
                margin="normal"
                variant="outlined"
                placeholder="Comprehensive"
                className="mx-4"
                error={!!errors.employeeInsuranceDetails?.comprehensive}
                helperText={
                  errors?.employeeInsuranceDetails?.comprehensive
                    ?.message as string
                }
              />
            )}
          />

          <Controller
            name="employeeInsuranceDetails.risk"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value}
                label="Risk"
                fullWidth
                type="text"
                margin="normal"
                variant="outlined"
                placeholder="Risk"
                className="mx-4"
                error={!!errors.employeeInsuranceDetails?.risk}
                helperText={
                  errors?.employeeInsuranceDetails?.risk?.message as string
                }
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default IdentityInfoTab;
