import * as React from 'react';
import { forwardRef, MouseEvent, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import _ from '@lodash';
import clsx from 'clsx';
import { ProjectTaskPriorityStatus } from '../../../ProjectApi';

type priorityListType = {
	value: ProjectTaskPriorityStatus;
	title: string;
	icon: string;
	textColor: string;
	bgColor: string;
};

const priorityList: priorityListType[] = [
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

type TaskPrioritySelectorProps = {
	value: ProjectTaskPriorityStatus;
	onChange: (val: ProjectTaskPriorityStatus) => void;
	className?: string;
};

const TaskPrioritySelector = forwardRef<HTMLButtonElement, TaskPrioritySelectorProps>((props, ref) => {
	const { value = ProjectTaskPriorityStatus.Medium, onChange, className } = props;

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const selectedOption = _.find(priorityList, { value }) || priorityList[1]; // Default to Medium if not found

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleSelect = (val: ProjectTaskPriorityStatus) => {
		onChange(val);
		handleClose();
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				ref={ref}
				id="priority-button"
				aria-controls="priority-menu"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className={clsx('min-w-96 px-12', className)}
				sx={{ color: selectedOption.textColor, backgroundColor: selectedOption.bgColor }}
			>
				<FuseSvgIcon
					className="mx-4"
					size={16}
				>
					{selectedOption.icon}
				</FuseSvgIcon>
				<span>{selectedOption.title}</span>
			</Button>
			<Menu
				id="priority-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'priority-button'
				}}
			>
				{priorityList.map((item) => (
					<MenuItem
						onClick={() => handleSelect(item.value)}
						key={item.value}
					>
						<ListItemText primary={item.title} />
						<ListItemIcon
							className="min-w-36 justify-end"
							sx={{ color: item.textColor }}
						>
							<FuseSvgIcon size={16}>{item.icon}</FuseSvgIcon>
						</ListItemIcon>
					</MenuItem>
				))}
			</Menu>
		</>
	);
});

export default TaskPrioritySelector;
