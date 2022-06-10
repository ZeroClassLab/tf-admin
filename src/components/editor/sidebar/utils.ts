import axios from "axios";
import { ContentValue } from "@zclab/tmr-react-editor";
import { urltoFile } from "../utils/upload";

const TYPE_OBJECT = "object";
const NODE_KEY_TYPE = "type";
const NODE_KEY_URL = "url";
const NODE_VALUE_IMAGE = "img";

/**
 *
 * @param userID - auto increment user ID. 소스파일 올라갈 path 에 top level 에 쓰임
 * @param boardPath - 보드의 고유명 (boardName) 을 건네주길 바람.
 * @param imageFile - 이미지 파일 객체. 없을 수도 있음.
 * @param srcPath - 고유의 소스 path ID. board 에 autoIncrement 속성
 * @param imageFilename - 이미지 파일명
 * @returns 이미지 업로드 된 주소
 */
export const uploadImage = async (
    userID: number,
    boardPath: string,
    imageFile: File | undefined,
    srcPath: number,
    imageFilename: string
) => {
    if (!imageFile) {
        return "";
    }

    const filenameArr = imageFile.name.split("."); // 확장자를 찾기위한 스플릿
    const fileext = filenameArr[filenameArr.length - 1]; // 확장자
    const filepath = `${userID}/${boardPath}/${srcPath}/${imageFilename}.${fileext}`; // FormData 에 넣어줄...
    const fullpath = `${process.env.REACT_APP_IMAGE_SERVER_URL}/${filepath}`; // 서버url 포함 파일 경로

    const imageForm = new FormData();
    imageForm.append("files", imageFile);
    imageForm.append("paths", filepath);

    console.log("ImageForm: ", imageForm);
    console.log("imageFile: ", imageFile);
    console.log("filepath: ", filepath);

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
        alert(`${imageFile} 사진 업로드 중 실패!`);
    }

    return fullpath;
};

/**
 * 이미지들 막 넣을 카운트
 */
let imageCount = 0;

/**
 * nested level 까지 검사해서 url object 가 있으면 이미지로 바꿔버리기
 *
 * @param contentsObj - editor 의 컨텐츠 data node object's array
 * @param userID
 * @param boardPath
 * @param srcPath
 * @returns
 */
export const checkObjectAndUploadImages = async (
    contentsObj: ContentValue,
    userID: number,
    boardPath: string,
    srcPath: number
) => {
    const deepCopiedObj = JSON.parse(JSON.stringify(contentsObj));
    try {
        const modified = await checkObjectAndUploadImagesHelper(
            deepCopiedObj,
            userID,
            boardPath,
            srcPath
        );
        imageCount = 0; // 다하고 나면 초기화
        return JSON.stringify(modified); // 에디터의 내용을 stringified
    } catch (e) {
        console.error(e);
        alert("안에 있는 이미지를 올리는데 실패하였습니다!");
        imageCount = 0; // 에러가 나도 초기화
        return "";
    }
};

/**
 * nested level 까지 검사해서 url object 가 있으면 이미지로 바꿔버리기 헬퍼
 *
 * @param target - 에디터의 데이터 노드 오브젝트 혹은 그것의 nested object 혹은 value.
 * @param userID - 유저아이디
 * @param boardPath - 보드 경로 (보드 name 으로 주기)
 * @param srcPath - 고유의 소스 path ID
 * @returns
 */
const checkObjectAndUploadImagesHelper = async (
    target: any,
    userID: number,
    boardPath: string,
    srcPath: number
): Promise<any> => {
    if (Array.isArray(target)) {
        // 검사한 대상이 어레이 일 경우, 돌면서 다시 검사
        const newArr = [];
        for (const ele of target) {
            newArr.push(
                await checkObjectAndUploadImagesHelper(
                    ele,
                    userID,
                    boardPath,
                    srcPath
                )
            );
        }
        return newArr;
    } else if (
        typeof target === TYPE_OBJECT &&
        NODE_KEY_TYPE in target &&
        NODE_KEY_URL in target
    ) {
        // 대상이 오브젝트인데 'type'과 'url' key 가 오브젝트 안에 있을경우
        // == 실제 이미지 노드의 경우

        // 이미지 노드가 아닌데 url 이 있는 경우
        const type = target["type"];
        if (type !== NODE_VALUE_IMAGE) {
            return target;
        }

        // 아니면 이미지가 있으니 카운트 해주기
        imageCount++;

        // url string
        const url = target["url"];
        let urlSplit = url.split(".");
        // url 이 base64 encoded 일 경우
        if (url[0] === "d") {
            urlSplit = url.split(";")[0];
            urlSplit = urlSplit.split("/");
        }
        const ext = urlSplit[urlSplit.length - 1];
        const filename = `${imageCount}`; // 글 안의 이미지 파일명은 숫자만 해도 충분
        const filenameWithExt = `${imageCount}.${ext}`;

        const f = await urltoFile(
            target["url"],
            filenameWithExt,
            `image/${ext}`
        );

        // 이미지 실제 업로드. 그 후 오브젝트의 url 부를 이미지 업로드한 주소로 바꾸기
        const path = await uploadImage(userID, boardPath, f, srcPath, filename);
        target["url"] = path;
        return target;
    } else if (typeof target === "object") {
        // 대상이그냥 오브젝트일 경우 키마다 다 해주고 다시 할당.
        const anyObj: { [key: string]: any } = {};

        for (const key in target) {
            anyObj[key] = await checkObjectAndUploadImagesHelper(
                target[key],
                userID,
                boardPath,
                srcPath
            );
        }

        return anyObj;
    } else {
        // 다 아니면 그냥 return
        return target;
    }
};
