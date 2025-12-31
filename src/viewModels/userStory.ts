import type { User } from "./user";
import type { StoryPoint } from '../DTOs';

interface Blocker {
    description: string;
    isResolved: boolean;
    resolvedDate?: Date;
}

interface Task {
    description: string;
    isCompleted: boolean;
    completedDate?: Date;
}

type StoryType = "feature" | "design" | "bug" | "chore" | "release";
type StoryLocation = "icebox" | "backlog";
type StoryState = "unstarted" | "started" | "finished" | "delivered" | "accepted" | "rejected" | "done";

interface UserStory {
    id?: string;
    index: number;
    storyId?: string;
    type: StoryType;
    title: string;
    requester: User;
    owners: User[];
    estimate?: StoryPoint;
    location: StoryLocation;
    state: StoryState;
    blockers: Blocker[];
    description: string;
    labels: string[];
    tasks: Task[];
    createdAt: Date;
    createdBy: User;
    startedAt?: Date;
    startedBy?: User;
    finishedAt?: Date;
    finshedBy?: User;
    acceptedAt?: Date;
    acceptedBy?: User;
    rejectedAt?: Date;
    rejectedBy?: User;
    deliveredAt?: Date;
    doneAt?: Date;
    code?: string;
}

interface UserStoriesInProject {
    id: string,
    name: string,
    done: UserStory[];
    backlog: UserStory[];
    icebox: UserStory[]
}

interface ProjectViewModel {
    id: string,
    users: User[],
    labels: string[],
    name: string,
    done: UserStory[];
    backlog: UserStory[];
    icebox: UserStory[]
}

interface CreateStoryRequest {
    type: StoryType;
    title: string;
    description: string;
    labels: string[];
    tasks: Task[];
}

interface UpdateStoryRequest {
    type?: StoryType;
    title?: string;
    description?: string;
    labels?: string[];
    tasks?: Task[];
    estimate?: StoryPoint;
    owners?: User[];
    blockers?: Blocker[];
}

export type {
    ProjectViewModel,
    Blocker,
    Task,
    UserStory,
    StoryType,
    StoryLocation,
    StoryState,
    UserStoriesInProject,
    CreateStoryRequest,
    UpdateStoryRequest
};
