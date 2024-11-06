import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useGetApiEmployeesLeavesCurrentQuery, EmployeeLeaveSummaryModel } from '../../LeavesApi';

export type EventLabelSelectProps = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
};

const EventLabelSelect = React.forwardRef<HTMLElement, EventLabelSelectProps>((props, ref) => {
  const { value, onChange, className } = props;
  const { data: currentLeaves, isLoading } = useGetApiEmployeesLeavesCurrentQuery();

  const handleChange = (event: SelectChangeEvent<number>) => {
    onChange(Number(event.target.value));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormControl fullWidth className={className}>
      <InputLabel id="select-label">Label</InputLabel>
      <Select
        labelId="select-label"
        id="label-select"
        value={value}
        label="Label"
        onChange={handleChange}
        ref={ref}
        classes={{ select: 'flex items-center space-x-12' }}
      >
        {currentLeaves?.map((leaveType: EmployeeLeaveSummaryModel) => (
          <MenuItem
            value={leaveType.id}
            key={leaveType.id}
            className="space-x-12"
          >
            <Box
              className="w-12 h-12 shrink-0 rounded-full"
              sx={{ backgroundColor: 'primary.main' }} // You might want to add a color field to your API response
            />
            <Typography
              component="div"
              className="flex justify-between items-center flex-1 leading-none"
            >
              <span>{leaveType.employeeLeaveType}</span>
              {leaveType.remainingLeaves !== undefined && (
                <span>[ Available Balance - {leaveType.remainingLeaves} ]</span>
              )}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default EventLabelSelect;