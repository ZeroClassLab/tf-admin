import React from "react";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import {
    contentsState,
    isSurveyViewModeState,
    activeStepState,
} from "./recoils";
import InputField from "./InputField";

const InfoContent = () => {
    const contentsList = useRecoilValue(contentsState);
    const isViewMode = useRecoilValue(isSurveyViewModeState);
    const activeStep = useRecoilValue(activeStepState);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "60%",
            }}
        >
            <div>
                {"contentsInfo: "}
                {JSON.stringify(contentsList)}
            </div>
            {isViewMode ? (
                <div></div>
            ) : (
                <>
                    {contentsList[activeStep].map((content, idx) => (
                        <InputField
                            key={`input-field-${idx}`}
                            label={content.label}
                            type={content.type}
                            idx={idx}
                        />
                    ))}
                </>
            )}
        </Box>
    );
};

export default InfoContent;
