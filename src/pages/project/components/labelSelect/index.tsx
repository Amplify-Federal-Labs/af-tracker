import { Autocomplete } from "@mui/material";
import { useState } from "react";
import LabelOption from "./LabelOption";
import LabelInput from "./LabelInput";

interface LabelSelectProps {
  availableLabels: string[];
  selectedLabels: string[];
  onAddNewLabel: (label: string) => void;
  onChange: (labels: string[]) => void;
}

const LabelSelect = (props: LabelSelectProps) => {
  const [selectedLabels, setSelectedLabels] = useState(props.selectedLabels);

  const handleDelete = (labelToDelete: string) => {
    const newLabels = selectedLabels.filter((x) => x != labelToDelete);
    setSelectedLabels(newLabels);
    props.onChange(newLabels);
  };
  const handleAdd = (labelToAdd: string) => {
    if (props.availableLabels.some((x) => x == labelToAdd)) {
      props.onAddNewLabel(labelToAdd);
    }

    const newLabels = [...selectedLabels, labelToAdd];
    setSelectedLabels(newLabels);
    props.onChange(newLabels);
  };

  return (
    <Autocomplete
      options={props.availableLabels}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          handleAdd(newValue);
        }
      }}
      renderOption={(props, option) => (
        <LabelOption {...props} option={option} />
      )}
      renderInput={(params) => (
        <LabelInput
          params={params}
          selectedLabels={selectedLabels}
          onDelete={handleDelete}
        />
      )}
      filterOptions={(options, state) => {
        const matches = options.filter(
          (option) => option.indexOf(state.inputValue) > 0
        );
        if (matches.length > 0) {
          return matches;
        } else {
          return [state.inputValue];
        }
      }}
      freeSolo
      selectOnFocus
    />
  );
};

export default LabelSelect;
