import React, { useState } from "react";
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
    formHashtagListState,
} from "../recoils";
import axios from "axios";
import { urltoFile } from "../uploadUtils";
import { Buffer } from "buffer";

const Base58 = require("base-58");

let imageCount = 0;

const SubmitButton = () => {
    const title = useRecoilValue(formTitleState);
    const curUser = useRecoilValue(formCurrentUserState);
    const customCafeName = useRecoilValue(formCustomCafeNameState);
    const curBoard = useRecoilValue(formBoardTypeState);
    const location = useRecoilValue(formLocationState);
    const hashtags = useRecoilValue(formHashtagListState);
    const contentsObj = useRecoilValue(formContentState);
    const thumbnailImageFile = useRecoilValue(formThumbnailState);
    const mobileThumbnailImageFile = useRecoilValue(formMobileThumbnailState);

    const uploadImage = async (
        userID: number,
        imageFile: File | undefined,
        postName: string,
        imageType: string
    ) => {
        if (!imageFile) {
            return "";
        }

        const boardPath = curBoard?.name || "ERROR";

        const filenameArr = imageFile.name.split("."); // 확장자를 찾기위한 스플릿
        const fileext = filenameArr[filenameArr.length - 1]; // 확장자
        const filepath = `${userID}/${boardPath}/${postName}/${imageType}.${fileext}`; // 폼 데이터에 넣어줄...
        const fullpath = `${process.env.REACT_APP_IMAGE_SERVER_URL}/${filepath}`; // 서버url 포함 파일 경로

        const imageForm = new FormData();
        imageForm.append("files", imageFile);
        imageForm.append("paths", filepath);

        console.log(imageForm);
        console.log(imageFile);
        console.log(filepath);

        try {
            await axios.post<any, any>(
                `${process.env.REACT_APP_MAIN_BACK}/s3upload`,
                imageForm,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (e) {
            console.error(e);
            alert(`${imageType} 사진 업로드 중 실패!`);
        }
        // upload thumnail
        // full path should be thumbnailImage
        return fullpath;
    };

    const checkObjectAndUploadImages = async (
        userID: number,
        postName: string
    ) => {
        const deepCopiedObj = JSON.parse(JSON.stringify(contentsObj));
        try {
            const modified = await checkObjectAndUploadImagesHelper(
                deepCopiedObj,
                userID,
                postName
            );
            imageCount = 0;
            return JSON.stringify(modified);
        } catch (e) {
            console.error(e);
            alert("안에 있는 이미지를 올리는데 실패하였습니다!");
            imageCount = 0;
            return "";
        }
    };
    const checkObjectAndUploadImagesHelper = async (
        obj: any,
        userID: number,
        postName: string
    ): Promise<any> => {
        if (Array.isArray(obj)) {
            const newArr = [];
            for (const ele of obj) {
                newArr.push(
                    await checkObjectAndUploadImagesHelper(
                        ele,
                        userID,
                        postName
                    )
                );
            }
            return newArr;
        } else if (typeof obj === "object" && "type" in obj && "url" in obj) {
            imageCount++;
            const url = obj["url"];
            let urlSplit = url.split(".");
            if (url[0] === "d") {
                urlSplit = url.split(";")[0];
                urlSplit = urlSplit.split("/");
            }
            const ext = urlSplit[urlSplit.length - 1];
            const filename = `${imageCount}`;
            const filenameWithExt = `${imageCount}.${ext}`;
            const f = await urltoFile(
                obj["url"],
                filenameWithExt,
                `image/${ext}`
            );
            const path = await uploadImage(userID, f, postName, filename);
            obj["url"] = path;
            return obj;
        } else if (typeof obj === "object") {
            const anyObj: { [key: string]: any } = {};
            for (const key in obj) {
                anyObj[key] = await checkObjectAndUploadImagesHelper(
                    obj[key],
                    userID,
                    postName
                );
            }
            return anyObj;
        } else {
            return obj;
        }
    };

    const handleClick = async () => {
        try {
            // data prepare
            const userID = curUser?.userID || -1;
            const board = curBoard?.name;

            const cafeName = curUser?.cafeName || customCafeName;
            const postName: string = Base58.encode(Buffer.from(title));

            if (!cafeName) {
                alert("작성자를 선택해주시거나 입력해주세요!");
                return;
            }

            if (!board) {
                alert("게시판 종류가 설정이 안되어 있습니다!");
                return;
            }

            const thumbnailImage = await uploadImage(
                userID,
                thumbnailImageFile,
                postName,
                "thumbnail"
            );

            const mobileThumbnailImage = await uploadImage(
                userID,
                mobileThumbnailImageFile,
                postName,
                "mobileThumbnail"
            );

            const contents: string = await checkObjectAndUploadImages(
                userID,
                postName
            );

            const isStory = board === "story";

            let body: { [key: string]: any } = {
                title,
                userID,
                thumbnailImage,
                mobileThumbnailImage,
                contents,
                board,
            };

            if (isStory) {
                body["cafeName"] = cafeName;
                body["location"] = location;
            }
            console.log(body);

            // post story
            await axios.post(
                `${process.env.REACT_APP_MAIN_BACK}/story${
                    isStory ? "" : "/" + board
                }`,
                body
            );
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Box sx={{ m: 2 }}>
            <Button fullWidth variant="contained" onClick={handleClick}>
                포스팅
            </Button>
        </Box>
    );
};

export default SubmitButton;
