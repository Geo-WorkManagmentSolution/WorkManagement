import GlobalStyles from '@mui/material/GlobalStyles';
import ProjectHeader from './ProjectsHeader';
import ProjectTable from './ProjectsTable';
/**
 * The products page. not
 */

function Projects() {
	return (
		<>
			<GlobalStyles
				styles={() => ({
					'#root': {
						maxHeight: '100vh'
					}
				})}
			/>
			<div className="w-full h-full flex flex-col px-16">
				<ProjectHeader />

				<ProjectTable />
			</div>
		


		</>
	);
}

export default Projects;
