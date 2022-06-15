import React, { useEffect } from "react";
import { SimpleImageUploader } from "@zclab/react-item-tagger";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { formBoardTypeState, formThumbnailState } from "../recoils";
import { readThumbnailSourceState } from "../../story/recoils";

const FormThumbnailUploader = () => {
    const boardType = useRecoilValue(formBoardTypeState);
    const setFile = useSetRecoilState(formThumbnailState);
    const ratio =
        (boardType?.thumbnailHeight || 0) / (boardType?.thumbnailWidth || 4);

    const thumbnailSource = useRecoilValue(readThumbnailSourceState);

    // useEffect(() => {
    //     console.log("읽어온 썸네일 주소", thumbnailSource);
    // }, [thumbnailSource]);

    return (
        <SimpleImageUploader
            onUploaded={(file) => {
                setFile(file);
            }}
            ratio={ratio}
            src={thumbnailSource}
        />
    );
};

export default FormThumbnailUploader;
