/**
 * Attachment model
 * Represents a file attachment on a story
 */
export interface Attachment {
  /**
   * Unique attachment identifier (UUID)
   */
  id: string;

  /**
   * User ID who uploaded the file
   */
  uploadedBy: string;

  /**
   * Original file name
   */
  fileName: string;

  /**
   * File size in bytes
   */
  fileSize: number;

  /**
   * File MIME type
   */
  mimeType: string;

  /**
   * Public URL to the file
   */
  url: string;
}
