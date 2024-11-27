'use client';

import React, { useState, useCallback, useRef } from 'react';
import { TextField, CircularProgress, InputAdornment } from '@mui/material';
import { green, red } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetApiEmployeesCheckEmailExistsQuery } from '../EmployeeApi';
import FuseSvgIcon from '../../../../@fuse/core/FuseSvgIcon/FuseSvgIcon';

interface EmailCheckerInputProps {
	disabled?: boolean;
  }
  
  export default function EmailCheckerInput({ disabled = false }: EmailCheckerInputProps) {
	const { control, formState } = useFormContext();
	const { errors } = formState;

	const [debouncedEmail, setDebouncedEmail] = useState('');
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);

	const { data: emailExistsData, isFetching } = useGetApiEmployeesCheckEmailExistsQuery(
		{ email: debouncedEmail },
		{
			skip: !debouncedEmail
		}
	);

	// const {
	// 	control,
	// 	formState: { errors, isValid }
	// } = useForm<FormValues>({
	// 	defaultValues: {
	// 		email: ''
	// 	},
	// 	resolver: yupResolver(schema),
	// 	mode: 'onChange'
	// });

	const debouncedValidation = useCallback((value: string) => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		debounceTimer.current = setTimeout(() => {
			setDebouncedEmail(value);
		}, 2000);
	}, []);

	const getHelperText = (error?: string) => {
		if (error) return error;

		if (isFetching) return 'Checking email...';

		if (emailExistsData) return 'This email is already in use.';

		if (debouncedEmail) return 'This email is available.';

		return '';
	};

	const getInputColor = (error?: string) => {
		if (error) return 'error';

		if (emailExistsData) return 'error';

		if (debouncedEmail && !emailExistsData) return 'success';

		return 'primary';
	};

	const getEndAdornment = (error?: string) => {
		if (isFetching) {
			return (
				<CircularProgress
					color="inherit"
					size={20}
				/>
			);
		}

		if (debouncedEmail && !emailExistsData) {
			return <CheckCircleOutlineIcon sx={{ color: green[500] }} />;
		}

		if (error || emailExistsData) {
			return <ErrorOutlineIcon sx={{ color: red[500] }} />;
		}

		return null;
	};

	return (
		<Controller
			name="email"
			control={control}
			render={({ field }) => (
				<TextField
					{...field}
					fullWidth
					label="Email"
					variant="outlined"
					margin="normal"
					required
					disabled={disabled}
					placeholder='Email'
					error={!!errors.email || emailExistsData}
					helperText={getHelperText(errors.email?.message)}
					color={getInputColor(errors.email?.message)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">{getEndAdornment(errors.email?.message)}</InputAdornment>
						),
						startAdornment: (
							<InputAdornment position="start">
								<FuseSvgIcon size={20}>heroicons-solid:envelope</FuseSvgIcon>
							</InputAdornment>
						)
					}}
					sx={{
						'& .MuiFormHelperText-root': {
							color: !emailExistsData
								? green[700]
								: errors.email || emailExistsData
									? red[700]
									: 'inherit'
						}
					}}
					onChange={(e) => {
						const { value } = e.target;
						field.onChange(value);
						debouncedValidation(value);
					}}
				/>
			)}
		/>
	);
}
