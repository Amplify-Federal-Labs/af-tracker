import { Box } from '@mui/material';
import TopNav from './TopNav';
import type { ReactNode } from 'react';

interface LiteTrackerLayoutProps {
  children: ReactNode;
  activeTab?: number;
  onTabChange?: (tab: number) => void;
}

const LiteTrackerLayout = ({
  children,
  activeTab,
  onTabChange,
}: LiteTrackerLayoutProps) => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
      })}
    >
      <TopNav activeTab={activeTab} onTabChange={onTabChange} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          marginTop: 50, // Height of top nav
          height: 'calc(100vh - 50px)',
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LiteTrackerLayout;

