import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { useRecoilValue, useRecoilState } from "recoil";
import {
    isSurveyViewModeState,
    activeStepState,
    stepperState,
    stepsLengthSelector,
    sectionState,
    contentsState,
} from "./recoils";
import BasicBlank from "./BasicBlank";

const HorizontalLinearStepper = () => {
    const isViewMode = useRecoilValue(isSurveyViewModeState);
    const stepsLength = useRecoilValue(stepsLengthSelector);
    const [activeStep, setActiveStep] = useRecoilState(activeStepState);

    const [steps, setSteps] = useRecoilState(stepperState);
    const [sectionInfos, setSectionInfos] = useRecoilState(sectionState);
    const [contents, setContents] = useRecoilState(contentsState);

    const setNewStepLabel = (value: string) => {
        setSteps(
            steps.map((step, idx) => {
                return idx === activeStep ? { label: value } : step;
            })
        );
    };

    const addNewSection = () => {
        setSteps([...steps, { label: "" }]);
        setSectionInfos([...sectionInfos, { title: "", subtitle: "" }]);
        setContents([...contents, []]);
    };

    const removeSection = (idx: number) => {
        if (activeStep === stepsLength - 1) {
            setActiveStep(activeStep - 1);
        }

        setSteps(
            steps.filter((step, i) => {
                if (i !== idx) {
                    return step;
                }
            })
        );
        setSectionInfos(
            sectionInfos.filter((sect, i) => {
                if (i !== idx) {
                    return sect;
                }
            })
        );
        setContents(
            contents.filter((content, i) => {
                if (i !== idx) {
                    return content;
                }
            })
        );
    };

    return (
        <Box sx={{ width: "100%" }}>
            {isViewMode ? (
                <Stepper activeStep={activeStep}>
                    {steps.map((step, index) => {
                        const label = step.label;

                        return (
                            <Step
                                key={`survey-stepper-blank-${index}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setActiveStep(index);
                                }}
                            >
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        {steps.map((step, index) => {
                            return (
                                <Box
                                    key={`survey-stepper-blank-${index}`}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            mr: 2,
                                            color:
                                                activeStep === index
                                                    ? "#66ccff"
                                                    : "#666666",
                                            minWidth: 16,
                                        }}
                                        variant="h5"
                                        component="div"
                                    >
                                        {index + 1}
                                    </Typography>
                                    <BasicBlank
                                        state={step.label}
                                        setState={setNewStepLabel}
                                        onClick={() => {
                                            setActiveStep(index);
                                        }}
                                        sx={{ width: 140 }}
                                    />
                                    {stepsLength !== 1 && (
                                        <IconButton
                                            onClick={() => {
                                                removeSection(index);
                                            }}
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    )}
                                    <Typography
                                        sx={{ ml: 1, mr: 1 }}
                                        variant="h5"
                                        component="div"
                                    >
                                        {"-"}
                                    </Typography>
                                </Box>
                            );
                        })}

                        <IconButton onClick={addNewSection}>
                            <AddCircleOutlineIcon></AddCircleOutlineIcon>
                        </IconButton>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default HorizontalLinearStepper;
