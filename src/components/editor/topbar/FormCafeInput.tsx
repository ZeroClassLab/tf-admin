import React from "react";
import { useRecoilState } from "recoil";
import { formCustomCafeNameState } from "../recoils";
import TextInputUi from "../wrappedUi/TextInputUi";

const FormCafeInput = () => {
    const [value, setValue] = useRecoilState(formCustomCafeNameState);
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setValue(e.target.value);
    };
    return (
        <TextInputUi label="카페명" value={value} handleChange={handleChange} />
    );
};

export default FormCafeInput;
