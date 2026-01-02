import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopNav from './TopNav';
import type { ReactNode } from 'react';

interface LiteTrackerLayoutProps {
  children: ReactNode;
  activeTab?: number;
  onTabChange?: (tab: number) => void;
}

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const BottomContent = styled(Box)({
  display: 'flex',
  flex: 1,
  marginTop: 50, // Height of top nav
  height: 'calc(100vh - 50px)',
  overflow: 'hidden',
});

const LiteTrackerLayout = ({
  children,
  activeTab,
  onTabChange,
}: LiteTrackerLayoutProps) => {
  return (
    <LayoutRoot>
      <TopNav activeTab={activeTab} onTabChange={onTabChange} />
      <BottomContent>{children}</BottomContent>
    </LayoutRoot>
  );
};

export default LiteTrackerLayout;
