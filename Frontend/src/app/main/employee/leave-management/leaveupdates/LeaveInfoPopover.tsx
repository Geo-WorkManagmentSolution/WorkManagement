import { Typography, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Divider } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';


function LeaveInfoPopover({ leave, onClose }) {
  if (!leave) {
    return null;
  }

  const renderLeaveTable = (leaveList, title) => (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom textAlign='center'>
        {title}
      </Typography>
      <TableContainer className='border border-grey-300 rounded-lg m-4'>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Leave Type</Typography></TableCell>
              <TableCell align="right"><Typography fontWeight="bold">Total Leaves</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(leaveList) && leaveList.length > 0 ? (
              leaveList.map((leaveItem) => (
                <TableRow key={leaveItem.employeeLeaveType}>
                  <TableCell>{leaveItem.employeeLeaveType}</TableCell>
                  <TableCell align="right">{leaveItem.totalLeaves}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No {title.toLowerCase()} data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <Paper className="p-24 " style={{ maxWidth: '800px' }} >
      <div className="flex justify-between items-center mb-16">
        <Typography variant="h5" fontWeight="bold" textAlign='center'>
          Leave Information
        </Typography>
        <Divider />
        <IconButton onClick={onClose} size="small">
          <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
        </IconButton>
      </div>
      <Typography variant="subtitle1" gutterBottom>
       Employee Name -  {leave.employeeName || 'Unknown Employee'}
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={6} spacing={2} >
          {renderLeaveTable(leave.updatedNewLeaves, "Updated Leaves")}
        </Grid>
        <Grid item xs={6}>
          {renderLeaveTable(leave.currentLeaves, "Current Leaves")}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LeaveInfoPopover;

