import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import { useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

/**
 * The products header.
 */
function EmployessHeader({ handleSwitch }) {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [checked, setChecked] = useState(false);

	const handleChange = (event) => {
		handleSwitch(event.target.checked);
		setChecked(event.target.checked);
	};

	return (
		<div className="flex grow-0  flex-1 w-full items-center justify-between  space-y-8 sm:space-y-0 py-24 sm:py-32">
			<motion.span
				initial={{ x: -20 }}
				animate={{ x: 0, transition: { delay: 0.2 } }}
			>
				<div>
					<PageBreadcrumb className="mb-8" />
					<Typography className="text-4xl font-extrabold leading-none tracking-tight">Employees</Typography>
				</div>
			</motion.span>

			<div className="flex flex-1 items-center justify-end space-x-8">
				<motion.div
					className="flex flex-grow-0"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
				>
					<Button
						className=""
						variant="contained"
						color="secondary"
						component={NavLinkAdapter}
						to="/apps/employees/employeesSearch/new"
						size={isMobile ? 'small' : 'medium'}
					>
						<FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
						<span className="mx-4 sm:mx-8">Add</span>
					</Button>

					<FormControlLabel className='ml-4' control={<Switch
						checked={checked}
						onChange ={handleChange}
						inputProps={{ 'aria-label': 'controlled' }}
					/>} label="Advance Search" />

					
				</motion.div>
			</div>
		</div>
	);
}

export default EmployessHeader;
