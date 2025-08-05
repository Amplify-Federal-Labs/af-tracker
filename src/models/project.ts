import type { User } from "./user";
import type { UserStory } from "./userStory";

interface Project {
    id: string;
    name: string;
    description: string;
    users: User[];
    labels: string[];
    done: UserStory[];
    backlog: UserStory[];
    icebox: UserStory[];
    createdAt: Date;
    createdBy: string;
}

interface CreateProjectRequest {
    name: string;
    description: string;
}

export type { Project, CreateProjectRequest };