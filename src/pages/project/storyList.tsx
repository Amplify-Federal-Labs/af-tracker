import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import type { UserStory } from "../../models/userStory";
import { STORY_TYPE_OPTIONS } from "../../shared/constants";

interface StoryListProps {
    stories: UserStory[]
    onSelect: (story: UserStory) => void;
}

const StoryList = ({ stories, onSelect }: StoryListProps) => {
    return (
        <List dense>
            {stories.map((story) => {
                return (
                    <ListItem
                        key={story.id}
                    >
                        <ListItemButton onClick={() => onSelect(story)}>
                            <ListItemIcon>
                                {STORY_TYPE_OPTIONS.get(story.type)?.icon}
                            </ListItemIcon>
                            <ListItemText primary={story.storyId} />
                            <ListItemText primary={story.title} />
                        </ListItemButton>
                    </ListItem>
                    
                )
            })}
        </List>
    )
}

export default StoryList;