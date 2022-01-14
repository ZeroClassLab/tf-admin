export interface StepperData {
    label: string;
}

export interface SectionData {
    title: string;
    subtitle: string;
}

export interface ContentsData {
    [key: string]: any;
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
}

export interface EditPaperProps extends SurveyPaperProps {}
export interface AddPaperProps extends SurveyPaperProps {}
