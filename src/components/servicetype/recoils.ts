import { atom } from "recoil";
import { BoardType, ServiceType } from "./types";

export const serviceTypeListState = atom<ServiceType[]>({
    key: "serviceTypeList",
    default: [],
});

export const boardTypeListState = atom<BoardType[]>({
    key: "boardTypeList",
    default: [],
});
