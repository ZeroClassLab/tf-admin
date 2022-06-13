import React from "react";
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

    return (
        <SimpleImageUploader
            onUploaded={(file) => {
                setFile(file);
            }}
            ratio={ratio}
        />
    );
};

export default FormThumbnailUploader;
