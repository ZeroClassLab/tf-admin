import React from "react";
import { useRecoilState } from "recoil";
import { formLocationState } from "../recoils";
import TextInputUi from "../wrappedUi/TextInputUi";

const FormLocation = () => {
    const [value, setValue] = useRecoilState(formLocationState);
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setValue(e.target.value);
    };
    return (
        <TextInputUi
            label="카페주소"
            value={value}
            handleChange={handleChange}
        />
    );
};

export default FormLocation;
