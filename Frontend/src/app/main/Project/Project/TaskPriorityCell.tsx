import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { ProjectTaskPriorityStatus } from '../ProjectApi';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const priorityList = [
    {
        value: ProjectTaskPriorityStatus.Low,
        title: 'Low',
        icon: 'heroicons-solid:arrow-small-down',
        textColor: 'rgb(76 175 80)',
        bgColor: 'rgba(76,175,80,0.3)'
    },
    {
        value: ProjectTaskPriorityStatus.Medium,
        title: 'Medium',
        icon: 'heroicons-solid:minus',
        textColor: 'rgb(80,80,80)',
        bgColor: 'rgba(80,80,80, 0.3)'
    },
    {
        value: ProjectTaskPriorityStatus.High,
        title: 'High',
        icon: 'heroicons-solid:arrow-small-up',
        textColor: 'rgb(244 67 54)',
        bgColor: 'rgba(244,67,54,0.3)'
    }
];

interface TaskPriorityCellProps {
    priority: ProjectTaskPriorityStatus;
}

const TaskPriorityCell: FC<TaskPriorityCellProps> = ({ priority }) => {
    const selectedOption = priorityList.find(item => item.value === priority);

    if (!selectedOption) return null;

    return (
        <Typography
            component="div"
            style={{
                backgroundColor: selectedOption.bgColor,
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                color: selectedOption.textColor // Set text color from the selected option
            }}
        >
            <FuseSvgIcon
                className="mx-4"
                size={16}
                style={{ color: selectedOption.textColor }} // Set icon color from the selected option
            >
                {selectedOption.icon}
            </FuseSvgIcon>
            {priority}
        </Typography>
    );
};

export default TaskPriorityCell;
