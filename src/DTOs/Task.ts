/**
 * Task model
 * Represents a task within a story
 */
export interface Task {
  /**
   * Unique task identifier
   */
  id: string;

  /**
   * Task description
   */
  description: string;

  /**
   * Task completion status
   */
  isCompleted: boolean;
}
