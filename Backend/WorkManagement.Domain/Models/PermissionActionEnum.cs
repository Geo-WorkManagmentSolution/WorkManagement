namespace WorkManagement.Domain.Entity
{
    public enum PermissionActionEnum
    {
        EmployeeModule_Add = 1,
        EmployeeModule_Update = 2,
        EmployeeModule_Delete = 3,
        EmployeeModule_Salary_Update = 4,
        EmployeeModule_Leave_Update = 5,
        EmployeeModule_Dashboard = 6,

        ProjectModule_Add = 7,
        ProjectModule_Update = 8,
        ProjectModule_Delete = 9,
        ProjectModule_Dashboard = 10,

        LeaveModule_Add = 17,
        LeaveModule_Delete = 18,
        LeaveModule_Update = 19,
        LeaveModule_Approvals = 20,
        LeaveModule_Employee_LeaveHistory = 21,

        SettingModule_DropDownSettings_Update = 22,
        SettingModule_DefaultLeaves_Update = 23,
        SettingModule_Holidays_Update = 27,

        IntegrationModule_UploadCSV = 29,
        EmployeeModule_View = 30,
        EmployeeModule_Salary_History_View = 31,
        EmployeeModule_Salary_Approve_Reject = 32,
        ProjectModule_View = 33,
        ProjectModule_Task = 34,
        ProjectModule_Employee = 35,
    }

}
