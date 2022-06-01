import { createPluginFactory } from "@udecode/plate-core";
import { ELEMENT_IMAGE } from "./constants";
import { ImagePlugin } from "./types";
import { withImageUpload } from "./withImageUpload";

/**
 * Enables support for images.
 */
export const createImagePlugin = createPluginFactory<ImagePlugin>({
    key: ELEMENT_IMAGE,
    isElement: true,
    isVoid: true,
    withOverrides: withImageUpload,
    then: (editor, { type }) => ({
        deserializeHtml: {
            rules: [
                {
                    validNodeName: "IMG",
                },
            ],
            getNode: (el) => ({
                type,
                url: el.getAttribute("src"),
            }),
        },
    }),
});
