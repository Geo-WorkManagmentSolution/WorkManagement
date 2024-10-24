import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Autocomplete, InputAdornment } from '@mui/material';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
// import { useGetTeamMembersSettingsQuery, useUpdateTeamMemberSettingsMutation } from '../SettingsApi';
import { useDispatch } from 'react-redux';

function TeamTab() {
	// const { data: teamMembers } = useGetTeamMembersSettingsQuery({onCompleted: setTeamMember});
	// const [updateTeamMembers] = useUpdateTeamMemberSettingsMutation();
	const init = [
		{ email: 'inzi@up.com', name: 'inzi', avatar: '' },
		{ email: 'napul@up.com', name: 'napul', avatar: '' }
	];
	const [selectedCard, setSelectedCard] = useState<(typeof init)[0] | null>(null);
	const [teamMembers, setTeamMember] = useState(init);
	const dispatch = useDispatch();

	function handleRemoveMember(email: string) {
		// updateTeamMembers(teamMembers?.filter((member) => member.email !== email));
		return setTeamMember(teamMembers?.filter((member) => member.email !== email));
	}

	const handleSearch = (event: React.SyntheticEvent, value: (typeof init)[0] | null) => {
		setSelectedCard(value);
	};

	const addTeamMember = (event: React.SyntheticEvent) => {
		if (teamMembers.some((e, i, a) => e.email === selectedCard.email)) {
			dispatch(showMessage({message:'Team member is already added.',variant:'error'}));
		} else setTeamMember((prev) => [...prev, selectedCard]);
	};

	return (
		<div>
			<Autocomplete
				options={[
					{ email: 'a@up.com', name: 'a', avatar: '' },
					{ email: 'b@up.com', name: 'b', avatar: '' }
				]}
				getOptionLabel={(option) => option.email}
				renderOption={(props, option) => (
					<ListItem
						{...props}
						divider
						key={option.email}
						disablePadding
						className="py-12 ml-5 cursor-pointer flex flex-col items-start sm:items-center  sm:flex-row space-y-16 sm:space-y-0"
					>
						<div className="flex flex-1 items-center">
							<ListItemAvatar>
								<Avatar
									src={option.avatar}
									alt={`Avatar °${option.name}`}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={option.name}
								secondary={option.email}
								classes={{ secondary: 'truncate' }}
							/>
						</div>
					</ListItem>
				)}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search team member"
						variant="outlined"
						InputLabelProps={{
							shrink: true
						}}
						value={params.value || ''}
						placeholder="Enter email or name"
						InputProps={{
							...params.InputProps,
							startAdornment: (
								<InputAdornment position="start">
									<FuseSvgIcon size={20}>heroicons-outline:user</FuseSvgIcon>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={(e) => addTeamMember(e)}>
										<FuseSvgIcon size={20}>heroicons-outline:plus-circle</FuseSvgIcon>
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				)}
				onChange={handleSearch}
				value={selectedCard}
				className="w-full mb-24"
				fullWidth
			/>

			<Divider />
			{teamMembers?.length === 0 && (
				<Typography
					className="text-center my-32"
					color="textSecondary"
				>
					No team members found.
				</Typography>
			)}
			<List>
				{teamMembers?.map((member) => (
					<ListItem
						divider
						key={member.email}
						disablePadding
						className="py-12 flex flex-col items-start sm:items-center  sm:flex-row space-y-16 sm:space-y-0"
					>
						<div className="flex flex-1 items-center">
							<ListItemAvatar>
								<Avatar
									src={member.avatar}
									alt={`Avatar °${member.name}`}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={member.name}
								secondary={member.email}
								classes={{ secondary: 'truncate' }}
							/>
						</div>

						<div className="flex items-center space-x-4">
							<IconButton onClick={() => handleRemoveMember(member.email)}>
								<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
							</IconButton>
						</div>
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default TeamTab;
