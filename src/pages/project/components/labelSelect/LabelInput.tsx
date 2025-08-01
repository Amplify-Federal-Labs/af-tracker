import { Chip, Stack, TextField } from "@mui/material";
import type { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";

interface LabelInputProps {
  params: AutocompleteRenderInputParams;
  selectedLabels: string[];
  onDelete: (labelToDelete: string) => void;
}

const LabelInput = ({ params, selectedLabels, onDelete }: LabelInputProps) => {
  return (
    <Stack direction="row">
      {selectedLabels.map((label) => (
        <Chip
          key={label}
          size="small"
          label={label}
          onDelete={() => onDelete(label)}
        />
      ))}
      <TextField {...params} label="Add label" />
    </Stack>
  );
};

export default LabelInput;
