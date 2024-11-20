import i18next from "i18next";
import { FuseNavItemType } from "@fuse/core/FuseNavigation/types/FuseNavItemType";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
  {
    id: "applicationmanagement",
    title: "Employee Management",
    subtitle: "Manage your work management solution",
    type: "group",
    translate: "APPLICATIONS",
    children: [
      {
        id: "applicationmanagement.employees",
        title: "Employee",
        type: "collapse",
        icon: "heroicons-outline:user-group",
        children: [
          {
            id: "applicationmanagement.employees.search",
            title: "Employee Dashboard",
            type: "item",
            url: "/apps/employees",
            end: true,
          },
          {
            id: "applicationmanagement.employees.new",
            title: "Add Employee",
            type: "item",
            url: "/apps/employees/employeesSearch/new",
          },
          {
            id: "applicationmanagement.employees.leavemanagement",
            title: "Leave Management",
            type: "item",
            url: "/apps/employees/leave-management",
          },
          {
            id: "applicationmanagement.employees.leave-approval",
            title: "Leave Approval",
            type: "item",
            url: "/apps/employees/leave-approval",
          }
        ],
      },
      {
        id: "applicationmanagement.projects",
        title: "Project",
        type: "collapse",
        icon: "heroicons-outline:building-office",
        children: [
          {
            id: "applicationmanagement.projects.search",
            title: "Project Dashboard",
            type: "item",
            url: "/apps/projects",
            end: true,
          },
          {
            id: "applicationmanagement.projects.new",
            title: "Add Project",
            type: "item",
            url: "/apps/projects/projectSearch/new",
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
