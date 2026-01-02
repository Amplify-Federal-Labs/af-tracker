import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const PlaceholderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const PlaceholderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 24,
  fontWeight: 400,
}));

const IntegrationsTab = () => {
  return (
    <PlaceholderContainer>
      <PlaceholderText>Integrations</PlaceholderText>
    </PlaceholderContainer>
  );
};

export default IntegrationsTab;
