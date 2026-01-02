import {
  Box,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const SettingsContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
}));

const PageTitle = styled(Typography)({
  fontSize: 32,
  fontWeight: 700,
  color: 'grey.900',
  marginBottom: 16,
});

const BackLink = styled(Link)({
  fontSize: 18,
  color: 'primary.main',
  textDecoration: 'none',
  marginBottom: 32,
  display: 'inline-block',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const WarningBox = styled(Alert)({
  marginBottom: 32,
  backgroundColor: '#E3F2FD',
  border: '1px solid #2196F3',
  borderRadius: 4,
  '& .MuiAlert-message': {
    fontSize: 14,
    color: 'grey.900',
  },
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 700,
  color: 'grey.900',
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: '2px solid #E0E0E0',
}));

const EmptyState = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  color: 'text.disabled',
}));

const RecoverDeletedStories = () => {
  return (
    <SettingsContent>
      <PageTitle>Recover Deleted Stories</PageTitle>
      <BackLink href="#">Back to Stories</BackLink>

      <WarningBox severity="info" icon={false}>
        <Typography component="span" sx={{ fontWeight: 700, color: 'info.main' }}>
          Warning:
        </Typography>{' '}
        When you recover a story, all users currently using your project will be forced to reload the page and may lose their updates.
      </WarningBox>

      <SectionTitle>Recently Deleted Stories</SectionTitle>

      <EmptyState>
        <Typography sx={{ fontSize: 16, color: 'text.disabled' }}>
          No deleted stories found
        </Typography>
      </EmptyState>
    </SettingsContent>
  );
};

export default RecoverDeletedStories;
