import type { User } from "./user";

interface Blocker {
    description: string;
    resolvedAt: Date | null;
}

interface Story {
    id: string;
    type: 'feature' | 'design' | 'bug' | 'chore' | 'release';
    summary: string;
    description: string;
    requester: User;
    owners: User[];
    points: '0' | '1' | '2' | '3' | null;
    state: 'unstarted' | 'started' | 'finished' | 'delivered' | 'accepted' | 'rejected';
    labels: string[];
    tasks: string[];
    blockers: Blocker[];
    createdAt: Date | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    deliveredAt: Date | null;
    acceptedAt: Date | null;
    rejectedAt: Date | null;
}

export type { Story };