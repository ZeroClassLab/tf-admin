import {
    createPluginFactory,
    HotkeyPlugin,
    onKeyDownToggleElement,
} from "@udecode/plate-core";
import { ELEMENT_BLOCKQUOTE } from "./constants";

/**
 * 블록쿼트 플러그인 커스텀
 */
export const createBlockquotePlugin = createPluginFactory<HotkeyPlugin>({
    key: ELEMENT_BLOCKQUOTE,
    isElement: true,
    deserializeHtml: {
        rules: [
            {
                validNodeName: "BLOCKQUOTE",
            },
        ],
    },
    handlers: {
        onKeyDown: onKeyDownToggleElement,
    },
    options: {
        hotkey: "mod+shift+.",
    },
});
