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
import EmployeeHeader from './ProjectHeader';
import BasicProjectInfoTab from './tabs/BasicProjectInfoTab';
import { useGetApiProjectByIdQuery } from '../ProjectApi';
import WorkOrderDocuments from './tabs/WorkOrderDocuments';

const projectSchema = yup.object({
	projectName: yup.string().min(1, 'Project name is required').required(),
	projectNumber: yup.string().nullable(),
	projectDescription: yup.string().nullable(),
	startDate: yup.date().required('Start Date is required'),
	endDate: yup .date().nullable()
	.when('startDate', (startDate, schema) => { return startDate && schema.min(startDate, 'End Date must be later than Start Date'); }),
	// workOrderNumber:yup.string().min(1, 'Work Order Number is required').required(),
});

// The product page.
type ProjectFormValues = yup.InferType<typeof projectSchema>;

function Project() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { projectId } = routeParams as unknown;

	const {
		data: project,
		isLoading,
		isError
	} = useGetApiProjectByIdQuery(
		{ id: projectId },
		{
			skip: !projectId || projectId === 'new'
		}
	);

	const [tabValue, setTabValue] = useState('basic-project-info');

	const methods = useForm<ProjectFormValues>({
		mode: 'onChange',
		resolver: yupResolver(projectSchema),
		defaultValues: {}
	});
	const { reset, watch } = methods;
	const form = watch();

	React.useEffect(() => {
		if (projectId === 'new') {
			reset({ isActive: true });
		}
	}, [projectId, reset]);

	React.useEffect(() => {
		if (project) {
			reset({ ...project });
		}
	}, [project, reset]);

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
	if (isError && projectId !== 'new') {
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
					There is no such project!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/projects/projectSearch"
					color="inherit"
				>
					Go to Project Search
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while product data is loading and form is setted
	 */
	if (
		_.isEmpty(form) ||
		(project && parseInt(routeParams.projectId) !== project.id && routeParams.projectId !== 'new')
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
								value="basic-project-info"
								label="Project Info"
							/>
							<FuseTab
								value="work-order-documents"
								label="Work Order Documents"
							/>
						</FuseTabs>
						<div className="">
							<div className={tabValue !== 'basic-project-info' ? 'hidden' : ''}>
								<BasicProjectInfoTab />
							</div>
							<div className={tabValue !== 'work-order-documents' ? 'hidden': ''}>
								<WorkOrderDocuments />
							</div>
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Project;
