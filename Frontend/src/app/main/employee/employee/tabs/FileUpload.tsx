import React, { useState, useCallback, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, Typography, IconButton, Grid, Alert, CircularProgress, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useParams } from 'react-router-dom';
import jwtAuthConfig from 'src/app/auth/services/jwt/jwtAuthConfig';
import { useDispatch } from 'react-redux';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import ItemIcon from 'src/app/main/Project/Project/tabs/ItemIcon';
import {
	FileType,
	usePostApiEmployeesDocumnetUploadMutation,
	useDeleteApiEmployeesDocumentByFileNameMutation,
	EmployeeDocumentsModel,
	useLazyGetApiEmployeesDownloadByFileNameQuery
} from '../../EmployeeApi';

interface FileInfo extends EmployeeDocumentsModel {
	isExisting?: boolean;
}

const FileCard: React.FC<{
	file: FileInfo;
	onRemove: () => void;
	onDownload: () => void;
	isDeleting: boolean;
	isDownloading: boolean;
}> = React.memo(({ file, onRemove, onDownload, isDeleting, isDownloading }) => {
	const getFileType = (fileName: string): string => {
		const extension = fileName.split('.').pop()?.toUpperCase() || '';
		switch (extension) {
			case 'PDF':
			case 'DOC':
			case 'DOCX':
			case 'XLS':
			case 'XLSX':
			case 'TXT':
			case 'JPG':
			case 'JPEG':
			case 'PNG':
			case 'ZIP':
				return extension;
			default:
				return 'OTHER';
		}
	};

	return (
		<Paper
			className="p-10 my-20"
			elevation={3}
		>
			<Grid
				container
				alignItems="center"
				spacing={2}
			>
				<Grid item>
					<ItemIcon type={getFileType(file.fileName)} />
				</Grid>
				<Grid
					item
					xs
				>
					<Typography variant="subtitle1">{file.fileName}</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
					>
						{file.fileSize ? `${(file.fileSize / 1024).toFixed(2)} KB` : 'Size unknown'}
					</Typography>
				</Grid>
				<Grid item>
					<IconButton
						onClick={onDownload}
						size="small"
						aria-label="Download file"
						disabled={isDownloading}
					>
						{isDownloading ? <CircularProgress size={24} /> : <GetAppIcon color="primary" />}
					</IconButton>
					<IconButton
						onClick={onRemove}
						size="small"
						aria-label="Remove file"
						disabled={isDeleting}
					>
						{isDeleting ? <CircularProgress size={24} /> : <DeleteIcon color="error" />}
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
});

FileCard.displayName = 'FileCard';

export default function FileUpload({ UserRole }) {
	const storedToken = localStorage.getItem(jwtAuthConfig.tokenStorageKey);
	const dispatch = useDispatch();

	const [files, setFiles] = useState<FileInfo[]>([]);
	const { control, setValue, watch } = useFormContext();
	const [uploadFile] = usePostApiEmployeesDocumnetUploadMutation();
	const [deleteFile] = useDeleteApiEmployeesDocumentByFileNameMutation();
	const [triggerDownload, { isLoading: isDownloading }] = useLazyGetApiEmployeesDownloadByFileNameQuery();
	const { employeeId } = useParams<{ employeeId: string }>();
	const [isUploading, setIsUploading] = useState(false);
	const [deletingFiles, setDeletingFiles] = useState<{ [key: string]: boolean }>({});
	const [downloadingFiles, setDownloadingFiles] = useState<{ [key: string]: boolean }>({});
	const existingDocuments = watch('employeeDocuments') || [];
	const [downloadError, setDownloadError] = useState<string | null>(null);

	useEffect(() => {
		if (existingDocuments.length > 0 && files.length === 0) {
			setFiles(existingDocuments.map((doc) => ({ ...doc, isExisting: true })));
		}
	}, [existingDocuments]);

	const downloadFile = useCallback(
		async (fileName: string) => {
			setDownloadingFiles((prev) => ({ ...prev, [fileName]: true }));
			setDownloadError(null);
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BASE_URL}api/Employees/download/${fileName}?id=${employeeId}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							authorization: `Bearer ${storedToken}`
							// Add any necessary authentication headers here
						}
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = url;
				link.download = fileName;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
				dispatch(showMessage({ message: 'File downloaded successfully', variant: 'success' }));
			} catch (error) {
				console.error('Error downloading document:', error);
				setDownloadError('Error downloading the file. Please try again.');
				dispatch(showMessage({ message: 'Error downloading file', variant: 'error' }));
			} finally {
				setDownloadingFiles((prev) => ({ ...prev, [fileName]: false }));
			}
		},
		[employeeId, triggerDownload, dispatch]
	);

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const { files: uploadedFiles } = event.target;
	
			if (uploadedFiles && uploadedFiles.length > 0) {
				const selectedFile = uploadedFiles[0];
				const fileName = selectedFile.name;
				const fileSizeLimit = 50 * 1024 * 1024; // 50 MB in bytes
	
				// Check if file with the same name exists
				const fileExists = files.some(file => file.fileName === fileName);
				if (fileExists) {
					dispatch(showMessage({ message: 'File already exists', variant: 'error' }));
					return;
				}
	
				// Check if file size exceeds the limit
				if (selectedFile.size > fileSizeLimit) {
					dispatch(showMessage({ message: 'File size should not be more than 50 MB', variant: 'error' }));
					return;
				}
	
				setIsUploading(true);
				const formData = new FormData();
				formData.append('file', selectedFile);
	
				try {
					const response = await uploadFile({ id: parseInt(employeeId), body: formData }).unwrap();
					console.log('File upload response:', response);
					const newFile: FileInfo = {
						fileName: selectedFile.name,
						fileSize: selectedFile.size,
						fileType: getFileType(selectedFile.type)
					};
					setFiles((prevFiles) => [...prevFiles, newFile]);
					setValue('employeeDocuments', (prevDocs) => [...prevDocs, newFile]);
					dispatch(showMessage({ message: 'File uploaded successfully', variant: 'success' }));
				} catch (error) {
					console.error('Error uploading file:', error);
					dispatch(showMessage({ message: 'Error uploading file', variant: 'error' }));
				} finally {
					setIsUploading(false);
				}
			}
		},
		[employeeId, uploadFile, setValue, dispatch, files]
	);
	

	const handleRemoveFile = useCallback(
		async (fileName: string) => {
			setDeletingFiles((prev) => ({ ...prev, [fileName]: true }));
			try {
				await deleteFile({ id: parseInt(employeeId), fileName }).unwrap();
				setFiles((prevFiles) => {
					const updatedFiles = prevFiles.filter((file) => file.fileName !== fileName);
					setValue('employeeDocuments', updatedFiles);
					return updatedFiles;
				});
				dispatch(showMessage({ message: 'File deleted successfully', variant: 'success' }));
			} catch (error) {
				console.error('Error deleting file:', error);
				dispatch(showMessage({ message: 'Error deleting file', variant: 'error' }));
			} finally {
				setDeletingFiles((prev) => ({ ...prev, [fileName]: false }));
			}
		},
		[employeeId, deleteFile, setValue, dispatch]
	);

	const handleDownloadFile = useCallback(
		(file: FileInfo) => {
			downloadFile(file.fileName);
		},
		[downloadFile]
	);

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

	if (employeeId === 'new') {
		return <Alert severity="info">Please save the Employee details before adding documents.</Alert>;
	}

	return (
		<Box sx={{ margin: 'auto', padding: 2 }}>
			<Controller
				name="employeeDocuments"
				control={control}
				defaultValue={[]}
				render={({ field }) => (
					<div
						className="border-2 border-dashed border-gray-300 rounded p-16 text-center mb-2 cursor-pointer hover:bg-gray-200"
						onDrop={(e) => {
							e.preventDefault();
							const droppedFiles = e.dataTransfer.files;

							if (droppedFiles.length > 0) {
								handleFileChange({
									target: { files: droppedFiles }
								} as React.ChangeEvent<HTMLInputElement>);
							}
						}}
						onDragOver={(e) => e.preventDefault()}
					>
						<input
							type="file"
							onChange={handleFileChange}
							style={{ display: 'none' }}
							id="file-input"
							accept={acceptedFileTypes}
						/>
						<label htmlFor="file-input">
							<LoadingButton
								component="span"
								startIcon={<CloudUploadIcon />}
								variant="contained"
								color="primary"
								loading={isUploading}
							>
								Upload Files
							</LoadingButton>
						</label>
						<Typography
							variant="caption"
							display="block"
							sx={{ marginTop: 1 }}
						>
							Drag and drop files here or click to upload
						</Typography>
						<Typography
							variant="caption"
							display="block"
						>
							Only PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, GIF, ZIP, XLSX, and CSV files are allowed
						</Typography>
					</div>
				)}
			/>

		

			{files.length > 0 ? (
				<>
					<Typography
						variant="h6"
						gutterBottom
					>
						Uploaded Documents
					</Typography>
					{files.map((file) => (
						<FileCard
							key={file.fileName}
							file={file}
							onRemove={() => handleRemoveFile(file.fileName)}
							onDownload={() => handleDownloadFile(file)}
							isDeleting={deletingFiles[file.fileName] || false}
							isDownloading={downloadingFiles[file.fileName] || false}
						/>
					))}
				</>
			) : (
				<Alert
					severity="info"
					sx={{ mt: 2 }}
				>
					No documents uploaded
				</Alert>
			)}
		</Box>
	);
}
