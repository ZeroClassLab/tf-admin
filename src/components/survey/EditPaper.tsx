import { EditPaperProps } from "./interfaces";
import SurveyPaper from "./SurveyPaper";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import { serviceTypeListState } from "../servicetype/recoils";
import { useRecoilValue } from "recoil";
import { serviceBadgeColors } from "../servicetype/serviceBadgeColors";

const EditPaper: React.VFC<EditPaperProps> = ({ onClick, title, preview }) => {
    const formTypeList = useRecoilValue(serviceTypeListState);

    /**
     * TODO 커스텀 뱃지 컬러
     * @returns
     */
    const typeIdx = () => {
        for (let i = 0; i < formTypeList.length; i++) {
            if (formTypeList[i].name === preview.surveyType) {
                return i;
            }
        }
        return -1;
    };
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
                        sx={{
                            position: "absolute",
                            right: 35,
                            top: 27,
                        }}
                        badgeContent={preview.surveyType}
                        color={typeIdx() === 0 ? "primary" : "info"}
                    ></Badge>
                    {preview.isSelected && (
                        <Badge
                            sx={{
                                position: "absolute",
                                left: 35,
                                top: 27,
                            }}
                            badgeContent={"V"}
                            color={"error"}
                        ></Badge>
                    )}
                    <Typography
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            display: "inline-block",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            width: 190,
                        }}
                        variant="body2"
                    >
                        수정: {preview.modifiedDate}
                    </Typography>
                </Box>
            </SurveyPaper>
        </>
    );
};

export default EditPaper;
