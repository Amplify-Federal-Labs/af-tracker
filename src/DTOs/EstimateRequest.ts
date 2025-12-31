import type { StoryPoint } from './types';

/**
 * Request DTO for updating a story's estimate
 */
export interface EstimateRequest {
  estimate?: StoryPoint;
}
