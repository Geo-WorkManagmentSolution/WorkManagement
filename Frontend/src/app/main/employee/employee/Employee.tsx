/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SyntheticEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import * as React from 'react';
import FuseTabs from 'app/shared-components/tabs/FuseTabs';
import FuseTab from 'app/shared-components/tabs/FuseTab';
import { parseInt } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import EmployeeHeader from './EmployeeHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import { useGetApiEmployeesByIdQuery } from '../EmployeeApi';
import PersonalInfoTab from './tabs/PersonalInfoTab';
import WorkInfoTab from './tabs/WorkInfoTab';
import AddressInfoTab from './tabs/AddressInfoTab';
import EducationTab from './tabs/EducationTab';
import IdentityInfoTab from './tabs/IdentityInfoTab';
 import FileUpload from './tabs/FileUpload';
import EmployeeModelClone from '../models/EmployeeModelClone';

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
	photoURL: yup.string().nullable(),
	firstName: yup.string().required('First Name is required'),
	lastName: yup.string().required('Last Name is required'),
	surname: yup.string().required('Surname is required'),
	motherName: yup.string().required('Mother Name is required'),
	email: yup.string().email('Must be a valid email').required('Email is required'),
	phoneNumber: yup.number().nullable().typeError('Must be a number'),
	alternateNumber: yup.number().nullable().typeError('Must be a number'),
	position: yup.string().required('Position is required'),
	userId: yup.string().required('User ID is required'),
	roleId: yup.string().required('Role ID is required'),
	employeeCategoryId: yup.number().nullable(),
	departmentName: yup.string().nullable(),
	employeePersonalDetails: yup.object().shape({
		dateOfBirth: yup.date().required('Date of Birth is required'),
		gender: yup.string().required('Gender is required'),
		maritalStatus: yup.string().required('Marital Status is required'),
		bloodGroup: yup.string().nullable(),
		relationWithEmployee: yup.string().nullable()
	}),
	employeeDepartments: yup.object().shape({
		departmentName: yup.string().required('Department Name is required')
	}),
	employeeWorkInformation: yup.object().shape({
		designation: yup.string(),
		salaryType: yup.string().required('Salary Type is required'),
		hireDate: yup.date().required('Hire Date is required'),
		salary: yup.number().required('Salary is required').positive('Salary must be positive'),
		site: yup.string(),
		bond: yup.number().nullable().positive('Bond must be positive'),
		previousDateOfJoiningInGDR: yup.date().nullable(),
		previousDateOfLeavingInGDR: yup.date().nullable(),
		grpHead: yup.string()
	}),
	employeeAddresses: yup.object().shape({
		addressLine1: yup.string().required('Address Line 1 is required'),
		addressLine2: yup.string(),
		city: yup.string().required('City is required'),
		country: yup.string().required('Country is required'),
		state: yup.string().required('State is required'),
		pinCode: yup.string().required('Pin Code is required')
	}),
	employeeIdentityInfos: yup.object().shape({
		uid: yup.string(),
		bankAccountNumber: yup.string(),
		bankName: yup.string(),
		branch: yup.string(),
		ifsc: yup.string(),
		accountHolderName: yup.string(),
		pan: yup.string(),
		providentFundNumber: yup.string(),
		employeeStateInsuranceNumber: yup.string(),
		biometricCode: yup.string()
	}),
	employeeEducations: yup.object().shape({
	
	})
});

// The product page.
 type EmployeeFormValues = yup.InferType<typeof schema>;

function Employee() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { employeeId } = routeParams as unknown;

	const {
		data: employee,
		isLoading,
		isError
	} = useGetApiEmployeesByIdQuery(
		{ id: employeeId },
		{
			skip: !employeeId || employeeId === 'new'
		}
	);

	const [tabValue, setTabValue] = useState('basic-info');

	const methods = useForm<EmployeeFormValues>({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {}
	});
	const { reset, watch } = methods;
	const form = watch();

	React.useEffect(() => {
		if (employeeId === 'new') {
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

	/**
	 * Wait while product data is loading and form is setted
	 */
	if (
		_.isEmpty(form) ||
		(employee && parseInt(routeParams.employeeId) !== employee.id && routeParams.employeeId !== 'new')
	) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<EmployeeHeader />}
				content={
					<div className="p-16 sm:p-24 space-y-24">
						<FuseTabs
							value={tabValue}
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
								value="education-info"
								label="Education Information"
							/>
							<FuseTab
								value="document-upload"
								label="Document Uploads"
							/>

							{/* <FuseTab
								value="pricing"
								label="Pricing"
							/>
							<FuseTab
								value="inventory"
								label="Inventory"
							/>
							<FuseTab
								value="shipping"
								label="Shipping"
							/> */}
						</FuseTabs>
						<div className="">
							<div className={tabValue !== 'basic-info' ? 'hidden' : ''}>
								<BasicInfoTab />
							</div>
							<div className={tabValue !== 'basic-personal-info' ? 'hidden' : ''}>
								<PersonalInfoTab />
							</div>
							<div className={tabValue !== 'work-info' ? 'hidden' : ''}>
								<WorkInfoTab />
							</div>
							<div className={tabValue !== 'address-info' ? 'hidden' : ''}>
								<AddressInfoTab />
							</div>
							<div className={tabValue !== 'identity-info' ? 'hidden' : ''}>
								<IdentityInfoTab />
							</div>
							<div className={tabValue !== 'education-info' ? 'hidden' : ''}>
								<EducationTab />
							</div>
							<div className={tabValue !== 'document-upload' ? 'hidden' : ''}>
								<FileUpload />
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
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Employee;