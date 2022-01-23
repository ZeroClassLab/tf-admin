import { atom } from "recoil";

interface FormType {
    _id: string;
    name: string;
    isValid: boolean;
}

export const formTypeListState = atom<FormType[]>({
    key: "formTypeList",
    default: [],
});
