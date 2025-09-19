import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
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
                            {STORY_TYPE_OPTIONS.get(story.type)?.icon}
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