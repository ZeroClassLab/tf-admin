import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import {
    formContentState,
    formCurrentUserState,
    formThumbnailState,
    formTitleState,
    formLocationState,
    formBoardTypeState,
    formCustomCafeNameState,
    formMobileThumbnailState,
    currentAssignedUserState,
    currentHashtagsState,
    editorSubmitModeState,
    SubmitMode,
    postIDwhenEditModeState,
} from "../recoils";
import axios from "axios";
import { infoTableKeyValueState } from "../infotable/recoils";
import {
    uploadImage,
    checkObjectAndUploadImages as checkContentsAndUploadRelatedImages,
} from "./utils";
import { WillCreatePostData } from "../../story/interfaces";

const SubmitButton = () => {
    const title = useRecoilValue(formTitleState);
    const assignedUser = useRecoilValue(currentAssignedUserState);
    const curBoard = useRecoilValue(formBoardTypeState);
    const hashtags = useRecoilValue(currentHashtagsState);
    const contentsObj = useRecoilValue(formContentState);
    const thumbnailImageFile = useRecoilValue(formThumbnailState);
    const mobileThumbnailImageFile = useRecoilValue(formMobileThumbnailState);
    const infoTableArray = useRecoilValue(infoTableKeyValueState);
    // 카페 스토리만 있는 것들
    const curUser = useRecoilValue(formCurrentUserState);
    const customCafeName = useRecoilValue(formCustomCafeNameState);
    const location = useRecoilValue(formLocationState);
    // 현재 서브밋모드
    const submitMode = useRecoilValue(editorSubmitModeState);
    const currentPostID = useRecoilValue(postIDwhenEditModeState);

    // 에딧모드에서 보이던 섬네일 리셋

    const handleClick = async () => {
        try {
            // data prepare
            let userID;
            console.log("현재유저", curUser);
            console.log("또는 현재유저", assignedUser);
            const board = curBoard?.name;
            const srcPath = curBoard?.autoIncrement ?? -1;

            const cafeName = curUser?.cafeName || customCafeName;

            // NOTE 나중에는 사용자가 작성할줄 아는 보드 종류에 속하면 하기
            if (board === "story") {
                if (!cafeName) {
                    alert("작성자를 선택해주시거나 입력해주세요!");
                    return;
                }
                userID = curUser?.userID ?? -1;
            } else {
                userID = assignedUser?.userID;
            }

            if (!board) {
                alert("게시판 종류가 설정이 안되어 있습니다!");
                return;
            }

            if (userID === undefined) {
                alert("작성자를 선택해주세요!");
                return;
            }

            if (!contentsObj) {
                alert("글의 콘텐츠가 없습니다!");
                return;
            }

            // 이미지들 업로드
            const thumbnailImage = await uploadImage(
                userID,
                board,
                thumbnailImageFile,
                srcPath,
                "thumbnail"
            );

            const mobileThumbnailImage = await uploadImage(
                userID,
                board,
                mobileThumbnailImageFile,
                srcPath,
                "mobileThumbnail"
            );

            const contents: string = await checkContentsAndUploadRelatedImages(
                contentsObj,
                userID,
                board,
                srcPath
            );

            // 기타
            const isStory = board === "story";
            const infoTable = JSON.stringify(infoTableArray);

            let body: WillCreatePostData = {
                title,
                userID,
                hashtags,
                thumbnailImage,
                mobileThumbnailImage,
                contents,
                board,
                infoTable,
                srcPath,
            };

            if (isStory) {
                body["cafeName"] = cafeName;
                body["location"] = location;
            }

            console.log("body: ", body);

            if (submitMode === SubmitMode.CREATE) {
                // post story
                await axios.post(
                    `${process.env.REACT_APP_MAIN_BACK}/story`,
                    body
                );
            } else {
                body["postID"] = currentPostID;
                // edit story
                await axios.patch(
                    `${process.env.REACT_APP_MAIN_BACK}/story`,
                    body
                );
            }

            alert("잘 제출 되었습니다! :)");
        } catch (e) {
            console.log(e);
            return;
        }
    };
    return (
        <Box sx={{ m: 2, flex: 1 }}>
            <Button fullWidth variant="contained" onClick={handleClick}>
                포스팅
            </Button>
        </Box>
    );
};

export default SubmitButton;
