import { StoryType, StoryLocation, StoryState, StoryPoint } from './types';
import { UserResponse } from './UserResponse';
import { Task } from './Task';
import { Blocker } from './Blocker';
import { Comment } from './Comment';

/**
 * Story Response DTO
 * Represents a user story with all its details, tasks, blockers, and metadata
 */
export interface StoryResponse {
  /**
   * Unique story identifier
   */
  id: string;

  /**
   * Story type classification
   */
  type: StoryType;

  /**
   * Story title
   */
  title: string;

  /**
   * Story description
   */
  description: string;

  /**
   * Story tasks
   */
  tasks: Task[];

  /**
   * Story blockers
   */
  blockers: Blocker[];

  /**
   * Story labels
   */
  labels: string[];

  /**
   * Story comments
   */
  comments: Comment[];

  /**
   * Story location (icebox or backlog)
   */
  location: StoryLocation;

  /**
   * Story workflow state
   */
  state: StoryState;

  /**
   * Story point estimate (optional)
   */
  estimate?: StoryPoint;

  /**
   * Story creation timestamp (ISO date-time format)
   */
  createdAt: string;

  /**
   * When story was started (ISO date-time format, optional)
   */
  startedAt?: string;

  /**
   * When story was delivered (ISO date-time format, optional)
   */
  deliveredAt?: string;

  /**
   * When story was accepted (ISO date-time format, optional)
   */
  acceptedAt?: string;

  /**
   * When story was rejected (ISO date-time format, optional)
   */
  rejectedAt?: string;

  /**
   * When story was marked done (ISO date-time format, optional)
   */
  doneAt?: string;

  /**
   * User who requested/created the story
   */
  requestor: UserResponse;

  /**
   * URL to related code (PR, branch, etc.) - optional
   */
  code?: string;

  /**
   * Story owners (for pairing/mobbing)
   */
  owners: UserResponse[];
}
