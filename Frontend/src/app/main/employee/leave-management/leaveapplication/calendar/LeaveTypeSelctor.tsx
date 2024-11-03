import Checkbox from '@mui/material/Checkbox';
import { useAppSelector } from 'app/store/hooks';
import Popover from '@mui/material/Popover';
import React from 'react';
import { Box } from '@mui/system';
import { FormLabel, Typography } from '@mui/material';
import { leaveTypes } from '../types';
import { selectLeaveBalance } from '../../LeaveManagementSlice';

interface LeaveDetailsProps {
	anchorEl: HTMLElement | null;
	onClose: () => void;
	selectedLabels: string[];
	toggleSelectedLabels: (leaveType: string) => void;
}

function LeaveTypeSelector({ anchorEl, onClose, selectedLabels, toggleSelectedLabels }: LeaveDetailsProps) {
	const handleToggleLabel = (leaveType: string) => {
		toggleSelectedLabels(leaveType);
	};
	const leaveBalance = useAppSelector(selectLeaveBalance);

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
				vertical: 'top',
				horizontal: 'right'
			}}
		>
			<div className="flex flex-col p-20">
				<div className="group flex items-center justify-between mb-12">
					<Typography
						className="text-lg font-600 leading-none"
						color="secondary.main"
					>
						Leave Details
					</Typography>
				</div>

				{leaveTypes.map((eachType) => (
					<FormLabel
						htmlFor={eachType.id}
						key={eachType.id}
						className="group flex items-center mt-8 space-x-8 h-24 w-full cursor-pointer"
					>
						<Checkbox
							id={eachType.id}
							color="secondary"
							className="p-0"
							checked={selectedLabels.includes(eachType.leaveType)}
							onChange={() => handleToggleLabel(eachType.leaveType)}
						/>

						<Box
							className="w-12 h-12 shrink-0 rounded-full"
							sx={{ backgroundColor: eachType.color }}
						/>
					<div className='flex flex-auto'>
						<Typography
							component="div"
							className="flex justify-between items-center flex-1 leading-none"
						>
							<span>{eachType.leaveType}</span>
							{eachType.leaveType !== 'Work From Home' &&
								eachType.leaveType !== 'Holiday' &&
								eachType.leaveType !== 'Leave without pay' &&
								leaveBalance[eachType.leaveType] !== undefined && (
									<span>[ Available Balance - {leaveBalance[eachType.leaveType]} ]</span>
								)}
						</Typography>
						</div>
					</FormLabel>
				))}
			</div>
		</Popover>
	);
}

export default LeaveTypeSelector;
