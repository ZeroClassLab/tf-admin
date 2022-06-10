import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
    formCurrentUserState,
    isCustomUserState,
    formCustomCafeNameState,
} from "../recoils";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const FormCustomUserCheckbox = () => {
    const [value, setValue] = useRecoilState(isCustomUserState);

    const resetCurUserName = useResetRecoilState(formCurrentUserState);
    const resetCustomCafename = useResetRecoilState(formCustomCafeNameState);
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={(e) => {
                            setValue(!value);
                            resetCurUserName();
                            resetCustomCafename();
                        }}
                    />
                }
                label="카페명 직접입력"
            />
        </FormGroup>
    );
};

export default FormCustomUserCheckbox;
