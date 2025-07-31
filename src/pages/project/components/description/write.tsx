import { IconButton, Stack, TextField, Box } from "@mui/material";
import { useState } from "react";
import DocumentIcon from "@mui/icons-material/EditDocument";
import TemplateMenu from "./templateMenu";

interface WriteProps {
  text: string;
  onChange: (text: string) => void;
}

const Write = (props: WriteProps) => {
  const [text, setText] = useState(props.text);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChnage = (text: string) => {
    setText(text);
    props.onChange(text);
  };

  const handleDocumentClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTemplateSelect = (template: string) => {
    handleChnage(template);
    setAnchorEl(null);
  };

  return (
    <Stack spacing={2} direction="column">
      <TextField
        value={text}
        onChange={(event) => handleChnage(event.target.value)}
        fullWidth
        multiline
        helperText="Add a description"
      />
      <Box sx={{ alignSelf: "flex-start" }}>
        <IconButton onClick={handleDocumentClick}>
          <DocumentIcon />
        </IconButton>
      </Box>
      {anchorEl && (
        <TemplateMenu
          open={open}
          anchorEl={anchorEl}
          onSelect={handleTemplateSelect}
          onClose={handleMenuClose}
        />
      )}
    </Stack>
  );
};

export default Write;
