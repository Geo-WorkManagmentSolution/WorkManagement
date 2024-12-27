import React from 'react';
import { Typography } from '@mui/material';
import { SalaryStatus } from '../EmployeeApi';

interface SalaryStatusComponentProps {
  status: SalaryStatus;
}

const SalaryStatusComponent: React.FC<SalaryStatusComponentProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case SalaryStatus.Approved:
        return 'success.main';
      case SalaryStatus.Rejected:
        return 'error.main';
      case SalaryStatus.Pending:
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

