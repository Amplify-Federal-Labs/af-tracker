import { useState } from 'react';
import SettingsSidebar, { SETTINGS_SIDEBAR_WIDTH } from './SettingsSidebar';
import ProjectSettings from './ProjectSettings';
import ManageReviewTypes from './ManageReviewTypes';
import RecoverDeletedStories from './RecoverDeletedStories';
import { PageContainer, ContentArea, EmptyState } from '../design-system';

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
        return <EmptyState message={`Settings - ${activeView}`} />;
    }
  };

  return (
    <PageContainer>
      <SettingsSidebar activeView={activeView} onViewChange={handleViewChange} />
      <ContentArea marginLeft={SETTINGS_SIDEBAR_WIDTH}>
        {renderContent()}
      </ContentArea>
    </PageContainer>
  );
};

export default SettingsTab;
