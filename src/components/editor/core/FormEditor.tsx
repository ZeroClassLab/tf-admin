import React, { useState } from "react";

import {
    Plate,
    Value,
    createPlugins,
    createSelectOnBackspacePlugin,
    createFontColorPlugin,
    createFontBackgroundColorPlugin,
    createFontSizePlugin,
    createListPlugin,
    createCodeBlockPlugin,
    createSoftBreakPlugin,
    createExitBreakPlugin,
    createResetNodePlugin,
    createIndentPlugin,
    createIndentListPlugin,
    TEditableProps,
} from "@udecode/plate";
import { CONTAINER_PROPS, E_PROPS, E_VALUES } from "../configs/editorConfig";

import BalloonToolbarMarks from "../toolbar/BalloonToolbarMarks";
import HeadToolbar from "../toolbar/HeadToolbar";
import { components } from "../compostyles/plateUi";

import {
    createAlignPlugin,
    createBlockquotePlugin,
    createHeadingPlugin,
    createImagePlugin,
    createParagraphPlugin,
    createBasicMarksPlugin,
    createAutoformatPlugin,
} from "../plugins/main";
import {
    ALIGN_OPTIONS,
    AUTOF_OPTIONS,
    E_BREAK_OPTIONS,
    RESET_NODE_OPTIONS,
    SOB_OPTIONS,
    S_BREAK_OPTIONS,
} from "../plugins/options";

interface FormEditorProps {
    /**
     * to control the value
     *
     * @default undefined
     */
    setValues?: React.Dispatch<React.SetStateAction<Value | undefined>>;

    /**
     * readonly mode
     *
     * @default false
     */
    readOnly?: boolean;

    configs?: FormEditorConfig;
}

/**
 * editor configs
 */
interface FormEditorConfig {
    /**
     * @default
     * { minHeight: 500, maxHeight: 500, overflowY: "auto" }
     */
    containerStyle: React.CSSProperties;
    /**
     * @default
     *  {
     *      placeholder: 'Enter...',
     *      style: {
     *          padding: "15px",
     *          backgroundColor: "white",
     *          height: "100%",
     *      }
     *  }
     */
    editableProps?: TEditableProps<Value>;
    /**
     * @default
     * [{
     *      type: "p",
     *      children: [{ text: ""}],
     * }]
     *
     */
    initialValue?: Value;
}

const FormEditor: React.FC<FormEditorProps> = ({
    setValues,
    readOnly = false,
    configs = {},
}) => {
    const { editableProps, initialValue, containerStyle } = configs!;
    const plugins = createPlugins(
        [
            // 진하게, 이탈릭 등등
            createBasicMarksPlugin(),

            // p, heading, quote, list, alignment
            createParagraphPlugin(),
            createHeadingPlugin(),
            createBlockquotePlugin(),
            createListPlugin(),
            createAlignPlugin(ALIGN_OPTIONS),

            // image
            createImagePlugin(),
            createSelectOnBackspacePlugin(SOB_OPTIONS),

            // autoformat
            createAutoformatPlugin(AUTOF_OPTIONS),

            // font 색, 사이즈 관련
            createFontColorPlugin(),
            createFontBackgroundColorPlugin(),
            createFontSizePlugin(),

            // 코드블럭
            createCodeBlockPlugin(),
            createSoftBreakPlugin(S_BREAK_OPTIONS),
            createExitBreakPlugin(E_BREAK_OPTIONS),
            createResetNodePlugin(RESET_NODE_OPTIONS),

            // indentation
            createIndentPlugin(),
            createIndentListPlugin(),
        ],
        { components }
    );

    return (
        <div style={containerStyle ?? CONTAINER_PROPS.style}>
            <Plate
                initialValue={initialValue ?? E_VALUES.plainText}
                editableProps={
                    editableProps
                        ? { ...editableProps, readOnly }
                        : { ...E_PROPS, readOnly }
                }
                onChange={(newValue) => {
                    if (setValues) {
                        setValues(newValue);
                    }
                }}
                plugins={plugins}
            >
                <HeadToolbar />
                <BalloonToolbarMarks />
            </Plate>
        </div>
    );
};

export default FormEditor;
