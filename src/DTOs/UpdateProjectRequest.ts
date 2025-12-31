import type { IterationLength } from './types';

/**
 * Request DTO for updating an existing project
 */
export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  initialVelocity?: number;
  iterationLength?: IterationLength;
}
