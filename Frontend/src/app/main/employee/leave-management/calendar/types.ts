// types.ts

export const leaveTypes = ['Vacation', 'Sick Leave', 'Personal Leave', 'Work From Home'] as const;

export type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  extendedProps: {
    reason: string;
    summary: string;
    leaveType: string;
    halfDay: boolean;
    fullDay: boolean;
  };
};
