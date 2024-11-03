
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { leaveTypes } from '../types';
import { selectLeaveBalance } from '../../LeaveManagementSlice';

export type EventLabelSelectProps = {
	value: string;
	onChange: (value: string) => void;
	className?: string;
};

const EventLabelSelect = forwardRef<HTMLElement, EventLabelSelectProps>((props, ref) => {
	const { value, onChange, className } = props;
	const leaveBalance = useSelector(selectLeaveBalance);

	const handleChange = (event: SelectChangeEvent) => {
		onChange(event.target.value);
	};

	return (
		<FormControl
			fullWidth
			className={className}
		>
			<InputLabel id="select-label">Label</InputLabel>
			<Select
				labelId="select-label"
				id="label-select"
				value={value}
				label="Label"
				onChange={handleChange}
				ref={ref}
				classes={{ select: 'flex items-center space-x-12' }}
			>
				{leaveTypes.map(
					(eachType) =>
						eachType.leaveType !== 'Holiday' && (
							<MenuItem
								value={eachType.leaveType}
								key={eachType.id}
								className="space-x-12"
							>
								<Box
									className="w-12 h-12 shrink-0 rounded-full"
									sx={{ backgroundColor: eachType.color }}
								/>
								<Typography
									component="div"
									className="flex justify-between items-center flex-1 leading-none"
								>
									<span>{eachType.leaveType}</span>
									{eachType.leaveType !== 'Work From Home' &&
										eachType.leaveType !== 'Leave without pay' &&
										leaveBalance[eachType.leaveType] !== undefined && (
											<span>[ Available Balance - {leaveBalance[eachType.leaveType]} ]</span>
										)}
								</Typography>
							</MenuItem>
						)
				)}
			</Select>
		</FormControl>
	);
});

export default EventLabelSelect;
