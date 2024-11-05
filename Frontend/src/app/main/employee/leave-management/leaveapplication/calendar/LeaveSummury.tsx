import React, { useState, useMemo } from 'react';
import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import { 
  EmployeeLeave, 
  EmployeeHoliday, 
  LeaveStatus,
  useGetApiLeavesLeavesHistoryQuery,
  useGetApiLeavesHolidaysQuery
} from '../../LeavesApi';

interface LeaveSummaryProps {
  openDialoge: (event: EmployeeLeave) => void;
}

function LeaveSummary({ openDialoge }: LeaveSummaryProps) {
  const [upcomingOptions, setUpcomingOptions] = useState('Upcoming Leaves');
  const [pastOptions, setPastOptions] = useState('Past Leaves');
  const pastOptionsArray = ['Past Leaves', 'Past Holidays', 'Past Leave and Holidays'];
  const upcomingOptionsArray = ['Upcoming Leaves', 'Upcoming Holidays', 'Upcoming Leave and Holidays'];

  const { data: leavesHistory, isLoading: isLeavesLoading } = useGetApiLeavesLeavesHistoryQuery();
  const { data: holidays, isLoading: isHolidaysLoading } = useGetApiLeavesHolidaysQuery();

  const columns = useMemo<MRT_ColumnDef<EmployeeLeave | EmployeeHoliday>[]>(() => [
    {
      accessorKey: 'startDate',
      header: 'From',
      accessorFn: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      accessorKey: 'endDate',
      header: 'To',
      accessorFn: (row) => new Date(row.endDate).toLocaleDateString(),
    },
    {
      accessorKey: 'leaveType',
      header: 'Type of leave',
      accessorFn: (row) => 'employeeLeaveTypes' in row ? row.employeeLeaveTypes?.name : 'Holiday',
    },
    {
      accessorKey: 'reason',
      header: 'Reason',
      accessorFn: (row) => 'reason' in row ? row.reason : row.name,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      accessorFn: (row) => 
        'status' in row ? (
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              backgroundColor: row.status === LeaveStatus.Approved ? 'success.main' : 'info.main',
              color: row.status === LeaveStatus.Approved ? 'success.contrastText' : 'info.contrastText',
              padding: '2px 4px',
              borderRadius: '4px'
            }}
          >
            {row.status}
          </Typography>
        ) : (
          <Typography variant="body1">N/A</Typography>
        ),
    },
  ], []);

  const handleFutureOptionChange = (event: SelectChangeEvent) => {
    setUpcomingOptions(event.target.value);
  };

  const handlePastOptionChange = (event: SelectChangeEvent) => {
    setPastOptions(event.target.value);
  };

  const sortedFutureEvents = useMemo(() => {
    if (isLeavesLoading || isHolidaysLoading) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filteredEvents: (EmployeeLeave | EmployeeHoliday)[] = [];

    if (upcomingOptions === 'Upcoming Leaves' || upcomingOptions === 'Upcoming Leave and Holidays') {
      filteredEvents = [
        ...filteredEvents,
        ...(leavesHistory || []).filter((event) => new Date(event.startDate) >= today),
      ];
    }

    if (upcomingOptions === 'Upcoming Holidays' || upcomingOptions === 'Upcoming Leave and Holidays') {
      filteredEvents = [
        ...filteredEvents,
        ...(holidays || []).filter((holiday) => new Date(holiday.startDate) >= today),
      ];
    }

    return filteredEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [leavesHistory, holidays, upcomingOptions, isLeavesLoading, isHolidaysLoading]);

  const sortedPastEvents = useMemo(() => {
    if (isLeavesLoading || isHolidaysLoading) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filteredEvents: (EmployeeLeave | EmployeeHoliday)[] = [];

    if (pastOptions === 'Past Leaves' || pastOptions === 'Past Leave and Holidays') {
      filteredEvents = [
        ...filteredEvents,
        ...(leavesHistory || []).filter((event) => new Date(event.startDate) < today),
      ];
    }

    if (pastOptions === 'Past Holidays' || pastOptions === 'Past Leave and Holidays') {
      filteredEvents = [
        ...filteredEvents,
        ...(holidays || []).filter((holiday) => new Date(holiday.startDate) < today),
      ];
    }

    return filteredEvents.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [leavesHistory, holidays, pastOptions, isLeavesLoading, isHolidaysLoading]);

  return (
    <>
      <Paper elevation={3} className="w-full p-5 mb-10">
        <div className="m-10">
          <FormControl>
            <Select
              id="upcoming-select"
              value={upcomingOptions}
              onChange={handleFutureOptionChange}
            >
              {upcomingOptionsArray.map((eachOption) => (
                <MenuItem value={eachOption} key={eachOption}>
                  {eachOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="w-full h-auto bg-grey-200 m-12 rounded-2xl p-6">
          <DataTable
            enableMultiRemove={false}
            data={sortedFutureEvents}
            columns={columns}
            renderRowActionMenuItems={({ row, closeMenu }) => {
              const isLeave = 'employeeLeaveTypes' in row.original;
              return isLeave ? (
                <MenuItem
                  key={0}
                  onClick={() => {
                    openDialoge(row.original as EmployeeLeave);
                    closeMenu();
                  }}
                >
                  <FuseSvgIcon size={20}>heroicons-outline:pencil-square</FuseSvgIcon>
                  <span className="ml-2">Update</span>
                </MenuItem>
              ) : (
                <Typography variant="body1" sx={{ p: '5px' }}>
                  N/A
                </Typography>
              );
            }}
          />
        </div>
      </Paper>
      <Paper elevation={3} className="w-full p-5">
        <div className="m-10">
          <FormControl>
            <Select
              id="past-select"
              value={pastOptions}
              onChange={handlePastOptionChange}
            >
              {pastOptionsArray.map((eachOption) => (
                <MenuItem value={eachOption} key={eachOption}>
                  {eachOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="w-full h-auto bg-grey-200 m-12 rounded-2xl p-6">
          <DataTable
            enableMultiRemove={false}
            data={sortedPastEvents}
            columns={columns}
            renderRowActionMenuItems={({ row, closeMenu }) => {
              const isLeave = 'employeeLeaveTypes' in row.original;
              return isLeave ? (
                <MenuItem
                  key={0}
                  onClick={() => {
                    openDialoge(row.original as EmployeeLeave);
                    closeMenu();
                  }}
                >
                  <FuseSvgIcon size={20}>heroicons-outline:pencil-square</FuseSvgIcon>
                  <span className="ml-2">Update</span>
                </MenuItem>
              ) : (
                <Typography variant="body1" sx={{ p: '5px' }}>
                  N/A
                </Typography>
              );
            }}
          />
        </div>
      </Paper>
    </>
  );
}

export default LeaveSummary;