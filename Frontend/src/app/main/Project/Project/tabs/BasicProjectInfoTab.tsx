import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  Autocomplete,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import { ProjectStatus } from "../../ProjectApi";

/**
 * The basic info tab.
 */

function BasicProjectInfoTab() {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  return (
    <div className="space-y-48 ">
      <div className="space-y-10">
        <div className="flex items-center border-b-1 space-x-8 pb-8">
          <FuseSvgIcon color="action" size={24}>
            heroicons-outline:building-office
          </FuseSvgIcon>
          <Typography className="text-2xl" color="text.secondary">
            Project Information
          </Typography>
        </div>

        <div className="flex flex-row mx-4">
          <Controller
            name="projectName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ""}
                className=" mx-4"
                required
                label="Project Name"
                fullWidth
                margin="normal"
                error={!!errors?.projectName}
                helperText={errors?.projectName?.message as string}
              />
            )}
          />

          <Controller
            name="projectNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ""}
                className=" mx-4"
                label="Project Number"
                fullWidth
                margin="normal"
                error={!!errors?.projectNumber}
                helperText={errors?.projectNumber?.message as string}
              />
            )}
          />
        </div>
        <div className="flex flex-row mx-4">
          <Controller
            control={control}
            name="startDate"
            render={({ field: { value, onChange } }) => (
              <DatePicker
              	format='dd/MM/yyyy'
                value={new Date(value)}
                onChange={(val) => {
                  onChange(val?.toISOString());
                }}
                className="mx-4"
                required
                slotProps={{
                  textField: {
                    id: "startDate",
                    label: "Start Date",
                    InputLabelProps: {
                      shrink: true,
                    },
                    fullWidth: true,
                    variant: "outlined",
                    error: !!errors.startDate,
                    margin: "normal",
                    helperText: errors?.startDate?.message,
                  },
                  actionBar: {
                    actions: ["clear", "today"],
                  },
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="endDate"
            render={({ field: { value, onChange } }) => (
              <DatePicker
              	format='dd/MM/yyyy'
                value={value ? new Date(value) : null}
                onChange={(val) => {
                  onChange(val ? val.toISOString() : null);
                }}
                className="mx-4"
                slotProps={{
                  textField: {
                    id: "endDate",
                    label: "End Date",
                    InputLabelProps: {
                      shrink: true,
                    },
                    fullWidth: true,
                    variant: "outlined",
                    error: !!errors.endDate,
                    margin: "normal",
                    helperText: errors?.endDate?.message,
                  },
                  actionBar: {
                    actions: ["clear", "today"],
                  },
                }}
              />
            )}
          />
        </div>
        <div className="flex mx-4">
          <Controller
            name="projectDescription"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ""}
                label="Project Description"
                fullWidth
                margin="normal"
                className="mx-4"
                multiline
                rows={5}
                error={!!errors.projectDescription}
                helperText={errors?.projectDescription?.message as string}
              />
            )}
          />
        </div>
        <div className="flex items-center border-b-1 space-x-8 pb-8">
          <FuseSvgIcon color="action" size={24}>
            heroicons-outline:clipboard-document-check
          </FuseSvgIcon>
          <Typography className="text-2xl" color="text.secondary">
            Work Order
          </Typography>
        </div>
        <div className="flex flex-row mx-4">
          <Controller
            name="workOrderNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ""}
                className=" mx-4"
                label="Work Order Number"
                fullWidth
                margin="normal"
                error={!!errors?.workOrderNumber}
                helperText={errors?.workOrderNumber?.message as string}
              />
            )}
          />

          <Controller
            name="workOrderName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ""}
                className=" mx-4"
                label="Work Order Name"
                fullWidth
                margin="normal"
                error={!!errors?.workOrderName}
                helperText={errors?.workOrderName?.message as string}
              />
            )}
          />
        </div>
        <div className="flex flex-row mx-4">
          <Controller
            name="workOrderAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mx-4"
                value={field.value || ""}
                label="Work Order Amount"
                id="workOrderAmount"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                  inputProps: { min: 0 },
                }}
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.workOrderAmount}
                helperText={errors?.workOrderAmount?.message as string}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(value);
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="workOrderDate"
            render={({ field: { value, onChange } }) => (
              <DatePicker
              	format='dd/MM/yyyy'
                value={value ? new Date(value) : null}
                onChange={(val) => {
                  onChange(val ? val.toISOString() : null);
                }}
                className="mx-4"
                slotProps={{
                  textField: {
                    id: "workOrderDate",
                    label: "Work Order Date",
                    InputLabelProps: {
                      shrink: true,
                    },
                    fullWidth: true,
                    variant: "outlined",
                    error: !!errors.workOrderDate,
                    helperText: errors?.workOrderDate?.message,
                  },
                  actionBar: {
                    actions: ["clear", "today"],
                  },
                }}
              />
            )}
          />

          <Controller
            name="periodOfWorkInMonths"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className=" mx-4"
                label="Period Of Work In Months"
                id="PeriodOfWorkInMonths"
                value={field.value || ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Months</InputAdornment>
                  ),
                  inputProps: { min: 0 },
                }}
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.periodOfWorkInMonths}
                helperText={errors?.periodOfWorkInMonths?.message as string}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(value);
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-row mx-4">
          <Controller
            name="status"
            control={control}
            defaultValue={null} // Set default value to null or an appropriate default value
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                className="mt-8 mb-16"
                fullWidth
                options={Object.values(ProjectStatus)}
                getOptionLabel={(option) => option} // Ensure the option label is correctly displayed
                value={value || null} // Ensure value is null if undefined
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Status of Project"
                    label="Status"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicProjectInfoTab;

