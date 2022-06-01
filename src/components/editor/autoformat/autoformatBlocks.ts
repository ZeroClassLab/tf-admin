import {
    AutoformatRule,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_CODE_BLOCK,
    ELEMENT_DEFAULT,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
    ELEMENT_HR,
    getPluginType,
    insertElements,
    insertEmptyCodeBlock,
    setElements,
} from "@udecode/plate";
import { clearBlockFormat as preFormat } from "./autoformatUtils";

export const autoformatBlocks: AutoformatRule[] = [
    {
        mode: "block",
        type: ELEMENT_H1,
        match: "# ",
        preFormat,
    },
    {
        mode: "block",
        type: ELEMENT_H2,
        match: "## ",
        preFormat,
    },
    {
        mode: "block",
        type: ELEMENT_H3,
        match: "### ",
        preFormat,
    },
    {
        mode: "block",
        type: ELEMENT_H4,
        match: "#### ",
        preFormat,
    },
    {
        mode: "block",
        type: ELEMENT_H5,
        match: "##### ",
        preFormat,
    },
    {
        mode: "block",
        type: ELEMENT_H6,
        match: "###### ",
        preFormat,
    },
    {
        mode: "block",
        type: ELEMENT_BLOCKQUOTE,
        match: "> ",
        preFormat,
    },
    {
        mode: "block",
        type: ELEMENT_HR,
        match: ["---", "—-"],
        preFormat,
        format: (editor) => {
            setElements(editor, { type: ELEMENT_HR });
            insertElements(editor, {
                type: ELEMENT_DEFAULT,
                children: [{ text: "" }],
            });
        },
    },
    {
        mode: "block",
        type: ELEMENT_CODE_BLOCK,
        match: "```",
        triggerAtBlockStart: false,
        preFormat,
        format: (editor) => {
            insertEmptyCodeBlock(editor, {
                defaultType: getPluginType(editor, ELEMENT_DEFAULT),
                insertNodesOptions: { select: true },
            });
        },
    },
];
