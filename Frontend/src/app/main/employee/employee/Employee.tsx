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

/**
 * Form Validation Schema
 */

const employeePersonalDetailsSchema = yup.object({
	dateOfBirth: yup.date().required('Date of birth is required'),
	gender: yup.mixed().oneOf(['male', 'female', 'other'], 'Please select a gender').required('Please select a gender'),
	maritalStatus: yup
		.mixed()
		.oneOf(['single', 'married', 'divorced', 'widowed'], 'Please select a marital status')
		.required('Please select a marital status')
});

const employeeSchema = yup.object({
	photoURL: yup.string().nullable(),
	isActive: yup.boolean(),
	employeeNumber: yup.number().min(4,'Number must be 4 digit long atleast').required(),
	firstName: yup.string().min(1, 'First name is required').required(),
	lastName: yup.string().min(1, 'Last name is required').required(),
	email: yup.string().email('Invalid email address').required(),
	phoneNumber: yup.number().nullable(),
	position: yup.string().nullable(),
	role: yup.mixed().oneOf(['admin', 'user'], 'Required Role').required('Required Role'),
	employeePersonalDetails: employeePersonalDetailsSchema
});

// The product page.
type EmployeeFormValues = yup.InferType<typeof employeeSchema>;

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
		resolver: yupResolver(employeeSchema),
		defaultValues: {}
	});
	const { reset, watch } = methods;
	const form = watch();

	React.useEffect(() => {
		if (employeeId === 'new') {
			reset({ isActive: true });
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
					<div className="p-16 sm:p-24 max-w-3xl space-y-24">
						<FuseTabs
							value={tabValue}
							onChange={handleTabChange}
						>
							<FuseTab
								value="basic-info"
								label="Employee Info"
							/>
							<FuseTab
								value="basic-personal-info"
								label="Personal Info"
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
