// import React, { useState, useEffect } from 'react';
// import { Button, TextField, Popover, Typography } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers';
// import { Controller, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
// import { EmployeeLeave, LeaveStatus } from '../../LeavesApi';
// import EventLabelSelect from './EventLabelSelect';

// interface EventDialogProps {
// 	event: EmployeeLeave | null;
// 	isNewEvent: boolean;
// 	anchorEl: HTMLElement | null;
// 	onClose: () => void;
// 	onSave: (event: EmployeeLeave) => void;
// 	onDelete: (eventId: number) => void;
// 	leaveBalance: Record<number, number>;
// 	alertMessage: string;
// 	setAlertOpen: (value: boolean) => void;
// 	alertOpen: boolean;
// 	eventColors: Record<number, string>;
// 	currentLeaves: any[]; // Replace 'any' with the correct type from your API
// }

// const eventSchema = z.object({
// 	id: z.number(),
// 	startDate: z.string(),
// 	endDate: z.string(),
// 	reason: z.string().nonempty({ message: 'Reason is required' }),
// 	description: z.string().nonempty({ message: 'Description is required' }),
// 	employeeLeaveTypeId: z.number(),
// 	status: z.nativeEnum(LeaveStatus),
// 	leaveDays: z.number().min(0.5)
// });

// export default function EventDialog({
// 	event,
// 	isNewEvent,
// 	anchorEl,
// 	onClose,
// 	onSave,
// 	onDelete,
// 	leaveBalance,
// 	alertMessage,
// 	setAlertOpen,
// 	eventColors,
// 	currentLeaves
// }: EventDialogProps) {
// 	const {
// 		control,
// 		handleSubmit,
// 		reset,
// 		watch,
// 		setValue,
// 		formState: { errors, isValid }
// 	} = useForm<EmployeeLeave>({
// 		resolver: zodResolver(eventSchema),
// 		defaultValues: event || {
// 			id: 0,
// 			startDate: new Date().toISOString(),
// 			endDate: new Date().toISOString(),
// 			reason: '',
// 			description: '',
// 			employeeLeaveTypeId: 1,
// 			status: LeaveStatus.Pending,
// 			leaveDays: 1
// 		}
// 	});

// 	const [dateError, setDateError] = useState<string | null>(null);
// 	const [leaveBalanceError, setLeaveBalanceError] = useState<string | null>(null);
// 	const [totalDays, setTotalDays] = useState(1);

// 	const startDate = watch('startDate');
// 	const endDate = watch('endDate');
// 	const employeeLeaveTypeId = watch('employeeLeaveTypeId');
// 	const reasonValue = watch('reason');
// 	const descriptionValue = watch('description');

// 	useEffect(() => {
// 		reset(
// 			event || {
// 				id: 0,
// 				startDate: new Date().toISOString(),
// 				endDate: new Date().toISOString(),
// 				reason: '',
// 				description: '',
// 				status: LeaveStatus.Pending,
// 				leaveDays: 1
// 			}
// 		);
// 	}, [event, reset]);

// 	useEffect(() => {
// 		const start = new Date(startDate);
// 		const end = new Date(endDate);

// 		// Ensure dates are in local timezone without time component
// 		const localStart = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
// 		const localEnd = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));

// 		// Date validation
// 		if (localStart > localEnd) {
// 			setDateError("'From' date cannot be after 'To' date");
// 		} else {
// 			setDateError(null);
// 		}

// 		// Calculate leave days
// 		const timeDiff = Math.abs(localEnd.getTime() - localStart.getTime());
// 		const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
// 		setTotalDays(diffDays);

// 		// Leave balance validation
// 		const selectedLeaveType = currentLeaves?.find((leave) => leave.id === employeeLeaveTypeId);

// 		if (selectedLeaveType && diffDays > selectedLeaveType.remainingLeaves) {
// 			setLeaveBalanceError(
// 				`Insufficient leave balance. You have ${selectedLeaveType.remainingLeaves} days available.`
// 			);
// 		} else {
// 			setLeaveBalanceError(null);
// 		}

// 		// Update leaveDays
// 		setValue('leaveDays', diffDays);
// 	}, [startDate, endDate, employeeLeaveTypeId, currentLeaves, setValue]);

// 	const handleSave = (data: EmployeeLeave) => {
// 		console.log("handleSave is triggered", data);

// 		if (dateError || leaveBalanceError) {
// 			return;
// 		}

// 		const start = new Date(data.startDate);
// 		const end = new Date(data.endDate);

// 		// Ensure dates are in local timezone without time component
// 		const adjustedData = {
// 			...data,
// 			startDate: new Date(
// 				Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
// 			).toISOString(),
// 			endDate: new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())).toISOString()
// 		};

// 		onSave(adjustedData);
// 		onClose();
// 	};

// 	const handleDelete = () => {
// 		if (event) {
// 			onDelete(event.id);
// 		}

// 		onClose();
// 	};

// 	const isSaveButtonDisabled = !reasonValue || !descriptionValue || !!dateError || !!leaveBalanceError;
// 	const onSubmit = handleSubmit(handleSave);

// 	return (
// 		<Popover
// 			open={Boolean(anchorEl)}
// 			anchorEl={anchorEl}
// 			onClose={onClose}
// 			anchorOrigin={{
// 				vertical: 'top',
// 				horizontal: 'right'
// 			}}
// 			transformOrigin={{
// 				vertical: 'top',
// 				horizontal: 'right'
// 			}}
// 		>
// 			  <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           console.log("Form submitted");
//           onSubmit(e);
//         }}
//         className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480"
//       >
// 				<div className="flex sm:space-x-24 mb-16">
// 					<FuseSvgIcon
// 						className="sm:inline-flex mt-16"
// 						color="action"
// 					>
// 						heroicons-outline:calendar
// 					</FuseSvgIcon>
// 					<div className="w-full">
// 						<div className="flex flex-column sm:flex-row w-full items-center space-x-16">
// 							<Controller
// 								name="startDate"
// 								control={control}
// 								render={({ field }) => (
// 									<DatePicker
// 										className="mt-8 mb-16 w-full"
// 										label="From"
// 										value={new Date(field.value)}
// 										onChange={(date) => field.onChange(date?.toISOString())}
// 										slotProps={{
// 											textField: {
// 												helperText: dateError,
// 												error: !!dateError
// 											}
// 										}}
// 									/>
// 								)}
// 							/>
// 							<Controller
// 								name="endDate"
// 								control={control}
// 								render={({ field }) => (
// 									<DatePicker
// 										className="mt-8 mb-16 w-full"
// 										label="To"
// 										value={new Date(field.value)}
// 										onChange={(date) => field.onChange(date?.toISOString())}
// 										slotProps={{
// 											textField: {
// 												helperText: dateError,
// 												error: !!dateError
// 											}
// 										}}
// 									/>
// 								)}
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="flex sm:space-x-24 mb-16">
// 					<FuseSvgIcon
// 						className="sm:inline-flex mt-16"
// 						color="action"
// 					>
// 						heroicons-outline:tag
// 					</FuseSvgIcon>
// 					<Controller
// 						name="employeeLeaveTypeId"
// 						control={control}
// 						render={({ field }) => (
// 							<EventLabelSelect
// 								onChange={(value) => field.onChange(value)}
// 								value={field.value}
// 								error={!!leaveBalanceError}
// 								helperText={leaveBalanceError}
// 								eventColors={eventColors}
// 								currentLeaves={currentLeaves}
// 							/>
// 						)}
// 					/>
// 				</div>
// 				<div className="flex sm:space-x-24 mb-16">
// 					<FuseSvgIcon
// 						className="sm:inline-flex mt-16"
// 						color="action"
// 					>
// 						heroicons-outline:pencil-square
// 					</FuseSvgIcon>
// 					<Controller
// 						name="reason"
// 						control={control}
// 						render={({ field }) => (
// 							<TextField
// 								size="medium"
// 								label="Reason"
// 								variant="outlined"
// 								autoFocus
// 								required
// 								fullWidth
// 								{...field}
// 								error={!!errors?.reason}
// 								helperText={errors.reason?.message}
// 							/>
// 						)}
// 					/>
// 				</div>
// 				<div className="flex sm:space-x-24 ">
// 					<FuseSvgIcon
// 						className="sm:inline-flex mt-16"
// 						color="action"
// 					>
// 						heroicons-outline:bars-3-bottom-left
// 					</FuseSvgIcon>
// 					<Controller
// 						name="description"
// 						control={control}
// 						render={({ field }) => (
// 							<TextField
// 								{...field}
// 								className="mt-8 mb-16"
// 								label="Description"
// 								variant="outlined"
// 								multiline
// 								rows={3}
// 								fullWidth
// 								error={!!errors.description}
// 								helperText={errors.description?.message}
// 								required
// 							/>
// 						)}
// 					/>
// 				</div>
// 				<div className="flex flex-col space-y-4 m-10">
// 					<div className="flex items-center space-x-2 mb-5">
// 						<FuseSvgIcon
// 							className="sm:inline-flex"
// 							color="action"
// 						>
// 							heroicons-outline:information-circle
// 						</FuseSvgIcon>
// 						<Typography>
// 							Available {currentLeaves?.find((t) => t.id === employeeLeaveTypeId)?.employeeLeaveType}{' '}
// 							Balance : {leaveBalance[employeeLeaveTypeId] || ''}
// 						</Typography>
// 					</div>
// 					<div className="flex items-center space-x-2">
// 						<FuseSvgIcon
// 							className="sm:inline-flex"
// 							color="action"
// 						>
// 							heroicons-outline:information-circle
// 						</FuseSvgIcon>
// 						<Typography>Total Days Selected : {totalDays}</Typography>
// 					</div>
// 				</div>

// 				<div className="flex justify-between mt-10">
// 					<Button
// 						disabled={isSaveButtonDisabled}
// 						type="submit"
// 						variant="contained"
// 						color="primary"
// 						onClick={() => console.log("Update button clicked, form valid:", isValid)}
// 						>
// 						  {isNewEvent ? 'Apply' : 'Update'}
// 						</Button>
// 					{!isNewEvent && (
// 						<Button
// 							onClick={handleDelete}
// 							variant="contained"
// 							color="secondary"
// 						>
// 							Cancel Leave
// 						</Button>
// 					)}
// 				</div>
// 			</form>
// 		</Popover>
// 	);
// }

import React, { useState, useEffect } from 'react';
import { Button, TextField, Popover, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { EmployeeLeave, LeaveStatus } from '../../LeavesApi';
import EventLabelSelect from './EventLabelSelect';

interface EventDialogProps {
  event: EmployeeLeave | null;
  isNewEvent: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSave: (event: EmployeeLeave) => void;
  onDelete: (eventId: number) => void;
  leaveBalance: Record<number, number>;
  eventColors: Record<number, string>;
  currentLeaves: any[]; // Replace 'any' with the correct type from your API
}

const eventSchema = z.object({
  id: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string().nonempty({ message: 'Reason is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  employeeLeaveTypeId: z.number(),
  status: z.nativeEnum(LeaveStatus),
  leaveDays: z.number().min(0.5)
});

export default function EventDialog({
  event,
  isNewEvent,
  anchorEl,
  onClose,
  onSave,
  onDelete,
  leaveBalance,
  eventColors,
  currentLeaves
}: EventDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors}
  } = useForm<EmployeeLeave>({
    resolver: zodResolver(eventSchema),
    mode: 'onChange',
    defaultValues: event || {
      id: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      reason: '',
      description: '',
      employeeLeaveTypeId: 1,
      status: LeaveStatus.Pending,
      leaveDays: 1
    }
  });

  const [dateError, setDateError] = useState<string | null>(null);
  const [leaveBalanceError, setLeaveBalanceError] = useState<string | null>(null);
  const [totalDays, setTotalDays] = useState(1);

  const startDate = watch('startDate');
  	const endDate = watch('endDate');
  	const employeeLeaveTypeId = watch('employeeLeaveTypeId');
  	const reasonValue = watch('reason');
  	const descriptionValue = watch('description');

  useEffect(() => {
    reset(event || {
      id: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      reason: '',
      description: '',
      status: LeaveStatus.Pending,
      leaveDays: 1,
      employeeLeaveTypeId: currentLeaves?.[0]?.id || 1,
    });
  }, [event, reset, currentLeaves]);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const localStart = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
    const localEnd = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));
  
    if (localStart > localEnd) {
      setDateError("'From' date cannot be after 'To' date");
    } else {
      setDateError(null);
    }
  
    const timeDiff = Math.abs(localEnd.getTime() - localStart.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    setTotalDays(diffDays);

    const selectedLeaveType = currentLeaves?.find((leave) => leave.id === employeeLeaveTypeId);

    if (selectedLeaveType && diffDays > selectedLeaveType.remainingLeaves) {
      setLeaveBalanceError(
        `Insufficient leave balance. You have ${selectedLeaveType.remainingLeaves} days available.`
      );
    } else {
      setLeaveBalanceError(null);
    }

    setValue('leaveDays', diffDays);
  }, [startDate, endDate, employeeLeaveTypeId, currentLeaves, setValue]);

  const handleSave = (data: EmployeeLeave) => {
    
    if (dateError || leaveBalanceError) {
      return;
    }
    
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    
    const adjustedData = {
      ...data,
      startDate: new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())).toISOString(),
      endDate: new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())).toISOString()
    };
    
    onSave(adjustedData);
    onClose();
  };

  const handleUpdate = () => {
    const data = {
      id: event?.id || 0,
      startDate: startDate,
      endDate: endDate,
      reason: reasonValue,
      description: descriptionValue,
      employeeLeaveTypeId: employeeLeaveTypeId,
      status: event?.status || LeaveStatus.Pending,
      leaveDays: totalDays
    };

    if (dateError || leaveBalanceError) {
      return;
    }

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    
    const adjustedData = {
      ...data,
      startDate: new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())).toISOString(),
      endDate: new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())).toISOString()
    };
    
    onSave(adjustedData);
    onClose();
  };

  const onSubmit = handleSubmit(handleSave);

 	const isSaveButtonDisabled = !reasonValue || !descriptionValue || !!dateError || !!leaveBalanceError;

  const handleDelete = () => {
    if (event) {
      onDelete(event.id);
    }
    onClose();
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isNewEvent) {
            onSubmit(e);
          }
        }}
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
                    slotProps={{
                      textField: {
                        helperText: dateError,
                        error: !!dateError
                      }
                    }}
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
                    slotProps={{
                      textField: {
                        helperText: dateError,
                        error: !!dateError
                      }
                    }}
                  />
                )}
              />
            </div>
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
              <EventLabelSelect
                onChange={(value) => field.onChange(value)}
                value={field.value}
                error={!!leaveBalanceError}
                helperText={leaveBalanceError}
                eventColors={eventColors}
                currentLeaves={currentLeaves}
              />
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
        <div className="flex sm:space-x-24 ">
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
        <div className="flex flex-col space-y-4 m-10">
          <div className="flex items-center space-x-2 mb-5">
            <FuseSvgIcon className="sm:inline-flex" color="action">
              heroicons-outline:information-circle
            </FuseSvgIcon>
            <Typography>
              Available {currentLeaves?.find((t) => t.id === employeeLeaveTypeId)?.employeeLeaveType}{' '}
              Balance : {leaveBalance[employeeLeaveTypeId] || ''}
            </Typography>
          </div>
          <div className="flex items-center space-x-2">
            <FuseSvgIcon className="sm:inline-flex" color="action">
              heroicons-outline:information-circle
            </FuseSvgIcon>
            <Typography>Total Days Selected : {totalDays}</Typography>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          {isNewEvent ? (
            <Button
              disabled={isSaveButtonDisabled}
              type="submit"
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
          ) : (
            <Button
              disabled={isSaveButtonDisabled}
              variant="contained"
              color="primary"
              onClick={handleUpdate}
            >
              Update
            </Button>
          )}
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