import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MRT_ColumnDef } from 'material-react-table';
import {
  Autocomplete,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import DataTable from 'app/shared-components/data-table/DataTable';
import { useGetApiEmployeesTeamMembersListQuery } from '../../EmployeeApi';
import { Link } from 'react-router-dom';

function TeamTab() {
  const routeParams = useParams();
  const { employeeId } = routeParams;
  const dispatch = useDispatch();

  const {
    data: employeeTeamMembersList,
    isLoading,
    isError,
  } = useGetApiEmployeesTeamMembersListQuery(
    { employeeId },
    {
      skip: !employeeId || employeeId === 'new',
    }
  );
  
  if (!employeeId || employeeId === 'new') {
    return <Alert
    severity='warning'
    >This section is only accessible for saved employees.</Alert>
  }
  

  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleRemoveMember = (email) => {
    setTeamMembers(teamMembers.filter((member) => member.email !== email));
  };

  const handleSearch = (event, value) => {
    setSelectedEmployee(value);
  };

  const columns = useMemo<MRT_ColumnDef<typeof employeeTeamMembersList[0]>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        accessorFn: (row) => (
					<Typography
						component={Link}
						to={`/apps/employees/employeesSearch/${row.employeeId}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{`${row.name}`}
					</Typography>
				)
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },{
        accessorKey: 'designation',
        header: 'Designation',
      }
      // ,
      // {
      //   id: 'actions',
      //   header: 'Actions',
      //   Cell: ({ row }) => (
      //     <IconButton
      //       onClick={() => {
      //         if (teamMembers.some((member) => member.email === row.original.email)) {
      //           dispatch(
      //             showMessage({
      //               message: 'Team member is already added.',
      //               variant: 'error',
      //             })
      //           );
      //         } else {
      //           setTeamMembers([...teamMembers, row.original]);
      //         }
      //       }}
      //     >
      //       <FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
      //     </IconButton>
      //   ),
      // },
    ],
    [teamMembers, dispatch]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading team members</div>;
  }

  return (
    <div className="flex flex-col space-y-24">
      <div className="flex items-center border-b-1 space-x-8 pb-8">
					<FuseSvgIcon
						color="action"
						size={24}
					>
						heroicons-outline:user-group
					</FuseSvgIcon>
					<Typography
						className="text-2xl"
						color="text.secondary"
					>
						Team Members
					</Typography>
				</div>
      <Paper className="flex flex-col flex-auto shadow rounded-lg overflow-hidden w-full">
      
        <DataTable
        enableSorting={false}
        enableTopToolbar={false}
        enableColumnActions={false}
        // enableMultiSort={false}
         // enableCellActions={false}
        enableColumnDragging={false}
       
        enableRowDragging={false}
        enableRowActions={false}  
          columns={columns}
          data={employeeTeamMembersList}
          enableRowSelection={false}
        />
      </Paper>

     

      {/* {teamMembers.length === 0 ? (
        <Typography className="text-center my-32" color="textSecondary">
          No team members added.
        </Typography>
      ) : (
        <List>
          {teamMembers.map((member) => (
            <ListItem
              key={member.email}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveMember(member.email)}>
                  <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={member.avatar} alt={`Avatar °${member.name}`} />
              </ListItemAvatar>
              <ListItemText primary={member.name} secondary={member.email} />
            </ListItem>
          ))}
        </List>
      )} */}
    </div>
  );
}

export default TeamTab;

