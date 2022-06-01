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
    MarkToolbarButton,
    MARK_ITALIC,
    MARK_BOLD,
    MARK_STRIKETHROUGH,
    MARK_SUPERSCRIPT,
    MARK_SUBSCRIPT,
    MARK_UNDERLINE,
    CodeBlockToolbarButton,
    ELEMENT_CODE_BLOCK,
    MARK_CODE,
    outdentList,
    indent,
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
    FormatQuote,
    FormatIndentDecrease,
    FormatIndentIncrease,
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatStrikethrough,
    Code as CodeBlock,
    IntegrationInstructionsOutlined as CodeAlt,
    Superscript,
    Subscript,
} from "@mui/icons-material";
import FormatColorText from "@mui/icons-material/FormatColorText";
import { customColorSet } from "../plugins/color/colorSet";

/**
 * H4 까지만 (Typography hierarchy)
 * 인용구와 코드블록 포함
 * @returns
 */
export const BasicElementToolbarButtons = () => {
    const editor = usePlateEditorRef()!;
    return (
        <>
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H1)}
                icon={<LooksOne />}
                tooltip={{ content: "아주큰제목 ⌘+⌥+1" }}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H2)}
                icon={<LooksTwo />}
                tooltip={{ content: "큰제목 ⌘+⌥+2" }}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H3)}
                icon={<Looks3 />}
                tooltip={{ content: "제목 ⌘+⌥+3" }}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H4)}
                icon={<Looks4 />}
                tooltip={{ content: "소제목 ⌘+⌥+4" }}
            />

            {/* 인용구 */}
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
                icon={<FormatQuote />}
                tooltip={{ content: "인용 ⌘+⇧+." }}
            />

            {/* 코드블록 */}
            <CodeBlockToolbarButton
                type={getPluginType(editor, ELEMENT_CODE_BLOCK)}
                icon={<CodeBlock />}
            />
        </>
    );
};

/**
 * 들여쓰기
 *
 * @returns
 */
export const IndentToolbarButtons = () => {
    const editor = usePlateEditorRef()!;
    return (
        <>
            <ToolbarButton
                onMouseDown={(e) => {
                    e.preventDefault();
                    outdentList(editor);
                }}
                icon={<FormatIndentDecrease />}
            />
            <ToolbarButton
                onMouseDown={(e) => {
                    e.preventDefault();
                    indent(editor);
                }}
                icon={<FormatIndentIncrease />}
            />
        </>
    );
};

/**
 * 리스트
 * @returns
 */
export const ListToolbarButtons = () => {
    const editor = usePlateEditorRef()!;

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
    const editor = usePlateEditorRef()!;
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
    const editor = usePlateEditorRef()!;

    return (
        <>
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<FormatBold />}
                tooltip={{ content: "진하게 ⌘+B" }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<FormatItalic />}
                tooltip={{ content: "기울게 ⌘+I" }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_UNDERLINE)}
                icon={<FormatUnderlined />}
                tooltip={{ content: "밑줄 ⌘+U" }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_STRIKETHROUGH)}
                icon={<FormatStrikethrough />}
                tooltip={{ content: "취소선 ⌘+X" }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_CODE)}
                icon={<CodeAlt />}
                tooltip={{ content: "코드마크 ⌘+E" }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_SUPERSCRIPT)}
                clear={getPluginType(editor, MARK_SUBSCRIPT)}
                icon={<Superscript />}
                tooltip={{ content: "윗첨자 ^" }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_SUBSCRIPT)}
                clear={getPluginType(editor, MARK_SUPERSCRIPT)}
                icon={<Subscript />}
                tooltip={{ content: "아랫첨자 _" }}
            />
        </>
    );
};

const HistoryToolbarButtons = () => {
    const editor = usePlateEditorRef()!;
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
            <AlignToolbarButtons />
            <ListToolbarButtons />
            <IndentToolbarButtons />
            <BasicMarkToolbarButtons />
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
            <HistoryToolbarButtons />
        </HeadingToolbar>
    );
};

export default HeadToolbar;
