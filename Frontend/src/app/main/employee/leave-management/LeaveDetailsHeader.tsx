import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Typography } from '@mui/material';
import PageBreadcrumb from 'app/shared-components/PageBreadcrumb';
import React from 'react';

function LeaveApprovalHeader() {
	return (
        <>
		<div className="flex items-center border-b-1 space-x-8">
			<FuseSvgIcon
				color="action"
				size={24}
			>
				heroicons-outline:user-circle
			</FuseSvgIcon>
			<Typography
				className="text-2xl"
				color="text.secondary"
			>
				Employee Leave History
			</Typography>

			
		</div>
        <PageBreadcrumb className="m-8" />
        </>
	);
}

export default LeaveApprovalHeader;