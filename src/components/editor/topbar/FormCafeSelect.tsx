import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import MenuItem from "@mui/material/MenuItem";
import { formCurrentUserState, formUserListState } from "../recoils";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectUi from "../wrappedUi/SelectUi";

const LABEL_ID = "cafe-name-select-label";
const LABEL = "카페명";

const FormCafeSelect = () => {
    const userList = useRecoilValue(formUserListState);
    const [currentUser, setCurrentUser] = useRecoilState(formCurrentUserState);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        const selectedUser = userList.filter(
            (user) => `${user.userID}` === value
        )[0];
        setCurrentUser(selectedUser);
    };

    return (
        <SelectUi
            labelId={LABEL_ID}
            label={LABEL}
            value={`${currentUser?.userID}` || ""}
            handleChange={handleChange}
        >
            {userList
                .filter((user) => user.businessName !== "")
                .map((user, id) => {
                    return (
                        <MenuItem
                            key={`userlist-${id}`}
                            value={`${user.userID}`}
                        >
                            {user.businessName}
                        </MenuItem>
                    );
                })}
        </SelectUi>
    );
};

export default FormCafeSelect;
