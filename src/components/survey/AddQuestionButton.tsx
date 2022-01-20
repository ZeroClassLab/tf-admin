import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import { useRecoilState, useSetRecoilState } from "recoil";
import { InputFieldType } from "./consts";
import {
    contentsState,
    activeStepState,
    isInpuFieldSettingsOpenedState,
    inputFieldSettingsModeState,
    nowTargetInputFieldIndexState,
} from "./recoils";

const AddQuestionButton = () => {
    const [contents, setContents] = useRecoilState(contentsState);
    const [activeStep, setActiveStep] = useRecoilState(activeStepState);
    const setNowInputFieldIndex = useSetRecoilState(
        nowTargetInputFieldIndexState
    );

    const setIsInputFieldSettingsOpened = useSetRecoilState(
        isInpuFieldSettingsOpenedState
    );
    const setInputFieldSettingsMode = useSetRecoilState(
        inputFieldSettingsModeState
    );

    const openQuestionSettings = () => {
        setInputFieldSettingsMode("create");
        setIsInputFieldSettingsOpened(true);
    };

    const createInputField = () => {
        // 맨 끝 인덱스로 셋
        setNowInputFieldIndex(contents[activeStep].length);
        // 콘텐츠 추가
        const targetContent = [
            ...contents[activeStep],
            {
                id: "",
                name: "",
                label: "",
                required: false,
                type: InputFieldType.BASIC,
                autoComplete: "",
                localStorageValueKey: "",
            },
        ];
        console.log(targetContent);

        const newContents = [...contents];
        newContents[activeStep] = targetContent;
        setContents(newContents);
    };

    return (
        <Button
            onClick={() => {
                createInputField();
                openQuestionSettings();
            }}
            variant="contained"
            fullWidth
        >
            질문추가
        </Button>
    );
};

export default AddQuestionButton;
