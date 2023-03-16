import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ArtInfo } from '../types';
import { Box, CardActionArea, styled } from '@mui/material';

const StyledActionArea = styled(CardActionArea)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// TODO: display number of comments, latest activity time?
export const StoryCard = ({ artInfo }: { artInfo: ArtInfo }) => {
  return (
    <Card sx={{ height: '360px', display: 'flex', flexDirection: 'column' }}>
      <StyledActionArea href={`/details/${artInfo.id}`}>
        <CardMedia component="img" image={artInfo.imageUrl} alt={artInfo.thumbnail.alt_text} height="200px" />
        <StyledCardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h2" mb={2}>
            {truncate(artInfo.title, 30)}
          </Typography>
          <div>
            <Typography>{artInfo.lines} Lines</Typography>
            <Typography>Updated {artInfo.updatedAt.toLocaleDateString()}</Typography>
          </div>
        </StyledCardContent>
      </StyledActionArea>
    </Card>
  );
};

function truncate(text: string, length: number) : string {
  return text.length > length ? text.slice(0, length) + '...' : text;
}