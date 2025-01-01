import React, { useState, useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import {
	Button,
	CircularProgress,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Dialog,
	DialogContent,
	DialogTitle
} from '@mui/material';
import { useUploadCsvMutation, useGetCsvContentQuery } from '../api/apiSlice';

export default function CSVIntegration() {
	return (
		<main className="min-h-screen p-4">
			<h1 className="text-2xl font-bold mb-4">CSV Uploader and Viewer</h1>
			<CsvUploader />
		</main>
	);
}

export type FileData = {
	id: string;
	fileName: string;
	status: 'Uploaded' | 'Failed';
	uploadDate: string;
	content?: unknown[];
	csvType: 'attendance' | 'timesheet';
};

interface CsvViewerProps {
	file: FileData | null;
	onClose: () => void;
}

function CsvViewer({ file, onClose }: CsvViewerProps) {
	const { data: content, isLoading, isError } = useGetCsvContentQuery(file?.id ?? '', { skip: !file });

	const columns = useMemo(() => {
		if (!content || content.length === 0) return [];

		return Object.keys(content[0]).map((key) => ({
			accessorKey: key,
			header: key
		})) as MRT_ColumnDef<object>[];
	}, [content]);

	if (!file) return null;

	return (
		<Dialog
			open={!!file}
			onClose={onClose}
			maxWidth="lg"
			fullWidth
		>
			<DialogTitle>{file.fileName} Contents</DialogTitle>
			<DialogContent>
				{isLoading && <CircularProgress />}
				{isError && <div>Error loading CSV content</div>}
				{content && (
					<MaterialReactTable
						columns={columns}
						data={content}
						enableColumnActions={false}
						enableColumnFilters={false}
						enablePagination
						enableSorting
						muiTableBodyRowProps={{ hover: false }}
						initialState={{ density: 'compact' }}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}

function CsvUploader() {
	const [files, setFiles] = useState<FileData[]>([]);
	const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
	const [csvType, setCsvType] = useState<FileData['csvType']>('attendance');

	const [uploadCsv, { isLoading: isUploading }] = useUploadCsvMutation();

	const columns = useMemo<MRT_ColumnDef<FileData>[]>(
		() => [
			{
				accessorKey: 'fileName',
				header: 'File Name',
				Cell: ({ row }) => (
					<Button
						onClick={() => handleFileClick(row.original)}
						style={{ textTransform: 'none' }}
					>
						{row.original.fileName}
					</Button>
				)
			},
			{
				accessorKey: 'status',
				header: 'Status'
			},
			{
				accessorKey: 'uploadDate',
				header: 'Upload Date',
				Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleString()
			},
			{
				accessorKey: 'csvType',
				header: 'CSV Type'
			}
		],
		[]
	);

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);
		formData.append('csvType', csvType);

		try {
			const fileData = await uploadCsv(formData).unwrap();
			setFiles((prevFiles) => [...prevFiles, fileData]);
		} catch (error) {
			console.error('Upload failed:', error);
			// Handle error (e.g., show error message to user)
		}
	};

	const handleFileClick = (file: FileData) => {
		setSelectedFile(file);
	};

	return (
		<div className="p-4">
			<div className="mb-4 flex items-center space-x-4">
				<FormControl className="min-w-[120px]">
					<InputLabel id="csv-type-label">CSV Type</InputLabel>
					<Select
						labelId="csv-type-label"
						value={csvType}
						onChange={(e) => setCsvType(e.target.value as FileData['csvType'])}
						label="CSV Type"
					>
						<MenuItem value="attendance">Attendance</MenuItem>
						<MenuItem value="timesheet">Timesheet</MenuItem>
					</Select>
				</FormControl>
				<input
					type="file"
					accept=".csv"
					onChange={handleFileUpload}
					style={{ display: 'none' }}
					id="csv-upload"
				/>
				<label htmlFor="csv-upload">
					<Button
						variant="contained"
						component="span"
						disabled={isUploading}
					>
						{isUploading ? <CircularProgress size={24} /> : 'Upload CSV'}
					</Button>
				</label>
			</div>
			<MaterialReactTable
				columns={columns}
				data={files}
				enableColumnActions={false}
				enableColumnFilters={false}
				enablePagination
				enableSorting
				muiTableBodyRowProps={{ hover: false }}
				initialState={{ density: 'compact' }}
			/>
			<CsvViewer
				file={selectedFile}
				onClose={() => setSelectedFile(null)}
			/>
		</div>
	);
}
