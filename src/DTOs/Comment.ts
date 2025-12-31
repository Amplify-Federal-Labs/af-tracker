import { UserResponse } from './UserResponse';

/**
 * Comment model
 * Represents a comment on a story
 */
export interface Comment {
  /**
   * User who created the comment
   */
  user: UserResponse;

  /**
   * Comment text content
   */
  text: string;

  /**
   * Comment creation timestamp (ISO date-time format)
   */
  createdAt: string;
}
