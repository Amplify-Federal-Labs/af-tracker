import React from 'react';
import {
  BugReport as BugIcon,
  Build as ChoreIcon,
  Palette as DesignIcon,
  Star as FeatureIcon,
  Rocket as ReleaseIcon,
} from '@mui/icons-material';
import type { StoryType } from '../models/userStory';

export const STORY_TYPE_OPTIONS: Map<StoryType, {
  label: string;
  icon: React.ReactElement;
  description: string;
}> = new Map([
  ['feature', {
    label: 'Feature',
    icon: <FeatureIcon />,
    description: 'New functionality development',
  }],
  ['design', {
    label: 'Design',
    icon: <DesignIcon />,
    description: 'UI/UX design tasks',
  }],
  ['bug', {
    label: 'Bug',
    icon: <BugIcon />,
    description: 'Bug fixes and defect resolution',
  }],
  ['chore', {
    label: 'Chore',
    icon: <ChoreIcon />,
    description: 'Maintenance and technical tasks',
  }],
  ['release', {
    label: 'Release',
    icon: <ReleaseIcon />,
    description: 'Release preparation and deployment',
  }],
]);