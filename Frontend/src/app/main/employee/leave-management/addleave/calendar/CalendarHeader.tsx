import React, { MutableRefObject } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { selectMainTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { DatesSetArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import { useSelector } from 'react-redux';
import CalendarViewMenu from './CalendarViewMenu';

type CalendarHeaderProps = {
	calendarRef: MutableRefObject<FullCalendar | null>;
	currentDate: DatesSetArg;
	onAddEventClick: () => void;
	onShowLeaveSelectorDetails: () => void;
	showLeaveSummury: () => void;
	showCalander: () => void;
};

function CalendarHeader(props: CalendarHeaderProps) {
	const { currentDate, onAddEventClick, calendarRef, onShowLeaveSelectorDetails,showCalander,showLeaveSummury } = props;
	const calendarApi = () => calendarRef.current.getApi();
	const mainTheme = useSelector(selectMainTheme);

	function handleViewChange(viewType: string) {
		calendarApi().changeView(viewType);
	}

	return (
		<div className="flex w-full p-12 justify-between z-10 container">
			<div className="flex items-center justify-between space-x-8">
				<div className="flex items-center space-x-8">
					<Typography className=" sm:flex text-2xl font-semibold tracking-tight whitespace-nowrap">
						{currentDate?.view.title}
					</Typography>
				</div>

				<div className="flex items-center space-x-8">
					<Tooltip title="Previous">
						<IconButton
							aria-label="Previous"
							className="border border-divider"
							size="small"
							
							onClick={() => calendarApi().prev()}
						>
							<FuseSvgIcon size={16}>
								{mainTheme.direction === 'ltr'
									? 'heroicons-solid:chevron-left'
									: 'heroicons-solid:chevron-right'}
							</FuseSvgIcon>
						</IconButton>
					</Tooltip>
					<Tooltip title="Next">
						<IconButton
							aria-label="Next"
							className="border border-divider"
							size="small"
							onClick={() => calendarApi().next()}
						>
							<FuseSvgIcon size={16}>
								{mainTheme.direction === 'ltr'
									? 'heroicons-solid:chevron-right'
									: 'heroicons-solid:chevron-left'}
							</FuseSvgIcon>
						</IconButton>
					</Tooltip>

					<Tooltip title="Today">
						<div>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1, transition: { delay: 0.3 } }}
							>
								<IconButton
									aria-label="today"
									className="border border-divider"
									size="small"
									color="info"
									onClick={() => calendarApi().today()}
								>
									<FuseSvgIcon size={16}>heroicons-outline:calendar</FuseSvgIcon>
								</IconButton>
							</motion.div>
						</div>
					</Tooltip>
				</div>
			</div>

			<div>
				<ButtonGroup>
				<Tooltip title="Leave summary">

					<Button
						variant="outlined"
						color="info"
						onClick={showLeaveSummury}
					>
						<FuseSvgIcon size={20}>heroicons-solid:queue-list</FuseSvgIcon>
					</Button>
					</Tooltip>
					<Tooltip title="Calander View">

					<Button
						variant="outlined"
						color="info"
						onClick={showCalander}
					>
						<FuseSvgIcon size={20}>heroicons-solid:calendar-days</FuseSvgIcon>
					</Button>
					</Tooltip>
				</ButtonGroup>
			</div>

			<motion.div
				className="flex items-center justify-end md:justify-center space-x-8"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.3 } }}
			>
				{/* <IconButton
					className="border border-divider"
					size="small"
					aria-label="checkbox"
					onClick={onShowLeaveSelectorDetails}
				>
					<FuseSvgIcon>heroicons-outline:tag</FuseSvgIcon>
				</IconButton> */}
				<Button
					className="border border-divider"
					variant="contained"
						color="info"
						size="small"
						aria-label="checkbox"
						onClick={onShowLeaveSelectorDetails}
						>
					<FuseSvgIcon>heroicons-outline:tag</FuseSvgIcon>
					<span className="mx-4 sm:mx-8">Available Leaves</span>
					</Button>

				<Button
					className="border border-divider"
					variant="contained"
						color="primary"
						size="small"
						onClick={onAddEventClick}
					>
					<FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
							<span className="mx-4 sm:mx-8">AddLeave</span>
					</Button>

				<CalendarViewMenu
					currentDate={currentDate}
					onChange={handleViewChange}
				/>
			</motion.div>
		</div>
	);
}

export default CalendarHeader;
