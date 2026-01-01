import type { StoryLocation } from './types';

/**
 * Reorder Stories Request DTO
 * Request payload for reordering stories within a location using fractional indexing
 */
export interface ReorderStoriesRequest {
  /**
   * The location (icebox or backlog) where stories are being reordered
   */
  location: StoryLocation;

  /**
   * Complete ordered list of story IDs in the desired order
   * All story IDs must exist and belong to the specified location
   */
  storyIds: string[];
}
