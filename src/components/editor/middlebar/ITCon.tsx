import React from "react";
import { CroppableItemTagger } from "@zclab/react-item-tagger";
import { useRecoilValue } from "recoil";
import { itemTaggerUploadedFileState } from "../recoils";

/**
 * 아이템 태거 컨테이너
 *
 *  * 680 * 459, 328 * 264
 */
const ITCon = () => {
    const file = useRecoilValue(itemTaggerUploadedFileState);

    if (file) {
        console.log(URL.createObjectURL(file));
    }

    return (
        <CroppableItemTagger
            // readOnly
            backgroundImage={file ? URL.createObjectURL(file) : ""}
            tagDataLabels={[{ label: "안녕", key: "hello", type: "short" }]}
        />
    );
};

export default ITCon;
