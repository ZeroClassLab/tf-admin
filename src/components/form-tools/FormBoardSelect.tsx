import React from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import MenuItem from "@mui/material/MenuItem";
import {
    currentAssignedUserState,
    formBoardTypeState,
    formCurrentUserState,
    formCustomCafeNameState,
} from "../editor/recoils";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectUi from "../editor/wrappedUi/SelectUi";
import { boardTypeListState } from "../servicetype/recoils";
import { isBoardTypeChangedViaDropdownState } from "../story/recoils";

const LABEL_ID = "board-select-label";
const LABEL = "게시판 종류";

const FormBoardSelect = () => {
    const boardTypeList = useRecoilValue(boardTypeListState);
    const [curBoard, setCurBoard] = useRecoilState(formBoardTypeState);
    const [_isBoardTypeChangedViaDropdown, setIsBoardTypeChangedViaDropdown] =
        useRecoilState(isBoardTypeChangedViaDropdownState);

    const resetAssignedUser = useResetRecoilState(currentAssignedUserState);
    const resetCurUserName = useResetRecoilState(formCurrentUserState);
    const resetCustomCafename = useResetRecoilState(formCustomCafeNameState);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setIsBoardTypeChangedViaDropdown(() => true);
        const selectedBoard = boardTypeList.filter(
            (board) => `${board.name}` === value
        )[0];
        
        // reset all
        resetAssignedUser();
        resetCurUserName();
        resetCustomCafename();

        // set board
        setCurBoard(() => selectedBoard);
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
