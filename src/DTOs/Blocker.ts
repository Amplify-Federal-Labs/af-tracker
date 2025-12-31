/**
 * Blocker model
 * Represents an impediment or blocker for a story
 */
export interface Blocker {
  /**
   * Unique blocker identifier
   */
  id: string;

  /**
   * Blocker description
   */
  description: string;

  /**
   * Blocker resolution status
   */
  isResolved: boolean;
}
