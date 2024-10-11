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

			<ProjectHeader />

			<ProjectTable />
		</>
	);
}

export default Projects;
