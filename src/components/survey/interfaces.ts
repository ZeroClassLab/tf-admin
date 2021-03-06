import { InputFieldType } from "./consts";

export interface StepperData {
    label: string;
}

export interface SectionData {
    title: string;
    subtitle: string;
}

export interface ChoiceLabel {
    value: string;
    label: string;
}

export interface ContentsData {
    id: string;
    type: InputFieldType;
    name: string;
    label: string;

    /**
     * 선택사항?
     */
    required: boolean;

    /**
     * type 이 텍스트 종류일 경우만 사용하나 편한 사용을 위해 모두 포함함
     */
    autoComplete: string;

    /**
     * type 이 텍스트 종류일 경우만 사용하나 편한 사용을 위해 모두 포함함
     */
    localStorageValueKey: string;

    /**
     * type 이 LONG 일 경우
     */
    maxRowsNum?: string;

    /**
     * type: radio
     */
    choices?: ChoiceLabel[];

    /**
     * type 이 IMAGE 일 경우
     */
    maxImageNums?: string;

    /**
     * type: numunit
     */
    unitMask?: string;

    [key: string]: any;
}

export interface SurveySchema {
    type: string;
    stepper: StepperData[];
    section: SectionData[];
    contents: ContentsData[][];
}

export interface SurveyPaperProps {
    onClick: () => void;
}

export interface SurveyInfoProps {
    name: string;
    authors: string;
    isCoEditable: boolean;
    isPublished: boolean;
    isSelected: boolean;
    type: string;
    modifiedDate?: string;
}

export interface EditPaperProps extends SurveyPaperProps {
    title: string;
    preview: {
        section: SectionData;
        contents: ContentsData[];
        modifiedDate: string;
        surveyType: string;
        isSelected: boolean;
    };
}
export interface AddPaperProps extends SurveyPaperProps {}
