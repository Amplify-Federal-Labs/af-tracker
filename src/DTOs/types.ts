/**
 * Type definitions from OpenAPI specification
 * These types represent enums and common types used across DTOs
 */

/**
 * User role for access control
 * - siteAdmin (Level 3): Highest privilege, has all permissions
 * - projectAdmin (Level 2): Can manage projects, has all member permissions
 * - member (Level 1): Basic user permissions (default)
 */
export type UserRole = 'siteAdmin' | 'projectAdmin' | 'member';

/**
 * Story type classification
 */
export type StoryType = 'feature' | 'bug' | 'chore' | 'release';

/**
 * Story location
 * Stories can move from icebox to backlog freely.
 * Stories can only move from backlog to icebox when in 'unstarted' state.
 */
export type StoryLocation = 'icebox' | 'backlog';

/**
 * Story workflow state
 * - unstarted: Created but not started
 * - started: Work in progress (local)
 * - finished: Complete, verified locally
 * - delivered: Verified in integration
 * - accepted: Approved by product owner
 * - rejected: Needs rework
 * - done: Fully complete and deployed
 */
export type StoryState =
  | 'unstarted'
  | 'started'
  | 'finished'
  | 'delivered'
  | 'accepted'
  | 'rejected'
  | 'done';

/**
 * Story point estimate
 * - 0: ~2 hours
 * - 1: ~4 hours
 * - 2: ~6 hours
 * - 3: ~8 hours
 * - 5: ~1-2 days
 * - 8: ~3-4 days
 */
export type StoryPoint = '0' | '1' | '2' | '3' | '5' | '8';

/**
 * Length of project iteration/sprint
 */
export type IterationLength = 'OneWeek' | 'TwoWeeks' | 'ThreeWeeks' | 'FourWeeks';
