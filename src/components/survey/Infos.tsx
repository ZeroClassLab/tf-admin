import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import Info from "./Info";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    activeStepState,
    isSurveyViewModeState as isViewState,
    stepperState,
    stepsLengthSelector,
    surveyTypeState,
} from "./recoils";
import StepperButtons from "./StepperButtons";

interface InfoProps {
    data: any;
}

const Infos: React.VFC<InfoProps> = ({
    // handleSubmit,
    // onSubmit,

    // control,
    // formState,

    // location,
    // alertModal,
    // mainFiles,
    // taggedFiles,

    data,
}) => {
    const [activeStep, setActiveStep] = useRecoilState(activeStepState);
    const [isViewMode, setIsViewMode] = useRecoilState(isViewState);
    const [surveyType, setSurveyType] = useRecoilState(surveyTypeState);

    const [steps, setSteps] = useRecoilState(stepperState);
    const stepsLength = useRecoilValue(stepsLengthSelector);

    return (
        <>
            {/* title */}
            <Typography variant="h3" sx={{ textAlign: "center", mb: 6, pt: 3 }}>
                내일의 창업 제출 폼
            </Typography>

            {/* stepper */}
            <HorizontalLinearStepper />

            {/* form */}
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <Info
                    {...data[activeStep]}
                    control={control}
                    formState={formState}
                />
            */}
            <StepperButtons />
            {/* </form>} */}
            {/* <SubmitAlertModal
                isOpen={isSubmitAlertModalOpen}
                formState={formState}
                cafeLocationSet={cafeLocation !== ""}
                handleClose={setIsSubmitAlertModalOpen}
            /> */}
        </>
    );
};

export default Infos;
