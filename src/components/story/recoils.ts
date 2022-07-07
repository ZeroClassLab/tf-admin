// const [currentPageNumber, setCurrentPageNumber] = useState(0);
// const [story, storylist] = useRecoilState();
import { atom } from "recoil";
import { PostDataInList } from "./interfaces";

export const currentStoryListPageNumberState = atom({
    key: "currentFormListPageNumber",
    default: 0,
});

export const currentStoryListState = atom<PostDataInList[] | undefined>({
    key: "currentStoryList",
    default: undefined,
});

export const readThumbnailSourceState = atom<string>({
    key: "readThumbnailSource",
    default: "",
});

export const readMobileThumbnailSourceState = atom<string>({
    key: "readMobileThumbnailSource",
    default: "",
});

export const isBoardTypeChangedViaDropdownState = atom<boolean>({
    key: "isBoardTypeChangedViaDropdown",
    default: false,
});
