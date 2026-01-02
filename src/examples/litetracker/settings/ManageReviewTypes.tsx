import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const SettingsContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 900,
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: 32,
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: 16,
}));

const BackLink = styled(Link)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  marginBottom: 32,
  display: 'inline-block',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const AddReviewSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  alignItems: 'center',
}));

const ReviewTypeInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  backgroundColor: 'transparent',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'transparent',
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.secondary,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    fontSize: 16,
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.text.disabled,
    opacity: 1,
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  padding: '12px 32px',
  fontSize: 16,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

const ReviewTypeRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ReviewTypeName = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.text.primary,
}));

const ActionLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
}));

const ActionLink = styled(Link)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  borderLeft: `4px solid ${theme.palette.info.main}`,
  padding: '16px 20px',
  display: 'flex',
  gap: 16,
  alignItems: 'flex-start',
  marginTop: 32,
}));

const InfoIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: theme.palette.info.light,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  color: theme.palette.info.main,
  flexShrink: 0,
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.primary,
  lineHeight: 1.6,
}));

interface ReviewType {
  id: string;
  name: string;
  hidden: boolean;
}

const ManageReviewTypes = () => {
  const [newReviewType, setNewReviewType] = useState('');
  const [reviewTypes, setReviewTypes] = useState<ReviewType[]>([
    { id: '1', name: 'Test (QA)', hidden: false },
    { id: '2', name: 'Design', hidden: false },
    { id: '3', name: 'Code', hidden: false },
    { id: '4', name: 'Security', hidden: false },
  ]);

  const handleAddReviewType = () => {
    if (newReviewType.trim()) {
      const newType: ReviewType = {
        id: Date.now().toString(),
        name: newReviewType,
        hidden: false,
      };
      setReviewTypes([...reviewTypes, newType]);
      setNewReviewType('');
    }
  };

  const handleHide = (id: string) => {
    setReviewTypes(reviewTypes.map(rt =>
      rt.id === id ? { ...rt, hidden: true } : rt
    ));
  };

  const visibleReviewTypes = reviewTypes.filter(rt => !rt.hidden);
  const hiddenReviewTypes = reviewTypes.filter(rt => rt.hidden);

  return (
    <SettingsContent>
      <PageTitle>Manage Project Review Types</PageTitle>
      <BackLink href="#">Back to Stories</BackLink>

      <Section>
        <SectionTitle>Add a Review Type</SectionTitle>
        <AddReviewSection>
          <ReviewTypeInput
            placeholder="Review Type"
            value={newReviewType}
            onChange={(e) => setNewReviewType(e.target.value)}
            variant="outlined"
            size="small"
          />
          <AddButton onClick={handleAddReviewType}>Add Review</AddButton>
        </AddReviewSection>
      </Section>

      <Section>
        <SectionTitle>Review Types</SectionTitle>
        {visibleReviewTypes.map((reviewType) => (
          <ReviewTypeRow key={reviewType.id}>
            <ReviewTypeName>{reviewType.name}</ReviewTypeName>
            <ActionLinks>
              <ActionLink>Edit</ActionLink>
              <Box sx={{ color: 'text.disabled' }}>|</Box>
              <ActionLink onClick={() => handleHide(reviewType.id)}>Hide</ActionLink>
            </ActionLinks>
          </ReviewTypeRow>
        ))}
      </Section>

      {hiddenReviewTypes.length > 0 && (
        <Section>
          <SectionTitle>Hidden Review Types</SectionTitle>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', marginTop: 2 }}>
            When a review type is hidden, it is no longer visible in the dropdown, and it
            cannot be added to a story. Existing reviews of that type will not be affected.
          </Typography>
        </Section>
      )}

      <InfoBox>
        <InfoIcon>⚡</InfoIcon>
        <InfoText>
          Learn more about reviews and how they work in the{' '}
          <Link href="#" sx={{ color: 'info.main', fontWeight: 500 }}>
            Help Center
          </Link>
        </InfoText>
      </InfoBox>
    </SettingsContent>
  );
};

export default ManageReviewTypes;
