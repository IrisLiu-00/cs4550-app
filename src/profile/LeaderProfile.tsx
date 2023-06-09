import { Box, Divider, Grid, List, ListItem, ListItemButton, Stack, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTeam } from '../hooks/useTeams';
import { useUser } from '../hooks/useUser';
import { EditPanel } from './EditPanel';
import { EditTeamPanel } from './EditTeamPanel';
import { StoryQuery, useStories } from '../hooks/useStories';
import { StoryGrid } from './StoryGrid';
const BoldText = styled('span')`
  font-weight: bold;
`;
const TeamName = styled(Typography)`
  text-transform: uppercase;
  font-weight: bold;
`;

export const LeaderProfile = () => {
  const { user } = useUser();
  const { profileId } = useParams();
  const { user: profile } = useUser(profileId !== undefined ? parseInt(profileId) : undefined);
  const { team } = useTeam(profile?.teamId);
  const { stories } = useStories(StoryQuery.FEATURE, profile?.teamId);
  const canEdit = user?.id === profile?.id;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <TeamName variant="h5" sx={{ color: team?.color }} gutterBottom>
          {team?.id}
        </TeamName>
        <Typography>
          Moderated by <BoldText>{profile?.displayName}</BoldText>
        </Typography>
        <Typography>
          Score: <BoldText>{team?.score}</BoldText> points per member
        </Typography>
        {canEdit && <EditPanel />}
      </Grid>
      <Grid item xs={12} md={9}>
        {canEdit ? (
          <EditTeamPanel />
        ) : (
          <Stack>
            <Typography variant="h6" gutterBottom>
              About this team
            </Typography>
            <Typography>{team?.description}</Typography>
          </Stack>
        )}
        <Divider sx={{ my: 2 }} />

        <StoryGrid stories={stories} header={'Featured stories'} />
        <Typography variant="h6">Team Members</Typography>
        <List>
          <Divider />
          {team?.members.map((m) => (
            <Box key={m.id}>
              <ListItem disablePadding>
                <ListItemButton href={`/profile/${m.id}`}>{m.displayName}</ListItemButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
