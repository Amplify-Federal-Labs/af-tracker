import type { Project } from '../../models/project';
import ProjectList from '../project/List';

const DashboardContainer = () => {
    // TODO: Get the list of projects from backend
    const projects: Project[] = [
    {
        id: "1",
        name: "Project 1",
        description: "Project 1",
        createdAt: new Date(),
    },
    {
        id: "2",
        name: "Project 2",
        description: "Project 2",
        createdAt: new Date(),
    }

    ];

    return <ProjectList projects={projects} />
}

export default DashboardContainer;