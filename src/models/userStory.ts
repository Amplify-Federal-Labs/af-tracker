import type { User } from "./user";

interface Impediment {
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
    projectId: string;
    type: StoryType;
    title: string;
    requester: User;
    owners: User[];
    points?: number;
    location: StoryLocation;
    state: StoryState;
    blockers: Impediment[];
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
    points?: number;
    owners?: User[];
    blockers?: Impediment[];
}

export type {
    ProjectViewModel,
    Impediment,
    Task,
    UserStory,
    StoryType,
    StoryLocation,
    StoryState,
    UserStoriesInProject,
    CreateStoryRequest,
    UpdateStoryRequest
};
