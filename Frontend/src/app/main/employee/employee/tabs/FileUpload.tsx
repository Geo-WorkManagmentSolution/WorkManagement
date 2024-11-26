import React, { useState, useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, Button, Card, CardContent, Typography, IconButton, Grid, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { FileType } from '../../EmployeeApi';

interface FileInfo {
	fileName: string;
	fileSize: number;
	fileContent: string;
	fileType: FileType;
}

const FileCard: React.FC<{ file: FileInfo; onRemove: () => void; onDownload: () => void }> = React.memo(
	({ file, onRemove, onDownload }) => {
		const getFileIcon = useCallback(() => {
			if (file.fileType === FileType.Pdf || file.fileType === FileType.Docx || file.fileType === FileType.Txt) {
				return <InsertDriveFileIcon style={{ fontSize: 48 }} />;
			}

			return (
				<img
					src={file.fileContent}
					alt={file.fileName}
					style={{ width: 48, height: 48, objectFit: 'cover' }}
				/>
			);
		}, [file]);

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
						<Grid item>{getFileIcon()}</Grid>
						<Grid
							item
							xs
						>
							<Typography variant="subtitle1">{file.fileName}</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
							>
								{(file.fileSize / 1024).toFixed(2)} KB
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
	}
);

FileCard.displayName = 'FileCard';

export default function FileUpload() {
	const [files, setFiles] = useState<FileInfo[]>([]);
	const { control, setValue } = useFormContext();

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { files: uploadedFiles } = event.target;

			if (uploadedFiles) {
				Array.from(uploadedFiles).forEach((file) => {
					const reader = new FileReader();
					reader.onload = (e) => {
						const newFile: FileInfo = {
							fileName: file.name,
							fileSize: file.size,
							fileContent: e.target?.result as string,
							fileType: getFileType(file.type)
						};
						setFiles((prevFiles) => {
							const updatedFiles = [...prevFiles, newFile];
							setValue('employeeDocuments', updatedFiles);
							return updatedFiles;
						});
					};
					reader.readAsDataURL(file);
				});
			}
		},
		[setValue]
	);

	const handleRemoveFile = useCallback(
		(fileName: string) => {
			setFiles((prevFiles) => {
				const updatedFiles = prevFiles.filter((file) => file.fileName !== fileName);
				setValue('employeeDocuments', updatedFiles);
				return updatedFiles;
			});
		},
		[setValue]
	);

	const handleDownloadFile = useCallback((file: FileInfo) => {
		const link = document.createElement('a');
		link.href = file.fileContent;
		link.download = file.fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, []);

	const getFileType = (mimeType: string): FileType => {
		if (mimeType.includes('pdf')) return FileType.Pdf;

		if (mimeType.includes('word')) return FileType.Docx;

		if (mimeType.includes('text')) return FileType.Txt;

		if (mimeType.includes('zip')) return FileType.Zip;

		if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return FileType.Xlsx;

		if (mimeType.includes('csv')) return FileType.Csv;

		return FileType.Other;
	};

	const acceptedFileTypes = '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.xlsx,.csv';

	return (
		<Box sx={{ margin: 'auto', padding: 2 }}>
			<Controller
				name="employeeDocuments"
				control={control}
				defaultValue={[]}
				render={({ field }) => (
					<Box
						sx={{
							border: '2px dashed #cccccc',
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
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								handleFileChange(event);
								field.onChange(event.target.files);
							}}
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
							Only PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, GIF, ZIP, XLSX, and CSV files are allowed
						</Typography>
					</Box>
				)}
			/>

			<Typography
				variant="h6"
				gutterBottom
			>
				Uploaded Files
			</Typography>
			{files.map((file) => (
				<FileCard
					key={file.fileName}
					file={file}
					onRemove={() => handleRemoveFile(file.fileName)}
					onDownload={() => handleDownloadFile(file)}
				/>
			))}
		</Box>
	);
}
