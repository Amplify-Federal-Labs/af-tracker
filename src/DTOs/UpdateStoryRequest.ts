import type { StoryType } from './types';

/**
 * Request DTO for updating an existing story
 */
export interface UpdateStoryRequest {
  type?: StoryType;
  title?: string;
  description?: string;
  code?: string;
}
