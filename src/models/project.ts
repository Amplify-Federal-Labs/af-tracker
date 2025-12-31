import type { User } from "./user";

export type IterationLength = 'OneWeek' | 'TwoWeeks' | 'TheeWeeks' | 'FourWeeks'

interface Project {
    id: string;
    name: string;
    description: string;
    averageVelocity: number;
    iterationLength: IterationLength
    members: User[];
    labels: string[];
}

interface CreateProjectRequest {
    name: string;
    description: string;
    initialVelocity: number;
    iterationLength: IterationLength,
    memberIds: string[]
}

export type { Project, CreateProjectRequest };