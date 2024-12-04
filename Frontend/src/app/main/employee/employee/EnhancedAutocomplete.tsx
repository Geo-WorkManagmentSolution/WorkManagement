import React, { useState, useEffect, forwardRef } from 'react';
import {
	Autocomplete,
	Chip,
	AutocompleteProps,
	createFilterOptions,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextFieldProps,
	AutocompleteChangeReason
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Option {
	id: string | number;
	name: string;
	inputValue?: string;
}

type EnhancedAutocompleteProps<
	T,
	Multiple extends boolean | undefined,
	DisableClearable extends boolean | undefined,
	FreeSolo extends boolean | undefined
> = Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> & {
	label: string;
	placeholder?: string;
	attachedLabel?: string;
	onOptionAdd?: (newOption: Omit<Option, 'id'>) => Promise<T>;
	renderInput: (params: TextFieldProps) => React.ReactNode;
};

const filter = createFilterOptions<Option>();

const EnhancedAutocomplete = forwardRef<HTMLDivElement, EnhancedAutocompleteProps<Option, boolean, boolean, boolean>>(
	(
		{
			label,
			placeholder,
			multiple,
			attachedLabel,
			onOptionAdd,
			renderInput,
			options = [],
			onChange,
			value,
			...props
		},
		ref
	) => {
		const [dialogOpen, setDialogOpen] = useState(false);
		const [newOption, setNewOption] = useState<Omit<Option, 'id'> | null>(null);
		const [isAdding, setIsAdding] = useState(false);
		const [localOptions, setLocalOptions] = useState<Option[]>(options);
		useEffect(() => {
			setLocalOptions(options);
		}, [options]);
		const handleChange = async (
			event: React.SyntheticEvent,
			newValue: Option | Option[] | null,
			reason: AutocompleteChangeReason
		) => {
			if (typeof newValue === 'string') {
				return;
			}

			if (newValue && 'inputValue' in newValue) {
				setNewOption({ name: newValue.inputValue });
				setDialogOpen(true);
			} else if (onChange) {
				onChange(event, newValue, reason);
			}
		};
		const handleConfirmNewOption = async () => {
			if (newOption && onOptionAdd) {
				setIsAdding(true);
				try {
					const addedOption = await onOptionAdd(newOption);
					setLocalOptions((prevOptions) => [...prevOptions, addedOption]);

					if (onChange) {
						onChange({} as React.SyntheticEvent, multiple ? [addedOption] : addedOption, 'createOption');
					}
				} catch (error) {
					console.error('Failed to add new option:', error);
				} finally {
					setIsAdding(false);
				}
			}

			setDialogOpen(false);
			setNewOption(null);
		};
		const canAddNewOption = !multiple || (Array.isArray(value) && value.length === 0);
		return (
			<>
				{' '}
				<Autocomplete
          {...props}
          ref={ref}
          options={localOptions}
          value={localOptions?.find((c) => c.id === value) || null}
          multiple={multiple}
          getOptionLabel={(option: Option | string) => {
            if (typeof option === 'string') {
              return option;
            }

            if (option.inputValue) {
              return option.inputValue;
            }

            return option.name;
          }}
          isOptionEqualToValue={(option: Option, value: Option) => option.id === value?.id}
          filterOptions={(options: Option[], params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option.name);

            if (inputValue !== '' && !isExisting && canAddNewOption) {
              filtered.push({ inputValue, name: `Add "${inputValue}"`, id: 'new' });
            }

            return filtered;
          }}
          renderOption={(props, option: Option) => (
            <li {...props} key={option.id}>
              {option.inputValue ? (
                <>
                  <AddIcon sx={{ mr: 1 }} /> {option.name}
                </>
              ) : (
                option.name
              )}
            </li>
          )}
          renderInput={(params) => renderInput({ ...params, label, placeholder })}
          renderTags={(value: Option[], getTagProps) =>
            value.map((option: Option, index: number) => (
              <Chip
                variant="outlined"
                label={option.name}
                {...getTagProps({ index })}
                key={option.id}
              />
            ))
          }
          onChange={handleChange}
          noOptionsText={
            canAddNewOption ? (
              'No options'
            ) : (
              <Typography color="text.secondary">Remove the selected option to add a new one</Typography>
            )
          }
        />{' '}
				<Dialog
					open={dialogOpen}
					onClose={() => setDialogOpen(false)}
				>
					{' '}
					<DialogTitle>Add New Option</DialogTitle>{' '}
					<DialogContent>
						{' '}
						<Typography>
							{' '}
							Do you want to add "{newOption?.name}" as a new option?{' '}
							{attachedLabel && (
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{' '}
									{attachedLabel}{' '}
								</Typography>
							)}{' '}
						</Typography>{' '}
					</DialogContent>{' '}
					<DialogActions>
						{' '}
						<Button
							onClick={() => setDialogOpen(false)}
							disabled={isAdding}
						>
							{' '}
							Cancel{' '}
						</Button>{' '}
						<Button
							onClick={handleConfirmNewOption}
							autoFocus
							disabled={isAdding}
						>
							{' '}
							{isAdding ? 'Adding...' : 'Add'}{' '}
						</Button>{' '}
					</DialogActions>{' '}
				</Dialog>{' '}
			</>
		);
	}
);
EnhancedAutocomplete.displayName = 'EnhancedAutocomplete';
export default EnhancedAutocomplete;
