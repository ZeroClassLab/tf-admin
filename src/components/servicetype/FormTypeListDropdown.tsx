import React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useRecoilState, useRecoilValue } from "recoil";
import { serviceTypeListState } from "./recoils";
import { surveyTypeState } from "../survey/recoils";

const FormTypeListDropdown = () => {
    const formTypeList = useRecoilValue(serviceTypeListState);
    const [nowSurveyType, setNowSurveyType] = useRecoilState(surveyTypeState);

    const handleChange = (val: string) => {
        setNowSurveyType(val);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="form-type-list-label">서비스 종류</InputLabel>
            <Select
                labelId="form-type-list-label"
                id="form-type-list-select"
                value={nowSurveyType}
                label="서비스 종류"
                onChange={(e) => handleChange(e.target.value)}
            >
                {formTypeList.map((formType, idx) => {
                    return (
                        <MenuItem
                            key={`service-type-item-${idx}`}
                            value={formType.name}
                        >
                            {formType.name}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default FormTypeListDropdown;
