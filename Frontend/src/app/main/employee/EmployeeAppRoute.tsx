import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { FuseRouteItemType } from "@fuse/utils/FuseUtils";
import LeaveApplication from "./leave-management/leaveapplication/LeaveApplication";
// import Employees from './employees/Employees';

const EmployeeApp = lazy(() => import("./EmployeeApp"));
// const Product = lazy(() => import('./product/Product'));
const Employees = lazy(() => import("./employees/Employees"));
const Employee = lazy(() => import("./employee/Employee"));

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
  path: "apps/employees",
  element: <EmployeeApp />,
  children: [
    {
      path: "",
      element: <Navigate to="employeesSearch" />,
    },
    {
      path: "employeesSearch",
      children: [
        {
          path: "",
          element: <Employees />,
        },
        {
          path: ":employeeId",
          element: <Employee />,
        },
      ],
    },
    {
      path: "leave-management",
      element: <LeaveApplication />,
    },
  ],
};

export default EmployeeAppRoute;
