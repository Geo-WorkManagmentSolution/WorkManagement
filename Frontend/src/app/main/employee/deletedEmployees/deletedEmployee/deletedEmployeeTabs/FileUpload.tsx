import React, { useState, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, IconButton, Grid, Alert, CircularProgress, Paper } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useParams } from 'react-router-dom';
import jwtAuthConfig from 'src/app/auth/services/jwt/jwtAuthConfig';
import { useDispatch } from 'react-redux';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import ItemIcon from 'src/app/main/Project/Project/tabs/helperComponents/ItemIcon';
import {
  EmployeeDocumentsModel,
  useLazyGetApiEmployeesDownloadByFileNameQuery
} from '../../../EmployeeApi';

interface FileInfo extends EmployeeDocumentsModel {
  isExisting?: boolean;
}

const FileCard: React.FC<{
  file: FileInfo;
  onDownload: () => void;
  isDownloading: boolean;
}> = React.memo(({ file, onDownload, isDownloading }) => {
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
    <Paper className="p-10 my-20" elevation={3}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <ItemIcon type={getFileType(file.fileName)} />
        </Grid>
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
            disabled={isDownloading}
          >
            {isDownloading ? <CircularProgress size={24} /> : <GetAppIcon color="primary" />}
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
});

FileCard.displayName = 'FileCard';

export default function FileUpload() {
  const storedToken = localStorage.getItem(jwtAuthConfig.tokenStorageKey);
  const dispatch = useDispatch();

  const [files, setFiles] = useState<FileInfo[]>([]);
  const { watch } = useFormContext();
  const [triggerDownload] = useLazyGetApiEmployeesDownloadByFileNameQuery();
  const { employeeId } = useParams<{ employeeId: string }>();
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
    [employeeId, triggerDownload, dispatch, storedToken]
  );

  const handleDownloadFile = useCallback(
    (file: FileInfo) => {
      downloadFile(file.fileName);
    },
    [downloadFile]
  );

  if (employeeId === 'new') {
    return <Alert severity="info">Employee documents are not available for new employees.</Alert>;
  }

  return (
    <Box sx={{ margin: 'auto', padding: 2 }}>
      {files.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            Employee Documents
          </Typography>
          {files.map((file) => (
            <FileCard
              key={file.fileName}
              file={file}
              onDownload={() => handleDownloadFile(file)}
              isDownloading={downloadingFiles[file.fileName] || false}
            />
          ))}
        </>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          No documents available for this employee.
        </Alert>
      )}
      {downloadError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {downloadError}
        </Alert>
      )}
    </Box>
  );
}
