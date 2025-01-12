import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { Button } from '@mui/base';
import { Link, useParams } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseTabs from 'app/shared-components/tabs/FuseTabs';
import FuseTab from 'app/shared-components/tabs/FuseTab';
import FuseLoading from '@fuse/core/FuseLoading';
import { useAppSelector } from 'app/store/hooks';

import BasicInfoTab from './deletedEmployeeTabs/BasicInfoTab';
import PersonalInfoTab from './deletedEmployeeTabs/PersonalInfoTab';
import WorkInfoTab from './deletedEmployeeTabs/WorkInfoTab';
import AddressInfoTab from './deletedEmployeeTabs/AddressInfoTab';
import EducationTab from './deletedEmployeeTabs/EducationTab';
import InsuranceTab from './deletedEmployeeTabs/InsuranceTab';
import IdentityInfoTab from './deletedEmployeeTabs/IdentityInfoTab';
import FileUpload from './deletedEmployeeTabs/FileUpload';
import TeamTab from './deletedEmployeeTabs/TeamTab';
import EmployeeModelClone from '../../models/EmployeeModelClone';
// import './Employee.css';
import { useGetApiEmployeesDeletedEmployeeByEmployeeIdQuery } from '../../EmployeeApi';
import DeletedEmployeeHeader from './DeletedEmployeeHeader';





// The Employee page.

function DeletedEmployee() {
	const user = useAppSelector((state) => state.user);
	const UserRole = user.role;

	const { employeeId } = useParams();
	const [tabValue, setTabValue] = useState('basic-info');
	console.log();
	
	const {
		data: Employee,
		isLoading,
		isError,
		refetch
	} = useGetApiEmployeesDeletedEmployeeByEmployeeIdQuery({ employeeId });

	const methods = useForm({
		mode: 'onChange',
		defaultValues: useMemo(() => {
			return Employee ? EmployeeModelClone(Employee) : {};
		}, [employeeId, Employee])
	});	




	const handleTabChange = useCallback((event, newValue: string) => {
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
				header={<DeletedEmployeeHeader />}
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

export default DeletedEmployee;

