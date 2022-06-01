import {
    createPluginFactory,
    onKeyDownToggleMark,
    someHtmlElement,
    ToggleMarkPlugin,
    findHtmlParentElement,
} from "@udecode/plate-core";
import {
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_SUBSCRIPT,
    MARK_SUPERSCRIPT,
    MARK_UNDERLINE,
} from "./constants";

/**
 * 진하게 커스텀 플러그인
 */
export const createBoldPlugin = createPluginFactory<ToggleMarkPlugin>({
    key: MARK_BOLD,
    isLeaf: true,
    deserializeHtml: {
        rules: [
            { validNodeName: ["STRONG", "B"] },
            {
                validStyle: {
                    fontWeight: ["600", "700", "bold"],
                },
            },
        ],
        query: (el) =>
            !someHtmlElement(el, (node) => node.style.fontWeight === "normal"),
    },

    handlers: {
        onKeyDown: onKeyDownToggleMark,
    },
    options: {
        hotkey: "mod+b",
    },
});

/**
 * 기울게 커스텀 플러그인
 */
export const createItalicPlugin = createPluginFactory<ToggleMarkPlugin>({
    key: MARK_ITALIC,
    isLeaf: true,
    handlers: {
        onKeyDown: onKeyDownToggleMark,
    },
    options: {
        hotkey: "mod+i",
    },
    deserializeHtml: {
        rules: [
            { validNodeName: ["EM", "I"] },
            {
                validStyle: {
                    fontStyle: "italic",
                },
            },
        ],
        query: (el) =>
            !someHtmlElement(el, (node) => node.style.fontStyle === "normal"),
    },
});

/**
 * 커스텀 취소선 플러그인
 */
export const createStrikethroughPlugin = createPluginFactory<ToggleMarkPlugin>({
    key: MARK_STRIKETHROUGH,
    isLeaf: true,
    handlers: {
        onKeyDown: onKeyDownToggleMark,
    },
    options: {
        hotkey: "mod+shift+x",
    },
    deserializeHtml: {
        rules: [
            { validNodeName: ["S", "DEL", "STRIKE"] },
            {
                validStyle: {
                    textDecoration: "line-through",
                },
            },
        ],
        query: (el) =>
            !someHtmlElement(
                el,
                (node) => node.style.textDecoration === "none"
            ),
    },
});

/**
 * 커스텀 밑줄 플러그인
 */
export const createUnderlinePlugin = createPluginFactory<ToggleMarkPlugin>({
    key: MARK_UNDERLINE,
    isLeaf: true,
    handlers: {
        onKeyDown: onKeyDownToggleMark,
    },
    options: {
        hotkey: "mod+u",
    },
    deserializeHtml: {
        rules: [
            {
                validNodeName: ["U"],
            },
            {
                validStyle: {
                    textDecoration: ["underline"],
                },
            },
        ],
        query: (el) =>
            !someHtmlElement(
                el,
                (node) => node.style.textDecoration === "none"
            ),
    },
});

/**
 * 커스텀 포맷코드 플러그인
 */
export const createCodePlugin = createPluginFactory<ToggleMarkPlugin>({
    key: MARK_CODE,
    isLeaf: true,
    deserializeHtml: {
        rules: [
            {
                validNodeName: ["CODE"],
            },
            {
                validStyle: {
                    wordWrap: "break-word",
                },
            },
            {
                validStyle: {
                    fontFamily: "Consolas",
                },
            },
        ],
        query(el) {
            const blockAbove = findHtmlParentElement(el, "P");
            if (blockAbove?.style.fontFamily === "Consolas") return false;

            return !findHtmlParentElement(el, "PRE");
        },
    },
    handlers: {
        onKeyDown: onKeyDownToggleMark,
    },
    options: {
        hotkey: "mod+e",
    },
});

/**
 * 커스텀 윗첨자 플러그인
 */
export const createSuperscriptPlugin = createPluginFactory<ToggleMarkPlugin>({
    key: MARK_SUPERSCRIPT,
    isLeaf: true,
    handlers: {
        onKeyDown: onKeyDownToggleMark,
    },
    options: {
        hotkey: "mod+.",
        clear: MARK_SUBSCRIPT,
    },
    deserializeHtml: {
        rules: [
            { validNodeName: ["SUP"] },
            {
                validStyle: {
                    verticalAlign: "super",
                },
            },
        ],
    },
});

/**
 * 아랫첨자 커스터마이즈 플러그인
 */
export const createSubscriptPlugin = createPluginFactory<ToggleMarkPlugin>({
    key: MARK_SUBSCRIPT,
    isLeaf: true,
    handlers: {
        onKeyDown: onKeyDownToggleMark,
    },
    options: {
        hotkey: "mod+,",
        clear: MARK_SUPERSCRIPT,
    },
    deserializeHtml: {
        rules: [
            { validNodeName: ["SUB"] },
            {
                validStyle: {
                    verticalAlign: "sub",
                },
            },
        ],
    },
});

/**
 * Enables support for basic marks:
 * - Bold
 * - Code
 * - Italic
 * - Strikethrough
 * - Subscript
 * - Superscript
 * - Underline
 */
export const createBasicMarksPlugin = createPluginFactory({
    key: "basicMarks",
    plugins: [
        createBoldPlugin(),
        createCodePlugin(),
        createItalicPlugin(),
        createStrikethroughPlugin(),
        createSubscriptPlugin(),
        createSuperscriptPlugin(),
        createUnderlinePlugin(),
    ],
});
