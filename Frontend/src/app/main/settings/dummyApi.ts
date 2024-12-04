export interface JobLevel {
  id: number;
  name: string;
}

export interface LeaveType {
  id: number;
  jobLevelId: number;
  employeeLeaveType: string;
  totalLeaves: number;
}

export const jobLevels: JobLevel[] = [
  { id: 1, name: 'Junior Staff' },
  { id: 2, name: 'Mid-Level' },
  { id: 3, name: 'Senior Level' },
];

export const leaveTypes: LeaveType[] = [
  { id: 1, jobLevelId: 1, employeeLeaveType: 'Annual Leave', totalLeaves: 14 },
  { id: 2, jobLevelId: 1, employeeLeaveType: 'Sick Leave', totalLeaves: 7 },
  { id: 3, jobLevelId: 2, employeeLeaveType: 'Annual Leave', totalLeaves: 21 },
  { id: 4, jobLevelId: 2, employeeLeaveType: 'Sick Leave', totalLeaves: 10 },
  { id: 5, jobLevelId: 2, employeeLeaveType: 'Personal Leave', totalLeaves: 3 },
  { id: 6, jobLevelId: 3, employeeLeaveType: 'Annual Leave', totalLeaves: 28 },
  { id: 7, jobLevelId: 3, employeeLeaveType: 'Sick Leave', totalLeaves: 14 },
  { id: 8, jobLevelId: 3, employeeLeaveType: 'Personal Leave', totalLeaves: 5 },
  { id: 9, jobLevelId: 3, employeeLeaveType: 'Professional Development Leave', totalLeaves: 5 },
];

export const getJobLevels = (): Promise<JobLevel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobLevels), 500);
  });
};

export const getLeaveTypes = (jobLevelId: number): Promise<LeaveType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredLeaveTypes = leaveTypes.filter((lt) => lt.jobLevelId === jobLevelId);
      resolve(filteredLeaveTypes);
    }, 500);
  });
};
export const updateLeaveTypes = (jobLevelId: number, leaveTypes: Omit<LeaveType, 'id'>[]): Promise<LeaveType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobLevel = jobLevels.find((jl) => jl.id === jobLevelId);
      if (jobLevel) {
        jobLevel.leaveTypes = leaveTypes.map((lt, index) => ({ ...lt, id: index + 1 }));
      }
      resolve(jobLevel ? jobLevel.leaveTypes : []);
    }, 500);
  });
};
