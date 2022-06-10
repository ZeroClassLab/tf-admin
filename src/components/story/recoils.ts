// const [currentPageNumber, setCurrentPageNumber] = useState(0);
// const [story, storylist] = useRecoilState();
import { atom } from "recoil";
import { PostDataInList } from "./interfaces";

export const currentStoryListPageNumberState = atom({
    key: "currentFormListPageNumber",
    default: 0,
});

export const currentStoryListState = atom<PostDataInList[]>({
    key: "currentStoryList",
    default: [],
});
