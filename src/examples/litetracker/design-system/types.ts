/**
 * Shared TypeScript interfaces for LiteTracker Design System
 */

import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/material';

/**
 * Base props extended by all design system components
 */
export interface BaseComponentProps {
  /**
   * MUI sx prop for style overrides
   */
  sx?: SxProps<Theme>;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Variant options for text field and select components
 */
export type FormFieldVariant = 'dark' | 'light';

/**
 * Size variants for section headings
 */
export type SectionHeadingVariant = 'large' | 'medium' | 'small';

/**
 * Menu item variants for navigation
 */
export type MenuItemVariant = 'default' | 'create' | 'dashboard';
