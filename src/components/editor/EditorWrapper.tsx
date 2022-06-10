import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Editor, Viewer } from "@zclab/tmr-react-editor";
import ValueDev from "./dev/ValueDev";
import FormTitleInput from "./FormTitleInput";
import { formContentState, isPreviewState } from "./recoils";

import "tippy.js/dist/tippy.css";
import "prismjs/themes/prism.css";

const EditorWrapper = () => {
    const [formContentValue, setFormContentValue] =
        useRecoilState(formContentState);
    const isPreview = useRecoilValue(isPreviewState);
    return (
        <>
            <FormTitleInput />
            <Editor
                configs={{
                    containerStyle: {
                        minHeight: 500,
                        maxHeight: 500,
                        overflowY: "auto",
                        display: isPreview ? "none" : "",
                    },
                    editableProps: {
                        style: {
                            fontFamily: "Apple",
                            padding: "15px",
                            backgroundColor: "white",
                            height: "100%",
                        },
                        placeholder: "Enter...",
                    },
                    initialValue: formContentValue?.length
                        ? formContentValue
                        : undefined,
                }}
                setValues={setFormContentValue}
            />
            {isPreview && (
                <Viewer
                    configs={{
                        containerStyle: {
                            minHeight: 500,
                            maxHeight: 500,
                            overflowY: "auto",
                            display: !isPreview ? "none" : "",
                        },
                        initialValue: formContentValue,
                    }}
                />
            )}

            {/* <ValueDev debugValue={formContentValue} /> */}
        </>
    );
};

export default EditorWrapper;
