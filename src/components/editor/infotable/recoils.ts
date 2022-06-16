import { atom } from "recoil";
import { InfoTableData } from "./interfaces";

export const infoTableKeyValueState = atom<InfoTableData | undefined>({
    key: "infoTableKeyValue",
    default: [],
});
