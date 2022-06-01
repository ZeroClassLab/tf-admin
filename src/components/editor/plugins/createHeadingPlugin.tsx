import {
    createPluginFactory,
    onKeyDownToggleElement,
    PlatePlugin,
} from "@udecode/plate-core";
import { KEYS_HEADING } from "./constants";
import { HeadingPlugin, HeadingsPlugin } from "./types";

/**
 * 헤딩 컴포넌트 커스텀 헤딩 4까지 밖에 안씀
 * (from 1 to 4).
 */
export const createHeadingPlugin = createPluginFactory<HeadingsPlugin>({
    key: "heading",
    options: {
        levels: 4,
    },

    then: (editor, { options: { levels } = {} }) => {
        const plugins: PlatePlugin<HeadingPlugin>[] = [];

        for (let level = 1; level <= levels!; level++) {
            const key = KEYS_HEADING[level - 1];

            const plugin: PlatePlugin<HeadingPlugin> = {
                key,
                isElement: true,
                deserializeHtml: {
                    rules: [
                        {
                            validNodeName: `H${level}`,
                        },
                    ],
                },
                handlers: {
                    onKeyDown: onKeyDownToggleElement,
                },
                options: {},
            };

            if (level < 5) {
                plugin.options!.hotkey = [
                    `mod+opt+${level}`,
                    `mod+shift+${level}`,
                ];
            }

            plugins.push(plugin);
        }

        return {
            plugins,
        };
    },
});
