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
        ProjectModule_Employee_Add = 11,
        ProjectModule_Employee_Delete= 12,
        ProjectModule_Employee_Update=13,
        ProjectModule_Link_Add = 14,
        ProjectModule_Link_Delete = 15,
        ProjectModule_Link_Update = 16,

        LeaveModule_Add = 17,
        LeaveModule_Delete = 18,
        LeaveModule_Update = 19,
        LeaveModule_Approvals = 20,
        LeaveModule_Employee_LeaveHistory = 21,

        SettingModule_DropDownSettings = 22,
        SettingModule_LeaveType_Add = 23,
        SettingModule_LeaveType_Update = 24,
        SettingModule_LeaveType_Delete = 25,
        SettingModule_Holidays_Add = 26,
        SettingModule_Holidays_Update = 27,
        SettingModule_Holidays_Delete = 28,

        IntegrationModule_UploadCSV = 29

    }

}
