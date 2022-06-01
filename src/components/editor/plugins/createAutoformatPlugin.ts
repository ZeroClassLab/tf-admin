import { createPluginFactory } from "@udecode/plate-core";
import { KEY_AUTOFORMAT } from "./constants";
import { AutoformatPlugin } from "./types";
import { withAutoformat } from "./withAutoformat";

/**
 * @see {@link withAutoformat}
 */
export const createAutoformatPlugin = createPluginFactory<AutoformatPlugin>({
    key: KEY_AUTOFORMAT,
    withOverrides: withAutoformat,
    options: {
        rules: [],
    },
});
