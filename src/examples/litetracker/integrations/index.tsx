import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const IntegrationsContainer = styled(Box)({
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
    <IntegrationsContainer>
      <PlaceholderText>Integrations</PlaceholderText>
    </IntegrationsContainer>
  );
};

export default IntegrationsTab;
