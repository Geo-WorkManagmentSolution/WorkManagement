export interface EmployeeModuleActions {
  "Add Employee": boolean;
  "Employee Dashboard": boolean;
}

export interface LeaveModuleActions {
  "Add Leave": boolean;
  "Leave Approval": boolean;
  "Employee Leave History": boolean;
}

export interface ProjectModuleActions {
  "Add Project": boolean;
  "Project Dashboard": boolean;
}

export interface Role {
  EmployeeModule: EmployeeModuleActions;
  LeaveModule: LeaveModuleActions;
  ProjectModule: ProjectModuleActions;
}

export interface Roles {
  [key: string]: Role;
}

export interface PermissionData {
  roles: Roles;
}

