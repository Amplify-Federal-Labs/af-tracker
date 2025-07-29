interface Project {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
}

interface CreateProjectRequest {
    name: string;
    description: string;
}

export type { Project, CreateProjectRequest };