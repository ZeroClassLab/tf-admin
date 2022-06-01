import {
    AutoformatBlockRule,
    ELEMENT_CODE_BLOCK,
    ELEMENT_CODE_LINE,
    getParentNode,
    isElement,
    isType,
    PlateEditor,
    toggleList,
    unwrapList,
    Value,
} from "@udecode/plate";

/**
 * 블록 포맷 리셋해주는 유틸 함수
 * @param editor
 * @returns
 */
export const clearBlockFormat: AutoformatBlockRule["preFormat"] = (editor) =>
    unwrapList(editor);

/**
 * 포매팅 공통 로직 유틸함수
 *
 * @param editor
 * @param customFormatting
 * @returns
 */
export const format = <V extends Value>(
    editor: PlateEditor<V>,
    customFormatting: any
) => {
    if (editor.selection) {
        const parentEntry = getParentNode(editor, editor.selection);
        if (!parentEntry) return;
        const [node] = parentEntry;
        if (
            isElement(node) &&
            !isType(editor, node, ELEMENT_CODE_BLOCK) &&
            !isType(editor, node, ELEMENT_CODE_LINE)
        ) {
            customFormatting();
        }
    }
};

/**
 * 리스트 형태 블록 포맷 함수
 *
 * @param editor
 * @param elementType
 */
export const formatList = <V extends Value>(
    editor: PlateEditor<V>,
    elementType: string
) => {
    format(editor, () =>
        toggleList(editor, {
            type: elementType,
        })
    );
};

/**
 * 텍스트 블록 포맷 함수
 *
 * @param editor
 * @param text
 */
export const formatText = <V extends Value>(
    editor: PlateEditor<V>,
    text: string
) => {
    format(editor, () => editor.insertText(text));
};
