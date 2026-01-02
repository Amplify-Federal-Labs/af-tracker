import {
  Box,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close, Add } from '@mui/icons-material';
import { useState } from 'react';

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  border: '1px solid #E0E0E0',
  borderRadius: 4,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const FormHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));

const TitleInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-input': {
    fontSize: 16,
    fontWeight: 500,
    color: theme.palette.grey[900],
    padding: theme.spacing(1, 1.5),
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[300],
    },
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.text.disabled,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const FormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  alignItems: 'center',
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  color: theme.palette.grey[700],
  minWidth: 80,
  textAlign: 'right',
}));

const StyledSelect = styled(Select)({
  fontSize: 14,
  minWidth: 150,
  '& .MuiSelect-select': {
    padding: '6px 12px',
  },
});

const UserSelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flex: 1,
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  fontSize: 12,
  backgroundColor: theme.palette.primary.main,
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.grey[900],
}));

const AddButton = styled(IconButton)(({ theme }) => ({
  width: 24,
  height: 24,
  padding: 0,
  color: theme.palette.text.disabled,
  border: `1px dashed ${theme.palette.grey[400]}`,
  borderRadius: 4,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    borderColor: theme.palette.text.disabled,
  },
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  color: theme.palette.grey[700],
  textTransform: 'uppercase',
  marginBottom: theme.spacing(1),
}));

const DescriptionInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    fontSize: 14,
    color: theme.palette.grey[900],
  },
}));

const LabelButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 12,
  color: theme.palette.primary.main,
  padding: theme.spacing(0.5, 1),
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

const FollowSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const FollowerCount = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.disabled,
  marginLeft: theme.spacing(0.5),
})) as typeof Typography;

const CommentInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    fontSize: 13,
    color: theme.palette.grey[900],
  },
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2),
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  textTransform: 'none',
  fontSize: 14,
  padding: theme.spacing(0.75, 2),
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.disabled,
  textTransform: 'none',
  fontSize: 14,
  padding: theme.spacing(0.75, 2),
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

interface AddStoryFormProps {
  onClose: () => void;
  onSave: (story: {
    title: string;
    type: string;
    points?: number;
    description: string;
  }) => void;
}

const AddStoryForm = ({ onClose, onSave }: AddStoryFormProps) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('feature');
  const [points, setPoints] = useState('unestimated');
  const [description, setDescription] = useState('');
  const [follow, setFollow] = useState(false);

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title,
        type,
        points: points === 'unestimated' ? undefined : parseInt(points),
        description,
      });
      // Reset form
      setTitle('');
      setType('feature');
      setPoints('unestimated');
      setDescription('');
      setFollow(false);
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <TitleInput
          placeholder="Enter story title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          variant="outlined"
          size="small"
        />
        <CloseButton onClick={onClose} size="small">
          <Close fontSize="small" />
        </CloseButton>
      </FormHeader>

      <FormRow>
        <FieldLabel>Type</FieldLabel>
        <StyledSelect value={type} onChange={(e) => setType(e.target.value)} size="small">
          <MenuItem value="feature">Feature</MenuItem>
          <MenuItem value="bug">Bug</MenuItem>
          <MenuItem value="chore">Chore</MenuItem>
          <MenuItem value="release">Release</MenuItem>
        </StyledSelect>
      </FormRow>

      <FormRow>
        <FieldLabel>Points</FieldLabel>
        <StyledSelect value={points} onChange={(e) => setPoints(e.target.value)} size="small">
          <MenuItem value="unestimated">Unestimated</MenuItem>
          <MenuItem value="0">0 points</MenuItem>
          <MenuItem value="1">1 point</MenuItem>
          <MenuItem value="2">2 points</MenuItem>
          <MenuItem value="3">3 points</MenuItem>
          <MenuItem value="5">5 points</MenuItem>
          <MenuItem value="8">8 points</MenuItem>
        </StyledSelect>
      </FormRow>

      <FormRow>
        <FieldLabel>Requester</FieldLabel>
        <UserSelector>
          <UserAvatar>SM</UserAvatar>
          <UserName>Sangyu Mun</UserName>
        </UserSelector>
      </FormRow>

      <FormRow>
        <FieldLabel>Owners</FieldLabel>
        <UserSelector>
          <AddButton size="small">
            <Add fontSize="small" />
          </AddButton>
        </UserSelector>
      </FormRow>

      <FollowSection>
        <FormControlLabel
          control={<Checkbox checked={follow} onChange={(e) => setFollow(e.target.checked)} size="small" />}
          label={
            <>
              <Typography component="span" sx={{ fontSize: 13, color: 'grey.900' }}>Follow this story</Typography>
              <FollowerCount component="span">(0 followers)</FollowerCount>
            </>
          }
          sx={{
            margin: 0,
            '& .MuiFormControlLabel-label': {
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }
          }}
        />
      </FollowSection>

      <Section>
        <SectionTitle>Blockers</SectionTitle>
        <Typography sx={{ fontSize: 13, color: 'text.disabled', fontStyle: 'italic' }}>
          No blockers
        </Typography>
      </Section>

      <Section>
        <SectionTitle>Description</SectionTitle>
        <DescriptionInput
          placeholder="Add description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          variant="outlined"
          size="small"
        />
      </Section>

      <Section>
        <SectionTitle>Labels</SectionTitle>
        <LabelButton>+ Add Label</LabelButton>
      </Section>

      <Section>
        <SectionTitle>Code</SectionTitle>
        <Link href="#" sx={{ fontSize: 13, color: 'primary.main' }}>
          + Add pull request
        </Link>
      </Section>

      <Section>
        <SectionTitle>Tasks</SectionTitle>
        <Typography sx={{ fontSize: 13, color: 'text.disabled', fontStyle: 'italic' }}>
          No tasks
        </Typography>
      </Section>

      <Section>
        <SectionTitle>Activity</SectionTitle>
        <CommentInput
          placeholder="Add comment..."
          variant="outlined"
          size="small"
          multiline
          rows={2}
        />
      </Section>

      <ActionButtons>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </ActionButtons>
    </FormContainer>
  );
};

export default AddStoryForm;
