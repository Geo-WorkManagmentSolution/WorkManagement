import i18next from 'i18next';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'employeemanagement',
		title: 'Employee Management',
		subtitle: 'Manage your employee management',
		type: 'group',
		translate: 'APPLICATIONS',
		children: [
			{
				id: 'employeemanagement.employees',
				title: 'Employee',
				type: 'collapse',
				icon: 'heroicons-outline:user-group',
				children: [
					{
						id: 'employeemanagement.employees.search',
						title: 'Employee Dashboard',
						type: 'item',
						url: '/apps/employees',
						end: true,
					},
					{
						id: 'employeemanagement.employees.new',
						title: 'Add Employee',
						type: 'item',
						url: '/apps/employees/employeesSearch/new'
					}
				]
			}
		]
	},
	{
		id: 'projectmanagement',
		title: 'Project Management',
		subtitle: 'Manage your project management',
		type: 'group',
		children: [
			{
				id: 'apps.project',
				title: 'Project',
				type: 'collapse',
				icon: 'heroicons-outline:building-office',
				children: [
					{
						id: 'apps.project.search',
						title: 'Project Dashboard',
						type: 'item',
						url: '/apps/projects'
					}
				]
			}
		]
	}
];

export default navigationConfig;