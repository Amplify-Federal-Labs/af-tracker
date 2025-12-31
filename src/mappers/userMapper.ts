import type { UserResponse } from '../DTOs';
import type { User } from '../viewModels/user';

/**
 * Maps UserResponse DTO to User ViewModel
 * @param dto - UserResponse from backend API
 * @returns User ViewModel for UI components
 */
export function mapUserResponseToUser(dto: UserResponse): User {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    avatarUrl: dto.avatarUrl ?? null,
    role: dto.role,
  };
}
