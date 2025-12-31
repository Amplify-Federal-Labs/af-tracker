import { IterationLength } from './types';
import { UserResponse } from './UserResponse';

/**
 * Project Response DTO
 * Represents a project with its configuration and members
 */
export interface ProjectResponse {
  /**
   * Unique project identifier
   */
  id: string;

  /**
   * Project name
   */
  name: string;

  /**
   * Project description
   */
  description: string;

  /**
   * Project's average velocity
   */
  averageVelocity: number;

  /**
   * Length of project iteration/sprint
   */
  iterationLength: IterationLength;

  /**
   * Project team members
   */
  members: UserResponse[];

  /**
   * Available labels for the project
   */
  labels: string[];
}
