import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { useAppDispatch } from 'app/store/hooks';
import {
	ProjectModel,
	usePostApiProjectMutation,
	useDeleteApiProjectByIdMutation,
	usePutApiProjectByIdMutation
} from '../ProjectApi';

/**
 * The product header.
 */
function EmployeeHeader() {
	const routeParams = useParams();
	const { projectId } = routeParams;
	const dispatch = useAppDispatch();

	const [createProject] = usePostApiProjectMutation();
	const [updateProject] = usePutApiProjectByIdMutation();
	const [deleteProject] = useDeleteApiProjectByIdMutation();

	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { errors, dirtyFields, isValid } = formState;

	const navigate = useNavigate();

	const { projectName } = watch() as ProjectModel;

	function handleUpdateProduct() {
		updateProject({
			id: parseInt(projectId, 10),
			projectModel: getValues() as ProjectModel
		});
		dispatch(showMessage({ message: "A project updated successfully." }));

	}

	function handleCreateProject() {
		createProject({ projectModel: getValues() as ProjectModel })
			.unwrap()
			.then((data) => {
				dispatch(showMessage({ message: "A project created successfully." }));
				navigate(`/apps/projects/projectSearch`);
			});
	}

	function handleDeleteProject() {
		deleteProject({
			id: parseInt(projectId, 10)
		});
		dispatch(showMessage({ message: "A project deleted successfully." }));
		navigate(`/apps/projects/projectSearch`);

	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{
						x: 20,
						opacity: 0
					}}
					animate={{
						x: 0,
						opacity: 1,
						transition: { delay: 0.3 }
					}}
				>
					<PageBreadcrumb className="mb-8" />
				</motion.div>

				<div className="flex items-center max-w-full space-x-12">
					<motion.div
						className="flex flex-col min-w-0"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-15 sm:text-2xl truncate font-semibold">
							{ projectName || 'New Project'}
						</Typography>
						{/* <Typography
							variant="caption"
							className="font-medium">
							{ email || 'New email'}
						</Typography> */}
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex flex-1 w-full"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{projectId !== 'new' ? (
					<>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleDeleteProject}
							startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
						>
							Remove
						</Button>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							disabled={_.isEmpty(dirtyFields) || !isValid}
							onClick={handleUpdateProduct}
						>
							Save
						</Button>
					</>
				) : (
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							disabled={_.isEmpty(dirtyFields) || !isValid}
							onClick={handleCreateProject}
						>
							Add
						</Button>
				)}
			</motion.div>
		</div>
	);
}

export default EmployeeHeader;
