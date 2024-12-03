import GlobalStyles from '@mui/material/GlobalStyles';
import AdvanceSearchCriteria, { convertModelToList } from 'app/shared-components/AdvanceSearchCriteria';
import { useState } from 'react';
import { useAppSelector } from 'app/store/hooks';
import EmployeesHeader from './EmployeesHeader';
import EmployeesTable from './EmployeesTable';
import { EmployeeModel, Criterion, usePostApiEmployeesSearchMutation } from '../EmployeeApi';
import EmployeeModelClone from '../models/EmployeeModelClone';


/**
 * The products page. not
 */

function Employees() {
	const user= useAppSelector((state)=>state.user);
 	 const UserRole=user.role;
  	console.log("role is " ,UserRole);
	const [SearchEmployee] = usePostApiEmployeesSearchMutation();
	const [toggleAdvanceSearch, settoggleAdvanceSearch] = useState(false);
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
				<EmployeesHeader handleSwitch={(e) => settoggleAdvanceSearch(e)} />
				{toggleAdvanceSearch && (
					<AdvanceSearchCriteria
						onSubmit={(json) => SearchEmployee({ body: json as Criterion[] })}
						fields={convertModelToList<EmployeeModel>(EmployeeModelClone({}))}
					/>
				)}
				<EmployeesTable />
			</div>
		</>
	);
}

export default Employees;
