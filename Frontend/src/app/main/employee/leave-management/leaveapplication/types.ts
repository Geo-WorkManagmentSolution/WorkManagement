import { v4 as uuidv4 } from 'uuid';

export const leaveTypes = [
	{
		id: uuidv4(),
		leaveType: 'Casual Leave',
		color: '#FF5733',
		availableLeave: 7,
		isApproved:false
	},
	{
		id: uuidv4(),
		leaveType: 'Sick Leave',
		color: '#33FF57',
		availableLeave: 7,
		isApproved:false
	},
	{
		id: uuidv4(),
		leaveType: 'Privillage Leave',
		color: '#3357FF',
		availableLeave: 21,
		isApproved:false
	},
	{
		id: uuidv4(),
		leaveType: 'Work From Home',
		color: '#FF33A1',
		isApproved:false
	},
	{
		id: uuidv4(),
		leaveType: 'Holiday',
		color: '#FFA500'
	},{
		id: uuidv4(),
		leaveType: 'Leave without pay',
		color: '#2b0047',
		isApproved:false
	}
];

export type Event = {
	id: string;
	reason: string;
	summary: string;
	leaveType: string;
	halfDay: boolean;
	fullDay: boolean;
	start: Date;
	end: Date;
	isApproved:boolean;
};

export type LeaveBalance = {
	[key: string]: number;
};

export const holidays = [
	{
		id: 'holiday1',
		reason: "New Year's Day",
		start: new Date(2024, 0, 1),
		end: new Date(2024, 0, 1),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday2',
		reason: 'Diwali',
		start: new Date(2024, 9, 31), // 31st October 2024
		end: new Date(2024, 9, 31),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday3',
		reason: 'Christmas Day',
		start: new Date(2024, 11, 25),
		end: new Date(2024, 11, 25),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday4',
		reason: 'Easter Sunday',
		start: new Date(2024, 2, 31), // 31st March 2024
		end: new Date(2024, 2, 31),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday5',
		reason: 'Independence Day',
		start: new Date(2024, 6, 4), // 4th July 2024
		end: new Date(2024, 6, 4),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday6',
		reason: 'Labor Day',
		start: new Date(2024, 8, 2), // 2nd September 2024
		end: new Date(2024, 8, 2),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday7',
		reason: 'Thanksgiving Day',
		start: new Date(2024, 10, 28), // 28th November 2024
		end: new Date(2024, 10, 28),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday8',
		reason: 'Memorial Day',
		start: new Date(2024, 4, 27), // 27th May 2024
		end: new Date(2024, 4, 27),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday9',
		reason: 'Republic Day',
		start: new Date(2024, 0, 26), // 26th January 2024
		end: new Date(2024, 0, 26),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday10',
		reason: 'Makar Sankranti',
		start: new Date(2024, 0, 14), // 14th January 2024
		end: new Date(2024, 0, 14),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	},
	{
		id: 'holiday11',
		reason: 'Holi',
		start: new Date(2024, 2, 25), // 25th March 2024
		end: new Date(2024, 2, 25),
		leaveType: 'Holiday',
		extendedProps: { isHoliday: true }
	}
];
