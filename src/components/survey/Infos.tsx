import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
// import Info from "./Info";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    activeStepState,
    isSurveyViewModeState as isViewState,
    stepperState,
    stepsLengthSelector,
    surveyTypeState,
    nowSurveyInfoState,
} from "./recoils";
import StepperButtons from "./StepperButtons";
import Info from "./Info";
import AddFieldButton from "./AddQuestionButton";

interface InfoProps {
    // data: any;
}

const Infos: React.VFC<InfoProps> = () =>
    // {
    //     // handleSubmit,
    //     // onSubmit,
    //     // control,
    //     // formState,
    //     // location,
    //     // alertModal,
    //     // mainFiles,
    //     // taggedFiles,
    //     // data,
    // }
    {
        const [activeStep, setActiveStep] = useRecoilState(activeStepState);
        const isViewMode = useRecoilValue(isViewState);
        const [_isViewMode, setIsViewMode] = useRecoilState(isViewState);
        const [surveyType, setSurveyType] = useRecoilState(surveyTypeState);

        const [steps, setSteps] = useRecoilState(stepperState);
        const stepsLength = useRecoilValue(stepsLengthSelector);
        const surveyInfo = useRecoilValue(nowSurveyInfoState);

        return (
            <Box
                sx={{
                    minWidth: isViewMode ? 720 : "none",
                }}
            >
                {/* title */}
                {isViewMode && (
                    <Typography
                        variant="h3"
                        sx={{ textAlign: "center", mb: 4, pt: 3 }}
                    >
                        {surveyInfo.name || "제목을 반드시 입력해주세요."}
                    </Typography>
                )}

                {/* stepper */}
                <HorizontalLinearStepper />

                {/* form */}
                <Info />

                {isViewMode && <StepperButtons />}
                {/* </form>} */}
                {/* <SubmitAlertModal
                isOpen={isSubmitAlertModalOpen}
                formState={formState}
                cafeLocationSet={cafeLocation !== ""}
                handleClose={setIsSubmitAlertModalOpen}
            /> */}
            </Box>
        );
    };

export default Infos;
