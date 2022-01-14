import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
    contentsState,
    isInpuFieldSettingsOpenedState,
    nowTargetInputFieldIndexState,
    activeStepState,
} from "./recoils";

interface InputFieldProps {
    label: string;
    type: string;
    idx: number;
}

const InputField: React.VFC<InputFieldProps> = ({ label, type, idx }) => {
    const setIsSettingsOpened = useSetRecoilState(
        isInpuFieldSettingsOpenedState
    );
    const setNowInputFieldIndex = useSetRecoilState(
        nowTargetInputFieldIndexState
    );
    const [contents, setContentsState] = useRecoilState(contentsState);
    const activeStep = useRecoilValue(activeStepState);
    const openSettings = () => {
        setNowInputFieldIndex(idx);
        setIsSettingsOpened(true);
    };
    const removeSelf = () => {
        setNowInputFieldIndex(0);
        const newContent = contents[activeStep].filter((content, i) => {
            if (i !== idx) {
                return content;
            }
        });
        const newContents = [...contents];
        newContents[activeStep] = newContent;
        setContentsState(newContents);
    };
    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
            }}
        >
            <Box>{label}</Box>
            <Box>
                <IconButton onClick={openSettings}>
                    <SettingsIcon />
                </IconButton>
                <IconButton onClick={removeSelf}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default InputField;
