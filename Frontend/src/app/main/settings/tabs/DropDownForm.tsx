import React, { useState, useMemo } from 'react';
import {
  Paper,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  ListItemIcon,
} from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AddIcon from '@mui/icons-material/Add';

interface DropdownItem {
  name: string;
}

interface DropdownCategory {
  id: string;
  name: string;
  items: DropdownItem[];
}

const initialCategories: DropdownCategory[] = [
  {
    id: 'designation',
    name: 'Designation',
    items: [
      { name: 'Junior Developer' },
      { name: 'Senior Developer' },
      { name: 'Manager' },
    ],
  },
  {
    id: 'department',
    name: 'Department',
    items: [
      { name: 'IT' },
      { name: 'HR' },
      { name: 'Finance' },
    ],
  },
];

function DropDownForm() {
  const [categories, setCategories] = useState<DropdownCategory[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatingItemName, setUpdatingItemName] = useState<string | null>(null);

  const handleAddItem = () => {
    if (selectedCategory && itemName.trim()) {
      setCategories(prevCategories =>
        prevCategories.map(category => {
          if (category.id === selectedCategory) {
            if (isUpdating) {
              return {
                ...category,
                items: category.items.map(item =>
                  item.name === updatingItemName ? { name: itemName } : item
                ),
              };
            } else {
              return {
                ...category,
                items: [...category.items, { name: itemName }],
              };
            }
          }
          return category;
        })
      );
      setItemName('');
      setIsUpdating(false);
      setUpdatingItemName(null);
    }
  };

  const handleDeleteItem = (itemName: string) => {
    if (selectedCategory) {
      setCategories(prevCategories =>
        prevCategories.map(category => {
          if (category.id === selectedCategory) {
            return {
              ...category,
              items: category.items.filter(item => item.name !== itemName),
            };
          }
          return category;
        })
      );
    }
  };

  const handleUpdateItem = (item: DropdownItem) => {
    setItemName(item.name);
    setIsUpdating(true);
    setUpdatingItemName(item.name);
  };

  const handleSaveChanges = () => {
    const dataToSend = categories.map(category => ({
      category: category.name,
      items: category.items.map(item => item.name)
    }));
    console.log('Data to be sent to backend:', dataToSend);
    // Here you would typically make an API call to save the data
  };

  const columns = useMemo<MRT_ColumnDef<DropdownItem>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
    ],
    []
  );

  return (
    <Paper className="p-24 max-w-5xl mx-auto">
      <div className="flex items-center border-b-1 space-x-8 m-10">
        <FuseSvgIcon color="action" size={24}>
          heroicons-outline:adjustments-horizontal
        </FuseSvgIcon>
        <Typography className="text-2xl mb-3" color="text.secondary">
          Dropdown Form
        </Typography>
      </div>
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="demo-simple-select-filled-label">Catagory</InputLabel>
          <Select
          label="Catagory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as string)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label={isUpdating ? 'Update Name' : 'Add Name'}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            startIcon={<AddIcon />}
          >
            {isUpdating ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
      {selectedCategory && (
        <DataTable
        enableTopToolbar={false}
          enableRowSelection={false}
          data={categories.find((c) => c.id === selectedCategory)?.items || []}
          columns={columns}
          renderRowActionMenuItems={({ closeMenu, row, table }) => [
            <MenuItem
              key={`remove-${row.original.name}`}
              onClick={() => {
                handleDeleteItem(row.original.name);
                closeMenu();
                table.resetRowSelection();
              }}
            >
              <ListItemIcon>
                <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
              </ListItemIcon>
              Remove
            </MenuItem>,
            <MenuItem
              key={`update-${row.original.name}`}
              onClick={() => {
                handleUpdateItem(row.original);
                closeMenu();
                table.resetRowSelection();
              }}
            >
              <ListItemIcon>
                <FuseSvgIcon>heroicons-outline:arrow-path</FuseSvgIcon>
              </ListItemIcon>
              Update
            </MenuItem>,
          ]}
        />
      )}
      <Button
        variant="contained"
        onClick={handleSaveChanges}
        className="mt-24"
        style={{ backgroundColor: '#1976d2', color: 'white' }}
      >
        Save
      </Button>
    </Paper>
  );
}

export default DropDownForm;

