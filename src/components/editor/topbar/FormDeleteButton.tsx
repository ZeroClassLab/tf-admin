import React from "react";
import Button from "@mui/material/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    editorSubmitModeState,
    postIDwhenEditModeState,
    SubmitMode,
} from "../recoils";
import axios from "axios";
import { currentPageState } from "../../recoils";

const FormDeleteButton = () => {
    const submitMode = useRecoilValue(editorSubmitModeState);
    const postIDwhenEditMode = useRecoilValue(postIDwhenEditModeState);
    const setCurPage = useSetRecoilState(currentPageState);
    const handleDelete = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_MAIN_BACK}/story/${postIDwhenEditMode}`
            );
            alert("삭제가 완료되었습니다!");
            setCurPage(0);
        } catch (e) {
            console.error(e);
            alert("삭제에 실패하였습니다!");
        }
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
