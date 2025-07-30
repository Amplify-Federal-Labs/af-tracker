import type { SxProps } from '@mui/system';
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface AddFabProps {
    onClick: () => void;
}

const AddProjectFab = ({onClick}: AddFabProps) => {
    const fabStyle = {
        position: 'absolute',
        bottom: 32,
        right: 32,
    };

    return (
        <Fab 
            color="primary" 
            aria-label="add" 
            onClick={onClick}
            sx={fabStyle as SxProps}
        >
            <AddIcon />
        </Fab>
    )
}

export default AddProjectFab;
