import React from "react";
import Grid from "@mui/material/Grid";
// import Grid from "@mui/material/Grid"

import CroppableItemTagger from "../../itemTaggingComponent/CroppableItemTagger";
import {
    itemTaggerCropInfoState,
    itemTaggerImageInputState,
    itemTaggerOriginalFilesState,
    // itemTaggerImageMaxNumState,
} from "../mock/CroppableItemTaggerMockups";

interface ItemTaggerInputFieldProps {
    maxImageLength: number;
}

const ItemTaggerInputField: React.VFC<ItemTaggerInputFieldProps> = ({
    maxImageLength,
}) => {
    return (
        <Grid item xs={12}>
            <CroppableItemTagger
                taggedImagesRecoil={itemTaggerImageInputState}
                originalFilesRecoil={itemTaggerOriginalFilesState}
                cropInfosRecoil={itemTaggerCropInfoState}
                imageMaxNum={maxImageLength}
            />
        </Grid>
    );
};

export default ItemTaggerInputField;
