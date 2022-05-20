import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { assignedUserListState, currentAssignedUserState } from "../recoils";
import SelectUi from "../wrappedUi/SelectUi";
import { SelectChangeEvent } from "@mui/material/Select";

const FormEditorSelect = () => {
    const assignedUserList = useRecoilValue(assignedUserListState);
    const [currentAssignedUser, setCurrentAssignedUser] = useRecoilState(
        currentAssignedUserState
    );
    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        const selectedUser = assignedUserList.filter(
            (user) => `${user.userID}` === value
        )[0];
        setCurrentAssignedUser(selectedUser);
    };
    return (
        <SelectUi
            label="작성자"
            labelId="writer-editor-label-id"
            value={`${currentAssignedUser?.userID}` || ""}
            handleChange={handleChange}
        >
            {assignedUserList.map((user, id) => {
                return (
                    <MenuItem
                        key={`editor-list-${id}`}
                        value={`${user.userID}`}
                    >
                        {user.nickname}
                    </MenuItem>
                );
            })}
        </SelectUi>
    );
};

export default FormEditorSelect;
