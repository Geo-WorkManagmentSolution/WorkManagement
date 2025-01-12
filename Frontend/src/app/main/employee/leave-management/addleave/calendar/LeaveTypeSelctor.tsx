import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Popover from '@mui/material/Popover';
import { Box } from '@mui/system';
import { FormLabel, Typography } from '@mui/material';

interface LeaveTypeSelectorProps {
	anchorEl: HTMLElement | null;
	onClose: () => void;
	selectedLabels: string[];
	toggleSelectedLabels: (leaveType: string) => void;
	eventColors: Record<number, string>;
	currentLeaves: any[];
}

function LeaveTypeSelector({
	anchorEl,
	onClose,
	selectedLabels,
	toggleSelectedLabels,
	eventColors,
	currentLeaves
}: LeaveTypeSelectorProps) {
	const handleToggleLabel = (leaveType: string) => {
		toggleSelectedLabels(leaveType);
	};

	return (
		<Popover
			open={Boolean(anchorEl)}
			anchorEl={anchorEl}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'center',
				horizontal: 'left'
			}}
		>
			<div className="flex flex-col p-20 min-w-128">
				<div className="group flex items-center justify-between mb-12">
					<Typography
						className="text-lg font-600 leading-none"
						color="secondary.main"
					>
						Leave Details
					</Typography>
				</div>
			{currentLeaves && currentLeaves.length === 0 && (<span>No Leave Assiegned.. Please Contact HR</span>)}
				{currentLeaves?.map((eachType) => (
					<FormLabel
						htmlFor={`leave-type-${eachType.id}`}
						key={eachType.id}
						className="group flex items-center mt-8 space-x-8 h-24 w-full cursor-pointer"
					>
						<Checkbox
							id={`leave-type-${eachType.id}`}
							color="secondary"
							className="p-0"
							checked={selectedLabels.includes(eachType.employeeLeaveType || '')}
							onChange={() => handleToggleLabel(eachType.employeeLeaveType || '')}
						/>

						<Box
							className="w-12 h-12 shrink-0 rounded-full"
							sx={{ backgroundColor: eventColors[eachType.id] }}
						/>
						<div className="flex flex-auto">
							<Typography
								component="div"
								className="flex space-x-36 items-center flex-1 leading-none"
							>
								<span>{eachType.employeeLeaveType}</span>
								<span>[ Available Balance : {eachType.remainingLeaves} ]</span>
							</Typography>
						</div>
					</FormLabel>
				))}
			</div>
		</Popover>
	);
}

export default LeaveTypeSelector;
