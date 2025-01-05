import React from 'react';
import { Typography } from '@mui/material';
import { LeaveStatus } from '../../EmployeeApi';

interface SalaryStatusComponentProps {
  status: LeaveStatus;
}

const SalaryStatusComponent: React.FC<SalaryStatusComponentProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case LeaveStatus.Approved:
        return 'success.main';
      case LeaveStatus.Rejected:
        return 'error.main';
      case LeaveStatus.Pending:
      default:
        return 'info.main';
    }
  };

  return (
    <Typography
      variant="body1"
      sx={{
        textAlign: 'center',
        backgroundColor: getStatusColor(),
        color: 'common.white',
        padding: '2px 4px',
        borderRadius: '4px'
      }}
    >
      {status}
    </Typography>
  );
};

export default SalaryStatusComponent;
