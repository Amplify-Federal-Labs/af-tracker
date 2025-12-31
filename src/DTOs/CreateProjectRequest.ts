import type { IterationLength } from './types';

/**
 * Request DTO for creating a new project
 */
export interface CreateProjectRequest {
  name: string;
  description: string;
  initialVelocity?: number;
  iterationLength?: IterationLength;
  memberIds?: string[];
}
