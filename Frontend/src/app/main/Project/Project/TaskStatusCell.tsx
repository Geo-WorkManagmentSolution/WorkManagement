import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { ProjectTaskStatus } from '../ProjectApi';

const statusColors = {
  [ProjectTaskStatus.New]: 'rgba(63,81,181,0.3)', // Blue for New
  [ProjectTaskStatus.Active]: 'rgba(76,175,80,0.3)', // Green for Active
  [ProjectTaskStatus.Completed]: 'rgba(255,193,7,0.3)', // Amber for Completed
  [ProjectTaskStatus.Removed]: 'rgba(244,67,54,0.3)', // Red for Removed
};

interface TaskStatusCellProps {
  status: ProjectTaskStatus;
}

const TaskStatusCell: FC<TaskStatusCellProps> = ({ status }) => {
  return (
    <Typography
      component="div"
      style={{
        backgroundColor: statusColors[status],
        padding: '4px 8px',
        borderRadius: '4px',
        display: 'inline-block',
      }}
    >
      {status}
    </Typography>
  );
};

export default TaskStatusCell;
