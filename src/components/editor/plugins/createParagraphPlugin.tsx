import {
    createPluginFactory,
    HotkeyPlugin,
    onKeyDownToggleElement,
} from "@udecode/plate-core";
import { ELEMENT_PARAGRAPH } from "./constants";
/**
 * 패러그래프 커스텀플러그인
 */
export const createParagraphPlugin = createPluginFactory<HotkeyPlugin>({
    key: ELEMENT_PARAGRAPH,
    isElement: true,
    handlers: {
        onKeyDown: onKeyDownToggleElement,
    },
    options: {
        hotkey: ["mod+opt+0", "mod+shift+0"],
    },
    deserializeHtml: {
        rules: [
            {
                validNodeName: "P",
            },
        ],
        query: (el) => el.style.fontFamily !== "Consolas",
    },
});
