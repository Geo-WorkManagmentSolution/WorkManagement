import { Chip } from '@mui/material';
import { LeaveStatus } from '../../EmployeeApi';

function LeaveStatusComponent({ status }: { status: LeaveStatus }) {
  let color: 'success' | 'warning' | 'error' = 'warning';
  let label = 'Pending';

  switch (status) {
    case LeaveStatus.Approved:
      color = 'success';
      label = 'Approved';
      break;
    case LeaveStatus.Rejected:
      color = 'error';
      label = 'Rejected';
      break;
  }

  return <Chip label={label} color={color} size="small" />;
}

export default LeaveStatusComponent;

