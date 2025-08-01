import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Typography,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon, Person as PersonIcon } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import type { User } from '../../../models/user';

interface UserSelectProps {
  users: User[];
  onSelect: (user: User) => void;
  placeholder?: string;
  maxHeight?: number;
  disabled?: boolean;
  emptyMessage?: string;
}

const UserSelect = ({
  users,
  onSelect,
  placeholder = 'Search users...',
  maxHeight = 300,
  disabled = false,
  emptyMessage = 'No users found',
}: UserSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on search term using startsWith for name
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return users;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().startsWith(lowerSearchTerm)
    );
  }, [users, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleUserSelect = (user: User) => {
    if (!disabled) {
      onSelect(user);
    }
  };

  // Generate initials for avatar
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      {/* Search Box */}
      <TextField
        fullWidth
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        disabled={disabled}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color={disabled ? 'disabled' : 'action'} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 1 }}
      />

      {/* User List */}
      <Paper variant="outlined">
        <Box
          data-testid="user-list-container"
          sx={{
            maxHeight,
            overflow: 'auto',
          }}
        >
          {filteredUsers.length === 0 ? (
            <Box
              sx={{
                p: 3,
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              <PersonIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2">
                {searchTerm.trim() ? `No users found matching "${searchTerm}"` : emptyMessage}
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {filteredUsers.map((user) => (
                <ListItem key={user.uid} disablePadding>
                  <ListItemButton
                    onClick={() => handleUserSelect(user)}
                    disabled={disabled}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 40,
                          height: 40,
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={user.email}
                      slotProps={{
                        primary: {
                          fontWeight: 'medium',
                        },
                        secondary: {
                          color: 'text.secondary',
                          variant: 'body2',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>

      {/* Results count */}
      {users.length > 0 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}
        >
          {filteredUsers.length === users.length
            ? `${users.length} user${users.length === 1 ? '' : 's'}`
            : `${filteredUsers.length} of ${users.length} user${users.length === 1 ? '' : 's'}`}
        </Typography>
      )}
    </Box>
  );
};

export default UserSelect;
