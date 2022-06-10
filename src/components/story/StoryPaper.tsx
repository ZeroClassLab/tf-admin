import Paper from "@mui/material/Paper";
import { StoryPaperProps } from "./interfaces";

const StoryPaper: React.FC<StoryPaperProps> = ({ children, onClick }) => {
    
    return (
        <Paper
            sx={{
                height: 297,
                width: 210,
                m: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
                "&:hover": {
                    background: "rgba(212,212,212,50)",
                },
                position: "relative",
            }}
            onClick={onClick}
        >
            {children}
        </Paper>
    );
};

export default StoryPaper;
