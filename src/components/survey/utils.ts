import { InputFieldType } from "./consts";
import { ContentsData } from "./interfaces";

export const modifyInputFieldData = (
    inputFieldType: InputFieldType,
    data: ContentsData
): ContentsData => {
    switch (inputFieldType) {
        case InputFieldType.BASIC:
            return {
                id: data.id,
                name: data.name,
                type: data.type,
                label: data.label,
                required: data.required,
                autoComplete: data.autoComplete,
                localStorageValueKey: data.localStorageValueKey,
            };
        case InputFieldType.LONG:
            return {
                id: data.id,
                name: data.name,
                type: data.type,
                label: data.label,
                required: data.required,
                autoComplete: data.autoComplete,
                localStorageValueKey: data.localStorageValueKey,
                maxRowsNum: data.maxRowsNum ?? "6",
            };
        case InputFieldType.RADIO:
            return {
                id: data.id,
                name: data.name,
                type: data.type,
                label: data.label,
                required: data.required,
                autoComplete: data.autoComplete,
                localStorageValueKey: data.localStorageValueKey,
                choices: data.choices ?? [
                    { label: "선택지 1", value: "choice1" },
                ],
            };
        case InputFieldType.PHONE:
            return {
                id: data.id,
                name: data.name,
                type: data.type,
                label: data.label,
                required: data.required,
                autoComplete: data.autoComplete,
                localStorageValueKey: data.localStorageValueKey,
            };
        case InputFieldType.MONEY:
            return {
                id: data.id,
                name: data.name,
                type: data.type,
                label: data.label,
                required: data.required,
                autoComplete: data.autoComplete,
                localStorageValueKey: data.localStorageValueKey,
                unitMask: data.unitMask ?? "원",
            };
        case InputFieldType.KAKAO_ADDRESS:
            return {
                id: data.id,
                name: data.name,
                type: data.type,
                label: data.label,
                required: data.required,
                autoComplete: data.autoComplete,
                localStorageValueKey: data.localStorageValueKey,
            };
        case InputFieldType.IMAGE:
            return {
                id: data.id,
                name: data.name,
                type: data.type,
                label: data.label,
                required: data.required,
                autoComplete: data.autoComplete,
                localStorageValueKey: data.localStorageValueKey,
                maxImageNums: data.maxImageNums ?? "5",
            };
        case InputFieldType.ITEMTAGGER:
            return {
                id: "tf-itemtagger",
                name: "tfItemtagger",
                type: data.type,
                label: data.label,
                required: data.required,
                autoComplete: "tfItemtagger",
                localStorageValueKey: "tfItemtagger",
                maxImageNums: data.maxImageNums ?? "5",
            };
        case InputFieldType.NEU: // TODO new feature
            return {
                id: "",
                name: "",
                type: data.type,
                required: false,
                label: "",
                autoComplete: "",
                localStorageValueKey: "",
            };
    }
};
