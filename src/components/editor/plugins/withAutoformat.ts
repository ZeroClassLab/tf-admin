import {
    isCollapsed,
    PlateEditor,
    Value,
    WithPlatePlugin,
} from "@udecode/plate-core";
import { autoformatBlock } from "./autoformat/transforms/autoformatBlock";
import { autoformatMark } from "./autoformat/transforms/autoformatMark";
import { autoformatText } from "./autoformat/transforms/autoformatText";
import { AutoformatPlugin } from "./types";

/**
 * 오토포맷 액션을 활성화 해주는 함수
 */
export const withAutoformat = <
    V extends Value = Value,
    E extends PlateEditor<V> = PlateEditor<V>
>(
    editor: E,
    { options: { rules } }: WithPlatePlugin<AutoformatPlugin, V, E>
) => {
    const { insertText } = editor;

    editor.insertText = (text) => {
        if (!isCollapsed(editor.selection)) return insertText(text);

        for (const rule of rules!) {
            const { mode = "text", insertTrigger, query } = rule;

            if (query && !query(editor as any, { ...rule, text })) continue;

            const autoformatter: Record<typeof mode, Function> = {
                block: autoformatBlock,
                mark: autoformatMark,
                text: autoformatText,
            };

            if (
                autoformatter[mode]?.(editor, {
                    ...(rule as any),
                    text,
                })
            ) {
                return insertTrigger && insertText(text);
            }
        }

        insertText(text);
    };

    return editor;
};
