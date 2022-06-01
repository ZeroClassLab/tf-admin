import {
    ELEMENT_CODE_BLOCK,
    ELEMENT_DEFAULT,
    ELEMENT_HR,
    ELEMENT_MEDIA_EMBED,
    ELEMENT_TD,
    isBlockAboveEmpty,
    isSelectionAtBlockStart,
} from "@udecode/plate";
import { autoformatRules } from "../autoformat/autoformatRules";
import {
    ELEMENT_BLOCKQUOTE,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_IMAGE,
    ELEMENT_PARAGRAPH,
    ELEMENT_TODO_LI,
    KEYS_HEADING,
} from "./constants";

export const ALIGN_OPTIONS = {
    inject: {
        props: {
            validTypes: [
                ELEMENT_H1,
                ELEMENT_H2,
                ELEMENT_H3,
                ELEMENT_H4,
                ELEMENT_PARAGRAPH,
                ELEMENT_DEFAULT,
            ],
        },
    },
};

export const SOB_OPTIONS = {
    options: {
        query: { allow: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED, ELEMENT_HR] },
    },
};

export const AUTOF_OPTIONS = { options: { rules: autoformatRules } };

const resetBlockTypesCommonRule = {
    types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
    defaultType: ELEMENT_PARAGRAPH,
};

export const RESET_NODE_OPTIONS = {
    options: {
        rules: [
            {
                ...resetBlockTypesCommonRule,
                hotkey: "Enter",
                predicate: isBlockAboveEmpty,
            },
            {
                ...resetBlockTypesCommonRule,
                hotkey: "Backspace",
                predicate: isSelectionAtBlockStart,
            },
        ],
    },
};

export const S_BREAK_OPTIONS = {
    options: {
        rules: [
            { hotkey: "shift+enter" },
            {
                hotkey: "enter",
                query: {
                    allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
                },
            },
        ],
    },
};

export const E_BREAK_OPTIONS = {
    options: {
        rules: [
            {
                hotkey: "mod+enter",
            },
            {
                hotkey: "mod+shift+enter",
                before: true,
            },
            {
                hotkey: "enter",
                query: {
                    start: true,
                    end: true,
                    allow: KEYS_HEADING,
                },
            },
        ],
    },
};

export const INDENT_OPTIONS = {
    inject: {
        props: {
            validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1],
        },
    },
};
