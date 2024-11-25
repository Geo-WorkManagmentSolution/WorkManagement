import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const SettingsApp = lazy(() => import('./SettingsApp'));
const DefaultLeaveForm = lazy(() => import('./tabs/DefaultLeaveForm'));
const HolidayForm = lazy(() => import('./tabs/HolidayForm'));

/**
 * The Settings App Route.
 */
const SettingsAppRoute: FuseRouteItemType = {
	path: 'apps/settings',
	element: <SettingsApp />,
	children: [
		{
			path: 'leave-management/default-leave',
			element: <DefaultLeaveForm />
		},
		{
			path: 'leave-management/holidays',
			element: <HolidayForm />
		}
	]
};

export default SettingsAppRoute;
