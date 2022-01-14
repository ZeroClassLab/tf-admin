import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    sectionState,
    activeStepState,
    isSurveyViewModeState,
} from "./recoils";
import { useRecoilState, useRecoilValue } from "recoil";
import BasicBlank from "./BasicBlank";
import AddFieldButton from "./AddQuestionButton";
import InfoContent from "./InfoContent";
// import BasicInputField from "../inputs/BasicInputField";
// import { BasicInputFieldData, InputFieldTypes } from "../inputs/InputFieldType";
// import { InfoProps } from "./infotypes";

const Info: React.VFC = () => {
    const [sectionInfos, setSectionInfos] = useRecoilState(sectionState);
    const activeStep = useRecoilValue(activeStepState);
    const isViewMode = useRecoilValue(isSurveyViewModeState);

    const setTitle = (newTitle: string) => {
        const newInfos = [...sectionInfos];
        newInfos[activeStep] = {
            title: newTitle,
            subtitle: newInfos[activeStep].subtitle,
        };
        setSectionInfos(newInfos);
    };

    const setSubtitle = (newSubtitle: string) => {
        const newInfos = [...sectionInfos];
        newInfos[activeStep] = {
            title: newInfos[activeStep].title,
            subtitle: newSubtitle,
        };
        setSectionInfos(newInfos);
    };

    return (
        <Box
            sx={{
                pb: 2,
                pt: 5,
            }}
        >
            {isViewMode ? (
                <>
                    <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                        {sectionInfos[activeStep].title}
                    </Typography>

                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 4 }}>
                        {sectionInfos[activeStep].subtitle}
                    </Typography>
                    <InfoContent />
                </>
            ) : (
                <>
                    {/* 설명 글 */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ mr: 2 }} variant="h4" component="div">
                            {activeStep + 1} 번째 섹션 정보
                        </Typography>
                    </Box>
                    {/* title */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ mr: 2 }} variant="h5" component="div">
                            {"제목: "}
                        </Typography>
                        <BasicBlank
                            isStandard
                            state={sectionInfos[activeStep].title}
                            setState={setTitle}
                        />
                    </Box>
                    {/* subtitle */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ mr: 2 }} variant="h5" component="div">
                            {"부제목: "}
                        </Typography>
                        <BasicBlank
                            state={sectionInfos[activeStep].subtitle}
                            setState={setSubtitle}
                            isLong
                        />
                    </Box>
                    <InfoContent />
                </>
            )}
        </Box>
    );
};

export default Info;
