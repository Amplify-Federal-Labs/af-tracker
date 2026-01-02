/**
 * PageTitle - Large page title typography
 *
 * @example
 * <PageTitle>Project Settings</PageTitle>
 */

import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface PageTitleProps extends TypographyProps {
  children: React.ReactNode;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const PageTitle = ({ children, ...props }: PageTitleProps) => {
  return (
    <StyledTypography component="h1" {...props}>
      {children}
    </StyledTypography>
  );
};

export default PageTitle;
