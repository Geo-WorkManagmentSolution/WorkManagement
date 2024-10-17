import Button from '@mui/material/Button';
import { Grid, TextField, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

// type EducationEntry = {
// 	type: string;
// 	university: string;
// 	passingYear: string;
// 	grade: string;
// };

// type FormData = {
// 	employeeEducationDetail: EducationEntry[];
// };

const educationTypes = ['SSC', 'HSC', 'Diploma', 'Degree', 'Certification'];

export default function EducationTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	// const {
	// 	control,
	// 	handleSubmit,
	// 	formState: { errors }
	// } = useForm<FormData>({
	// 	defaultValues: {
	// 		employeeEducationDetail: [{ type: '', university: '', year: '', grade: '' }]
	// 	}
	// });

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'employeeEducationDetail'
	});

	// const onSubmit = (data: FormData) => {
	// 	console.log(data);
	// 	// Here you would typically send this data to your backend
	// };

	return (
		<div className="space-y-48">
			<div className="space-y-16">
				{/* <form onSubmit={handleSubmit(onSubmit)}> */}
				{fields.map((field, index) => (
					<Box
						key={field.id}
						sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}
					>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Controller
									name={`employeeEducationDetail.${index}.type`}
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											select
											fullWidth
											label="Education Type"
											required
											error={!!errors.employeeEducationDetail?.[index]?.type}
											helperText={errors.employeeEducationDetail?.[index]?.type?.message as string}
										>
											{educationTypes.map((option) => (
												<MenuItem
													key={option}
													value={option}
												>
													{option}
												</MenuItem>
											))}
										</TextField>
									)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Controller
									name={`employeeEducationDetail.${index}.university`}
									control={control}
									rules={{ required: 'university is required' }}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											required
											label="University"
											error={!!errors.employeeEducationDetail?.[index]?.university}
											helperText={errors.employeeEducationDetail?.[index]?.university?.message}
										/>
									)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Controller
									name={`employeeEducationDetail.${index}.passingYear`}
									control={control}
									rules={{ required: 'Year is required' }}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											required
											label="Year of Completion"
											type="number"
											error={!!errors.employeeEducationDetail?.[index]?.passingYear}
											helperText={errors.employeeEducationDetail?.[index]?.passingYear?.message as string}
										/>
									)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<Controller
									name={`employeeEducationDetail.${index}.grade`}
									control={control}
									rules={{ required: 'Grade/Score is required' }}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											required
											label="Grade/Score"
											error={!!errors.employeeEducationDetail?.[index]?.grade}
											helperText={errors.employeeEducationDetail?.[index]?.grade?.message}
										/>
									)}
								/>
							</Grid>
						</Grid>

						<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
								className=""
								variant="contained"
								color="secondary"
								size="small"
								onClick={() => append({ type: '', university: '', passingYear: '', grade: '' })}
							>
								<FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
								<span className="mx-4 sm:mx-8">Add Education</span>
							</Button>
							{index > 0 && (
								<Button
									variant="outlined"
									color="error"
									startIcon={<DeleteIcon />}
									onClick={() => remove(index)}
								>
									Remove
								</Button>
							)}
						</Box>
					</Box>
				))}

				{/* </form> */}
			</div>
		</div>
	);
}
