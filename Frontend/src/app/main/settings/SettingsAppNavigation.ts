import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';

const SettingsAppNavigation: FuseNavItemType = {
	id: 'apps.settings',
	title: 'Settings',
	type: 'collapse',
	icon: 'heroicons-outline:cog-6-tooth',
	url: '/apps/settings',
	children: [
		{
			id: 'apps.settings.dropdown',
			icon: 'heroicons-outline:arrow-turn-left-down',
			title: 'Dropdown Setting',
			subtitle: 'Add , Remove or Update Dropdown Options.',
			type: 'item',
			url: '/apps/settings/dropdown'
		},
		{
			id: 'apps.settings.leave-management',
			icon: 'heroicons-outline:calendar-days',
			title: 'Leave Management',
			type: 'collapse',
			// url: '/apps/settings/account',
			subtitle: 'Add , Remove or Update Default Leaves and Holidays',
			children: [
				{
					id: 'apps.settings.leave-management.default-leave',
					title: 'Default Leave',
					type: 'item',
					url: '/apps/settings/default-leave',
					end: true
				},
				{
					id: 'apps.settings.leave-management.holidays',
					title: 'Holidays',
					type: 'item',
					url: '/apps/settings/holidays',
					end: true
				}
			]
		}
	]
};

export default SettingsAppNavigation;
