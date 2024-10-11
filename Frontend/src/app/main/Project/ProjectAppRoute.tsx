import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';

const ProjectApp = lazy(() => import('./ProjectApp'));
const Projects = lazy(() => import('./Projects/Projects'));

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
				}
			]
		}
	]
};

export default ProjectAppRoute;
