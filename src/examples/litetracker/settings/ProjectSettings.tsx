import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const SettingsContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 900,
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 500,
  color: 'grey.900',
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: '2px solid #E0E0E0',
}));

const FormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
}));

const FormLabel = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: 'grey.900',
  minWidth: 200,
  textAlign: 'right',
});

const StyledTextField = styled(TextField)({
  backgroundColor: '#FFFFFF',
  '& .MuiInputBase-input': {
    color: 'grey.900',
    fontSize: 14,
  },
});

const StyledSelect = styled(Select)({
  backgroundColor: '#FFFFFF',
  color: 'grey.900',
  fontSize: 14,
});

const HelpText = styled(Typography)({
  fontSize: 13,
  color: 'grey.700',
  marginLeft: 216,
});

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  paddingTop: theme.spacing(2),
  borderTop: '1px solid #E0E0E0',
}));

const SaveButton = styled(Button)({
  backgroundColor: '#4CAF50',
  color: '#FFFFFF',
  textTransform: 'none',
  padding: '8px 24px',
  fontSize: 14,
  '&:hover': {
    backgroundColor: '#45a049',
  },
});

const CancelButton = styled(Button)({
  color: 'text.disabled',
  textTransform: 'none',
  padding: '8px 24px',
  fontSize: 14,
});

const ProjectSettings = () => {
  const [projectTitle, setProjectTitle] = useState('Tracker Tracker');
  const [enableTasks, setEnableTasks] = useState(true);
  const [startIterationsOn, setStartIterationsOn] = useState('Monday');
  const [iterationLength, setIterationLength] = useState('1');
  const [pointScale, setPointScale] = useState('Fibonacci (0, 1, 2, 3, 5, 8)');
  const [initialVelocity, setInitialVelocity] = useState('10');
  const [velocityStrategy, setVelocityStrategy] = useState('Average of 3 iterations');
  const [planCurrentIteration, setPlanCurrentIteration] = useState(true);
  const [hideEmailAddresses, setHideEmailAddresses] = useState(false);
  const [enablePriorityField, setEnablePriorityField] = useState(false);
  const [enableLiveUpdates, setEnableLiveUpdates] = useState(false);
  const [bugsAndChoresPoints, setBugsAndChoresPoints] = useState(false);

  return (
    <SettingsContent>
      <Section>
        <SectionTitle>General</SectionTitle>
        <FormRow>
          <FormLabel>Project Title</FormLabel>
          <StyledTextField
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            size="small"
            fullWidth
          />
        </FormRow>
        <FormRow>
          <FormLabel>Project ID</FormLabel>
          <Typography sx={{ fontSize: 14, color: 'grey.900' }}>753</Typography>
        </FormRow>
        <FormRow>
          <FormLabel>Enable Tasks</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={enableTasks}
                onChange={(e) => setEnableTasks(e.target.checked)}
              />
            }
            label="Allows tasks to be added to stories."
            sx={{ margin: 0, '& .MuiFormControlLabel-label': { fontSize: 14, color: 'grey.900' } }}
          />
        </FormRow>
      </Section>

      <Section>
        <SectionTitle>Iterations and Velocity</SectionTitle>
        <FormRow>
          <FormLabel>Start Iterations On</FormLabel>
          <StyledSelect
            value={startIterationsOn}
            onChange={(e) => setStartIterationsOn(e.target.value as string)}
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="Monday">Monday</MenuItem>
            <MenuItem value="Tuesday">Tuesday</MenuItem>
            <MenuItem value="Wednesday">Wednesday</MenuItem>
            <MenuItem value="Thursday">Thursday</MenuItem>
            <MenuItem value="Friday">Friday</MenuItem>
            <MenuItem value="Saturday">Saturday</MenuItem>
            <MenuItem value="Sunday">Sunday</MenuItem>
          </StyledSelect>
        </FormRow>
        <FormRow>
          <FormLabel>Project Time Zone</FormLabel>
          <StyledSelect size="small" fullWidth defaultValue="">
            <MenuItem value="">Select timezone...</MenuItem>
          </StyledSelect>
        </FormRow>
        <FormRow>
          <FormLabel>Iteration Length</FormLabel>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <StyledSelect
              value={iterationLength}
              onChange={(e) => setIterationLength(e.target.value as string)}
              size="small"
              sx={{ minWidth: 80 }}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </StyledSelect>
            <Typography sx={{ fontSize: 14, color: 'grey.900' }}>weeks</Typography>
          </Box>
        </FormRow>
        <FormRow>
          <FormLabel>Point Scale</FormLabel>
          <StyledSelect
            value={pointScale}
            onChange={(e) => setPointScale(e.target.value as string)}
            size="small"
            fullWidth
          >
            <MenuItem value="Fibonacci (0, 1, 2, 3, 5, 8)">Fibonacci (0, 1, 2, 3, 5, 8)</MenuItem>
            <MenuItem value="Linear (0-8)">Linear (0-8)</MenuItem>
            <MenuItem value="Powers of 2">Powers of 2</MenuItem>
          </StyledSelect>
        </FormRow>
        <FormRow>
          <FormLabel>Initial Velocity</FormLabel>
          <StyledTextField
            value={initialVelocity}
            onChange={(e) => setInitialVelocity(e.target.value)}
            size="small"
            type="number"
            sx={{ maxWidth: 150 }}
          />
        </FormRow>
        <FormRow>
          <FormLabel>Velocity Strategy</FormLabel>
          <StyledSelect
            value={velocityStrategy}
            onChange={(e) => setVelocityStrategy(e.target.value as string)}
            size="small"
            fullWidth
          >
            <MenuItem value="Average of 3 iterations">Average of 3 iterations</MenuItem>
            <MenuItem value="Average of 4 iterations">Average of 4 iterations</MenuItem>
            <MenuItem value="Last iteration">Last iteration</MenuItem>
          </StyledSelect>
        </FormRow>
        <FormRow>
          <FormLabel>Plan Current Iteration Automatically</FormLabel>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={planCurrentIteration}
                  onChange={(e) => setPlanCurrentIteration(e.target.checked)}
                />
              }
              label=""
              sx={{ margin: 0 }}
            />
          </Box>
        </FormRow>
        <HelpText>
          Stories move to/from current iteration based on project velocity.{' '}
          <Link href="#" sx={{ fontSize: 13 }}>Read more...</Link>
        </HelpText>
      </Section>

      <Section>
        <SectionTitle>Access</SectionTitle>
        <FormRow>
          <FormLabel>Hide email addresses</FormLabel>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={hideEmailAddresses}
                  onChange={(e) => setHideEmailAddresses(e.target.checked)}
                />
              }
              label=""
              sx={{ margin: 0 }}
            />
          </Box>
        </FormRow>
        <HelpText>
          Restricts the ability to view email addresses of people in the project.{' '}
          <Link href="#" sx={{ fontSize: 13 }}>Read more...</Link>
        </HelpText>
      </Section>

      <Section>
        <SectionTitle>Customization</SectionTitle>
        <FormRow>
          <FormLabel>Priority Field</FormLabel>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enablePriorityField}
                  onChange={(e) => setEnablePriorityField(e.target.checked)}
                />
              }
              label="Enable priority field in stories."
              sx={{ margin: 0, '& .MuiFormControlLabel-label': { fontSize: 14, color: 'grey.900' } }}
            />
          </Box>
        </FormRow>
        <HelpText>
          Priority field values you set for stories get saved and are recoverable.
        </HelpText>
      </Section>

      <Section>
        <SectionTitle>Experimental</SectionTitle>
        <FormRow>
          <FormLabel>Enable live updates</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={enableLiveUpdates}
                onChange={(e) => setEnableLiveUpdates(e.target.checked)}
              />
            }
            label=""
            sx={{ margin: 0 }}
          />
        </FormRow>
      </Section>

      <Section>
        <SectionTitle>Other</SectionTitle>
        <FormRow>
          <FormLabel>Bugs and Chores May Be Given Points</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={bugsAndChoresPoints}
                onChange={(e) => setBugsAndChoresPoints(e.target.checked)}
              />
            }
            label="Check to enable. Cannot be disabled after."
            sx={{ margin: 0, '& .MuiFormControlLabel-label': { fontSize: 14, color: 'grey.900' } }}
          />
        </FormRow>
        <FormRow>
          <FormLabel>Delete Project</FormLabel>
          <Box>
            <Typography component="span" sx={{ fontSize: 14, color: 'grey.900', display: 'inline' }}>
              Deleting this project is an unrecoverable operation that will remove all project data.{' '}
            </Typography>
            <Link href="#" sx={{ fontSize: 14, color: 'error.main' }}>Delete</Link>
            <Typography component="span" sx={{ fontSize: 14, color: 'grey.900', display: 'inline' }}> this project.</Typography>
          </Box>
        </FormRow>
        <FormRow>
          <FormLabel>Archive Project</FormLabel>
          <Box>
            <Typography component="span" sx={{ fontSize: 14, color: 'grey.900', display: 'inline' }}>
              Archiving this project will remove this project from active projects list, but preserve project data.{' '}
            </Typography>
            <Link href="#" sx={{ fontSize: 14 }}>Archive</Link>
            <Typography component="span" sx={{ fontSize: 14, color: 'grey.900', display: 'inline' }}> this project.</Typography>
          </Box>
        </FormRow>
      </Section>

      <ActionButtons>
        <CancelButton>cancel</CancelButton>
        <SaveButton>Save</SaveButton>
      </ActionButtons>
    </SettingsContent>
  );
};

export default ProjectSettings;
