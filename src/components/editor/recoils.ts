import { BackgroundImage } from "@zclab/react-item-tagger/dist/esm/itemTaggingComponent/interfaces/types";
import axios from "axios";
import { atom, selector } from "recoil";
import { BoardType, ServiceType } from "../servicetype/types";
import { EditorUser, USER_ROLE } from "./configs/constants";
import { ContentValue } from "@zclab/tmr-react-editor";
import { FileAndPath } from "./sidebar/utils";

export const formTitleState = atom({
    key: "formTitleEditor",
    default: "",
});

export const formLocationState = atom({
    key: "formLocationEditor",
    default: "",
});

export const formThumbnailState = atom<File | undefined>({
    key: "formThumbnailEditor",
    default: undefined,
});

export const formMobileThumbnailState = atom<File | undefined>({
    key: "formMobileThumbnailEditor",
    default: undefined,
});

/**
 * @deprecated
 */
export const formThumbnailCropInfoState = atom<BackgroundImage[]>({
    key: "formThumbnailCropInfoEditor",
    default: [],
});

export const formUserListSelector = selector({
    key: "formUserListEditorSelector",
    get: async ({ get }) => {
        const data = await axios.get(
            `${process.env.REACT_APP_MAIN_BACK}/user/all`
        );
        return data.data;
    },
});

export const formUserListState = atom<EditorUser[]>({
    key: "formUserListEditor",
    default: formUserListSelector,
});

export const formCurrentUserState = atom<EditorUser | undefined>({
    key: "formUserEditor",
    default: undefined,
});

export const formContentState = atom<ContentValue | undefined>({
    key: "formContentEditor",
    default: [],
});

export const formServiceTypeState = atom<ServiceType>({
    key: "formServiceTypeEditor",
    default: {
        _id: "default",
        name: "default",
        isValid: false,
    },
});

export const formBoardTypeState = atom<BoardType | undefined>({
    key: "formBoardTypeEditor",
    default: undefined,
});

export const formCustomCafeNameState = atom({
    key: "formCustomCafeNameEditor",
    default: "",
});

export const isCustomUserState = atom({
    key: "formIsCustomUserEditor",
    default: false,
});

export const currentHashtagsState = atom<string[]>({
    key: "currentHashtagsEditor",
    default: [],
});

interface Hashtag {
    _id: string;
    board: string;
    name: string;
}

export const formHashtagListState = atom<Hashtag[]>({
    key: "formHashtagsListEditor",
    default: [],
});

export const assignedUserListState = atom<EditorUser[]>({
    key: "assignedUserListEditor",
    default: [],
});

export const currentAssignedUserState = atom<EditorUser | undefined>({
    key: "currentAssignedUserEditor",
    default: undefined,
});

export const isPreviewState = atom<boolean>({
    key: "isPreviewEditor",
    default: false,
});

// 서브밋

export const postIDwhenEditModeState = atom<number>({
    key: "postIDwhenEditMode",
    default: -1,
});

/**
 * 제출모드
 */
export enum SubmitMode {
    EDIT = "edit",
    CREATE = "create",
}

export const editorSubmitModeState = atom<SubmitMode>({
    key: "editorSubmitMode",
    default: SubmitMode.EDIT,
});

export const willBeUploadedFilesState = atom<FileAndPath[]>({
    key: "willBeUploadedFiles",
    default: [],
});

// middleBar && 아이템 태거

export const isMiddlebarOpenState = atom({
    key: "isMiddlebarOpenEditor",
    default: false,
});

export const itemTaggerDataState = atom({
    key: "itemTaggerData",
    default: "",
});

export const itemTaggerUploadedFileState = atom<File | undefined>({
    key: "itemTaggerUploadedFile",
    default: undefined,
});

//
