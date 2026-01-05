/**
 * TextButton - No background button variant
 *
 * @example
 * <TextButton onClick={handleClick}>Learn More</TextButton>
 */

import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export type TextButtonProps = ButtonProps;

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.action.brownHover,
  },
}));

export const TextButton = (props: TextButtonProps) => {
  return <StyledButton variant="text" {...props} />;
};

export default TextButton;
