import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { selectMainTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { motion } from 'framer-motion';
import { useAppDispatch } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { DatesSetArg } from '@fullcalendar/core';
import { useSelector } from 'react-redux';
import CalendarViewMenu from './CalendarViewMenu';

type CalendarHeaderProps = {
  currentDate: DatesSetArg;
  onAddEventClick: () => void;
  onViewChange: (viewType: string) => void;
};

function CalendarHeader(props: CalendarHeaderProps) {
  const { currentDate, onAddEventClick, onViewChange } = props;

  const mainTheme = useSelector(selectMainTheme);
  const dispatch = useAppDispatch();

  return (
    <div className="flex w-full p-12 justify-between z-10 container">
      <div className="flex items-center justify-between space-x-8">
        <div className="flex items-center space-x-8">
          <Typography className="hidden sm:flex text-2xl font-semibold tracking-tight whitespace-nowrap">
            {currentDate?.view.title}
          </Typography>
        </div>

        <div className="flex items-center space-x-8">
          <Tooltip title="Previous">
            <IconButton
              aria-label="Previous"
              className="border border-divider"
              size="small"
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
                >
                  <FuseSvgIcon size={16}>heroicons-outline:calendar</FuseSvgIcon>
                </IconButton>
              </motion.div>
            </div>
          </Tooltip>
        </div>
      </div>

      <motion.div
        className="flex items-center justify-end md:justify-center space-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
      >
        <IconButton
          className="border border-divider"
          size="small"
          aria-label="add"
          onClick={onAddEventClick}
        >
          <FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
        </IconButton>

        <CalendarViewMenu
          currentDate={currentDate}
          onChange={onViewChange}
        />
      </motion.div>
    </div>
  );
}

export default CalendarHeader;