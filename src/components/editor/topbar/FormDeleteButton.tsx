import React from "react";
import Button from "@mui/material/Button";
import { useRecoilValue } from "recoil";
import {
    editorSubmitModeState,
    postIDwhenEditModeState,
    SubmitMode,
} from "../recoils";
import axios from "axios";

const FormDeleteButton = () => {
    const submitMode = useRecoilValue(editorSubmitModeState);
    const postIDwhenEditMode = useRecoilValue(postIDwhenEditModeState);
    const handleDelete = async () => {
        await axios.delete(
            `${process.env.REACT_APP_MAIN_BACK}/story/${postIDwhenEditMode}`
        );
    };
    return (
        <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={handleDelete}
            disabled={submitMode === SubmitMode.CREATE}
        >
            삭제하기
        </Button>
    );
};

export default FormDeleteButton;
