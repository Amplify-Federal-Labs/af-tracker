interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}

interface CreateProjectRequest {
    name: string;
    description: string;
}

export type { Project, CreateProjectRequest };