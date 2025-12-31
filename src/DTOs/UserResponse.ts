import { UserRole } from './types';

/**
 * User Response DTO
 * Represents a user in the system
 */
export interface UserResponse {
  /**
   * Unique user identifier
   */
  id: string;

  /**
   * User's display name
   */
  name: string;

  /**
   * User's email address
   */
  email: string;

  /**
   * URL to user's avatar image (optional)
   */
  avatarUrl?: string;

  /**
   * User role for access control
   */
  role: UserRole;
}
