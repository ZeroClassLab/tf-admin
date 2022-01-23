import { atom, selector } from "recoil";
import {
    ContentsData,
    SectionData,
    StepperData,
    SurveyInfoProps,
} from "./interfaces";

// atom

/**
 * stepper 관한 정보들
 */
export const stepperState = atom<StepperData[]>({
    key: "surveySteppers",
    default: [{ label: "" }],
});

/**
 * 섹션 관한 정보들
 */
export const sectionState = atom<SectionData[]>({
    key: "surveySections",
    default: [{ title: "", subtitle: "" }],
});

/**
 * 섹션의 내욜 관한 정보들
 */
export const contentsState = atom<ContentsData[][]>({
    key: "surveyContents",
    default: [[]],
});

/**
 * 편집모드인지 미리보기 모드인지
 */
export const isSurveyViewModeState = atom({
    key: "isSurveyViewmode",
    default: false,
});

/**
 * 서베이 타입
 *
 * @example
 * ```ts
 * 'cafe' | 'pub'
 * ```
 */
export const surveyTypeState = atom({
    key: "surveyType",
    default: "cafe",
});

/**
 * 현재 서베이 액티브 스텝
 */
export const activeStepState = atom({
    key: "surveyActiveStep",
    default: 0,
});

export const nowSurveyInfoState = atom<SurveyInfoProps>({
    key: "nowSurveyInformation",
    default: {
        name: "",
        authors: "",
        isCoEditable: true,
        isPublished: true,
        isSelected: false,
        type: "",
    },
});

export const isInpuFieldSettingsOpenedState = atom({
    key: "isInputFieldSettingsOpened",
    default: false,
});

export const inputFieldSettingsModeState = atom({
    key: "inputFieldSettingsMode",
    default: "edit",
});

export const nowTargetInputFieldIndexState = atom({
    key: "nowTargetInputFieldIndex",
    default: 0,
});

/**
 * 지금 프론트 상에서 선택된 서베이 폼
 */
export const nowSurveyObjectIdState = atom({
    key: "nowSurveyObjectId",
    default: "",
});

/**
 * 지금 선택되어있는 서베이폼
 */
export const selectedSurveyObjectIdState = atom({
    key: "selectedSurveyObjectId",
    default: "",
});

// selector

/**
 * 스텝의 길이
 */
export const stepsLengthSelector = selector({
    key: "surveyStepsLength",
    get: ({ get }) => {
        const steps = get(stepperState);

        return steps.length;
    },
});

// export const setCurrentStepSelector = selector({
//     key: 'surveyCurrentStep',
//     set: ({set}) => {

//     }
// })
