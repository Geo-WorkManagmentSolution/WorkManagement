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
import { FileType, useGetApiEmployeesByIdQuery } from '../EmployeeApi';
import PersonalInfoTab from './tabs/PersonalInfoTab';
import WorkInfoTab from './tabs/WorkInfoTab';
import AddressInfoTab from './tabs/AddressInfoTab';
import EducationTab from './tabs/EducationTab';
import InsuranceTab from './tabs/InsuranceTab';
import IdentityInfoTab from './tabs/IdentityInfoTab';
import FileUpload from './tabs/FileUpload';
import EmployeeModelClone from '../models/EmployeeModelClone';
import TeamTab from './tabs/TeamTab';
import './Employee.css';



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
	employeeDesignationId: yup.string().required('Designation is required'),
	
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
		defaultValues: {
	}});
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
							<div className={tabValue !== 'insurance-info' ? 'hidden' : ''}>
								<InsuranceTab />
							</div>
							<div className={tabValue !== 'education-info' ? 'hidden' : ''}>
								<EducationTab />
							</div>
							<div className={tabValue !== 'document-upload' ? 'hidden' : ''}>
								<FileUpload />
							</div>
							<div className={tabValue !== 'team-member' ? 'hidden' : ''}>
								<TeamTab />
							</div>
						</div>
					</div>
				}
			/>
		</FormProvider>
	);
}

export default Employee;
