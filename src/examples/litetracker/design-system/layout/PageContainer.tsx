/**
 * PageContainer - Base container for page layouts
 *
 * @example
 * <PageContainer>
 *   <Sidebar />
 *   <ContentArea>...</ContentArea>
 * </PageContainer>
 */

import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface PageContainerProps extends BoxProps {
  children: React.ReactNode;
}

const StyledBox = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100%',
});

export const PageContainer = ({ children, ...props }: PageContainerProps) => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

export default PageContainer;
