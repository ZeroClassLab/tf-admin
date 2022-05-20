import React, { useState } from "react";
import { TNode, AnyObject } from "@udecode/plate-core";
import BalloonToolbarMarks from "./toolbar/BalloonToolbarMarks";
import ValueDev from "./dev/ValueDev";
import HeadToolbar from "./toolbar/HeadToolbar";
import { components } from "./compostyles/plateUi";

import FormTitleInput from "./FormTitleInput";

import {
    Plate,
    createPlugins,
    ELEMENT_IMAGE,
    createSelectOnBackspacePlugin,
    createAutoformatPlugin,
    createParagraphPlugin,
    createBoldPlugin,
    createItalicPlugin,
    createHighlightPlugin,
    createUnderlinePlugin,
    createStrikethroughPlugin,
    createSubscriptPlugin,
    createSuperscriptPlugin,
    createFontColorPlugin,
    createFontBackgroundColorPlugin,
    createFontSizePlugin,
    createBlockquotePlugin,
    createListPlugin,
    createAlignPlugin,
    createTablePlugin,
} from "@udecode/plate";
import { autoformatRules } from "./autoformat/autoformatRules";
import { ALIGN_OPTIONS } from "./plugins/constants";
import { createHeadingPlugin } from "./plugins/createHeadingPlugin";
import { createImagePlugin } from "./plugins/createImagePlugin";
// import { createAlignPlugin } from "./plugins/creaetAlignPlugin";
import { E_PROPS, E_VALUES } from "./editorConfig";
import { useRecoilState } from "recoil";
import { formContentState } from "./recoils";

interface FormEditorProps {
    readOnly?: boolean;
}

const FormEditor: React.FC<FormEditorProps> = ({ readOnly = false }) => {
    const [debugValue, setDebugValue] = useState<TNode<AnyObject>[]>();
    const [formContentValue, setFormContentValue] =
        useRecoilState(formContentState);

    (window as any).debugValue = debugValue;

    const plugins = createPlugins(
        [
            createParagraphPlugin(),
            createHeadingPlugin(),
            createBlockquotePlugin(),
            createAlignPlugin(ALIGN_OPTIONS),
            createListPlugin(),

            createImagePlugin(),
            createSelectOnBackspacePlugin({
                options: { query: { allow: [ELEMENT_IMAGE] } },
            }),
            createAutoformatPlugin({ options: { rules: autoformatRules } }),

            // 진하게, 이탈릭 등등
            createBoldPlugin(),
            createItalicPlugin(),
            createHighlightPlugin(),
            createUnderlinePlugin(),
            createStrikethroughPlugin(),
            createSubscriptPlugin(),
            createSuperscriptPlugin(),

            // font 색, 사이즈 관련
            createFontColorPlugin(),
            createFontBackgroundColorPlugin(),
            createFontSizePlugin(),

            // table 관련
            createTablePlugin(),
        ],
        { components }
    );
    return (
        <>
            <FormTitleInput />
            <Plate
                initialValue={E_VALUES.plainText}
                editableProps={{ ...E_PROPS, readOnly }}
                onChange={(newValue) => {
                    setDebugValue(newValue);
                    setFormContentValue(newValue);
                }}
                plugins={plugins}
            >
                <HeadToolbar />
                <BalloonToolbarMarks />
            </Plate>
            <ValueDev debugValue={debugValue} />
        </>
    );
};

export default FormEditor;
