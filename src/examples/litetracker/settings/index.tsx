import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import SettingsSidebar, { SETTINGS_SIDEBAR_WIDTH } from './SettingsSidebar';
import ProjectSettings from './ProjectSettings';
import ManageReviewTypes from './ManageReviewTypes';
import RecoverDeletedStories from './RecoverDeletedStories';
import { PlaceholderContainer, PlaceholderText } from "../shared/PlaceHolder";

const SettingsContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100%',
});

const ContentArea = styled(Box)({
  flexGrow: 1,
  marginLeft: SETTINGS_SIDEBAR_WIDTH,
  height: '100%',
  overflow: 'auto',
  backgroundColor: '#F5F5F5',
});

const SettingsTab = () => {
  const [activeView, setActiveView] = useState('project-settings');

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'project-settings':
        return <ProjectSettings />;
      case 'manage-review-types':
        return <ManageReviewTypes />;
      case 'recover-deleted-stories':
        return <RecoverDeletedStories />;
      default:
        return (
          <PlaceholderContainer>
            <PlaceholderText>Settings - {activeView}</PlaceholderText>
          </PlaceholderContainer>
        );
    }
  };

  return (
    <SettingsContainer>
      <SettingsSidebar activeView={activeView} onViewChange={handleViewChange} />
      <ContentArea>
        {renderContent()}
      </ContentArea>
    </SettingsContainer>
  );
};

export default SettingsTab;
