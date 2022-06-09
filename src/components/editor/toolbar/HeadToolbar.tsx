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

// icons for bundling optimzation
import Check from "@mui/icons-material/Check";
import FontDownload from "@mui/icons-material/FontDownload";
import Image from "@mui/icons-material/Image";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import Restore from "@mui/icons-material/Restore";
import Update from "@mui/icons-material/Update";
import FormatAlignLeft from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenter from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRight from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustify from "@mui/icons-material/FormatAlignJustify";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import LooksOne from "@mui/icons-material/LooksOne";
import LooksTwo from "@mui/icons-material/LooksOne";
import Looks3 from "@mui/icons-material/Looks3";
import Looks4 from "@mui/icons-material/Looks4";
import FormatQuote from "@mui/icons-material/FormatQuote";
import FormatIndentDecrease from "@mui/icons-material/FormatIndentDecrease";
import FormatIndentIncrease from "@mui/icons-material/FormatIndentIncrease";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import FormatUnderlined from "@mui/icons-material/FormatUnderlined";
import FormatStrikethrough from "@mui/icons-material/FormatStrikethrough";
import Code from "@mui/icons-material/Code";
import IntegrationInstructionsOutlined from "@mui/icons-material/IntegrationInstructionsOutlined";
import Superscript from "@mui/icons-material/Superscript";
import Subscript from "@mui/icons-material/Superscript";
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
                icon={<Code />}
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
                icon={<IntegrationInstructionsOutlined />}
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
