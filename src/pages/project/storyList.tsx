import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import type { UserStory } from "../../models/userStory";
import { STORY_TYPE_OPTIONS } from "../../shared/constants";

interface StoryListProps {
    stories: UserStory[]
}

const StoryList = ({ stories }: StoryListProps) => {
    return (
        <List dense>
            {stories.map((story) => {
                return (
                    <ListItem
                        key={story.id}
                    >
                        <ListItemButton>
                            {STORY_TYPE_OPTIONS.get(story.type)?.icon}
                            <ListItemText primary={story.title} />
                        </ListItemButton>
                    </ListItem>
                    
                )
            })}
        </List>
    )
}

export default StoryList;