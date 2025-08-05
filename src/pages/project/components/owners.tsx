import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useState } from 'react';
import type { User } from '../../../models/user';
import UserSelect from './userSelect';
import UserAvatars from '../../../components/userAvatars';

interface OwnersProps {
  owners: User[];
  users: User[];
  onChange: (owners: User[]) => void;
  disabled?: boolean;
}

const Owners = ({ owners, users, onChange, disabled = false }: OwnersProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    if (!disabled) {
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUserSelect = (selectedUser: User) => {
    // Add the selected user to the owners list if not already present
    const isUserAlreadyOwner = owners.some(owner => owner.id === selectedUser.id);
    if (!isUserAlreadyOwner) {
      const updatedOwners = [...owners, selectedUser];
      onChange(updatedOwners);
    }
    handleCloseDialog();
  };

  // Filter out users who are already owners
  const availableUsers = users.filter(user => 
    !owners.some(owner => owner.id === user.id)
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {owners.length === 0 ? (
        // Show "Add" button when no owners
        <Button
          variant="text"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          disabled={disabled}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          Add
        </Button>
      ) : (
        // Show owner avatars with plus icon
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <UserAvatars users={owners} />          
          <IconButton
            size="small"
            onClick={handleOpenDialog}
            disabled={disabled || availableUsers.length === 0}
            sx={{
              border: '1px dashed',
              borderColor: 'divider',
              width: 32,
              height: 32,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
            title="Add owner"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* User Selection Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: { minHeight: 400 },
          },
        }}
      >
        <DialogTitle>Add Owner</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            {availableUsers.length > 0 ? (
              <UserSelect
                users={availableUsers}
                onSelect={handleUserSelect}
                placeholder="Search for a user to add as owner..."
                maxHeight={250}
              />
            ) : (
              <Box
                sx={{
                  p: 3,
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                All available users are already owners
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Owners;
