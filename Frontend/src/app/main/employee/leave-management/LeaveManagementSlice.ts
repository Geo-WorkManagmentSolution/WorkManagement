import { WithSlice, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
import { Event, LeaveBalance ,holidays} from './leaveapplication/types';


export interface LeaveManagementState {
	events: Event[];
	leaveBalance: LeaveBalance;
}

const initialState: LeaveManagementState = {
	events: [],
	leaveBalance: {
		'Casual Leave': 7,
		'Sick Leave': 7,
		'Privillage Leave': 21,
		'Work From Home': Infinity
	}
};

function calculateLeaveDays(start: Date, end: Date, includeWeekends: boolean = true): number {
	let days = 0;
	const currentDate = new Date(start);
	const endDate = new Date(end);

	while (currentDate <= endDate) {
		const dayOfWeek = currentDate.getDay();

		if (includeWeekends || (dayOfWeek !== 0 && dayOfWeek !== 6)) {
			days++;
		}

		currentDate.setDate(currentDate.getDate() + 1);
	}

	return days;
}

export const leaveManagementSlice = createSlice({
	name: 'leaveManagement',
	initialState,
	reducers: {
		// addLeave: (state, action: PayloadAction<Event>) => {
		// 	const newLeave = action.payload;
	  
		// 	// Validation 1: Check if leave already exists for the date range
		// 	const existingLeave = state.events.find(
		// 	  (event) =>
		// 		new Date(event.start) <= new Date(newLeave.end) && 
		// 		new Date(event.end) >= new Date(newLeave.start)
		// 	);
	  
		// 	if (existingLeave) {
		// 	  throw new Error('A leave already exists for the selected date range.');
		// 	  console.log("error on existing leave");

		// 	}
	  
		// 	// Validation 2: Check if leave balance is sufficient
		// 	if (state.leaveBalance[newLeave.leaveType] !== undefined && 
		// 		state.leaveBalance[newLeave.leaveType] <= 0) {
		// 			console.log("error on balance");
					
		// 	  throw new Error(`You don't have enough ${newLeave.leaveType} balance.`);
		// 	}
	  
		// 	// Validation 3: Check if leave is applied on a holiday
		// 	const isHoliday = holidays.some(
		// 	  (holiday) => 
		// 		new Date(holiday.start).toDateString() === new Date(newLeave.start).toDateString() ||
		// 		new Date(holiday.end).toDateString() === new Date(newLeave.end).toDateString()
		// 	);
	  
		// 	if (isHoliday) {
		// 		console.log("error on holiday");

		// 	  throw new Error('You cannot apply leave on a holiday.');
		// 	}
	  
		// 	// If all validations pass, add the leave
		// 	state.events.push(newLeave);
	  
		// 	if (state.leaveBalance[newLeave.leaveType] !== undefined) {
		// 	  const leaveDays = calculateLeaveDays(new Date(newLeave.start), new Date(newLeave.end));
		// 	  const daysToSubtract = newLeave.halfDay ? leaveDays / 2 : leaveDays;
		// 	  state.leaveBalance[newLeave.leaveType] -= daysToSubtract;
		// 	}
		//   }
		
		
		
		addLeave: (state, action: PayloadAction<Event>) => {
			const newLeave = action.payload;
		
			// Validation 1: Check if leave already exists for the date range
			const existingLeave = state.events.find(
				(event) =>
					new Date(event.start) <= new Date(newLeave.end) &&
					new Date(event.end) >= new Date(newLeave.start)
			);
		
			if (existingLeave) {
				console.error("Error: A leave already exists for the selected date range.");
				throw new Error("A leave already exists for the selected date range.");
			}
		
			// Calculate the number of leave days
			const leaveDays = calculateLeaveDays(new Date(newLeave.start), new Date(newLeave.end));
			const daysToSubtract = newLeave.halfDay ? leaveDays / 2 : leaveDays;
			console.log(`Requested leave days: ${leaveDays}, Days to subtract: ${daysToSubtract}`);
		
			// Validation 2: Check if leave balance is sufficient and ensure it won't go negative
			const availableBalance = state.leaveBalance[newLeave.leaveType];
			if (availableBalance !== undefined) {
				if (availableBalance < daysToSubtract) {
					console.error(`Error: Insufficient ${newLeave.leaveType} balance.`);
					throw new Error(`You don't have enough ${newLeave.leaveType} balance.`);
				}
			}
		
			// Validation 3: Check if leave is applied on a holiday
			const isHoliday = holidays.some(
				(holiday) =>
					new Date(holiday.start).toDateString() === new Date(newLeave.start).toDateString() ||
					new Date(holiday.end).toDateString() === new Date(newLeave.end).toDateString()
			);
		
			if (isHoliday) {
				console.error("Error: Leave cannot be applied on a holiday.");
				throw new Error("You cannot apply leave on a holiday.");
			}
		
			// If all validations pass, add the leave
			state.events.push(newLeave);
		
			// Deduct leave balance
			if (availableBalance !== undefined) {
				state.leaveBalance[newLeave.leaveType] -= daysToSubtract;
				console.log(`Updated ${newLeave.leaveType} balance: ${state.leaveBalance[newLeave.leaveType]}`);
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		,
		updateLeave: (state, action: PayloadAction<Event>) => {
			const updatedLeave = action.payload;
			const index = state.events.findIndex((event) => event.id === updatedLeave.id);

			if (index !== -1) {
				const oldLeave = state.events[index];
				const oldLeaveDays = calculateLeaveDays(new Date(oldLeave.start), new Date(oldLeave.end));
				const newLeaveDays = calculateLeaveDays(new Date(updatedLeave.start), new Date(updatedLeave.end));

				const oldDays = oldLeave.halfDay ? oldLeaveDays / 2 : oldLeaveDays;
				const newDays = updatedLeave.halfDay ? newLeaveDays / 2 : newLeaveDays;

				if (oldLeave.leaveType !== updatedLeave.leaveType || oldDays !== newDays) {
					if (state.leaveBalance[oldLeave.leaveType] !== undefined) {
						state.leaveBalance[oldLeave.leaveType] += oldDays;
					}

					if (state.leaveBalance[updatedLeave.leaveType] !== undefined) {
						state.leaveBalance[updatedLeave.leaveType] -= newDays;
					}
				}

				state.events[index] = updatedLeave;
			}
		},
		cancelLeave: (state, action: PayloadAction<string>) => {
			const index = state.events.findIndex((event) => event.id === action.payload);

			if (index !== -1) {
				const cancelledLeave = state.events[index];
				const leaveDays = calculateLeaveDays(new Date(cancelledLeave.start), new Date(cancelledLeave.end));
				const daysToAdd = cancelledLeave.halfDay ? leaveDays / 2 : leaveDays;

				if (state.leaveBalance[cancelledLeave.leaveType] !== undefined) {
					state.leaveBalance[cancelledLeave.leaveType] += daysToAdd;
				}

				state.events.splice(index, 1);
			}
		},
		setInitialEvents: (state, action: PayloadAction<Event[]>) => {
			state.events = action.payload;
			// Recalculate leave balance based on initial events
			const newLeaveBalance = { ...initialState.leaveBalance };
			action.payload.forEach((event) => {
				if (newLeaveBalance[event.leaveType] !== undefined) {
					const leaveDays = calculateLeaveDays(new Date(event.start), new Date(event.end));
					const daysToSubtract = event.halfDay ? leaveDays / 2 : leaveDays;
					newLeaveBalance[event.leaveType] -= daysToSubtract;
				}
			});
			state.leaveBalance = newLeaveBalance;
		}
	},
	selectors: {
		selectEvents: (state) => state.events,
		selectLeaveBalance: (state) => state.leaveBalance
	}
});

// ... rest of the code remains the same

// ... rest of the code remains the same

/**
 * Lazy load
 * */
rootReducer.inject(leaveManagementSlice);
const injectedSlice = leaveManagementSlice.injectInto(rootReducer);
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof leaveManagementSlice> {}
}

export const { selectEvents, selectLeaveBalance } = injectedSlice.selectors;

export const { addLeave, updateLeave, cancelLeave, setInitialEvents } = leaveManagementSlice.actions;

export type LeaveManagementSliceType = typeof leaveManagementSlice;

export default leaveManagementSlice.reducer;
