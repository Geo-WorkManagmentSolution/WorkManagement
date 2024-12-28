import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import { Navigate } from 'react-router';
import { authRoles } from 'src/app/auth';
import DropDownForm from './tabs/DropDownForm';
import PermissionManager from './tabs/PermissionManager';

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
			path: 'permission-manager',
            element: <PermissionManager />
		},
		{
			path: 'dropdown',
			element: <DropDownForm />
		},
		{
			path: 'default-leave',
			element: <DefaultLeaveForm />
		},
		{
			path: 'holidays',
			element: <HolidayForm />
		},
		{
			path: '',
			element: <Navigate to="dropdown" />
		}
	]
};

export default SettingsAppRoute;
