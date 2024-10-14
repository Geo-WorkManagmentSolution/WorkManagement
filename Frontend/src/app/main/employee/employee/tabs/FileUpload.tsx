import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Card, CardContent, Typography, IconButton, Grid, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface FileInfo {
	id: string;
	name: string;
	size: number;
	type: string;
	url: string;
}

const FileCard: React.FC<{ file: FileInfo; onRemove: () => void; onDownload: () => void }> = ({
	file,
	onRemove,
	onDownload
}) => {
	const getFileIcon = (type: string) => {
		if (type.startsWith('image/')) {
			return (
				<img
					src={file.url}
					alt={file.name}
					style={{ width: 48, height: 48, objectFit: 'cover' }}
				/>
			);
		}

		return <InsertDriveFileIcon style={{ fontSize: 48 }} />;
	};

	return (
		<Card
			variant="outlined"
			style={{ marginBottom: 16 }}
		>
			<CardContent>
				<Grid
					container
					alignItems="center"
					spacing={2}
				>
					<Grid item>{getFileIcon(file.type)}</Grid>
					<Grid
						item
						xs
					>
						<Typography variant="subtitle1">{file.name}</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
						>
							{(file.size / 1024).toFixed(2)} KB
						</Typography>
					</Grid>
					<Grid item>
						<IconButton
							onClick={onDownload}
							size="small"
							aria-label="Download file"
						>
							<GetAppIcon />
						</IconButton>
						<IconButton
							onClick={onRemove}
							size="small"
							aria-label="Remove file"
						>
							<DeleteIcon />
						</IconButton>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default function FileUpload() {
	const [allFiles, setAllFiles] = useState<FileInfo[]>([]);
	const { control, handleSubmit } = useForm();

	useEffect(() => {
		// Simulating fetching existing files from the server
		const fetchExistingFiles = async () => {
			// Replace this with actual API call to fetch existing files
			const mockFiles: FileInfo[] = [
				{
					id: '1',
					name: 'example.doc',
					size: 1024 * 50,
					type: 'application/msword',
					url: '/placeholder.svg?height=48&width=48'
				},
				{
					id: '2',
					name: 'image.jpg',
					size: 1024 * 100,
					type: 'image/jpeg',
					url: '/placeholder.svg?height=48&width=48'
				}
			];
			setAllFiles(mockFiles);
		};

		fetchExistingFiles();
	}, []);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;

		if (files) {
			const newFiles: FileInfo[] = Array.from(files).map((file) => ({
				id: `new-${Date.now()}-${file.name}`,
				name: file.name,
				size: file.size,
				type: file.type,
				url: URL.createObjectURL(file)
			}));
			setAllFiles((prevFiles) => [...prevFiles, ...newFiles]);
		}
	};

	const onSubmit = (data: any) => {
		console.log('Form submitted:', data);
		console.log('All files:', allFiles);
	};

	const handleRemoveFile = (fileId: string) => {
		setAllFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
	};

	const handleDownloadFile = (file: FileInfo) => {
		// Download file logic here
		console.log('Downloading file:', file.name);
	};

	const acceptedFileTypes = '.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip';

	return (
		<Box sx={{ margin: 'auto', padding: 2 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="files"
					control={control}
					defaultValue={[]}
					render={({ field }) => (
						<Box
							sx={{
								border: '2px dashed #cccccc !important',
								borderRadius: 2,
								padding: 2,
								textAlign: 'center',
								marginBottom: 2
							}}
						>
							<Input
								type="file"
								inputProps={{
									multiple: true,
									accept: acceptedFileTypes
								}}
								onChange={handleFileChange}
								sx={{ display: 'none' }}
								id="file-input"
							/>
							<label htmlFor="file-input">
								<Button
									component="span"
									startIcon={<CloudUploadIcon />}
									variant="contained"
									color="primary"
								>
									Upload Files
								</Button>
							</label>
							<Typography
								variant="caption"
								display="block"
								sx={{ marginTop: 1 }}
							>
								Only doc, text, image, and zip files are allowed
							</Typography>
						</Box>
					)}
				/>

				<Typography
					variant="h6"
					gutterBottom
				>
					All Files
				</Typography>
				{allFiles.map((file) => (
					<FileCard
						key={file.id}
						file={file}
						onRemove={() => handleRemoveFile(file.id)}
						onDownload={() => handleDownloadFile(file)}
					/>
				))}

				{/* <Button
					type="submit"
					variant="contained"
					color="primary"
				>
					Submit
				</Button> */}
			</form>
		</Box>
	);
}
