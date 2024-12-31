import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { FuseRouteItemType } from '@fuse/utils/FuseUtils';
import LeaveApplication from './leave-management/addleave/LeaveApplication';
import LeaveApprovalTable from './leave-management/approval/LeaveApprovalTable';
import EmployeeLeaveHistory from './leave-management/employeeLeaveHiistory/EmployeeLeaveHistory';
import EmployeeLeaveHistoryWithApproval from './leave-management/approval/EmployeeLeaveHistoryWithApproval';
import EmployeesLeaveHistories from './leave-management/employeeLeaveHiistory/EmployeesLeaveHistories';
import SalaryApprovalTable from './salary-managment/SalaryApprovalTable';
import SalaryEmployees from './salary-managment/SalaryEmployees';
import EmployeeSalaryHistory from './salary-managment/EmployeeSalaryHistory';
// import Employees from './employees/Employees';

const EmployeeApp = lazy(() => import('./EmployeeApp'));
// const Product = lazy(() => import('./product/Product'));
const Employees = lazy(() => import('./employees/Employees'));
const Employee = lazy(() => import('./employee/Employee'));

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

const EmployeeAppRoute: FuseRouteItemType = {
	path: 'apps/employees',
	element: <EmployeeApp />,
	children: [
		{
			path: '',
			element: <Navigate to="employeesSearch" />
		},
		{
			path: 'employeesSearch',
			children: [
				{
					path: '',
					element: <Employees />
				},
				{
					path: ':employeeId',
					element: <Employee />
				}
				
			]
		},
		{
			path:'salary-management',
			children:[

				{
					path: '',
					element:<SalaryApprovalTable />
				},
				{
                    path: 'salary-approval',
                    element: <SalaryApprovalTable />
                },
                {
                    path: 'salary-history',
					children:[
						{
                            path: '',
							element: <SalaryEmployees />
                        },
                        {
                            path: ':employeeId',
                            element: <EmployeeSalaryHistory />
                        }
					]
                  
                }
			]
		
			
		},
		{
			path: 'leave-management',
			children: [
				{
					path: 'addleave',
					element: <LeaveApplication />
				},
				{
					path: 'leave-approval',
					children: [
						{
							path: '',
							element: <LeaveApprovalTable />
						},
						{
							path: ':employeeId',
							element: <EmployeeLeaveHistoryWithApproval />
						}
					]
				},
				{
					path: 'leave-history',
					children: [
						{
							path: '',
							element: <EmployeesLeaveHistories />
						},
						{
							path: ':employeeId',
							element: <EmployeeLeaveHistory />
						}
					]
				}
			]
		}
	]
};

export default EmployeeAppRoute;
