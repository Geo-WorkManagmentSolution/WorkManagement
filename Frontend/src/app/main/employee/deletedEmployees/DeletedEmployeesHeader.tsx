import React from 'react';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';

function DeletedEmployeesHeader() {
  return (
    <div className="flex grow-0 flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32">
      <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
      >
        <div>
          <PageBreadcrumb className="mb-8" />
          <Typography className="text-4xl font-extrabold leading-none tracking-tight">Past Employees</Typography>
        </div>
      </motion.span>
    </div>
  );
}

export default DeletedEmployeesHeader;
