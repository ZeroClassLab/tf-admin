import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BasicBlank from "./BasicBlank";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    contentsState,
    inputFieldSettingsModeState,
    isInpuFieldSettingsOpenedState,
    activeStepState,
    nowTargetInputFieldIndexState,
} from "./recoils";
import { InputFieldType, inputFieldTypeLabelList } from "./consts";
import InputFieldTypeButton from "./InputFieldTypeButton";
import { modifyInputFieldData } from "./utils";
import { ContentsData } from "./interfaces";

const InputFieldSettings = () => {
    const [nameHelperText, setNameHelperText] = useState("");
    const [maxRowsLengthHelperText, setMaxRowsLengthHelperText] = useState("");
    const [maxImagesLengthHelperText, setMaxImagesLengthHelperText] =
        useState("");

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

    const removeSelf = () => {
        const newContent = contents[activeStep].filter((content, i) => {
            if (i !== nowTargetInputFieldIndex) {
                return content;
            }
        });
        const newContents = [...contents];
        newContents[activeStep] = newContent;
        setContents(newContents);
    };

    const handleClose = () => {
        if (!nowInputField.name) {
            setNameHelperText("????????? ????????? ??????????????????.");
            return;
        } else {
            setNameHelperText("");
        }
        setIsOpened(false);
        setMode("edit");
    };

    const cancelWhenCreate = () => {
        if (mode === "create") {
            removeSelf();
            setIsOpened(false);
            setMode("edit");
        } else {
            handleClose();
        }
    };

    const handleRequired = (val: InputFieldType) => {
        const newInputField = modifyInputFieldData(val, {
            ...nowInputField,
            required: !nowInputField.required,
        });

        setFieldContent(newInputField);
    };

    const handleName = (val: string) => {
        const modifiedVal = val.replace(/[^a-zA-Z]/g, "");
        const newId = modifiedVal.replace(/([A-Z])/g, "-$1").toLowerCase();
        if (modifiedVal === nowInputField.name) {
            setNameHelperText(
                "???????????? ?????? ??????????????? ?????????????????????. ???) myCaligula"
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

        setFieldContent(newInputField);
    };

    const handleType = (val: InputFieldType) => {
        const newInputField = modifyInputFieldData(val, {
            ...nowInputField,
            type: val,
        });

        setFieldContent(newInputField);
    };

    const areSameType = (val: InputFieldType) => val === nowInputField.type;

    const handleLabel = (val: string) => {
        const newInputField = {
            ...nowInputField,
            label: val,
        };

        setFieldContent(newInputField);
    };

    const handleMaxRowsLength = (val: string) => {
        // validation
        let numVal = Number(val);
        if (Number.isNaN(numVal)) {
            setMaxRowsLengthHelperText("????????? ??????????????????!");
            numVal = Number(nowInputField.maxRowsNum);
        } else if (numVal < 1) {
            setMaxRowsLengthHelperText("0?????? ??? ????????? ??????????????????!");
            numVal = 1;
        } else {
            setMaxRowsLengthHelperText("");
        }

        const newInputField = {
            ...nowInputField,
            maxRowsNum: String(numVal),
        };

        setFieldContent(newInputField);
    };

    const handleMaxImagesLength = (val: string) => {
        let numVal = Number(val);
        if (Number.isNaN(numVal)) {
            setMaxImagesLengthHelperText("????????? ??????????????????!");
            numVal = Number(nowInputField.maxImageNums);
        } else if (numVal < 1) {
            setMaxImagesLengthHelperText("0?????? ??? ????????? ??????????????????!");
            numVal = 1;
        } else {
            setMaxImagesLengthHelperText("");
        }

        const newInputField = {
            ...nowInputField,
            maxImageNums: String(numVal),
        };

        setFieldContent(newInputField);
    };

    const handleUnitMask = (val: string) => {
        const newInputField = {
            ...nowInputField,
            unitMask: val,
        };

        setFieldContent(newInputField);
    };

    const setFieldContent = (newInputField: ContentsData) => {
        const targetContent = [...contents[activeStep]];
        targetContent[nowTargetInputFieldIndex] = newInputField;
        const newContents = [...contents];
        newContents[activeStep] = targetContent;
        setContents(newContents);
    };

    const returnHandleChoiceText = (idx: number) => (val: string) => {
        const newVal = [
            ...(nowInputField?.choices ?? [{ label: "", value: "" }]),
        ];
        newVal[idx] = { label: val, value: newVal[idx].value };

        const newInputField = {
            ...nowInputField,
            choices: newVal,
        };

        setFieldContent(newInputField);
    };

    const returnHandleChoiceValue = (idx: number) => (val: string) => {
        const newVal = [
            ...(nowInputField?.choices ?? [{ label: "", value: "" }]),
        ];
        newVal[idx] = { label: newVal[idx].label, value: val };

        const newInputField = {
            ...nowInputField,
            choices: newVal,
        };

        setFieldContent(newInputField);
    };

    const removeChoice = (idx: number) => {
        const newVal = [
            ...(nowInputField?.choices ?? [{ label: "", value: "" }]),
        ];
        newVal.splice(idx, 1);

        const newInputField = {
            ...nowInputField,
            choices: newVal,
        };

        setFieldContent(newInputField);
    };

    const addChoice = (idx: number) => {
        const newVal = [
            ...(nowInputField?.choices ?? [{ label: "", value: "" }]),
        ];
        newVal.splice(idx + 1, 0, {
            label: `????????? ${idx + 2}`,
            value: `${idx + 2}`,
        });
        const newInputField = {
            ...nowInputField,
            choices: newVal,
        };

        setFieldContent(newInputField);
    };

    return (
        <Modal
            open={isOpened}
            onClose={mode === "create" ? cancelWhenCreate : handleClose}
        >
            <Paper
                sx={{
                    position: "absolute",
                    p: 4,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    minHeight: 300,
                    maxHeight: "80vh",
                    overflow: "scroll",
                }}
            >
                {nowInputField && (
                    <Grid
                        container
                        sx={{ justifyContent: "space-between", width: "100%" }}
                    >
                        {inputFieldTypeLabelList.map((t) => {
                            if (t === InputFieldType.NEU) {
                                return (
                                    <Grid key={`${t}-config`} item xs={4}>
                                        <InputFieldTypeButton
                                            type={t}
                                            areSameType={areSameType}
                                            handleType={handleType}
                                            disabled
                                        />
                                    </Grid>
                                );
                            }
                            return (
                                <Grid key={`${t}-config`} item xs={4}>
                                    <InputFieldTypeButton
                                        type={t}
                                        areSameType={areSameType}
                                        handleType={handleType}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                )}

                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={nowInputField?.required}
                                onChange={() =>
                                    handleRequired(nowInputField?.type)
                                }
                            />
                        }
                        label="??????"
                    />
                </FormGroup>

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
                    label="name / ex) cafeOwnerName"
                    sx={{ mt: 2 }}
                    required
                />

                <BasicBlank
                    state={nowInputField?.label ?? ""}
                    setState={handleLabel}
                    isFullWidth
                    label="??????"
                    sx={{ mt: 2 }}
                    required
                />

                {nowInputField?.type === InputFieldType.LONG && (
                    <BasicBlank
                        state={nowInputField?.maxRowsNum ?? ""}
                        setState={handleMaxRowsLength}
                        helperText={maxRowsLengthHelperText}
                        error={maxRowsLengthHelperText ? true : false}
                        isFullWidth
                        label="??? ????????? ????????? ??? ???"
                        sx={{ mt: 2 }}
                        required
                    />
                )}

                {(nowInputField?.type === InputFieldType.IMAGE ||
                    nowInputField?.type === InputFieldType.ITEMTAGGER) && (
                    <BasicBlank
                        state={nowInputField?.maxImageNums ?? ""}
                        setState={handleMaxImagesLength}
                        helperText={maxImagesLengthHelperText}
                        error={maxImagesLengthHelperText ? true : false}
                        isFullWidth
                        label="????????? ?????? ??????"
                        sx={{ mt: 2 }}
                        required
                    />
                )}

                {nowInputField?.type === InputFieldType.NUMUNIT && (
                    <BasicBlank
                        state={nowInputField?.unitMask ?? ""}
                        setState={handleUnitMask}
                        helperText={"ex) $"}
                        isFullWidth
                        label="??????"
                        sx={{ mt: 2 }}
                        required
                    />
                )}

                {nowInputField?.type === InputFieldType.RADIO &&
                    nowInputField?.choices?.map((choice, idx) => {
                        return (
                            <Box sx={{ mt: 2 }} key={`choice-${idx}`}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "stretch",

                                        gap: 1,
                                    }}
                                >
                                    <BasicBlank
                                        state={
                                            nowInputField?.choices
                                                ? choice.label
                                                : ""
                                        }
                                        setState={returnHandleChoiceText(idx)}
                                        label={`????????? ?????? ${idx + 1}`}
                                        required
                                    />
                                    <BasicBlank
                                        state={
                                            nowInputField?.choices
                                                ? choice.value
                                                : ""
                                        }
                                        setState={returnHandleChoiceValue(idx)}
                                        label={`????????? ??? ${idx + 1}`}
                                        required
                                    />
                                    <Button
                                        sx={{ width: "30%" }}
                                        onClick={() => {
                                            removeChoice(idx);
                                        }}
                                        variant="contained"
                                    >
                                        ??????
                                    </Button>
                                </Box>
                                <Button onClick={() => addChoice(idx)}>
                                    ????????? ??????
                                </Button>
                            </Box>
                        );
                    })}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {mode === "create" && (
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mr: 2 }}
                            onClick={() => {
                                cancelWhenCreate();
                            }}
                        >
                            ??????
                        </Button>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={handleClose}
                    >
                        ??????
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
};

export default InputFieldSettings;
