import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

type TemplateType = "bugReport" | "userStory";
const BUG_REPORT_TEMPLATE: string = `### Steps to reproduce
1. 
2. 
3. 

### Expected


### Actual

`;

const USER_STORY_TEMPLATE: string = `### Why


**As personaName**
**I want**
**So that**

### Acceptance Criteria

\`\`\`gherkin
Scenario: 
Given
When
Then
\`\`\`

**Notes:**
`;

const templates: Record<TemplateType, string> = {
  bugReport: BUG_REPORT_TEMPLATE,
  userStory: USER_STORY_TEMPLATE,
};

interface TemplateMenuProps {
  open: boolean;
  anchorEl: HTMLElement;
  onSelect: (template: string) => void;
  onClose: () => void;
}

const TemplateMenu = (props: TemplateMenuProps) => {
  const [open, setOpen] = useState(props.open);
  const handleSelect = (seltectedTemplate: TemplateType) => {
    props.onSelect(templates[seltectedTemplate]);
    setOpen(false);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={props.anchorEl}
      open={open}
      onClose={props.onClose}
    >
      <MenuItem disabled>Select a template</MenuItem>
      <MenuItem onClick={() => handleSelect("bugReport")}>Bug Report</MenuItem>
      <MenuItem onClick={() => handleSelect("userStory")}>User Story</MenuItem>
    </Menu>
  );
};

export default TemplateMenu;
