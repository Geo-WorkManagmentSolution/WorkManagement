import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import DropDownForm from './tabs/DropDownForm';
import settingsConfig from 'app/configs/settingsConfig';

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
			path: 'dropdown',
			element:<DropDownForm/>
		}
	,
		{
			path: 'default-leave',
			element: <DefaultLeaveForm />
		},
		{
			path: 'holidays',
			element: <HolidayForm />
		}
	]
};

export default SettingsAppRoute;
