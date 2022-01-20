import { atom } from "recoil";

export const imagesInputState = atom<File[]>({
    key: "ItemTaggerCropInfo",
    default: [],
});
