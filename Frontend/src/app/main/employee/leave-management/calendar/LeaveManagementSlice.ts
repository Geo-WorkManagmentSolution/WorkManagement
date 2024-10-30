import { WithSlice, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
import { Event, LeaveBalance } from './types';

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
		addLeave: (state, action: PayloadAction<Event>) => {
			const newLeave = action.payload;

      if (state.leaveBalance[newLeave.leaveType] === 0) {
        // Return early if leave balance is zero
        return;
    }

			const existingLeave = state.events.find(
				(event) =>
					new Date(event.start) <= new Date(newLeave.end) && new Date(event.end) >= new Date(newLeave.start)
			);

			if (existingLeave) {
				// Handle existing leave (you might want to throw an error or return a value)
				return;
			}

			state.events.push(newLeave);

			if (state.leaveBalance[newLeave.leaveType] !== undefined) {
				const leaveDays = calculateLeaveDays(new Date(newLeave.start), new Date(newLeave.end));
				const daysToSubtract = newLeave.halfDay ? leaveDays / 2 : leaveDays;
				state.leaveBalance[newLeave.leaveType] -= daysToSubtract;
			}
		},
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
