/* eslint-disable unused-imports/no-unused-vars */
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
	EmployeeModel,
	usePostApiEmployeesMutation,
	useDeleteApiEmployeesByIdMutation,
	usePutApiEmployeesByIdMutation
} from '../EmployeeApi';

/**
 * The product header.
 */
function EmployeeHeader() {
	const routeParams = useParams();
	const { employeeId } = routeParams;
	const dispatch = useAppDispatch();

	const [createEmployee] = usePostApiEmployeesMutation();
	const [updateEmployee] = usePutApiEmployeesByIdMutation();
	const [deleteEmployee] = useDeleteApiEmployeesByIdMutation();

	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { errors, dirtyFields, isValid } = formState;

	// const isValid = !Object.keys(errors).length;

	const navigate = useNavigate();

	const { photoURL, firstName, lastName } = watch() as EmployeeModel;

	function handleUpdateProduct() {
		updateEmployee({
			id: parseInt(employeeId, 10),
			employeeModel: getValues() as EmployeeModel
		});
		dispatch(showMessage({ message: 'An employee updated successfully.' }));
	}

	function handleCreateEmployee() {
		createEmployee({ employeeModel: getValues() as EmployeeModel })
			.unwrap()
			.then((data) => {
				dispatch(
					showMessage({ message: 'An employee created successfully and a welcome email sent to employee.' })
				);
				navigate(`/apps/employees/employeesSearch`);
			});
	}

	function handleDeleteEmployee() {
		deleteEmployee({
			id: parseInt(employeeId, 10)
		})
			.unwrap()
			.then((data) => {
				dispatch(showMessage({ message: 'An employee deleted successfully.' }));
				navigate('/apps/employees/employeesSearch');
			});
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
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{photoURL ? (
							<img
								className="w-32 sm:w-48 rounded"
								src={photoURL}
								alt="no image"
							/>
						) : (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt="no image"
							/>
						)}
					</motion.div>
					<motion.div
						className="flex flex-col min-w-0"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-15 sm:text-2xl truncate font-semibold">
							{firstName || 'New Employee'}
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
				{employeeId !== 'new' ? (
					<>
						<Button
							className="whitespace-nowrap mx-4"
							variant="contained"
							color="secondary"
							onClick={handleDeleteEmployee}
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
						onClick={handleCreateEmployee}
					>
						Add
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default EmployeeHeader;
