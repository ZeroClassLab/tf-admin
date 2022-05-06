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
    ELEMENT_H5,
    ELEMENT_H6,
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
} from "@mui/icons-material";
import FormatColorText from "@mui/icons-material/FormatColorText";

export const BasicElementToolbarButtons = () => {
    const editor = usePlateEditorRef();

    return (
        <>
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H1)}
                icon={<LooksOne />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H2)}
                icon={<LooksTwo />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H3)}
                icon={<Looks3 />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H4)}
                icon={<Looks4 />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H5)}
                icon={<Looks5 />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H6)}
                icon={<Looks6 />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
                icon={<FormatQuote />}
            />
            {/* <CodeBlockToolbarButton
                type={getPluginType(editor, ELEMENT_CODE_BLOCK)}
                icon={<CodeBlock />}
            /> */}
        </>
    );
};

export const IndentToolbarButtons = () => {
    const editor = usePlateEditorRef();

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
                type={getPluginType(editor, MARK_CODE)}
                icon={<Code />}
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
            <ListToolbarButtons />
            <IndentToolbarButtons />
            <BasicMarkToolbarButtons />
            <HistoryToolbarButtons />
            <ColorPickerToolbarDropdown
                pluginKey={MARK_COLOR}
                icon={<FormatColorText />}
                selectedIcon={<Check />}
                tooltip={{ content: "글자색" }}
            />
            <ColorPickerToolbarDropdown
                pluginKey={MARK_BG_COLOR}
                icon={<FontDownload />}
                selectedIcon={<Check />}
                tooltip={{ content: "배경색" }}
            />
            <ImageToolbarButton
                icon={<Image />}
                tooltip={{ content: "이미지 삽입" }}
            />
            <UploadImageButton />
        </HeadingToolbar>
    );
};

export default HeadToolbar;
