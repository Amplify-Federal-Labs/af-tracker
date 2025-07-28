import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Project } from "../../../models/project"

interface ProjectCardPropType {
    project: Project
}
const ProjectCard = ({ project }: ProjectCardPropType) => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h5'>
                    {project.name}
                </Typography>
                <Typography variant='body2'>
                    {project.description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProjectCard;