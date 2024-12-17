import { Roles, PermissionData, Role } from './permissionTypes';

const STORAGE_KEY = 'permissions';

export const initialRoles: Roles = {
  admin: {
    EmployeeModule: { 
      "Add Employee": true, 
      "Employee Dashboard": true 
    },
    LeaveModule: { 
      "Add Leave": true, 
      "Leave Approval": true, 
      "Employee Leave History": true 
    },
    ProjectModule: { 
      "Add Project": true, 
      "Project Dashboard": true 
    },
  },
  employee: {
    EmployeeModule: { 
      "Add Employee": false, 
      "Employee Dashboard": true 
    },
    LeaveModule: { 
      "Add Leave": true, 
      "Leave Approval": false, 
      "Employee Leave History": true 
    },
    ProjectModule: { 
      "Add Project": false, 
      "Project Dashboard": true 
    },
  },
  manager: {
    EmployeeModule: { 
      "Add Employee": true, 
      "Employee Dashboard": true 
    },
    LeaveModule: { 
      "Add Leave": true, 
      "Leave Approval": true, 
      "Employee Leave History": true 
    },
    ProjectModule: { 
      "Add Project": true, 
      "Project Dashboard": true 
    },
  },
};

export const permissionApi = {
  getRoles: (): Promise<string[]> => {
    return new Promise((resolve) => {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData: PermissionData = JSON.parse(storedData);
        resolve(Object.keys(parsedData.roles));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ roles: initialRoles }));
        resolve(Object.keys(initialRoles));
      }
    });
  },

  getRolePermissions: (role: string): Promise<Role> => {
    return new Promise((resolve, reject) => {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData: PermissionData = JSON.parse(storedData);
        if (parsedData.roles[role]) {
          resolve(parsedData.roles[role]);
        } else {
          // If the role doesn't exist in stored data, use the initial role data
          if (initialRoles[role]) {
            resolve(initialRoles[role]);
          } else {
            reject(new Error(`Role ${role} not found`));
          }
        }
      } else {
        if (initialRoles[role]) {
          resolve(initialRoles[role]);
        } else {
          reject(new Error(`Role ${role} not found`));
        }
      }
    });
  },

  updatePermissions: (role: string, permissions: Role): Promise<void> => {
    return new Promise((resolve) => {
      const storedData = localStorage.getItem(STORAGE_KEY);
      let parsedData: PermissionData = storedData ? JSON.parse(storedData) : { roles: {} };
      parsedData.roles[role] = permissions;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
      resolve();
    });
  },

  // Add this new method to reset the local storage to initial values
  resetToInitialValues: (): Promise<void> => {
    return new Promise((resolve) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ roles: initialRoles }));
      resolve();
    });
  },
};

