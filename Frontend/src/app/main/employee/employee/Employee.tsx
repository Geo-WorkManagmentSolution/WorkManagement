import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Typography } from '@mui/material';
import { Button } from '@mui/base';
import { Link, useParams } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseTabs from 'app/shared-components/tabs/FuseTabs';
import FuseTab from 'app/shared-components/tabs/FuseTab';
import FuseLoading from '@fuse/core/FuseLoading';
import { useAppSelector } from 'app/store/hooks';

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

const schema = yup.object().shape({
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
			.required('Date of Birth is required')
			.max(new Date(), 'Birth date cannot be in the future')
			.nullable()
			.test('is-adult', 'You must be at least 16 years old', (value) => {
				if (!value) return true;

				const today = new Date();
				const minAge = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
				return value <= minAge;
			})
	}),
	jobLevelLeaveType: yup.string().when('employeeWorkInformation.useDefaultLeaves', {
		is: true,
		then: (schema) => schema.required('Job Level must be selected when using default leaves'),
		otherwise: (schema) => schema.notRequired()
	}),
	employeeWorkInformation: yup.object().shape({
		salaryType: yup.string().required('Salary Type is required'),
		hireDate: yup.date().required('Hire Date is required'),
		salary: yup
			.number()
			.required('Salary is required')
			.typeError('Salary must be a number')
			.positive('Salary must be greater than zero'),
		useDefaultLeaves: yup.boolean().required(),
		basic: yup.number().when('salaryType', {
			is: (value) => value === 'OnRoll',
			then: () =>
				yup.number().required('Basic is required for OnRoll employees').min(0, 'Basic must be non-negative'),
			otherwise: () => yup.number().notRequired()
		}),
		hrAllowances: yup.number().when('salaryType', {
			is: (value) => value === 'OnRoll',
			then: () =>
				yup
					.number()
					.required('HR Allowances is required for OnRoll employees')
					.min(0, 'HR Allowances must be non-negative'),
			otherwise: () => yup.number().notRequired()
		}),
		gratuity: yup.number().when('salaryType', {
			is: (value) => value === 'OnRoll',
			then: () =>
				yup
					.number()
					.required('Gratuity is required for OnRoll employees')
					.min(0, 'Gratuity must be non-negative'),
			otherwise: () => yup.number().notRequired()
		}),
		pf: yup.number().when('salaryType', {
			is: (value) => value === 'OnRoll',
			then: () => yup.number().required('PF is required for OnRoll employees').min(0, 'PF must be non-negative'),
			otherwise: () => yup.number().notRequired()
		}),
		bonus: yup.number().min(0, 'Bonus must be non-negative').notRequired(),
		esi: yup.number().min(0, 'ESI must be non-negative'),
		pt: yup.number().min(0, 'PT must be non-negative'),
		employeeLeaves: yup.array().when('useDefaultLeaves', {
			is: false,
			then: (schema) =>
				schema
					.of(
						yup.object().shape({
							employeeLeaveType: yup.string().required('Leave type is required'),
							totalLeaves: yup
								.number()
								.required('Total leaves is required')
								.min(1, 'Total leaves must be at least 1')
						})
					)
					.min(1, 'At least one leave type must be selected')
					.test('unique-leave-types', 'Duplicate leave types are not allowed', function (value) {
						if (!value) return true;

						const seenTypes = new Set();
						return value.every((leave) => {
							if (seenTypes.has(leave.employeeLeaveType)) {
								return false;
							}

							seenTypes.add(leave.employeeLeaveType);
							return true;
						});
					}),
			otherwise: (schema) => schema.notRequired()
		})
	}),
	employeeDepartmentId: yup.string().required('Department is required'),
	employeeDesignationId: yup.string().required('Designation is required')
});

// The Employee page.
type EmployeeFormValues = yup.InferType<typeof schema>;

function Employee() {
	const user = useAppSelector((state) => state.user);
	const UserRole = user.role;

	const { employeeId } = useParams();
	const [tabValue, setTabValue] = useState('basic-info');

	const {
		data: Employee,
		isLoading,
		isError,
		refetch
	} = useGetApiEmployeesByIdQuery({ id: employeeId }, { skip: !employeeId || employeeId === 'new' });

	const methods = useForm<EmployeeFormValues>({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: useMemo(() => {
			if (employeeId === 'new') {
				return EmployeeModelClone({});
			}

			return Employee ? EmployeeModelClone(Employee) : {};
		}, [employeeId, Employee])
	});

	const handleTabChange = useCallback((event, newValue: string) => {
		setTabValue(newValue);
	}, []);
	useEffect(() => {
		if (employeeId && employeeId !== 'new') {
			refetch();
		}
	}, [employeeId, refetch]);

	React.useEffect(() => {
		if (Employee) {
			methods.reset(EmployeeModelClone(Employee));
		}
	}, [Employee, methods]);

	if (isLoading) {
		return <FuseLoading />;
	}

	if (isError && employeeId !== 'new') {
		return (
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
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<EmployeeHeader />}
				content={
					<div className="p-16 sm:p-24 space-y-24">
						<FuseTabs
							value={tabValue}
							scrollButtons
							onChange={handleTabChange}
						>
							<FuseTab
								value="basic-info"
								label="Employee Information"
							/>
							<FuseTab
								value="basic-personal-info"
								label="Personal Information"
							/>
							<FuseTab
								value="work-info"
								label="Work Information"
							/>
							<FuseTab
								value="address-info"
								label="Address"
							/>
							<FuseTab
								value="identity-info"
								label="Identity & Banking"
							/>
							<FuseTab
								value="insurance-info"
								label="Insurance Information"
							/>
							<FuseTab
								value="education-info"
								label="Education Information"
							/>
							<FuseTab
								value="document-upload"
								label="Document Uploads"
							/>
							<FuseTab
								value="team-member"
								label="Team Members"
							/>
						</FuseTabs>
						<TabContent
							tabValue={tabValue}
							UserRole={UserRole}
						/>
					</div>
				}
			/>
		</FormProvider>
	);
}

const TabContent = React.memo(({ tabValue, UserRole }) => {
	switch (tabValue) {
		case 'basic-info':
			return <BasicInfoTab UserRole={UserRole} />;
		case 'basic-personal-info':
			return <PersonalInfoTab UserRole={UserRole} />;
		case 'work-info':
			return <WorkInfoTab UserRole={UserRole} />;
		case 'address-info':
			return <AddressInfoTab UserRole={UserRole} />;
		case 'identity-info':
			return <IdentityInfoTab UserRole={UserRole} />;
		case 'insurance-info':
			return <InsuranceTab UserRole={UserRole} />;
		case 'education-info':
			return <EducationTab UserRole={UserRole} />;
		case 'document-upload':
			return <FileUpload UserRole={UserRole} />;
		case 'team-member':
			return <TeamTab UserRole={UserRole} />;
		default:
			return null;
	}
});

export default Employee;
