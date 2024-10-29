import Checkbox from '@mui/material/Checkbox';
import Popover from '@mui/material/Popover';
import React from 'react';
import { Box } from '@mui/system';
import { FormLabel, Typography } from '@mui/material';
import { leaveTypes } from './types';

interface LeaveDetailsProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedLabels: string[];
  toggleSelectedLabels: (leaveType: string) => void;
} 

function LeaveTypeSelector({ anchorEl, onClose, selectedLabels, toggleSelectedLabels }: LeaveDetailsProps) {
  const handleToggleLabel = (leaveType: string) => {
    toggleSelectedLabels(leaveType);
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
      <div className="flex flex-col flex-auto min-h-full py-24 px-16">
        <div className="group flex items-center justify-between mb-12">
          <Typography
            className="text-lg font-600 leading-none"
            color="secondary.main"
          >
            Leave Details
          </Typography>
        </div>

        {leaveTypes.map((leave) => (
          <FormLabel
            htmlFor={leave.id}
            key={leave.id}
            className="group flex items-center mt-8 space-x-8 h-24 w-full cursor-pointer"
          >
            <Checkbox
              id={leave.id}
              color="secondary"
              className="p-0"
              checked={selectedLabels.includes(leave.leaveType)}
              onChange={() => handleToggleLabel(leave.leaveType)}
            />

            <Box
              className="w-12 h-12 shrink-0 rounded-full"
              sx={{ backgroundColor: leave.color }}
            />

            <Typography className="flex flex-1 leading-none">{leave.leaveType}</Typography>
          </FormLabel>
        ))}
      </div>
    </Popover>
  );
}

export default LeaveTypeSelector;