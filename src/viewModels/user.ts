import type { UserRole } from '../DTOs';

interface User {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    avatarUrl?: string | null;
    role?: UserRole | null;
}

export type {User};
