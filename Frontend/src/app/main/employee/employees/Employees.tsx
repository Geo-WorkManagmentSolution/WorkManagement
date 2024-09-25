import GlobalStyles from '@mui/material/GlobalStyles';
import EmployeesHeader from './EmployeesHeader';
import EmployeesTable from './EmployeesTable';

/**
 * The products page. not
 */
function Employees() {
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
				<EmployeesHeader />
				
				<EmployeesTable />
			</div>
		</>
	);
}

export default Employees;
