import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
    sectionState,
    activeStepState,
    isSurveyViewModeState,
} from "./recoils";
import { useRecoilState, useRecoilValue } from "recoil";
import BasicBlank from "./BasicBlank";
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
                    {sectionInfos[activeStep].subtitle
                        .split("\n")
                        .map((line, i) => {
                            return (
                                <Typography
                                    key={`${line}-line-${i}`}
                                    variant="subtitle1"
                                    sx={{ mt: 2, mb: 2 }}
                                >
                                    {line}
                                </Typography>
                            );
                        })}
                    <InfoContent />
                </>
            ) : (
                <>
                    {/* ?????? ??? */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        <Typography sx={{ mr: 2 }} variant="h4" component="div">
                            {activeStep + 1} ?????? ?????? ??????
                        </Typography>
                    </Box>
                    {/* title */}
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            pl: 2,
                            pr: 10,
                        }}
                    >
                        <Grid item xs={2}>
                            <Typography
                                sx={{ mr: 2 }}
                                variant="h5"
                                component="div"
                            >
                                {"??????"}
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <BasicBlank
                                isStandard
                                state={sectionInfos[activeStep].title}
                                setState={setTitle}
                                isFullWidth
                            />
                        </Grid>
                    </Grid>
                    {/* subtitle */}
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            pl: 2,
                            pr: 10,
                        }}
                    >
                        <Grid item xs={2}>
                            <Typography variant="h5" component="div">
                                {"????????? "}
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <BasicBlank
                                isFullWidth
                                state={sectionInfos[activeStep].subtitle}
                                setState={setSubtitle}
                                isLong
                            />
                        </Grid>
                    </Grid>
                    <InfoContent />
                </>
            )}
        </Box>
    );
};

export default Info;
