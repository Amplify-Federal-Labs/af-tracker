import type { ProjectResponse } from '../DTOs';
import type { Project, IterationLength } from '../viewModels/project';
import { mapUserResponseToUser } from './userMapper';

/**
 * Maps ProjectResponse DTO to Project ViewModel
 * @param dto - ProjectResponse from backend API
 * @returns Project ViewModel for UI components
 */
export function mapProjectResponseToProject(dto: ProjectResponse): Project {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    averageVelocity: dto.averageVelocity,
    iterationLength: dto.iterationLength as IterationLength,
    members: dto.members.map(mapUserResponseToUser),
    labels: dto.labels,
  };
}
