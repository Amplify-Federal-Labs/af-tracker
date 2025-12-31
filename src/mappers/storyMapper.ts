import type { StoryResponse } from '../DTOs';
import type { UserStory, Task, Blocker } from '../viewModels/userStory';
import { mapUserResponseToUser } from './userMapper';

/**
 * Converts ISO date string to Date object
 * @param isoString - ISO 8601 date string
 * @returns Date object or undefined if input is undefined
 */
function parseDate(isoString?: string): Date | undefined {
  return isoString ? new Date(isoString) : undefined;
}

/**
 * Maps DTO Task to ViewModel Task (strips id field)
 * @param task - Task from DTO
 * @returns Task for ViewModel
 */
function mapTask(task: import('../DTOs').Task): Task {
  return {
    description: task.description,
    isCompleted: task.isCompleted,
    completedDate: undefined, // Not provided by backend DTO
  };
}

/**
 * Maps DTO Blocker to ViewModel Blocker (strips id field)
 * @param blocker - Blocker from DTO
 * @returns Blocker for ViewModel
 */
function mapBlocker(blocker: import('../DTOs').Blocker): Blocker {
  return {
    description: blocker.description,
    isResolved: blocker.isResolved,
    resolvedDate: undefined, // Not provided by backend DTO
  };
}

/**
 * Maps StoryResponse DTO to UserStory ViewModel
 * @param dto - StoryResponse from backend API
 * @param index - UI ordering index (default: 0)
 * @returns UserStory ViewModel for UI components
 */
export function mapStoryResponseToUserStory(
  dto: StoryResponse,
  index: number = 0
): UserStory {
  return {
    id: dto.id,
    index,
    storyId: dto.id,
    // projectId dropped - not needed in ViewModel
    type: dto.type,
    title: dto.title,
    requester: mapUserResponseToUser(dto.requestor), // DTO 'requestor' → ViewModel 'requester'
    owners: dto.owners.map(mapUserResponseToUser),
    estimate: dto.estimate, // Direct mapping, both use StoryPoint type
    location: dto.location,
    state: dto.state,
    blockers: dto.blockers.map(mapBlocker),
    description: dto.description,
    labels: dto.labels,
    tasks: dto.tasks.map(mapTask),
    createdAt: new Date(dto.createdAt),
    createdBy: mapUserResponseToUser(dto.requestor),
    startedAt: parseDate(dto.startedAt),
    startedBy: undefined, // Not provided by backend DTO
    finishedAt: parseDate(dto.deliveredAt),
    finshedBy: undefined, // Not provided by backend DTO
    acceptedAt: parseDate(dto.acceptedAt),
    acceptedBy: undefined, // Not provided by backend DTO
    rejectedAt: parseDate(dto.rejectedAt),
    rejectedBy: undefined, // Not provided by backend DTO
    deliveredAt: parseDate(dto.deliveredAt),
    doneAt: parseDate(dto.doneAt),
    code: dto.code,
  };
}
