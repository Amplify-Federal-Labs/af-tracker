import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MoreVert } from '@mui/icons-material';
import { useState } from 'react';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
}

const MembersContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  width: '100%',
  height: '100%',
  overflow: 'auto',
}));

const InviteSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  alignItems: 'center',
}));

const EmailInput = styled(TextField)(({ theme }) => ({
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
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.text.disabled,
    opacity: 1,
  },
}));

const RoleSelect = styled(Select)(({ theme }) => ({
  minWidth: 200,
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.secondary,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const InviteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const MembersList = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
}));

const MemberRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2.5, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const MemberInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  gap: 16,
});

const MemberAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.grey[600],
  color: theme.palette.common.white,
  width: 48,
  height: 48,
  fontSize: 16,
  fontWeight: 500,
}));

const MemberDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const MemberName = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.palette.text.primary,
  marginBottom: 2,
}));

const MemberEmail = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

const MemberRole = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
  color: theme.palette.text.primary,
  marginRight: 16,
}));

const MembersTab = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');

  const members: Member[] = [
    {
      id: '1',
      name: 'You • Sang Yum',
      email: 'sangyum@gmail.com',
      role: 'Owner',
      initials: 'SY',
    },
    {
      id: '2',
      name: 'usman baig',
      email: 'ubaig@amplifyfederal.com',
      role: 'Owner',
      initials: 'UB',
    },
    {
      id: '3',
      name: 'Dwitenberg',
      email: 'dwitenberg@amplifyfederal.com',
      role: 'Owner',
      initials: 'DW',
    },
  ];

  return (
    <MembersContainer>
      <InviteSection>
        <EmailInput
          placeholder='Emails, separated by comma ",".'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          size="small"
        />
        <RoleSelect value={role} onChange={(e) => setRole(e.target.value as string)} size="small">
          <MenuItem value="Owner">Owner</MenuItem>
          <MenuItem value="Member">Member</MenuItem>
          <MenuItem value="Viewer">Viewer</MenuItem>
        </RoleSelect>
        <InviteButton variant="contained">Invite</InviteButton>
      </InviteSection>

      <MembersList>
        {members.map((member) => (
          <MemberRow key={member.id}>
            <MemberInfo>
              <MemberAvatar>{member.initials}</MemberAvatar>
              <MemberDetails>
                <MemberName>{member.name}</MemberName>
                <MemberEmail>{member.email}</MemberEmail>
              </MemberDetails>
            </MemberInfo>
            <MemberRole>{member.role}</MemberRole>
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </MemberRow>
        ))}
      </MembersList>
    </MembersContainer>
  );
};

export default MembersTab;
