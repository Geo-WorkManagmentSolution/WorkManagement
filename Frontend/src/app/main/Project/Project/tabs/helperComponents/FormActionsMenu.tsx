import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState, MouseEvent } from 'react';
import { useDeleteApiProjectTaskByTaskIdAndProjectIdMutation } from '../../../ProjectApi';

type FormActionsMenuProps = {
  taskId: string;
  projectId: number;
};

function FormActionsMenu(props: FormActionsMenuProps) {
  const { taskId, projectId } = props;
  const navigate = useNavigate();
  const [deleteTask] = useDeleteApiProjectTaskByTaskIdAndProjectIdMutation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleRemoveTask() {
    deleteTask({ id: taskId, projectId })
      .unwrap()
      .then(() => {
        navigate(`/apps/projects/${projectId}`);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FuseSvgIcon>heroicons-outline:ellipsis-vertical</FuseSvgIcon>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleRemoveTask}>
          <ListItemIcon className="min-w-36">
            <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default FormActionsMenu;

