/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { SyntheticEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import * as React from "react";
import FuseTabs from "app/shared-components/tabs/FuseTabs";
import FuseTab from "app/shared-components/tabs/FuseTab";
import { parseInt } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EmployeeHeader from "./EmployeeHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import { useGetApiEmployeesByIdQuery } from "../EmployeeApi";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import WorkInfoTab from "./tabs/WorkInfoTab";
import AddressInfoTab from "./tabs/AddressInfoTab";
import EducationTab from "./tabs/EducationTab";
import InsuranceTab from "./tabs/InsuranceTab";
import IdentityInfoTab from "./tabs/IdentityInfoTab";
import FileUpload from "./tabs/FileUpload";
import EmployeeModelClone from "../models/EmployeeModelClone";
import TeamTab from "./tabs/TeamTab";
/**
 * Form Validation Schema
 */

// const employeePersonalDetailsSchema = yup.object({
// 	dateOfBirth: yup.date().required('Date of birth is required'),
// 	gender: yup.string().required('Please select a gender'),
// 	maritalStatus: yup.mixed().required('Please select a marital status')
// });

// const employeeSchema = yup.object({
// 	photoURL: yup.string().nullable(),
// 	firstName: yup.string().min(1, 'First name is required').required(),
// 	lastName: yup.string().min(1, 'Last name is required').required(),
// 	email: yup.string().email('Invalid email address').required('Email required'),
// 	phoneNumber: yup
// 		.number()
// 		.nullable()
// 		// .test('phonenumber_digit', 'Invalid phone number format', (value) => {
// 		// 	// Regular expression: allows letters, numbers, and underscores
// 		// 	const regex = /^\+[1-9]\d{1,14}$/;
// 		// 	return regex.test(value.toString());
// 		// }),
// 		,
// 	position: yup.string().min(1,'Position required'),
// 	roleId: yup.mixed().required('Role required'),
// 	employeePersonalDetails: employeePersonalDetailsSchema
// });

const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  middleName: yup.string().required("Middle Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  employeeCategoryId: yup.mixed().required("Category is required"),
  roleId: yup.string().required("Employee role is required"),
  employeePersonalDetails: yup.object().shape({
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup
      .date()
      .max(new Date(), "Birth date cannot be in the future")
      .nullable()
      .test("is-adult", "You must be at least 16 years old", (value) => {
        const today = new Date();
        const eighteenYearsAgo = new Date(today);
        eighteenYearsAgo.setFullYear(today.getFullYear() - 16);

        if (value != undefined) {
          return value <= eighteenYearsAgo;
        } else {
          return true;
        }
      }),
  }),
  employeeWorkInformation: yup.object().shape({
    salaryType: yup.string().required("Salary Type is required"),
    hireDate: yup.date().required("Hire Date is required"),
    salary: yup
      .number()
      .required("Salary is required")
      .typeError("Salary must be a number")
      .positive("Salary must be greater than zero"),
  }),
  // employeeEducationDetail: yup.array().of(educationDetailSchema),
  employeeDepartmentId: yup.string().required("Department is required"),
  employeeDesignationId: yup.string().required("Designation is required"),

  // employeeIdentityInfos: yup.object().shape({
  // 	uid: yup.string().nullable(),
  // 	bankAccountNumber: yup.string().nullable(),
  // 	bankName: yup.string().nullable(),
  // 	branch: yup.string().nullable(),
  // 	ifsc: yup.string().nullable(),
  // 	accountHolderName: yup.string().nullable(),
  // 	pan: yup.string().nullable(),
  // 	providentFundNumber: yup.string().nullable(),
  // 	employeeStateInsuranceNumber: yup.string().nullable(),
  // 	biometricCode: yup.string().nullable()
  // })
});

// The product page.
type EmployeeFormValues = yup.InferType<typeof schema>;

function Employee() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { employeeId } = routeParams as unknown;

  const {
    data: employee,
    isLoading,
    isError,
  } = useGetApiEmployeesByIdQuery(
    { id: employeeId },
    {
      skip: !employeeId || employeeId === "new",
    }
  );

  const [tabValue, setTabValue] = useState("basic-info");

  const methods = useForm<EmployeeFormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const { reset, watch } = methods;
  const form = watch();

  React.useEffect(() => {
    if (employeeId === "new") {
      reset(EmployeeModelClone({}));
    }
  }, [employeeId, reset]);

  React.useEffect(() => {
    if (employee) {
      reset({ ...employee });
    }
  }, [employee, reset]);

  /**
   * Tab Change
   */
  function handleTabChange(event: SyntheticEvent, value: string) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (isError && employeeId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such employee!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/e-commerce/products"
          color="inherit"
        >
          Go to Employee Search
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (employee &&
      parseInt(routeParams.employeeId) !== employee.id &&
      routeParams.employeeId !== "new")
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<EmployeeHeader />}
        content={
          <div className="p-16 sm:p-24 space-y-24">
            <FuseTabs value={tabValue} scrollButtons onChange={handleTabChange}>
              <FuseTab value="basic-info" label="Employee Information" />
              <FuseTab
                value="basic-personal-info"
                label="Personal Information"
              />
              <FuseTab value="work-info" label="Work Information" />
              <FuseTab value="address-info" label="Address" />
              <FuseTab value="identity-info" label="Identity & Banking" />
              <FuseTab value="insurance-info" label="Insurance Information" />
              <FuseTab value="education-info" label="Education Information" />
              <FuseTab value="document-upload" label="Document Uploads" />

              <FuseTab value="team-member" label="Team Members" />
            </FuseTabs>
            <div className="">
              <div className={tabValue !== "basic-info" ? "hidden" : ""}>
                <BasicInfoTab />
              </div>
              <div
                className={tabValue !== "basic-personal-info" ? "hidden" : ""}
              >
                <PersonalInfoTab />
              </div>
              <div className={tabValue !== "work-info" ? "hidden" : ""}>
                <WorkInfoTab />
              </div>
              <div className={tabValue !== "address-info" ? "hidden" : ""}>
                <AddressInfoTab />
              </div>
              <div className={tabValue !== "identity-info" ? "hidden" : ""}>
                <IdentityInfoTab />
              </div>
              <div className={tabValue !== "insurance-info" ? "hidden" : ""}>
                <InsuranceTab />
              </div>
              <div className={tabValue !== "education-info" ? "hidden" : ""}>
                <EducationTab />
              </div>
              <div className={tabValue !== "document-upload" ? "hidden" : ""}>
                <FileUpload />
              </div>
              <div className={tabValue !== "team-member" ? "hidden" : ""}>
                <TeamTab />
              </div>

              {/* 
							<div className={tabValue !== 'product-images' ? 'hidden' : ''}>
								<ProductImagesTab />
							</div>

							<div className={tabValue !== 'pricing' ? 'hidden' : ''}>
								<PricingTab />
							</div>

							<div className={tabValue !== 'inventory' ? 'hidden' : ''}>
								<InventoryTab />
							</div>

							<div className={tabValue !== 'shipping' ? 'hidden' : ''}>
								<ShippingTab />
							</div> */}
            </div>
          </div>
        }
      />
    </FormProvider>
  );
}

export default Employee;
