'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { TaskDashboardModel, TaskModel, useGetApiProjectProjectTasksByProjectIdQuery, useGetApiProjectProjectTaskByIdQuery } from '../../ProjectApi';
import TaskForm from './helperComponents/TaskForm';
import TaskPriorityCell from '../TaskPriorityCell';
import TaskStatusCell from '../TaskStatusCell';
import { format } from 'date-fns';


function Tasks() {
  const { projectId } = useParams<{ projectId: string }>();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedTaskData, setSelectedTaskData] = useState<TaskModel | null>(null);

  const { data: tasks, refetch } = useGetApiProjectProjectTasksByProjectIdQuery(
    { projectId: Number(projectId) },
    {
      skip: !projectId || projectId === 'new'
    }
  );

  const { data: fetchedTaskData, refetch: refetchSelectedTask } = useGetApiProjectProjectTaskByIdQuery(
    { id: selectedTaskId || 0 },
    { skip: !selectedTaskId }
  );

  useEffect(() => {
    if (selectedTaskId) {
      refetchSelectedTask().then((result) => {
        if ('data' in result) {
          setSelectedTaskData(result.data);
          setIsTaskFormOpen(true);
        }
      });
    }
  }, [selectedTaskId, refetchSelectedTask]);

  const columns = React.useMemo<MRT_ColumnDef<TaskDashboardModel>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Title'
      },
      {
        accessorKey: 'description',
        header: 'Description'
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        Cell: ({ cell }) => <TaskPriorityCell priority={cell.getValue()} />,
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
      accessorFn: (row) => format(new Date(row.startDate), 'dd/MM/yyyy')
      },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        accessorFn: (row) => format(new Date(row.endDate), 'dd/MM/yyyy')
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => <TaskStatusCell status={cell.getValue()} />,
      },
      {
        accessorKey: 'estimatedHours',
        header: 'Estimated Hours'
      },
      {
        accessorKey: 'remainingHours',
        header: 'Remaining Hours'
      },
      {
        accessorKey: 'completedHours',
        header: 'Completed Hours'
      }
    ],
    []
  );

  const handleAddTask = () => {
    setSelectedTaskId(null);
    setSelectedTaskData(null);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task: TaskDashboardModel) => {
    setSelectedTaskId(task.id);
  };

  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false);
    setSelectedTaskId(null);
    setSelectedTaskData(null);
    refetch();
  };
if (projectId === 'new') {
		return <Alert severity="info">Please save the Project details For Adding Task.</Alert>;
	}

  return (
    <div className="w-full">
      <div className="flex items-center border-b-1 space-x-8 pb-8">
        <FuseSvgIcon
          color="action"
          size={24}
        >
          heroicons-outline:check-badge
        </FuseSvgIcon>
        <Typography
          className="text-2xl"
          color="text.secondary"
        >
          Task Details
        </Typography>
      </div>
      <div className="flex flex-row-reverse items-center my-8">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={tasks || []}
        enableRowActions
        renderRowActions={({ row }) => (
          <Button
            onClick={() => handleEditTask(row.original)}
            size="small"
          >
            Edit
          </Button>
        )}
      />
      <TaskForm
        projectId={Number(projectId)}
        taskId={selectedTaskId}
        open={isTaskFormOpen}
        onClose={handleCloseTaskForm}
        taskData={selectedTaskId ? selectedTaskData : null}
      />
    </div>
  );
}

export default Tasks;

