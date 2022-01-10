import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { useRecoilValue, useRecoilState } from "recoil";
import {
    isSurveyViewModeState,
    activeStepState,
    stepperState,
} from "./recoils";
import BasicBlank from "./BasicBlank";

const HorizontalLinearStepper = () => {
    const isViewMode = useRecoilValue(isSurveyViewModeState);
    const [activeStep, setActiveStep] = useRecoilState(activeStepState);

    const [steps, setSteps] = useRecoilState(stepperState);

    const setNewStepLabel = (value: string) => {
        setSteps(
            steps.map((step, idx) => {
                return idx === activeStep ? { label: value } : step;
            })
        );
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    const label = step.label;

                    return (
                        <Step
                            key={step.label}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setActiveStep(index);
                            }}
                        >
                            <StepLabel>
                                {isViewMode ? (
                                    label
                                ) : (
                                    <BasicBlank
                                        state={steps[activeStep].label}
                                        setState={setNewStepLabel}
                                    />
                                )}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default HorizontalLinearStepper;
