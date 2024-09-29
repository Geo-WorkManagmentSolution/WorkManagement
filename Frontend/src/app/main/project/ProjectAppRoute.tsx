import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
// import Employees from './employees/Employees';

const ProjectApp = lazy(() => import('./ProjectApp'));
// const Product = lazy(() => import('./product/Product'));
const Projects = lazy(() => import('./projects/Projects'));

// const Order = lazy(() => import('./order/Order'));
// const Orders = lazy(() => import('./orders/Orders'));

/**
 * The E-Commerce app Routes.
 */
// const EmployeeAppRoute: FuseRouteItemType = {
// 	path: 'apps/employees',
// 	element: <EmployeeApp />,
// 	children: [
// 		{
// 			path: '',
// 			element: <Navigate to="employees" />
// 		}
// 	]
// };

const ProjectAppRoute: FuseRouteItemType = {
	path: 'apps/projects',
	element: <ProjectApp />,
	children: [
		{
			path: '',
			element: <Navigate to="projectSearch" />
		},
		{
			path: 'projectSearch',
			children: [
				{
					path: '',
					element: <Projects />
				},
			]
		},
	]
};


export default ProjectAppRoute;
