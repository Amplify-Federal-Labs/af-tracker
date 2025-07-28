import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import { Project } from '../../models/project';

interface ProjectCardProps {
    project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant='h5'>
                        {project.name}
                    </Typography>
                    <Typography variant='body1'>
                        {project.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProjectCard;
