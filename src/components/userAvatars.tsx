import { Avatar, AvatarGroup } from "@mui/material";
import type { User } from "../models/user";

interface UserAvatarsProps {
  users: User[];
}

// Generate initials for avatar
const getInitials = (name: string | null | undefined): string => {
  if (name) {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  } else {
    return "?";
  }
};

const UserAvatars = ({ users }: UserAvatarsProps) => {
  return (
    <AvatarGroup
      max={4}
      sx={{ "& .MuiAvatar-root": { width: 32, height: 32 } }}
    >
      {users.map((user) => {
        if (user.avatarUrl) {
          return (
            <Avatar
              key={user.id}
              sx={{
                bgcolor: "primary.main",
                fontSize: "0.75rem",
              }}
              title={user.name!}
              src={user.avatarUrl}
            />
          );
        } else {
          return (
            <Avatar
              key={user.id}
              sx={{
                bgcolor: "primary.main",
                fontSize: "0.75rem",
              }}
              title={user.name!}
            >
              {getInitials(user.name!)}
            </Avatar>
          );
        }
      })}
    </AvatarGroup>
  );
};

export default UserAvatars;
