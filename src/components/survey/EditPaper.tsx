import { EditPaperProps } from "./interfaces";
import SurveyPaper from "./SurveyPaper";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";

const EditPaper: React.VFC<EditPaperProps> = ({
    onClick,
    title,
    preview,
    surveyType,
}) => {
    return (
        <>
            <SurveyPaper onClick={onClick}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        textOverflow: "ellipsis",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        maxWidth: 150,
                        mb: 2,
                        overflow: "hidden",
                    }}
                >
                    {title}
                </Typography>
                <Box sx={{ width: "80%" }}>
                    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                        {preview.section.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{
                            mb: 1,
                            width: 168,
                            display: "inline-block",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                        }}
                    >
                        {preview.section.subtitle}
                    </Typography>
                    {preview.contents.map((content, idx) => {
                        if (idx === 2) {
                            return (
                                <Typography
                                    key={`edit-paper-preview-${idx}`}
                                    variant="body2"
                                >
                                    ...
                                </Typography>
                            );
                        }
                        if (idx > 3) {
                            return;
                        }
                        return (
                            <Typography
                                key={`edit-paper-preview-${idx}`}
                                variant="body2"
                            >
                                {content.label}
                            </Typography>
                        );
                    })}
                    <Badge
                        sx={{ position: "absolute", right: 35, top: 27 }}
                        badgeContent={surveyType}
                        color="primary"
                    ></Badge>
                    <Typography
                        sx={{ position: "absolute", bottom: 10, right: 10 }}
                        variant="body2"
                    >
                        Edited: {preview.modifiedDate}
                    </Typography>
                </Box>
            </SurveyPaper>
        </>
    );
};

export default EditPaper;
