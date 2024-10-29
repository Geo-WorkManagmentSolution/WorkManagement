// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { forwardRef } from 'react';
// import Box from '@mui/material/Box';
// import { leaveTypes } from './types';

// export type EventLabelSelectProps = {
// 	value: string;
// 	onChange: (value: string) => void;
// 	className?: string;
// };
// type LeaveType = {
// 	id: string;
// 	color: string;
// 	leaveType: string;
// };
// /**
//  * The event label select.
//  */
// const EventLabelSelect = forwardRef<HTMLElement, EventLabelSelectProps>((props, ref) => {
// 	const { value, onChange, className } = props;

// 	const handleChange = (event: SelectChangeEvent) => {
// 		onChange(event.target.value);
// 	};

// 	return (
// 		<FormControl
// 			fullWidth
// 			className={className}
// 		>
// 			<InputLabel id="select-label">Label</InputLabel>
// 			<Select
// 				labelId="select-label"
// 				id="label-select"
// 				value={value}
// 				label="Label"
// 				onChange={handleChange}
// 				ref={ref}
// 				classes={{ select: 'flex items-center space-x-12' }}
// 			>
// 				{leaveTypes.map((eachType: LeaveType) => (
// 					<MenuItem
// 						value={eachType.leaveType}
// 						key={eachType.id}
// 						className="space-x-12"
// 					>
// 						<Box
// 							className="w-12 h-12 shrink-0 rounded-full"
// 							sx={{ backgroundColor: eachType.color }}
// 						/>
// 						<span>{eachType.leaveType}</span>
// 					</MenuItem>
// 				))}
// 			</Select>
// 		</FormControl>
// 	);
// });

// export default EventLabelSelect;
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { leaveTypes } from './types';

export type EventLabelSelectProps = {
	value: string;
	onChange: (value: string) => void;
	className?: string;
};

const EventLabelSelect = forwardRef<HTMLElement, EventLabelSelectProps>((props, ref) => {
	const { value, onChange, className } = props;

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
				{leaveTypes.map((eachType) => (
					<MenuItem
						value={eachType.leaveType}
						key={eachType.id}
						className="space-x-12"
					>
						<Box
							className="w-12 h-12 shrink-0 rounded-full"
							sx={{ backgroundColor: eachType.color }}
						/>
						<span>{eachType.leaveType}</span>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
});

export default EventLabelSelect;