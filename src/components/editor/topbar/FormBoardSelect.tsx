import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import MenuItem from "@mui/material/MenuItem";
import { formBoardTypeState } from "../recoils";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectUi from "../wrappedUi/SelectUi";
import { boardTypeListState } from "../../servicetype/recoils";

const LABEL_ID = "board-select-label";
const LABEL = "게시판 종류";

const FormBoardSelect = () => {
    const boardTypeList = useRecoilValue(boardTypeListState);
    const [curBoard, setCurBoard] = useRecoilState(formBoardTypeState);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        const selectedBoard = boardTypeList.filter(
            (board) => `${board.name}` === value
        )[0];
        setCurBoard(selectedBoard);
    };

    return (
        <SelectUi
            labelId={LABEL_ID}
            label={LABEL}
            value={`${curBoard?.name}` || ""}
            handleChange={handleChange}
        >
            {boardTypeList
                .filter((board) => board.name !== "")
                .map((board, id) => {
                    return (
                        <MenuItem
                            key={`boardlist-${id}`}
                            value={`${board.name}`}
                        >
                            {board.label}
                        </MenuItem>
                    );
                })}
        </SelectUi>
    );
};

export default FormBoardSelect;
