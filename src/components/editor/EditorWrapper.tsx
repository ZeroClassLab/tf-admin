import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import FormEditor from "./core/FormEditor";
import ValueDev from "./dev/ValueDev";
import FormTitleInput from "./FormTitleInput";
import { formContentState } from "./recoils";

import "tippy.js/dist/tippy.css";
import "prismjs/themes/prism.css";

const EditorWrapper = () => {
    const formConetnetValue = useRecoilValue(formContentState);
    const setFormContentValue = useSetRecoilState(formContentState);
    return (
        <>
            <FormTitleInput />
            <FormEditor setValues={setFormContentValue} />
            <ValueDev debugValue={formConetnetValue} />
        </>
    );
};

export default EditorWrapper;
