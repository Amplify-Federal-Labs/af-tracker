import { Box, Chip } from "@mui/material";
import type { HTMLAttributes } from "react";

interface LabelOptionProps extends HTMLAttributes<HTMLLIElement> {
  key: number;
  option: string;
}

const LabelOption = ({ option, ...props }: LabelOptionProps) => {
  const { key, ...optionProps } = props;
  
  return (
    <Box
      key={key}
      component="li"
      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
      {...optionProps}
    >
      <Chip size="small" label={option} />
    </Box>
  );
};

export default LabelOption;