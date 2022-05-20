import React from "react";
import { SimpleImageUploader } from "@zclab/react-item-tagger";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { formBoardTypeState, formThumbnailState } from "../recoils";

const FormThumbnailUploader = () => {
    const boardType = useRecoilValue(formBoardTypeState);
    const setFile = useSetRecoilState(formThumbnailState);
    const ratio =
        (boardType?.thumbnailHeight || 0) / (boardType?.thumbnailWidth || 4);

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
