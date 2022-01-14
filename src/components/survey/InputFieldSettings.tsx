import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import BasicBlank from "./BasicBlank";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    contentsState,
    inputFieldSettingsModeState,
    isInpuFieldSettingsOpenedState,
    activeStepState,
    nowTargetInputFieldIndexState,
} from "./recoils";

const InputFieldSettings = () => {
    const [nameHelperText, setNameHelperText] = useState("");

    const [contents, setContents] = useRecoilState(contentsState);
    const [mode, setMode] = useRecoilState(inputFieldSettingsModeState);
    const [isOpened, setIsOpened] = useRecoilState(
        isInpuFieldSettingsOpenedState
    );

    const nowTargetInputFieldIndex = useRecoilValue(
        nowTargetInputFieldIndexState
    );

    const activeStep = useRecoilValue(activeStepState);

    const nowInputField = contents[activeStep][nowTargetInputFieldIndex];

    const handleClose = () => {
        setIsOpened(false);
        setMode("edit");
    };

    const handleName = (val: string) => {
        const modifiedVal = val.replace(/[^a-zA-Z]/g, "");
        const newId = modifiedVal.replace(/([A-Z])/g, "-$1").toLowerCase();
        if (modifiedVal === nowInputField.name) {
            setNameHelperText(
                "name은 영문만으로 입력해야합니다. 예) theGreatCaligula"
            );
        } else {
            setNameHelperText("");
        }
        const newInputField = {
            ...nowInputField,
            name: modifiedVal,
            id: newId,
            autoComplete: modifiedVal,
            localStorageValueKey: modifiedVal,
        };
        const targetContent = [...contents[activeStep]];
        targetContent[nowTargetInputFieldIndex] = newInputField;
        const newContents = [...contents];
        newContents[activeStep] = targetContent;
        setContents(newContents);
    };

    const handleLabel = (val: string) => {
        const newInputField = {
            ...nowInputField,
            label: val,
        };
        const targetContent = [...contents[activeStep]];
        targetContent[nowTargetInputFieldIndex] = newInputField;
        const newContents = [...contents];
        newContents[activeStep] = targetContent;
        setContents(newContents);
    };

    return (
        <Modal open={isOpened} onClose={handleClose}>
            <Paper
                sx={{
                    position: "absolute",
                    p: 2,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    minHeight: 300,
                }}
            >
                {"mode is: " + mode}

                <TextField
                    value={nowInputField?.id ?? ""}
                    label={"id"}
                    disabled
                    fullWidth
                    sx={{ mt: 2 }}
                />

                <BasicBlank
                    state={nowInputField?.name ?? ""}
                    setState={handleName}
                    helperText={nameHelperText}
                    error={nameHelperText ? true : false}
                    isFullWidth
                    label="name"
                    sx={{ mt: 2 }}
                    required
                />

                <BasicBlank
                    state={nowInputField?.label ?? ""}
                    setState={handleLabel}
                    isFullWidth
                    label="질문"
                    sx={{ mt: 2 }}
                    required
                />
            </Paper>
        </Modal>
    );
};

export default InputFieldSettings;
