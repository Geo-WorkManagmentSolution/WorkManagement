import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseTabs from 'app/shared-components/tabs/FuseTabs';
import FuseTab from 'app/shared-components/tabs/FuseTab';
import FuseLoading from '@fuse/core/FuseLoading';
import EmployeeHeader from './EmployeeHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import PersonalInfoTab from './tabs/PersonalInfoTab';
import WorkInfoTab from './tabs/WorkInfoTab';
import AddressInfoTab from './tabs/AddressInfoTab';
import EducationTab from './tabs/EducationTab';
import InsuranceTab from './tabs/InsuranceTab';
import IdentityInfoTab from './tabs/IdentityInfoTab';
import FileUpload from './tabs/FileUpload';
import TeamTab from './tabs/TeamTab';
import { useGetApiEmployeesByIdQuery } from '../EmployeeApi';
import EmployeeModelClone from '../models/EmployeeModelClone';
import './Employee.css';
import { Typography } from '@mui/material';
import { Button } from '@mui/base';
import { Link } from 'react-router-dom';


const schema = yup.object({
	firstName: yup.string().required('First Name is required'),
	middleName: yup.string().required('Middle Name is required'),
	lastName: yup.string().required('Last Name is required'),
	email: yup.string().required('Email is required').email('Invalid email address'),
	employeeCategoryId: yup.mixed().required('Category is required'),
	roleId: yup.string().required('Employee role is required'),
	employeePersonalDetails: yup.object().shape({
		gender: yup.string().required('Gender is required'),
		dateOfBirth: yup
			.date()
			.max(new Date(), 'Birth date cannot be in the future')
			.nullable()
			.test('is-adult', 'You must be at least 16 years old', (value) => {
				const today = new Date();
				const eighteenYearsAgo = new Date(today);
				eighteenYearsAgo.setFullYear(today.getFullYear() - 16);

				if (value != undefined) {
					return value <= eighteenYearsAgo;
				}

				return true;
			})
	}),
	employeeWorkInformation: yup.object().shape({
		salaryType: yup.string().required('Salary Type is required'),
		hireDate: yup.date().required('Hire Date is required'),
		salary: yup
			.number()
			.required('Salary is required')
			.typeError('Salary must be a number')
			.positive('Salary must be greater than zero')
	}),
	employeeDepartmentId: yup.string().required('Department is required'),
	employeeDesignationId: yup.string().required('Designation is required')
});

// The product page.
type EmployeeFormValues = yup.InferType<typeof schema>;

function Employee() {
  const { employeeId } = useParams();
  const [tabValue, setTabValue] = useState('basic-info');

  const { data: Employee, isLoading, isError } = useGetApiEmployeesByIdQuery(
    { id: employeeId },
    { skip: !employeeId || employeeId === 'new' }
  );

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      if (employeeId === 'new') {
        return EmployeeModelClone({});
      }
      return Employee ? EmployeeModelClone(Employee) : {};
    }, [employeeId, Employee])
  });

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  React.useEffect(() => {
    if (Employee) {
      methods.reset(EmployeeModelClone(Employee));
    }
  }, [Employee, methods]);

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError && employeeId !== 'new') {
    return  (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.1 } }}
			className="flex flex-col flex-1 items-center justify-center h-full"
		>
			<Typography
				color="text.secondary"
				variant="h5"
			>
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
	);  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<EmployeeHeader />}
        content={
          <div className="p-16 sm:p-24 space-y-24">
            <FuseTabs value={tabValue} scrollButtons onChange={handleTabChange}>
              <FuseTab value="basic-info" label="Employee Information" />
              <FuseTab value="basic-personal-info" label="Personal Information" />
              <FuseTab value="work-info" label="Work Information" />
              <FuseTab value="address-info" label="Address" />
              <FuseTab value="identity-info" label="Identity & Banking" />
              <FuseTab value="insurance-info" label="Insurance Information" />
              <FuseTab value="education-info" label="Education Information" />
              <FuseTab value="document-upload" label="Document Uploads" />
              <FuseTab value="team-member" label="Team Members" />
            </FuseTabs>
            <TabContent tabValue={tabValue} />
          </div>
        }
      />
    </FormProvider>
  );
}

const TabContent = React.memo(({ tabValue }) => {
  switch (tabValue) {
    case 'basic-info':
      return <BasicInfoTab />;
    case 'basic-personal-info':
      return <PersonalInfoTab />;
    case 'work-info':
      return <WorkInfoTab />;
    case 'address-info':
      return <AddressInfoTab />;
    case 'identity-info':
      return <IdentityInfoTab />;
    case 'insurance-info':
      return <InsuranceTab />;
    case 'education-info':
      return <EducationTab />;
    case 'document-upload':
      return <FileUpload />;
    case 'team-member':
      return <TeamTab />;
    default:
      return null;
  }
});

export default Employee;

