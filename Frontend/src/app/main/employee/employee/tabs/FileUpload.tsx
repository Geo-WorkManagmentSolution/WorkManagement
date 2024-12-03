// import React, { useState, useCallback, useEffect } from 'react';
// import { useFormContext, Controller } from 'react-hook-form';
// import { Box, Typography, IconButton, Grid, Alert } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import DeleteIcon from '@mui/icons-material/Delete';
// import GetAppIcon from '@mui/icons-material/GetApp';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import { useParams } from 'react-router-dom';
// import {
// 	FileType,
// 	usePostApiEmployeesDocumnetUploadMutation,
// 	useDeleteApiEmployeesDocumentByFileNameMutation,
// 	EmployeeDocumentsModel,
// 	useGetApiEmployeesDownloadByFileNameQuery
// } from '../../EmployeeApi';

// interface FileInfo extends EmployeeDocumentsModel {
// 	isExisting?: boolean;
// }

// const FileCard: React.FC<{ file: FileInfo; onRemove: () => void; onDownload: () => void; isDeleting: boolean }> =
// 	React.memo(({ file, onRemove, onDownload, isDeleting }) => {
// 		const getFileIcon = useCallback(() => {
// 			return <InsertDriveFileIcon style={{ fontSize: 48 }} />;
// 		}, []);

// 		return (
// 			<Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2, mb: 2 }}>
// 				<Grid container alignItems="center" spacing={2}>
// 					<Grid item>{getFileIcon()}</Grid>
// 					<Grid item xs>
// 						<Typography variant="subtitle1">{file.fileName}</Typography>
// 						<Typography variant="body2" color="textSecondary">
// 							{file.fileSize ? `${(file.fileSize / 1024).toFixed(2)} KB` : 'Size unknown'}
// 						</Typography>
// 					</Grid>
// 					<Grid item>
// 						<IconButton
// 							onClick={onDownload}
// 							size="small"
// 							aria-label="Download file"
// 						>
// 							<GetAppIcon />
// 						</IconButton>
// 						<IconButton
// 							onClick={onRemove}
// 							size="small"
// 							aria-label="Remove file"
// 							disabled={isDeleting}
// 						>
// 							<DeleteIcon />
// 						</IconButton>
// 					</Grid>
// 				</Grid>
// 			</Box>
// 		);
// 	});

// FileCard.displayName = 'FileCard';

// export default function FileUpload() {
// 	const [files, setFiles] = useState<FileInfo[]>([]);
// 	const { control, setValue, watch } = useFormContext();
// 	const [uploadFile] = usePostApiEmployeesDocumnetUploadMutation();
// 	const [deleteFile] = useDeleteApiEmployeesDocumentByFileNameMutation();
// 	const { employeeId } = useParams<{ employeeId: string }>();
// 	const [isUploading, setIsUploading] = useState(false);
// 	const [deletingFiles, setDeletingFiles] = useState<{ [key: string]: boolean }>({});
// 	const existingDocuments = watch('employeeDocuments') || [];
// 	const [downloadError, setDownloadError] = useState<string | null>(null);
// 	const [fileToDownload, setFileToDownload] = useState<FileInfo | null>(null);

// 	const { data: downloadedFileData, error: downloadingError, isLoading: isDownloading } = useGetApiEmployeesDownloadByFileNameQuery(
// 		{ id: parseInt(employeeId), fileName: fileToDownload ? fileToDownload.fileName : '' },
// 		{ skip: !fileToDownload }
// 	);

// 	useEffect(() => {
// 		if (existingDocuments.length > 0 && files.length === 0) {
// 			setFiles(existingDocuments.map((doc) => ({ ...doc, isExisting: true })));
// 		}
// 	}, [existingDocuments]);

// 	useEffect(() => {
// 		if (fileToDownload && downloadedFileData) {
// 			const blob = new Blob([downloadedFileData]);
// 			const url = window.URL.createObjectURL(blob);
// 			const link = document.createElement('a');
// 			link.href = url;
// 			link.download = fileToDownload.fileName;
// 			document.body.appendChild(link);
// 			link.click();
// 			document.body.removeChild(link);
// 			window.URL.revokeObjectURL(url);
// 			setFileToDownload(null);
// 		}
// 	}, [downloadedFileData, fileToDownload]);

// 	useEffect(() => {
// 		if (downloadError) {
// 			console.error('Download error:', downloadError);
// 			setDownloadError('Error downloading file. Please try again.');
// 			setFileToDownload(null);
// 		}
// 	}, [downloadError]);

// 	const handleFileChange = useCallback(
// 		async (event: React.ChangeEvent<HTMLInputElement>) => {
// 			const { files: uploadedFiles } = event.target;

// 			if (uploadedFiles && uploadedFiles.length > 0) {
// 				setIsUploading(true);
// 				const formData = new FormData();
// 				formData.append('file', uploadedFiles[0]);

// 				try {
// 					const response = await uploadFile({ id: parseInt(employeeId), body: formData }).unwrap();
// 					console.log('File upload response:', response);
// 					const newFile: FileInfo = {
// 						fileName: uploadedFiles[0].name,
// 						fileSize: uploadedFiles[0].size,
// 						fileType: getFileType(uploadedFiles[0].type)
// 					};
// 					setFiles((prevFiles) => [...prevFiles, newFile]);
// 					setValue('employeeDocuments', [...files, newFile]);
// 				} catch (error) {
// 					console.error('Error uploading file:', error);
// 				} finally {
// 					setIsUploading(false);
// 				}
// 			}
// 		},
// 		[employeeId, uploadFile, setValue, files]
// 	);

// 	const handleRemoveFile = useCallback(
// 		async (fileName: string) => {
// 			setDeletingFiles((prev) => ({ ...prev, [fileName]: true }));
// 			try {
// 				await deleteFile({ id: parseInt(employeeId), fileName }).unwrap();
// 				setFiles((prevFiles) => {
// 					const updatedFiles = prevFiles.filter((file) => file.fileName !== fileName);
// 					setValue('employeeDocuments', updatedFiles);
// 					return updatedFiles;
// 				});
// 			} catch (error) {
// 				console.error('Error deleting file:', error);
// 			} finally {
// 				setDeletingFiles((prev) => ({ ...prev, [fileName]: false }));
// 			}
// 		},
// 		[employeeId, deleteFile, setValue]
// 	);

// 	const handleDownloadFile = useCallback((file: FileInfo) => {
// 		setFileToDownload(file);
// 		setDownloadError(null);
// 	}, []);

// 	const getFileType = (mimeType: string): FileType => {
// 		if (mimeType.includes('pdf')) return FileType.Pdf;
// 		if (mimeType.includes('word')) return FileType.Docx;
// 		if (mimeType.includes('text')) return FileType.Txt;
// 		if (mimeType.includes('zip')) return FileType.Zip;
// 		if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return FileType.Xlsx;
// 		if (mimeType.includes('csv')) return FileType.Csv;
// 		return FileType.Other;
// 	};

// 	const acceptedFileTypes = '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.xlsx,.csv';

// 	if (employeeId === 'new') {
// 		return <Alert severity="info">Please save the Employee details before adding documents.</Alert>;
// 	}

// 	return (
// 		<Box sx={{ margin: 'auto', padding: 2 }}>
// 			<Controller
// 				name="employeeDocuments"
// 				control={control}
// 				defaultValue={[]}
// 				render={({ field }) => (
// 					<Box
// 						sx={{
// 							border: '2px dashed #cccccc',
// 							borderRadius: 2,
// 							padding: 2,
// 							textAlign: 'center',
// 							marginBottom: 2,
// 							cursor: 'pointer',
// 							'&:hover': {
// 								backgroundColor: '#f0f0f0'
// 							}
// 						}}
// 						onDrop={(e) => {
// 							e.preventDefault();
// 							const droppedFiles = e.dataTransfer.files;

// 							if (droppedFiles.length > 0) {
// 								handleFileChange({
// 									target: { files: droppedFiles }
// 								} as React.ChangeEvent<HTMLInputElement>);
// 							}
// 						}}
// 						onDragOver={(e) => e.preventDefault()}
// 					>
// 						<input
// 							type="file"
// 							onChange={handleFileChange}
// 							style={{ display: 'none' }}
// 							id="file-input"
// 							accept={acceptedFileTypes}
// 						/>
// 						<label htmlFor="file-input">
// 							<LoadingButton
// 								component="span"
// 								startIcon={<CloudUploadIcon />}
// 								variant="contained"
// 								color="primary"
// 								loading={isUploading}
// 							>
// 								Upload Files
// 							</LoadingButton>
// 						</label>
// 						<Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
// 							Drag and drop files here or click to upload
// 						</Typography>
// 						<Typography variant="caption" display="block">
// 							Only PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, GIF, ZIP, XLSX, and CSV files are allowed
// 						</Typography>
// 					</Box>
// 				)}
// 			/>

// 			{downloadError && (
// 				<Alert severity="error" sx={{ mt: 2, mb: 2 }}>
// 					{downloadError}
// 				</Alert>
// 			)}

// 			{files.length > 0 ? (
// 				<>
// 					<Typography variant="h6" gutterBottom>
// 						Uploaded Files
// 					</Typography>
// 					{files.map((file) => (
// 						<FileCard
// 							key={file.fileName}
// 							file={file}
// 							onRemove={() => handleRemoveFile(file.fileName)}
// 							onDownload={() => handleDownloadFile(file)}
// 							isDeleting={deletingFiles[file.fileName] || false}
// 						/>
// 					))}
// 				</>
// 			) : (
// 				<Alert severity="info" sx={{ mt: 2 }}>
// 					No documents uploaded
// 				</Alert>
// 			)}

// 			{isDownloading && (
// 				<Alert severity="info" sx={{ mt: 2 }}>
// 					Downloading file...
// 				</Alert>
// 			)}
// 		</Box>
// 	);
// }

import React, { useState, useCallback, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, Typography, IconButton, Grid, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useParams } from 'react-router-dom';
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

const FileCard: React.FC<{ file: FileInfo; onRemove: () => void; onDownload: () => void; isDeleting: boolean }> =
	React.memo(({ file, onRemove, onDownload, isDeleting }) => {
		const getFileIcon = useCallback(() => {
			return <InsertDriveFileIcon style={{ fontSize: 48 }} />;
		}, []);

		return (
			<Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2, mb: 2 }}>
				<Grid container alignItems="center" spacing={2}>
					<Grid item>{getFileIcon()}</Grid>
					<Grid item xs>
						<Typography variant="subtitle1">{file.fileName}</Typography>
						<Typography variant="body2" color="textSecondary">
							{file.fileSize ? `${(file.fileSize / 1024).toFixed(2)} KB` : 'Size unknown'}
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
							disabled={isDeleting}
						>
							<DeleteIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Box>
		);
	});

FileCard.displayName = 'FileCard';

export default function FileUpload() {
	const [files, setFiles] = useState<FileInfo[]>([]);
	const { control, setValue, watch } = useFormContext();
	const [uploadFile] = usePostApiEmployeesDocumnetUploadMutation();
	const [deleteFile] = useDeleteApiEmployeesDocumentByFileNameMutation();
	const [triggerDownload, { isLoading: isDownloading }] = useLazyGetApiEmployeesDownloadByFileNameQuery();
	const { employeeId } = useParams<{ employeeId: string }>();
	const [isUploading, setIsUploading] = useState(false);
	const [deletingFiles, setDeletingFiles] = useState<{ [key: string]: boolean }>({});
	const existingDocuments = watch('employeeDocuments') || [];
	const [downloadError, setDownloadError] = useState<string | null>(null);

	useEffect(() => {
		if (existingDocuments.length > 0 && files.length === 0) {
			setFiles(existingDocuments.map((doc) => ({ ...doc, isExisting: true })));
		}
	}, [existingDocuments]);

	const downloadFile = useCallback(async (fileName: string) => {
		setDownloadError(null);
		try {
			const { data } = await triggerDownload({ id: parseInt(employeeId), fileName });
			if (!data) throw new Error('Download failed');

			const blob = new Blob([data]);
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Download error:', error);
			setDownloadError('Error downloading file. Please try again.');
		}
	}, [employeeId, triggerDownload]);

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const { files: uploadedFiles } = event.target;

			if (uploadedFiles && uploadedFiles.length > 0) {
				setIsUploading(true);
				const formData = new FormData();
				formData.append('file', uploadedFiles[0]);

				try {
					const response = await uploadFile({ id: parseInt(employeeId), body: formData }).unwrap();
					console.log('File upload response:', response);
					const newFile: FileInfo = {
						fileName: uploadedFiles[0].name,
						fileSize: uploadedFiles[0].size,
						fileType: getFileType(uploadedFiles[0].type)
					};
					setFiles((prevFiles) => [...prevFiles, newFile]);
					setValue('employeeDocuments', [...files, newFile]);
				} catch (error) {
					console.error('Error uploading file:', error);
				} finally {
					setIsUploading(false);
				}
			}
		},
		[employeeId, uploadFile, setValue, files]
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
			} catch (error) {
				console.error('Error deleting file:', error);
			} finally {
				setDeletingFiles((prev) => ({ ...prev, [fileName]: false }));
			}
		},
		[employeeId, deleteFile, setValue]
	);

	const handleDownloadFile = useCallback((file: FileInfo) => {
		downloadFile(file.fileName);
	}, [downloadFile]);

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
					<Box
						sx={{
							border: '2px dashed #cccccc',
							borderRadius: 2,
							padding: 2,
							textAlign: 'center',
							marginBottom: 2,
							cursor: 'pointer',
							'&:hover': {
								backgroundColor: '#f0f0f0'
							}
						}}
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
						<Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
							Drag and drop files here or click to upload
						</Typography>
						<Typography variant="caption" display="block">
							Only PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, GIF, ZIP, XLSX, and CSV files are allowed
						</Typography>
					</Box>
				)}
			/>

			{downloadError && (
				<Alert severity="error" sx={{ mt: 2, mb: 2 }}>
					{downloadError}
				</Alert>
			)}

			{files.length > 0 ? (
				<>
					<Typography variant="h6" gutterBottom>
						Uploaded Files
					</Typography>
					{files.map((file) => (
						<FileCard
							key={file.fileName}
							file={file}
							onRemove={() => handleRemoveFile(file.fileName)}
							onDownload={() => handleDownloadFile(file)}
							isDeleting={deletingFiles[file.fileName] || false}
						/>
					))}
				</>
			) : (
				<Alert severity="info" sx={{ mt: 2 }}>
					No documents uploaded
				</Alert>
			)}

			{isDownloading && (
				<Alert severity="info" sx={{ mt: 2 }}>
					Downloading file...
				</Alert>
			)}
		</Box>
	);
}

