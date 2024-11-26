import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';

const SettingsAppNavigation: FuseNavItemType = {
	id: 'apps.settings',
	title: 'Settings',
	type: 'collapse',
	icon: 'heroicons-outline:cog-6-tooth',
	url: '/apps/settings',
	children: [
		{
			id: 'apps.settings.account',
			icon: 'heroicons-outline:calendar-days',
			title: 'Leave Management Setting',
			type: 'collapse',
			// url: '/apps/settings/account',
			subtitle: 'Add or Remove Default Leave and Holidays',
			children: [
				{
					id: 'apps.settings.leave-management.default-leave',
                    title: 'Default Leave',
                    type: 'item',
                    url: '/apps/settings/leave-management/default-leave',
                    end: true
				},
				{
					id: 'apps.settings.leave-management.holidays',
					title: 'Holidays',
                    type: 'item',
                    url: '/apps/settings/leave-management/holidays',
                    end: true
				}]
		},
		
	]
};

export default SettingsAppNavigation;
