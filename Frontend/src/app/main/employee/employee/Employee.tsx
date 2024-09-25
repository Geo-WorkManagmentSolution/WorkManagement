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
import * as yup from 'yup';
import FuseTabs from 'app/shared-components/tabs/FuseTabs';
import FuseTab from 'app/shared-components/tabs/FuseTab';
import { parseInt } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import EmployeeHeader from './EmployeeHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import { useGetApiEmployeesByIdQuery } from '../EmployeeApi';

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({
	id: yup.number().positive().integer(),
	photoURL: yup.string().url('Must be a valid URL'),
	isActive: yup.boolean(),
	employeeNumber: yup.number().positive().integer().nullable(),
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup.string().email('Must be a valid email').required('Email is required'),
	dateOfBirth: yup
		.date()
		.required('Date of birth is required')
		.max(new Date(), 'Date of birth cannot be in the future'),
	gender: yup.string().required('Gender is required'),
	maritalStatus: yup.string().required('Marital status is required')
});

/**
 * The product page.
 */
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

	const methods = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {
			id: 0,
			photoURL: '',
			isActive: false,
			employeeNumber: null,
			firstName: '',
			lastName: '',
			email: '',
			dateOfBirth: null,
			gender: '',
			maritalStatus: ''
		}
	});
	const { reset, watch } = methods;
	const form = watch();

	// useEffect(() => {
	// 	if (employeeId === 'new') {
	// 		reset({});
	// 	}
	// }, [employeeId, reset]);

	// useEffect(() => {
	// 	if (employee) {
	// 		reset({ ...employee });
	// 	}
	// }, [employee, reset]);

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
								label="Basic Employee Info"
							/>
							{/* <FuseTab
								value="product-images"
								label="Product Images"
							/> */}
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
