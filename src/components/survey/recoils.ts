import { atom, selector } from "recoil";
import { ContentsData, SectionData, StepperData } from "./interfaces";

// atom

export const stepperState = atom<StepperData[]>({
    key: "surveySteppers",
    default: [{ label: "" }],
});

export const sectionState = atom<SectionData[]>({
    key: "surveySections",
    default: [{ title: "", subtitle: "" }],
});

export const ContentsState = atom<ContentsData[]>({
    key: "surveyContents",
    default: [],
});

export const isSurveyViewModeState = atom({
    key: "isSurveyViewmode",
    default: false,
});

export const surveyTypeState = atom({
    key: "surveyType",
    default: "cafe",
});

export const activeStepState = atom({
    key: "surveyActiveStep",
    default: 0,
});

// selector

export const stepsLengthSelector = selector({
    key: "surveyStepsLength",
    get: ({ get }) => {
        const steps = get(stepperState);

        return steps.length;
    },
});
