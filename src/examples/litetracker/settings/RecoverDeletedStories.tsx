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

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: 32,
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: 16,
}));

const BackLink = styled(Link)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  marginBottom: 32,
  display: 'inline-block',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const WarningBox = styled(Alert)(({ theme }) => ({
  marginBottom: 32,
  backgroundColor: theme.palette.info.light,
  border: `1px solid ${theme.palette.info.main}`,
  borderRadius: 4,
  '& .MuiAlert-message': {
    fontSize: 14,
    color: theme.palette.text.primary,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `2px solid ${theme.palette.divider}`,
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
