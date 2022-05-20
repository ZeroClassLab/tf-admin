import React from "react";
import { useRecoilState } from "recoil";
import { formTitleState } from "./recoils";
import TextInputUi from "./wrappedUi/TextInputUi";

const FormTitleInput = () => {
    const [value, setValue] = useRecoilState(formTitleState);
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setValue(e.target.value);
    };
    return (
        <TextInputUi label="제목" value={value} handleChange={handleChange} />
    );
};

export default FormTitleInput;
