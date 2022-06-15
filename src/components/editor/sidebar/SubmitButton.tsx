import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
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
    willBeUploadedFilesState,
} from "../recoils";
import axios from "axios";
import { infoTableKeyValueState } from "../infotable/recoils";
import {
    uploadImage,
    checkObjectAndUploadImages as checkContentsAndUploadRelatedImages,
    createParentPath,
    createPath,
    POST_ID_FLAG,
    FileAndPath,
    createFullpath,
    THUMBNAIL_KEY,
    MOBILE_THUMBNAIL_KEY,
    uploadImages,
} from "./utils";
import { WillCreatePostData } from "../../story/interfaces";
import CircularProgress from "@mui/material/CircularProgress";

const SubmitButton = () => {
    // 리셋
    const resetTitle = useResetRecoilState(formTitleState);
    const resetAssignedUser = useResetRecoilState(currentAssignedUserState);
    const resetCurBoard = useResetRecoilState(formBoardTypeState);
    const resetHashtags = useResetRecoilState(currentHashtagsState);
    const resetContentsObj = useResetRecoilState(formContentState);
    const resetThumbnailImageFile = useResetRecoilState(formThumbnailState);
    const resetMobileThumbnailImageFile = useResetRecoilState(
        formMobileThumbnailState
    );
    const resetInfoTableArray = useResetRecoilState(infoTableKeyValueState);
    // 카페 스토리만 있는 것들
    const resetCurUser = useResetRecoilState(formCurrentUserState);
    const resetCustomCafeName = useResetRecoilState(formCustomCafeNameState);
    const resetLocation = useResetRecoilState(formLocationState);
    // 현재 서브밋모드
    const resetCurrentPostID = useResetRecoilState(postIDwhenEditModeState);

    // 밸류
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

    // TODO 에딧모드에서 보이던 섬네일 리셋

    // uploadedFiles
    const [willBeUploadedFiles, setWillBeUploadedFiles] = useRecoilState(
        willBeUploadedFilesState
    );

    const pushFileAndPath = (fileAndPath: FileAndPath) => {
        setWillBeUploadedFiles((prev) => [...prev, fileAndPath]);
    };

    useEffect(() => {
        if (submitMode === SubmitMode.CREATE) {
            resetTitle();
            resetAssignedUser();
            resetCurBoard();
            resetHashtags();
            resetContentsObj();
            resetThumbnailImageFile();
            resetMobileThumbnailImageFile();
            resetInfoTableArray();
            resetCurUser();
            resetCustomCafeName();
            resetLocation();
            resetCurrentPostID();
        }
    }, [submitMode]);

    const [isUploading, setIsUploading] = useState(false);

    const handleClick = async () => {
        try {
            setIsUploading((prev) => true);
            // data prepare
            let userID;
            console.log("현재유저", curUser);
            console.log("또는 현재유저", assignedUser);
            const board = curBoard?.name;

            const cafeName = curUser?.businessName || customCafeName;

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

            const prevPath = createParentPath(userID, board, POST_ID_FLAG);

            const contents: string = await checkContentsAndUploadRelatedImages(
                contentsObj,
                prevPath,
                pushFileAndPath
            );

            // 썸네일 이미지 경로
            const thumbnailImagePath = createFullpath(
                createPath(thumbnailImageFile, prevPath, THUMBNAIL_KEY)
            );
            // 모바일 썸네일 이미지 경로
            const mobileThumbnailImagePath = createFullpath(
                createPath(
                    mobileThumbnailImageFile,
                    prevPath,
                    MOBILE_THUMBNAIL_KEY
                )
            );

            // 정보테이블
            const infoTable = JSON.stringify(infoTableArray);

            // post를 먼저 하기
            let body: WillCreatePostData = {
                title,
                userID,
                hashtags,
                thumbnailImage: thumbnailImagePath,
                mobileThumbnailImage: mobileThumbnailImagePath,
                contents,
                board,
                infoTable,
            };

            // 포스팅이 스토리라면 추가정보를 넣기
            const isStory = board === "story";

            if (isStory) {
                body["cafeName"] = cafeName;
                body["location"] = location;
            }

            let postID = -1;

            if (submitMode === SubmitMode.CREATE) {
                // post story
                const createRes = await axios.post(
                    `${process.env.REACT_APP_MAIN_BACK}/story`,
                    body
                );
                postID = createRes.data.id;
            } else {
                // edit story
                const editRes = await axios.patch(
                    `${process.env.REACT_APP_MAIN_BACK}/story/${currentPostID}`,
                    body
                );
                postID = editRes.data.id;
            }

            if (postID === -1) {
                alert("글이 제대로 올라가지 않았습니다 :(");
                return;
            }

            const afterImageParentPath = createParentPath(
                userID,
                board,
                postID
            );
            // thumbnail 업로드
            const afterThumbnailImagePath = createPath(
                thumbnailImageFile,
                afterImageParentPath,
                THUMBNAIL_KEY
            );
            await uploadImage(thumbnailImageFile, afterThumbnailImagePath);
            // mobile thumbnail 업로드
            const afterMobileThumbnailImagePath = createPath(
                mobileThumbnailImageFile,
                afterImageParentPath,
                MOBILE_THUMBNAIL_KEY
            );
            await uploadImage(
                mobileThumbnailImageFile,
                afterMobileThumbnailImagePath
            );

            // 이미지 전체 올리기
            await uploadImages(willBeUploadedFiles);

            // 올린 후 초기화
            setWillBeUploadedFiles((prev) => []);

            alert("잘 제출 되었습니다! :)");
            setIsUploading((prev) => false);
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
            {isUploading && (
                <div style={{ position: "fixed", zIndex: 50 }}>
                    <CircularProgress />
                </div>
            )}
        </Box>
    );
};

export default SubmitButton;
