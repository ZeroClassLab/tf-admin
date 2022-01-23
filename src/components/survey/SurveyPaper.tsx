import Paper from "@mui/material/Paper";
import { SurveyPaperProps } from "./interfaces";

const SurveyPaper: React.FC<SurveyPaperProps> = ({ children, onClick }) => {
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

export default SurveyPaper;
