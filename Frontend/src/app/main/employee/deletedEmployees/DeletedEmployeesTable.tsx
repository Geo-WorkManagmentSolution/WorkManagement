import React, { useMemo } from 'react';
import { Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import { useGetApiEmployeesAllDeletedEmployeesQuery, EmployeeDashboardDataModel } from '../EmployeeApi';

function DeletedEmployeesTable() {
  const {
    data: deletedEmployees,
    isLoading,
    refetch
  } = useGetApiEmployeesAllDeletedEmployeesQuery();

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  const columns = useMemo<MRT_ColumnDef<EmployeeDashboardDataModel>[]>(
    () => [
      {
        accessorKey: 'employeeNumber',
        header: 'Employee Number',
        accessorFn: (row) => `${row.employeeNumber}`
      },
      {
        accessorKey: 'name',
        header: 'Name',
        Cell: ({ row }) => (
          <Typography
            component={Link}
            to={`/apps/employees/past-employees/${row.original.id}`}
            className="underline"
            color="secondary"
            role="button"
          >
            {`${row.original?.firstName} ${row.original?.lastName}`}
          </Typography>
        )
      },
      {
        accessorKey: 'email',
        header: 'Email',
        accessorFn: (row) => `${row?.email}`
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        accessorFn: (row) => `${row?.phoneNumber}`
      },
      {
        accessorKey: 'departmentName',
        header: 'Department',
        accessorFn: (row) => `${row?.departmentName}`
      },
      {
        accessorKey: 'designationName',
        header: 'Designation',
        accessorFn: (row) => `${row?.designationName}`
      },
      {
        accessorKey: 'hireDate',
        header: 'Hire Date',
        accessorFn: (row) => format(new Date(row.hireDate), 'dd/MM/yyyy')
      }
    ],
    []
  );

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <Paper className="flex flex-col flex-auto shadow-1 rounded-t-lg overflow-hidden rounded-b-0 w-full h-full" elevation={0}>
      <DataTable
      enableRowActions={false}  
        data={deletedEmployees}
        columns={columns}
      />
    </Paper>
  );
}

export default DeletedEmployeesTable;
