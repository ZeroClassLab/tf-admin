import React, { useState } from "react";
import { TNode, AnyObject } from "@udecode/plate-core";
import { EditableProps } from "slate-react/dist/components/editable";
import BalloonToolbarMarks from "./toolbar/BalloonToolbarMarks";
import ValueDev from "./dev/ValueDev";
import HeadToolbar from "./toolbar/HeadToolbar";
import { components } from "./compostyles/plateUi";

import {
    Plate,
    createImagePlugin,
    createPlugins,
    ELEMENT_IMAGE,
    createSelectOnBackspacePlugin,
    createAutoformatPlugin,
    createBoldPlugin,
    createItalicPlugin,
    createHighlightPlugin,
    createUnderlinePlugin,
    createStrikethroughPlugin,
    createSubscriptPlugin,
    createSuperscriptPlugin,
    createFontColorPlugin,
    createFontBackgroundColorPlugin,
    createPlateUI,
    createHeadingPlugin,
    createBlockquotePlugin,
    createAlignPlugin,
    createListPlugin,
} from "@udecode/plate";
import { autoformatRules } from "./autoformat/autoformatRules";
// import { createHeadingPlugin } from "./plugins/createHeadingPlugin";

const VALUES = {
    plainText: [
        {
            children: [{ text: "" }],
        },
    ],
};

const E_PROPS: EditableProps = {
    style: {
        padding: "15px",
        backgroundColor: "white",
        width: "100%",
        height: "400px",
        overflowY: "auto",
    },
    placeholder: "내용을 입력해주세요...",
};

const FormEditor = () => {
    const [debugValue, setDebugValue] = useState<TNode<AnyObject>[]>();
    const plugins = createPlugins(
        [
            createHeadingPlugin(),
            createBlockquotePlugin(),
            createAlignPlugin(),
            createListPlugin(),
            createSubscriptPlugin(),
            createSuperscriptPlugin(),
            createImagePlugin(),
            createSelectOnBackspacePlugin({
                options: { query: { allow: [ELEMENT_IMAGE] } },
            }),
            createAutoformatPlugin({ options: { rules: autoformatRules } }),
            createBoldPlugin(),
            createItalicPlugin(),
            createHighlightPlugin(),
            createUnderlinePlugin(),
            createStrikethroughPlugin(),
            createSubscriptPlugin(),
            createSuperscriptPlugin(),
            createFontColorPlugin(),
            createFontBackgroundColorPlugin(),
        ],
        { components }
    );
    return (
        <>
            <Plate
                initialValue={VALUES.plainText}
                editableProps={E_PROPS}
                onChange={(newValue) => {
                    setDebugValue(newValue);
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
