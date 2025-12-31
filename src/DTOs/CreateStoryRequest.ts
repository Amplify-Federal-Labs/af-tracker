import type { StoryType } from './types';

/**
 * Request DTO for creating a new story
 */
export interface CreateStoryRequest {
  type: StoryType;
  title: string;
  description: string;
  tasks?: string[];
  labels?: string[];
}
