import { atom, selector } from "recoil";

export const currentPageState = atom({ key: "currentPage", default: 0 });

export const isLoadingState = atom({
    key: "isFormDataLoading",
    default: false,
});

interface FormContentData {
    [key: string]: any;
}

export const formContentDataListState = atom<FormContentData[]>({
    key: "formContentDataList",
    default: [],
});

export const currentFormContentData = atom<FormContentData>({
    key: "curFormContentData",
    default: {},
});

interface SurveyContentData {
    [key: string]: any;
}

export const surveyContentDataListState = atom<SurveyContentData[]>({
    key: "surveyContentDataList",
    default: [],
});
