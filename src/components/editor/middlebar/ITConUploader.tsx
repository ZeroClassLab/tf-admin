import React from "react";
import { SimpleImageUploader } from "@zclab/react-item-tagger";
import { useSetRecoilState } from "recoil";
import { DESK_WIDTH, DESK_HEIGHT } from "./interfaces";
import { itemTaggerUploadedFileState } from "../recoils";

/**
 * 아이템 태거 컨테이너 업로더
 *
 * 680 * 459, 328 * 264
 */
const ITConUploader = () => {
    const ratio = DESK_HEIGHT / DESK_WIDTH;
    // const ratio = DESK_WIDTH / DESK_HEIGHT;
    const setFile = useSetRecoilState(itemTaggerUploadedFileState);

    return (
        <SimpleImageUploader
            onUploaded={(file) => {
                setFile(file);
            }}
            ratio={ratio}
        />
    );
};

export default ITConUploader;
