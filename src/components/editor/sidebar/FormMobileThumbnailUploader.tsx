import React from "react";
import { SimpleImageUploader } from "@zclab/react-item-tagger";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { formBoardTypeState, formMobileThumbnailState } from "../recoils";

const FormMobileThumbnailUploader = () => {
    const boardType = useRecoilValue(formBoardTypeState);
    const setFile = useSetRecoilState(formMobileThumbnailState);
    const ratio =
        (boardType?.mobileThumbnailHeight || 0) /
        (boardType?.mobileThumbnailWidth || 4);

    return (
        <SimpleImageUploader
            onUploaded={(file) => {
                setFile(file);
            }}
            ratio={ratio}
        />
    );
};

export default FormMobileThumbnailUploader;
