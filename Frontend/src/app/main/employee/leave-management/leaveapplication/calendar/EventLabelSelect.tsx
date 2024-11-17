// import React from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Box from '@mui/material/Box';
// import { Typography, FormHelperText } from '@mui/material';
// import { useGetApiEmployeesLeavesCurrentQuery, EmployeeLeaveSummaryModel } from '../../LeavesApi';

// export type EventLabelSelectProps = {
//   value: number;
//   onChange: (value: number, color: string) => void;
//   className?: string;
//   error?: boolean;
//   helperText?: string;
//   eventColors: Record<number, string>;
// };

// const EventLabelSelect = React.forwardRef<HTMLElement, EventLabelSelectProps>((properties, ref) => {
//   const { value, onChange, className, error, helperText, eventColors, ...props } = properties;
//   const { data: currentLeaves, isLoading } = useGetApiEmployeesLeavesCurrentQuery();

//   const handleChange = (event: SelectChangeEvent<number>) => {
//     const newValue = Number(event.target.value);
//     onChange(newValue, eventColors[newValue] || '');
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <FormControl
//       fullWidth
//       className={className}
//       error={error}
//     >
//       <InputLabel id="select-label">Label</InputLabel>
//       <Select
//         labelId="select-label"
//         id="label-select"
//         value={value}
//         label="Label"
//         onChange={handleChange}
//         ref={ref}
//         classes={{ select: 'flex items-center space-x-12' }}
//       >
//         {currentLeaves?.map((leaveType: EmployeeLeaveSummaryModel) => (
//           <MenuItem
//             value={leaveType.id}
//             key={leaveType.id}
//             className="space-x-12"
//           >
//             <Box
//               className="w-12 h-12 shrink-0 rounded-full"
//               sx={{ backgroundColor: eventColors[leaveType.id] }}
//             />
//             <Typography
//               component="div"
//               className="flex justify-between items-center flex-1 leading-none"
//             >
//               <span>{leaveType.employeeLeaveType}</span>
//               {leaveType.remainingLeaves !== undefined && (
//                 <span>[ Available Balance - {leaveType.remainingLeaves} ]</span>
//               )}
//             </Typography>
//           </MenuItem>
//         ))}
//       </Select>
//       {helperText && <FormHelperText>{helperText}</FormHelperText>}
//     </FormControl>
//   );
// });

// export default EventLabelSelect;

import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Typography, FormHelperText } from '@mui/material';

export type EventLabelSelectProps = {
	value: number;
	onChange: (value: number) => void;
	className?: string;
	error?: boolean;
	helperText?: string;
	eventColors: Record<number, string>;
	currentLeaves: any[]; // Replace 'any' with the correct type from your API
};

const EventLabelSelect = React.forwardRef<HTMLElement, EventLabelSelectProps>((properties, ref) => {
	const { value, onChange, className, error, helperText, eventColors, currentLeaves, ...props } = properties;

	const handleChange = (event: SelectChangeEvent<number>) => {
		const newValue = Number(event.target.value);
		onChange(newValue);
	};

	return (
		<FormControl
			fullWidth
			className={className}
			error={error}
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
				{currentLeaves?.map((leaveType) => (
					<MenuItem
						value={leaveType.id}
						key={leaveType.id}
						className="space-x-12"
					>
						<Box
							className="w-12 h-12 shrink-0 rounded-full"
							sx={{ backgroundColor: eventColors[leaveType.id] }}
						/>
						<Typography
							component="div"
							className="flex justify-between items-center flex-1 leading-none"
						>
							<span>{leaveType.employeeLeaveType}</span>
							{leaveType.remainingLeaves !== undefined && (
								<span>[ Available Balance - {leaveType.remainingLeaves} ]</span>
							)}
						</Typography>
					</MenuItem>
				))}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
});

export default EventLabelSelect;
