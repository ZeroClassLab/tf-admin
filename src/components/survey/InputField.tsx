import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
    required: boolean;
}

const InputField: React.VFC<InputFieldProps> = ({
    label,
    type,
    idx,
    required,
}) => {
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
    const copySelf = () => {
        const targetField = contents[activeStep][idx];
        const newField = {
            ...contents[activeStep][idx],
            id: `${targetField.id}-copy`,
            name: `${targetField.name}Copy`,
            label: `${targetField.label}의 복사`,
            autoComplete: `${targetField.autoComplete}Copy`,
            localStorageValueKey: `${targetField.localStorageValueKey}Copy`,
        };
        const newContent = [...contents[activeStep]];
        const newContents = [...contents];
        newContent.splice(idx + 1, 0, newField);
        newContents[activeStep] = newContent;
        setContentsState(newContents);
        setNowInputFieldIndex(idx + 1);
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
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
            elevation={2}
        >
            <Box sx={{ m: 1 }}>{label}</Box>
            <Box sx={{ m: 1 }}>
                <Chip label={type} variant="filled" color="error" />
                {required && (
                    <Chip label={"required"} variant="filled" color="success" />
                )}
            </Box>
            <Box sx={{ m: 1 }}>
                <IconButton onClick={openSettings}>
                    <SettingsIcon />
                </IconButton>
                <IconButton onClick={copySelf}>
                    <ContentCopyIcon />
                </IconButton>
                <IconButton onClick={removeSelf}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default InputField;
