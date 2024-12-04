import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { useDispatch } from 'react-redux';
import { getJobLevels, getLeaveTypes, updateLeaveTypes, JobLevel, LeaveType } from '../dummyApi';

function DefaultLeaveForm() {
  const [jobLevels, setJobLevels] = useState<JobLevel[]>([]);
  const [selectedJobLevel, setSelectedJobLevel] = useState<JobLevel | null>(null);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [originalLeaveTypes, setOriginalLeaveTypes] = useState<LeaveType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadJobLevels = async () => {
      setIsLoading(true);
      try {
        const levels = await getJobLevels();
        setJobLevels(levels);
        if (levels.length > 0) {
          setSelectedJobLevel(levels[0]);
          const initialLeaveTypes = await getLeaveTypes(levels[0].id);
          setLeaveTypes(initialLeaveTypes);
          setOriginalLeaveTypes(initialLeaveTypes);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job levels:', error);
        setIsLoading(false);
      }
    };
    loadJobLevels();
  }, []);

  const handleJobLevelChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    if (hasUnsavedChanges) {
      dispatch(
        showMessage({
          message: 'Please save your changes before switching job levels, or your updates will be lost.',
          autoHideDuration: 6000,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          variant: 'warning'
        })
      );
      return;
    }

    const jobLevelId = event.target.value as number;
    const selectedLevel = jobLevels.find((jl) => jl.id === jobLevelId) || null;
    setSelectedJobLevel(selectedLevel);

    if (selectedLevel) {
      setIsLoading(true);
      try {
        const newLeaveTypes = await getLeaveTypes(selectedLevel.id);
        setLeaveTypes(newLeaveTypes);
        setOriginalLeaveTypes(newLeaveTypes);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching leave types:', error);
        setIsLoading(false);
      }
    } else {
      setLeaveTypes([]);
      setOriginalLeaveTypes([]);
    }

    setHasUnsavedChanges(false);
  };

  const handleInputChange = (index: number, field: 'employeeLeaveType' | 'totalLeaves', value: string | number) => {
    const updatedLeaveTypes = [...leaveTypes];
    updatedLeaveTypes[index] = { ...updatedLeaveTypes[index], [field]: value };
    setLeaveTypes(updatedLeaveTypes);
    setHasUnsavedChanges(true);
  };

  const handleRemoveField = (index: number) => {
    setLeaveTypes(leaveTypes.filter((_, i) => i !== index));
    setHasUnsavedChanges(true);
  };

  const handleAddField = () => {
    setLeaveTypes([...leaveTypes, { id: Date.now(), jobLevelId: selectedJobLevel?.id || 0, employeeLeaveType: '', totalLeaves: 0 }]);
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (!selectedJobLevel) return;

    setIsLoading(true);
    try {
      const updatedLeaveTypes = await updateLeaveTypes(selectedJobLevel.id, leaveTypes);
      setLeaveTypes(updatedLeaveTypes);
      setOriginalLeaveTypes(updatedLeaveTypes);
	  console.log("JobLevelName :-",selectedJobLevel.name);
	  console.log( "LeaveTypes",leaveTypes);
	  

	  
      dispatch(
        showMessage({
          message: 'Leave types updated successfully',
          autoHideDuration: 6000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          variant: 'success'
        })
      );
      setIsLoading(false);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error updating leave types:', error);
      dispatch(
        showMessage({
          message: 'Failed to update leave types',
          autoHideDuration: 6000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          variant: 'error'
        })
      );
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setLeaveTypes([...originalLeaveTypes]);
    setHasUnsavedChanges(false);
  };

  if (isLoading) return <FuseLoading />;

  return (
    <div>
      <Paper
        className="flex flex-col flex-auto shadow-1 rounded-2xl overflow-hidden rounded-xl w-full h-full p-10"
        elevation={0}
      >
        <div className="flex items-center border-b-1 space-x-8 m-10">
          <FuseSvgIcon color="action" size={24}>
            heroicons-outline:adjustments-horizontal
          </FuseSvgIcon>
          <Typography className="text-2xl mb-3" color="text.secondary">
            Default Leave Form
          </Typography>
        </div>
        <div className="m-10 p-10">
          <FormControl fullWidth style={{ marginBottom: '2rem' }}>
            <InputLabel id="job-level-select-label">Job Level</InputLabel>
            <Select
              labelId="job-level-select-label"
              id="job-level-select"
              value={selectedJobLevel?.id || ''}
              label="Job Level"
              onChange={handleJobLevelChange}
            >
              {jobLevels.map((jobLevel) => (
                <MenuItem key={jobLevel.id} value={jobLevel.id}>
                  {jobLevel.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {leaveTypes.map((leaveType, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '3rem' }}>
              <TextField
                label="Leave Type"
                value={leaveType.employeeLeaveType}
                onChange={(e) => handleInputChange(index, 'employeeLeaveType', e.target.value)}
                error={!leaveType.employeeLeaveType}
                helperText={!leaveType.employeeLeaveType ? 'Leave Type is required' : ''}
                style={{ marginRight: '1rem' }}
              />
              <TextField
                label="Total Leaves"
                type="number"
                value={leaveType.totalLeaves}
                onChange={(e) => handleInputChange(index, 'totalLeaves', parseInt(e.target.value))}
                error={leaveType.totalLeaves <= 0}
                helperText={leaveType.totalLeaves <= 0 ? 'Total Leaves must be greater than 0' : ''}
                style={{ marginRight: '1rem' }}
              />
              <Button
                onClick={() => handleRemoveField(index)}
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Button startIcon={<AddIcon />} onClick={handleAddField} disabled={!selectedJobLevel}>
          Add Leave Type
        </Button>
        <div className="flex justify-end mt-4 space-x-4">
          {hasUnsavedChanges && (
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!selectedJobLevel || leaveTypes.some((lt) => !lt.employeeLeaveType || lt.totalLeaves <= 0)}
          >
            Save
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default DefaultLeaveForm;

