import { atom } from "recoil";
import { CropInfo } from "../../itemTaggingComponent/interfaces/types";
import { CafeImage } from "../../itemTaggingComponent/interfaces/types";

export const itemTaggerCropInfoState = atom<CropInfo[]>({
    key: "ItemTaggerCropInfo",
    default: [],
});

export const itemTaggerImageInputState = atom<CafeImage[]>({
    key: "ItemTaggerImageInput",
    default: [],
});

export const itemTaggerOriginalFilesState = atom<File[]>({
    key: "itemTaggerOriginalFiles",
    default: [],
});

export const itemTaggerImageMaxNumState = atom<number>({
    key: "itemTaggerImageMaxNum",
    default: 10,
});
