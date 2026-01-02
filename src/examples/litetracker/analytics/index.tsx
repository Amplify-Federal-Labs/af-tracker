import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import AnalyticsSidebar, { ANALYTICS_SIDEBAR_WIDTH } from './AnalyticsSidebar';
import { PlaceholderContainer, PlaceholderText } from "../shared/PlaceHolder";

const AnalyticsContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100%',
});

const ContentArea = styled(Box)({
  flexGrow: 1,
  marginLeft: ANALYTICS_SIDEBAR_WIDTH,
  height: '100%',
  overflow: 'auto',
});

const AnalyticsTab = () => {
  const [activeView, setActiveView] = useState('project-overview');

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <AnalyticsContainer>
      <AnalyticsSidebar activeView={activeView} onViewChange={handleViewChange} />
      <ContentArea>
        <PlaceholderContainer>
          <PlaceholderText>Analytics - {activeView}</PlaceholderText>
        </PlaceholderContainer>
      </ContentArea>
    </AnalyticsContainer>
  );
};

export default AnalyticsTab;