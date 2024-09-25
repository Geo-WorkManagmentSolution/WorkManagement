import React, { useState } from 'react';
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Box,
	Typography,
	IconButton,
	Paper,
	Grid,
	Checkbox,
	ListItemText,
	OutlinedInput,
	Switch
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const fields = [
	{ name: 'title', type: 'text' },
	{ name: 'description', type: 'text' },
	{ name: 'author', type: 'text' },
	{ name: 'category', type: 'select', options: ['Technology', 'Science', 'Arts', 'Business'] },
	{ name: 'tags', type: 'multiselect', options: ['Frontend', 'Backend', 'Mobile', 'Web', 'AI', 'Database'] },
	{ name: 'published_date', type: 'date' },
	{ name: 'price', type: 'number' },
	{ name: 'is_featured', type: 'boolean' }
];

const operators = {
	text: ['contains', 'equals', 'starts_with', 'ends_with'],
	date: ['equals', 'before', 'after'],
	number: ['equals', 'greater_than', 'less_than'],
	select: ['equals', 'not_equals'],
	multiselect: ['includes_all', 'includes_any', 'excludes'],
	boolean: ['equals']
};

const validateValue = (type, value) => {
	switch (type) {
		case 'text':
			return typeof value === 'string';
		case 'date':
			return !Number.isNaN(Date.parse(value));
		case 'number':
			return !Number.isNaN(parseFloat(value));
		case 'select':
			return typeof value === 'string';
		case 'multiselect':
			return Array.isArray(value);
		case 'boolean':
			return typeof value === 'boolean';
		default:
			return false;
	}
};

export default function AdvanceSearchCriteria() {
	const [searchTerms, setSearchTerms] = useState([{ field: 'title', operator: 'contains', value: '', type: 'text' }]);
	const [termOperators, setTermOperators] = useState([]);
	const [query, setQuery] = useState('');

	const handleAddSearchTerm = () => {
		setSearchTerms([...searchTerms, { field: 'title', operator: 'contains', value: '', type: 'text' }]);

		if (searchTerms.length > 0) {
			setTermOperators([...termOperators, 'AND']);
		}
	};

	const handleRemoveSearchTerm = (index) => {
		const newSearchTerms = searchTerms.filter((_, i) => i !== index);
		const newTermOperators = termOperators.filter((_, i) => i !== index - 1);
		setSearchTerms(newSearchTerms);
		setTermOperators(newTermOperators);
	};

	const handleSearchTermChange = (index, field, value) => {
		const newSearchTerms = [...searchTerms];

		if (field === 'field') {
			const selectedField = fields.find((f) => f.name === value);
			newSearchTerms[index] = {
				field: value,
				operator: operators[selectedField.type][0],
				value: selectedField.type === 'multiselect' ? [] : '',
				type: selectedField.type
			};
		} else {
			newSearchTerms[index] = { ...newSearchTerms[index], [field]: value };
		}

		setSearchTerms(newSearchTerms);
	};

	const handleTermOperatorChange = (index, value) => {
		const newTermOperators = [...termOperators];
		newTermOperators[index] = value;
		setTermOperators(newTermOperators);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validSearchTerms = searchTerms.filter((term) => validateValue(term.type, term.value));

		const queryObject = {
			criteria: validSearchTerms.map((term, index) => ({
				field: term.field,
				operator: term.operator,
				value: term.value,
				...(index < validSearchTerms.length - 1 ? { nextOperator: termOperators[index] } : {})
			}))
		};

		setQuery(JSON.stringify(queryObject, null, 2));
	};

	const renderValueInput = (term, index) => {
		switch (term.type) {
			case 'date':
				return (
					<TextField
						type="date"
						label="Date"
						value={term.value}
						onChange={(e) => handleSearchTermChange(index, 'value', e.target.value)}
						fullWidth
						InputLabelProps={{
							shrink: true
						}}
					/>
				);
			case 'number':
				return (
					<TextField
						type="number"
						label="Value"
						value={term.value}
						onChange={(e) => handleSearchTermChange(index, 'value', e.target.value)}
						fullWidth
					/>
				);
			case 'select':
				return (
					<FormControl fullWidth>
						<InputLabel>Value</InputLabel>
						<Select
							value={term.value}
							label="Value"
							onChange={(e) => handleSearchTermChange(index, 'value', e.target.value)}
						>
							{fields
								.find((f) => f.name === term.field)
								.options.map((option) => (
									<MenuItem
										key={option}
										value={option}
									>
										{option}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				);
			case 'multiselect':
				return (
					<FormControl fullWidth>
						<InputLabel>Value</InputLabel>
						<Select
							multiple
							value={term.value}
							onChange={(e) => handleSearchTermChange(index, 'value', e.target.value)}
							input={<OutlinedInput label="Value" />}
							renderValue={(selected) => selected.join(', ')}
						>
							{fields
								.find((f) => f.name === term.field)
								.options.map((option) => (
									<MenuItem
										key={option}
										value={option}
									>
										<Checkbox checked={term.value.indexOf(option) > -1} />
										<ListItemText primary={option} />
									</MenuItem>
								))}
						</Select>
					</FormControl>
				);
			case 'boolean':
				return (
					<FormControl fullWidth>
						<Typography
							component="label"
							htmlFor={`boolean-switch-${index}`}
						>
							Value
						</Typography>
						<Switch
							id={`boolean-switch-${index}`}
							checked={term.value}
							onChange={(e) => handleSearchTermChange(index, 'value', e.target.checked)}
							inputProps={{ 'aria-label': 'Boolean value' }}
						/>
					</FormControl>
				);
			default:
				return (
					<TextField
						type="text"
						label="Value"
						value={term.value}
						onChange={(e) => handleSearchTermChange(index, 'value', e.target.value)}
						fullWidth
					/>
				);
		}
	};

	return (
		<Paper
			elevation={3}
			sx={{ p: 3, maxWidth: 800, mx: 'auto' }}
		>
			<Typography
				variant="h4"
				gutterBottom
			>
				Advanced Search
			</Typography>
			<form onSubmit={handleSubmit}>
				{searchTerms.map((term, index) => (
					<Box
						key={index}
						sx={{ mb: 2 }}
					>
						<Grid
							container
							spacing={2}
							alignItems="center"
						>
							<Grid
								item
								xs={12}
								sm={3}
							>
								<FormControl fullWidth>
									<InputLabel>Field</InputLabel>
									<Select
										value={term.field}
										label="Field"
										onChange={(e) => handleSearchTermChange(index, 'field', e.target.value)}
									>
										{fields.map((field) => (
											<MenuItem
												key={field.name}
												value={field.name}
											>
												{field.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={12}
								sm={3}
							>
								<FormControl fullWidth>
									<InputLabel>Operator</InputLabel>
									<Select
										value={term.operator}
										label="Operator"
										onChange={(e) => handleSearchTermChange(index, 'operator', e.target.value)}
									>
										{operators[term.type].map((op) => (
											<MenuItem
												key={op}
												value={op}
											>
												{op}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={12}
								sm={4}
							>
								{renderValueInput(term, index)}
							</Grid>
							<Grid
								item
								xs={12}
								sm={2}
							>
								{index > 0 && (
									<IconButton
										onClick={() => handleRemoveSearchTerm(index)}
										color="error"
									>
										<DeleteIcon />
									</IconButton>
								)}
							</Grid>
						</Grid>
						{index < searchTerms.length - 1 && (
							<Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
								<FormControl>
									<Select
										value={termOperators[index]}
										onChange={(e) => handleTermOperatorChange(index, e.target.value)}
										displayEmpty
									>
										<MenuItem value="AND">AND</MenuItem>
										<MenuItem value="OR">OR</MenuItem>
									</Select>
								</FormControl>
							</Box>
						)}
					</Box>
				))}
				<Box sx={{ mt: 2, mb: 2 }}>
					<Button
						variant="outlined"
						startIcon={<AddIcon />}
						onClick={handleAddSearchTerm}
						fullWidth
					>
						Add Search Term
					</Button>
				</Box>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
				>
					Generate Query
				</Button>
			</form>
			{/* {query && (
				<Box sx={{ mt: 4 }}>
					<Typography
						variant="h6"
						gutterBottom
					>
						Generated Query (JSON)
					</Typography>
					<Paper
						elevation={1}
						sx={{ p: 2, bgcolor: 'grey.100' }}
					>
						<pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
							<code>{query}</code>
						</pre>
					</Paper>
				</Box>
			)} */}
		</Paper>
	);
}
