import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import Project from './Project/Project';

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
				},
				{
					path: ':projectId',
					element: <Project />
				}
			]
		}
	]
};

export default ProjectAppRoute;
