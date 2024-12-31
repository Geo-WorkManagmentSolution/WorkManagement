import i18next from 'i18next';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from '../auth';
import { PermissionActionEnum } from '../main/settings/PermissionsApi';


i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [

	{
		id: 'applicationmanagement',
		title: 'Employee Management',
		subtitle: 'Manage your work management solution',
		type: 'group',
		translate: 'APPLICATIONS',
		children: [
			{
				id: 'applicationmanagement.employees',
				title: 'Employee',
				type: 'collapse',
				icon: 'heroicons-outline:user-group',
				children: [
					{
						id: 'applicationmanagement.employees.search',
						title: 'Employee Dashboard',
						type: 'item',
						url: '/apps/employees',
						// auth:authRoles.HRAdmin,
						// hasPermission:false,
						// end: true
					},
					{
						id: 'applicationmanagement.employees.new',
						title: 'Add Employee',
						type: 'item',
						// auth:PermissionActionEnum.EmployeeModuleAdd,
						url: '/apps/employees/employeesSearch/new'
					},
					{
						id: 'applicationmanagement.employees.salarymanagment',
						title: 'Salary Management',
						type: 'collapse',
						children:[
							{
								id: 'applicationmanagement.employees.salaryApproval',
								title: 'Salary Approval',
								type: 'item',
								url: '/apps/employees/salary-management/salary-approval',
							},
							{
								id: 'applicationmanagement.employees.salaryHistory',
								title: 'Salary History',
								type: 'item',
								url: '/apps/employees/salary-management/salary-history',
							}
						]
						
					},
					{
						id: 'applicationmanagement.employees.leavemanagement',
						title: 'Leave Management',
						type: 'collapse',
						children: [
							{
								id: 'applicationmanagement.employees.leave-management.add-leave',
								title: 'Add Leave',
								type: 'item',
								// auth:PermissionActionEnum.LeaveModuleAdd,
								url: '/apps/employees/leave-management/addleave',
								end: true
							},
							{
								id: 'applicationmanagement.employees.leave-management.leave-approval',
								title: 'Leave Approval',
								type: 'item',
								// auth:PermissionActionEnum.LeaveModuleApprovals,
								url: '/apps/employees/leave-management/leave-approval'
							},
							{
								id: 'applicationmanagement.employees.leave-management.leave-history',
                                title: 'Leave History',
                                type: 'item',
								// auth:PermissionActionEnum.LeaveModuleEmployeeLeaveHistory ,
                                url: '/apps/employees/leave-management/leave-history'
							}
						]
					}
				]
			},
			// {
			// 	id: 'divider-1',
			// 	type: 'divider'
			// },
			{
				id: 'applicationmanagement.projects',
				title: 'Project',
				type: 'collapse',
				icon: 'heroicons-outline:building-office',
				children: [
					{
						id: 'applicationmanagement.projects.search',
						title: 'Project Dashboard',
						type: 'item',
						// auth:PermissionActionEnum.ProjectModuleDashboard,
						url: '/apps/projects',
						end: true
					},
					{
						id: 'applicationmanagement.projects.new',
						title: 'Add Project',
						type: 'item',
						// auth:PermissionActionEnum.ProjectModuleAdd,
						url: '/apps/projects/projectSearch/new'
					}
				]
			},
			{
				id: 'applicationmanagement.settings',
				title: 'Settings',
				type: 'item',
				auth:authRoles.HRAdmin,
				icon: 'heroicons-outline:cog-8-tooth',
				url: '/apps/settings'
			}
		]
	}
];

export default navigationConfig;
