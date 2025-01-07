import React from 'react';
import { Typography } from '@mui/material';
import DeletedEmployeesTable from './DeletedEmployeesTable';
import DeletedEmployeesHeader from './DeletedEmployeesHeader';

function DeletedEmployeeDashboard() {
  return (
    <div className="w-full h-full flex flex-col px-16">
      <DeletedEmployeesHeader />
      <DeletedEmployeesTable />
    </div>
  );
}

export default DeletedEmployeeDashboard;
