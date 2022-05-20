import React from "react";
import {
    HeadingToolbar,
    ImageToolbarButton,
    ToolbarButton,
    usePlateEditorRef,
    ColorPickerToolbarDropdown,
    MARK_COLOR,
    MARK_BG_COLOR,
    AlignToolbarButton,
    ListToolbarButton,
    ELEMENT_UL,
    ELEMENT_OL,
    BlockToolbarButton,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_BLOCKQUOTE,
    getPluginType,
    getPreventDefaultHandler,
    MarkToolbarButton,
    MARK_ITALIC,
    MARK_BOLD,
    MARK_STRIKETHROUGH,
    MARK_CODE,
    MARK_SUPERSCRIPT,
    MARK_SUBSCRIPT,
    MARK_UNDERLINE,
    TableToolbarButton,
} from "@udecode/plate";
import {
    Check,
    FontDownload,
    Image,
    AddPhotoAlternate,
    Restore,
    Update,
    FormatAlignLeft,
    FormatAlignCenter,
    FormatAlignRight,
    FormatAlignJustify,
    FormatListBulleted,
    FormatListNumbered,
    LooksOne,
    LooksTwo,
    Looks3,
    Looks4,
    Looks5,
    Looks6,
    FormatQuote,
    FormatIndentDecrease,
    FormatIndentIncrease,
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatStrikethrough,
    Code,
    Superscript,
    Subscript,
    BorderAll,
    BorderBottom,
    BorderTop,
    BorderLeft,
    BorderRight,
    BorderClear,
} from "@mui/icons-material";
import FormatColorText from "@mui/icons-material/FormatColorText";
import {
    insertTable,
    deleteTable,
    addRow,
    deleteRow,
    addColumn,
    deleteColumn,
} from "@udecode/plate";
import { customColorSet } from "../plugins/color/colorSet";

/**
 * H4 까지만 (Typography hierarchy)
 * @returns
 */
export const BasicElementToolbarButtons = () => {
    const editor = usePlateEditorRef();
    return (
        <>
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H1)}
                icon={<LooksOne />}
                tooltip={{ content: "헤딩1 ⌘+⌥+1" }}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H2)}
                icon={<LooksTwo />}
                tooltip={{ content: "헤딩2 ⌘+⌥+2" }}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H3)}
                icon={<Looks3 />}
                tooltip={{ content: "헤딩3 ⌘+⌥+3" }}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H4)}
                icon={<Looks4 />}
                tooltip={{ content: "헤딩4 ⌘+⌥+4" }}
            />

            {/* 인용구 */}
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
                icon={<FormatQuote />}
            />
        </>
    );
};

export const IndentToolbarButtons = () => {
    return (
        <>
            <ToolbarButton
                onMouseDown={() => {}}
                icon={<FormatIndentDecrease />}
            />
            <ToolbarButton
                onMouseDown={() => {}}
                icon={<FormatIndentIncrease />}
            />
        </>
    );
};

export const ListToolbarButtons = () => {
    const editor = usePlateEditorRef();

    return (
        <>
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_UL)}
                icon={<FormatListBulleted />}
            />
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_OL)}
                icon={<FormatListNumbered />}
            />
        </>
    );
};

export const AlignToolbarButtons = () => {
    const editor = usePlateEditorRef();
    return (
        <>
            <AlignToolbarButton value="left" icon={<FormatAlignLeft />} />
            <AlignToolbarButton value="center" icon={<FormatAlignCenter />} />
            <AlignToolbarButton value="right" icon={<FormatAlignRight />} />
            <AlignToolbarButton value="justify" icon={<FormatAlignJustify />} />
        </>
    );
};

export const BasicMarkToolbarButtons = () => {
    const editor = usePlateEditorRef();

    return (
        <>
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<FormatBold />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<FormatItalic />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_UNDERLINE)}
                icon={<FormatUnderlined />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_STRIKETHROUGH)}
                icon={<FormatStrikethrough />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_SUPERSCRIPT)}
                clear={getPluginType(editor, MARK_SUBSCRIPT)}
                icon={<Superscript />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_SUBSCRIPT)}
                clear={getPluginType(editor, MARK_SUPERSCRIPT)}
                icon={<Subscript />}
            />
        </>
    );
};

const HistoryToolbarButtons = () => {
    const editor = usePlateEditorRef();
    // const state = usePlateEditorState();

    return (
        <>
            <ToolbarButton
                onMouseDown={(e) => {
                    editor.undo();
                }}
                icon={<Restore />}
                tooltip={{ content: "실행취소 ⌘+z" }}
            />
            <ToolbarButton
                onMouseDown={(e) => {
                    editor.redo();
                }}
                icon={<Update />}
                tooltip={{ content: "앞으로 ⌘+⇧+z" }}
            />
        </>
    );
};

/**
 * TODO: 고치기
 * @returns 
 */
const TableToolbarButtons = () => (
    <>
        <TableToolbarButton icon={<BorderAll />} transform={insertTable} />
        <TableToolbarButton icon={<BorderClear />} transform={deleteTable} />
        <TableToolbarButton icon={<BorderBottom />} transform={addRow} />
        <TableToolbarButton icon={<BorderTop />} transform={deleteRow} />
        <TableToolbarButton icon={<BorderLeft />} transform={addColumn} />
        <TableToolbarButton icon={<BorderRight />} transform={deleteColumn} />
    </>
);

const UploadImageButton = () => {
    return (
        <ToolbarButton
            onMouseDown={() => {}}
            icon={<AddPhotoAlternate />}
            tooltip={{ content: "이미지 업로드" }}
        />
    );
};

const HeadToolbar = () => {
    return (
        <HeadingToolbar
            style={{
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,
            }}
        >
            <BasicElementToolbarButtons />
            <AlignToolbarButtons />
            <ListToolbarButtons />
            <IndentToolbarButtons />
            <BasicMarkToolbarButtons />
            <HistoryToolbarButtons />
            <ColorPickerToolbarDropdown
                pluginKey={MARK_COLOR}
                icon={<FormatColorText />}
                selectedIcon={<Check />}
                customColors={customColorSet}
                tooltip={{ content: "글자색" }}
            />
            <ColorPickerToolbarDropdown
                pluginKey={MARK_BG_COLOR}
                icon={<FontDownload />}
                selectedIcon={<Check />}
                customColors={customColorSet}
                tooltip={{ content: "배경색" }}
            />
            <ImageToolbarButton
                icon={<Image />}
                tooltip={{ content: "이미지 삽입" }}
            />
            {/* <TableToolbarButtons /> */}
            {/* <UploadImageButton /> */}
        </HeadingToolbar>
    );
};

export default HeadToolbar;
