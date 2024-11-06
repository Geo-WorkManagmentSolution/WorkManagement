import React from 'react';
import {
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Popover,
  Typography,
  Box,
  Collapse,
  Alert,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useGetApiEmployeesLeavesCurrentQuery, EmployeeLeave, LeaveStatus } from '../../LeavesApi';
import EventLabelSelect from './EventLabelSelect';

interface EventDialogProps {
  event: EmployeeLeave | null;
  isNewEvent: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSave: (event: EmployeeLeave) => void;
  onDelete: (eventId: number) => void;
  leaveBalance: Record<string, number>;
  alertMessage: string;
  setAlertOpen: (value: boolean) => void;
  alertOpen: boolean;
}

const eventSchema = z.object({
  id: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string().nonempty({ message: 'Reason is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  employeeLeaveTypeId: z.number(),
  status: z.nativeEnum(LeaveStatus),
  leaveDays: z.number().min(0.5),
  fullDay: z.boolean().optional(),
  halfDay: z.boolean().optional()
});

export default function EventDialog({
  event,
  isNewEvent,
  anchorEl,
  onClose,
  onSave,
  onDelete,
  alertMessage,
  alertOpen,
  setAlertOpen
}: EventDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<EmployeeLeave>({
    resolver: zodResolver(eventSchema),
    defaultValues: event || {
      id: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      reason: '',
      description: '',
      employeeLeaveTypeId: 1,
      status: LeaveStatus.Pending,
      leaveDays: 1,
      fullDay: true,
      halfDay: false
    }
  });
  const { data: currentLeaves } = useGetApiEmployeesLeavesCurrentQuery();

  React.useEffect(() => {
    reset(
      event || {
        id: 0,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        reason: '',
        description: '',
        status: LeaveStatus.Pending,
        leaveDays: 1,
        fullDay: true,
        halfDay: false
      }
    );
  }, [event, reset]);

  const handleSave = (data: EmployeeLeave) => {
    console.log('data on event dialog', data);

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const updatedData = {
      ...data,
      leaveDays: data.halfDay ? 0.5 : (data.fullDay ? diffDays : 1)
    };
    console.log('updated data', updatedData);

    onSave(updatedData);
  };

  const handleDelete = () => {
    if (event) {
      onDelete(event.id);
    }
    onClose();
  };

  const reasonValue = watch('reason');
  const descriptionValue = watch('description');
  const employeeLeaveTypeId = watch('employeeLeaveTypeId');
  const fullDay = watch('fullDay');
  const halfDay = watch('halfDay');

  const isSaveButtonDisabled = !reasonValue || !descriptionValue || (!fullDay && !halfDay);

  const handleFullDayChange = (checked: boolean) => {
    setValue('fullDay', checked);
    if (checked) {
      setValue('halfDay', false);
    }
  };

  const handleHalfDayChange = (checked: boolean) => {
    setValue('halfDay', checked);
    if (checked) {
      setValue('fullDay', false);
    }
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      {alertMessage && (
        <Box sx={{ position: 'absolute', width: 'full' }}>
          <Collapse in={alertOpen}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="error"
                  size="small"
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                >
                  <GridCloseIcon fontSize="medium" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alertMessage}
            </Alert>
          </Collapse>
        </Box>
      )}

      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480"
      >
        <div className="flex sm:space-x-24 mb-16">
          <FuseSvgIcon className="sm:inline-flex mt-16" color="action">
            heroicons-outline:calendar
          </FuseSvgIcon>
          <div className="w-full">
            <div className="flex flex-column sm:flex-row w-full items-center space-x-16">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="mt-8 mb-16 w-full"
                    label="From"
                    value={new Date(field.value)}
                    onChange={(date) => field.onChange(date?.toISOString())}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="mt-8 mb-16 w-full"
                    label="To"
                    value={new Date(field.value)}
                    onChange={(date) => field.onChange(date?.toISOString())}
                  />
                )}
              />
            </div>

            <Controller
              name="fullDay"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => handleFullDayChange(e.target.checked)}
                    />
                  }
                  label="Full Day"
                />
              )}
            />
            <Controller
              name="halfDay"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => handleHalfDayChange(e.target.checked)}
                    />
                  }
                  label="Half Day"
                />
              )}
            />
          </div>
        </div>
        <div className="flex sm:space-x-24 mb-16">
          <FuseSvgIcon className="sm:inline-flex mt-16" color="action">
            heroicons-outline:tag
          </FuseSvgIcon>
          <Controller
            name="employeeLeaveTypeId"
            control={control}
            render={({ field }) => (
              <EventLabelSelect onChange={field.onChange} value={field.value} />
            )}
          />
        </div>
        <div className="flex sm:space-x-24 mb-16">
          <FuseSvgIcon className="sm:inline-flex mt-16" color="action">
            heroicons-outline:pencil-square
          </FuseSvgIcon>
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <TextField
                size="medium"
                label="Reason"
                variant="outlined"
                autoFocus
                required
                fullWidth
                {...field}
                error={!!errors?.reason}
                helperText={errors.reason?.message}
              />
            )}
          />
        </div>
        <div className="flex sm:space-x-24 mb-16">
          <FuseSvgIcon className="sm:inline-flex mt-16" color="action">
            heroicons-outline:bars-3-bottom-left
          </FuseSvgIcon>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
                required
              />
            )}
          />
        </div>
        <div className="flex sm:space-x-24 mb-16">
          <FuseSvgIcon className="sm:inline-flex" color="action">
            heroicons-outline:information-circle
          </FuseSvgIcon>
          <Typography>
            Available {currentLeaves?.find((t) => t.id === employeeLeaveTypeId)?.employeeLeaveType} Balance:
            {currentLeaves?.find((t) => t.id === employeeLeaveTypeId)?.remainingLeaves || ''}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Button
            disabled={isSaveButtonDisabled}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isNewEvent ? 'Apply' : 'Update'}
          </Button>
          {!isNewEvent && (
            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
            >
              Cancel Leave
            </Button>
          )}
        </div>
      </form>
    </Popover>
  );
}