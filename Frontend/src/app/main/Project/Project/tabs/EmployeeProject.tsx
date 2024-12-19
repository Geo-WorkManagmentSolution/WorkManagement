import React, { useState, useEffect, useMemo } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  Alert,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { MRT_ColumnDef } from "material-react-table";
import DataTable from "app/shared-components/data-table/DataTable";
import { Link } from "react-router-dom";
import { useAppDispatch } from "app/store/hooks";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import {
  EmployeeTeamMemberList,
  useDeleteApiProjectByProjectIdEmployeesAndEmployeeIdMutation,
  useLazyGetApiProjectDepartmentEmployeesByDepartmentIdQuery,
  usePostApiProjectAssignMutation,
} from "../../ProjectApi";
import {
  useLazyGetApiEmployeesDepartmentsQuery,
  useGetApiProjectByProjectIdEmployeesQuery,
} from "../../../employee/EmployeeApi";

function EmployeeProject() {
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedDepartment, setSelectedDepartment] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [departments, setDepartments] = useState<
    { id: number; name: string }[]
  >([]);
  const [employees, setEmployees] = useState<
    { id: number; name: string; employeeNumber: number }[]
  >([]);

  const [getDepartments, { data: departmentsData }] =
    useLazyGetApiEmployeesDepartmentsQuery();
  const [getEmployees, { data: employeesData }] =
    useLazyGetApiProjectDepartmentEmployeesByDepartmentIdQuery();
  const [assignEmployee] = usePostApiProjectAssignMutation();
  const { data: projectEmployees, refetch: refetchProjectEmployees } =
    useGetApiProjectByProjectIdEmployeesQuery(
      { projectId: projectId },
      { skip: !projectId || projectId === "new" }
    );
  const [removeEmployee] =
    useDeleteApiProjectByProjectIdEmployeesAndEmployeeIdMutation();

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  useEffect(() => {
    if (departmentsData) {
      setDepartments(
        departmentsData.map((dept) => ({ id: dept.id, name: dept.name }))
      );
    }
  }, [departmentsData]);

  useEffect(() => {
    if (selectedDepartment) {
      getEmployees({
        departmentId: selectedDepartment.id,
        projectId: parseInt(projectId, 10),
      });
    } else {
      setEmployees([]);
      setSelectedEmployee(null);
    }
  }, [selectedDepartment, getEmployees]);

  useEffect(() => {
    if (employeesData) {
      setEmployees(
        employeesData.map((emp) => ({
          id: emp.id,
          name: `${emp.firstName} ${emp.lastName}`,
          employeeNumber: emp.employeeNumber,
        }))
      );
    }
  }, [employeesData]);

  const handleAddEmployee = async () => {
    if (selectedEmployee) {
      try {
        await assignEmployee({ projectId, employeeId: selectedEmployee.id });
        setSelectedDepartment(null);
        setSelectedEmployee(null);
        refetchProjectEmployees();
        dispatch(
          showMessage({
            message: "Employee Added Successfully",
            autoHideDuration: 6000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
            variant: "success",
          })
        );
      } catch (error) {
        console.error("Error assigning employee to project:", error);
        dispatch(
          showMessage({
            message: "Failed to add Employee to project",
            autoHideDuration: 6000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
            variant: "error",
          })
        );
      }
    }
  };
  const RemoveEmployee = async (id: number) => {
    try {
      await removeEmployee({
        projectId: parseInt(projectId, 10),
        employeeId: id,
      });
      refetchProjectEmployees();
      dispatch(
        showMessage({
          message: "Removed Employee Successfully",
          autoHideDuration: 6000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
          variant: "success",
        })
      );
    } catch (error) {
      console.error("Error removing employee from project:", error);
      dispatch(
        showMessage({
          message: "Failed to remove Employee from project",
          autoHideDuration: 6000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
          variant: "error",
        })
      );
    }
  };

  const columns = useMemo<MRT_ColumnDef<EmployeeTeamMemberList>[]>(
    () => [
      {
        accessorKey: "employeeNumber",
        header: "Employee Number",
        accessorFn: (row) => `${row.employeeNumber}`,
      },
      {
        accessorKey: "employeeName",
        header: "Employee Name",
        accessorFn: (row) => `${row.name}`,
      },
      {
        accessorKey: "email",
        header: "Email",
        accessorFn: (row) => `${row.email}`,
      },
      {
        accessorKey: "designation",
        header: "Designation",
        accessorFn: (row) => `${row.designation}`,
      },
    ],
    []
  );

  if (projectId === "new") {
    return (
      <Alert severity="info">
        Please Save Project Information to add employees To Project.
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex items-center border-b-1 space-x-8 pb-8 mb-16">
        <FuseSvgIcon color="action" size={24}>
          heroicons-outline:clipboard-document-check
        </FuseSvgIcon>
        <Typography className="text-2xl" color="text.secondary">
          Project Allocation
        </Typography>
      </div>
      <div className="flex ">
        <Autocomplete
          options={departments}
          getOptionLabel={(option) => option.name}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Department" />}
          value={selectedDepartment}
          onChange={(_, newValue) => setSelectedDepartment(newValue)}
          sx={{ mr: 2 }}
        />
        <Autocomplete
          options={employees}
          getOptionLabel={(option) =>
            `${option.employeeNumber} | ${option.name}`
          }
          fullWidth
          renderInput={(params) => <TextField {...params} label="Employee" />}
          value={selectedEmployee}
          onChange={(_, newValue) => setSelectedEmployee(newValue)}
          disabled={!selectedDepartment}
          sx={{ mr: 2 }}
        />
        <Button
          className="min-w-200 text-center"
          variant="contained"
          color="info"
          onClick={handleAddEmployee}
          disabled={!selectedEmployee}
          startIcon={<AddIcon />}
        >
          Add Employee
        </Button>
      </div>

      <div className="flex items-center border-b-1 space-x-8 pb-8 mt-16">
        <FuseSvgIcon color="action" size={24}>
          heroicons-outline:user-group
        </FuseSvgIcon>
        <Typography className="text-2xl" color="text.secondary">
          Allocated Employees
        </Typography>
      </div>
      <DataTable
        // enableRowActions={false}
        enableRowSelection={false}
        data={projectEmployees || []}
        columns={columns}
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          <MenuItem
            key={`${row.original.employeeId}`}
            onClick={() => {
              RemoveEmployee(row.original.employeeId);
              closeMenu();
              table.resetRowSelection();
            }}
          >
            {" "}
            <ListItemIcon>
              {" "}
              <FuseSvgIcon color="error">
                heroicons-outline:trash
              </FuseSvgIcon>{" "}
            </ListItemIcon>{" "}
            Remove Employee{" "}
          </MenuItem>,
        ]}
      />
    </div>
  );
}

export default EmployeeProject;
