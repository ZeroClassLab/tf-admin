import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
} from "@mui/icons-material";
import {
    BalloonToolbar,
    MarkToolbarButton,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_UNDERLINE,
    usePlateEditorRef,
    getPluginType,
} from "@udecode/plate";

const BalloonToolbarMarks = () => {
    const editor = usePlateEditorRef();

    const arrow = false;
    const theme = "dark";
    const popperOptions = {
        placement: "top" as "top",
    };
    const tooltip = {
        arrow: true,
        delay: 0,
        duration: [200, 0] as [number, number],
        hideOnClick: false,
        offset: [0, 17] as [number, number],
        placement: "top" as "top",
    };

    return (
        <BalloonToolbar
            popperOptions={popperOptions}
            theme={theme}
            arrow={arrow}
        >
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<FormatBold />}
                tooltip={{ content: "Bold (⌘B)", ...tooltip }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<FormatItalic />}
                tooltip={{ content: "Italic (⌘I)", ...tooltip }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_UNDERLINE)}
                icon={<FormatUnderlined />}
                tooltip={{ content: "Underline (⌘U)", ...tooltip }}
            />
        </BalloonToolbar>
    );
};

export default BalloonToolbarMarks;
