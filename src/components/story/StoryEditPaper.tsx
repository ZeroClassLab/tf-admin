import React from "react";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import StoryPaper from "./StoryPaper";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPageState } from "../recoils";
import {
    assignedUserListState,
    currentAssignedUserState,
    currentHashtagsState,
    formBoardTypeState,
    formContentState,
    formCurrentUserState,
    formCustomCafeNameState,
    formLocationState,
    formMobileThumbnailState,
    formThumbnailState,
    formTitleState,
    isCustomUserState,
    postIDwhenEditModeState,
} from "../editor/recoils";
import axios from "axios";
import { infoTableKeyValueState } from "../editor/infotable/recoils";
import { PostData } from "./interfaces";
import { formUserListState } from "../editor/recoils";

interface StoryEditPaperProps {
    title: string;
    date: string;
    views: number;
    userID: number;
    postID: number;
    src?: string;
}

const StoryEditPaper: React.VFC<StoryEditPaperProps> = ({
    title,
    userID,
    postID,
    date,
    views,
    src,
}) => {
    const setCurPage = useSetRecoilState(currentPageState);

    const setCurrentPostID = useSetRecoilState(postIDwhenEditModeState);

    const userList = useRecoilValue(formUserListState);
    const assignedUserList = useRecoilValue(assignedUserListState);

    const setTitle = useSetRecoilState(formTitleState);
    const setCurUser = useSetRecoilState(formCurrentUserState);
    const setAssignedUser = useSetRecoilState(currentAssignedUserState);
    const setIsCustomUserState = useSetRecoilState(isCustomUserState);
    const setCustomCafeName = useSetRecoilState(formCustomCafeNameState);
    // const setCurBoard = useSetRecoilState(formBoardTypeState);
    const setLocation = useSetRecoilState(formLocationState);
    const setHashtags = useSetRecoilState(currentHashtagsState);
    const setContentsObj = useSetRecoilState(formContentState);
    // const setThumbnailImageFile = useSetRecoilState(formThumbnailState);
    // const setMobileThumbnailImageFile = useSetRecoilState(
    //     formMobileThumbnailState
    // );
    const setInfoTableArray = useSetRecoilState(infoTableKeyValueState);

    const moveTo = async () => {
        const res = await axios.get<PostData>(
            `${process.env.REACT_APP_MAIN_BACK}/story?userID=${userID}&postID=${postID}`
        );
        const storyData = res.data;
        console.log(storyData);

        // 보드 NOTE: 필요없음
        // setCurBoard(storyData.board);

        // 제목
        setTitle(storyData.title);

        // 현재 포스트아이디
        setCurrentPostID(postID);

        // 유저
        if (userID === -1) {
            setCurUser(undefined);
            setAssignedUser(undefined);
            setIsCustomUserState(true);
        } else {
            if (storyData.board.name === "story") {
                const selectedUser = userList.filter(
                    (user) => user.userID === userID
                )[0];
                setCurUser(selectedUser);
            } else {
                const selectedUser = assignedUserList.filter(
                    (user) => user.userID === userID
                )[0];
                setAssignedUser(selectedUser);
            }
        }

        // cafename과 location (story 만해당)
        if (storyData.cafeName) {
            setCustomCafeName(storyData.cafeName);
        }
        if (storyData.location) {
            setLocation(storyData.location);
        }

        // 콘텐츠
        if (storyData.contents) {
            const contentsObj = JSON.parse(storyData.contents);
            setContentsObj(contentsObj);
        }

        // 해시태그
        setHashtags(storyData.hashtags);

        // TODO: 안에 데이터 넣는 거 적용하기
        // setThumbnailImageFile(storyData.thumbnailImage)
        // setMobileThumbnailImageFile(storyData.mobileThumbnailImage)

        // table info
        if (storyData.infoTable) {
            const infoTableObj = JSON.parse(storyData.infoTable);
            setInfoTableArray(infoTableObj);
        }

        setCurPage(53);
    };
    return (
        <StoryPaper onClick={moveTo}>
            <Typography
                variant="body1"
                component="div"
                sx={{
                    textOverflow: "ellipsis",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    maxWidth: 150,
                    mb: 2,
                    overflow: "hidden",
                }}
            >
                {title}
            </Typography>

            {src && (
                <img style={{ width: "80%" }} src={src} alt={`${title}-img`} />
            )}

            <Badge
                sx={{
                    position: "absolute",
                    right: 35,
                    top: 27,
                }}
                max={999}
                badgeContent={views}
                color={"info"}
            />

            <Typography
                sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    display: "inline-block",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: 190,
                }}
                variant="body2"
            >
                게시: {date}
            </Typography>
        </StoryPaper>
    );
};

export default StoryEditPaper;
