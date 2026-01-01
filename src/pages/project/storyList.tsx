import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { UserStory } from "../../viewModels/userStory";
import { STORY_TYPE_OPTIONS } from "../../shared/constants";
import { Droppable, Draggable } from '@hello-pangea/dnd';

interface StoryListProps {
    label: string;
    stories: UserStory[]
    onSelect: (story: UserStory) => void;
}

const StoryList = ({label, stories, onSelect}: StoryListProps) => {
    return (
        <Droppable droppableId={label}>
            {(provided /*, snapshot */) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <List dense>
                        {stories.map((story, index) => {
                            return (
                                <Draggable key={story.id} draggableId={story.id!} index={index}>
                                    {(provided /*, snapshot */) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <ListItem onClick={() => onSelect(story)}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        {STORY_TYPE_OPTIONS.get(story.type)?.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={story.storyNumber} />
                                                    <ListItemText primary={story.title} />
                                                </ListItemButton>
                                            </ListItem>
                                        </div>
                                    )}
                                
                                </Draggable>
                            )
                        })}
                    </List>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default StoryList;