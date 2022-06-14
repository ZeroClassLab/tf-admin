import { BoardType } from "../servicetype/types";

export interface StoryPaperProps {
    onClick: () => void;
}

export interface QuasiPostData {
    userID: number;
    hashtags: string[];
    mobileThumbnailImage: string;
    thumbnailImage: string;
    title: string;
    cafeName?: string;
    location?: string;
}

export interface DefaultPostData extends QuasiPostData {
    contents: string;
    srcPath: number;
    infoTable?: string;
}

/**
 * story/list 로 불러왔을 때 나오는 포스트데이터
 */
export interface PostDataInList extends QuasiPostData {
    date: string;
    likes: number;
    nickname?: string;
    postID: number;
    views: number;
    profileImage: string;
}

/**
 * 포스트요청으로 포스팅을 생성할 때 필요한 인터페이스
 */
export interface WillCreatePostData extends DefaultPostData {
    board: string;
    postID?: number;
}

/**
 * 포스트 상세 get 하면 받는 데이터
 */
export interface PostData extends DefaultPostData {
    date: string;
    board: BoardType;
    likes: number;
    postID: number;
    views: number;
}
