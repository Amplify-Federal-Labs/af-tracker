import { Box, Tab, Tabs } from "@mui/material";
import Write from "./write";
import Preview from "./preview";
import { useState } from "react";

interface DescriptionProps {
  text: string;
  onChange: (text: string) => void;
}

function a11yProps(index: number) {
  return {
    id: `description-tab-${index}`,
    "aria-controls": `description-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`description-tabpanel-${index}`}
      aria-labelledby={`description-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Description = (props: DescriptionProps) => {
  const [value, setValue] = useState(0);
  const [text, setText] = useState(props.text);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTextChange = (text: string) => {
    setText(text);
    props.onChange(text);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleTabChange}
        aria-label="description tabs"
      >
        <Tab label="Write" {...a11yProps(0)} />
        <Tab label="Preview" {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Write text={text} onChange={handleTextChange} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Preview source={text} />
      </CustomTabPanel>
    </>
  );
};

export default Description;
