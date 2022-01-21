import { atom } from "recoil";

export const allValuesStore = [];

export const createRecoilValuesOfField = (
    sectionIdx: number,
    inputFieldIdx: number,
    fieldProps: string
) => {
    const inputFieldPropsRecoilState = atom({
        key: `${sectionIdx}-${inputFieldIdx}-${fieldProps}`,
        default: "",
    });
};
