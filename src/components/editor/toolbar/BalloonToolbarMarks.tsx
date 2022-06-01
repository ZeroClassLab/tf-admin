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
    const editor = usePlateEditorRef()!;

    const arrow = false;
    const theme = "dark";
    const tooltip: any = {
        arrow: true,
        delay: 0,
        duration: [200, 0],
        hideOnClick: false,
        offset: [0, 17],
        placement: "top",
    };

    return (
        <BalloonToolbar
            popperOptions={{
                placement: "top",
            }}
            theme={theme}
            arrow={arrow}
        >
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<FormatBold />}
                tooltip={{ content: "진하게 (⌘B)", ...tooltip }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<FormatItalic />}
                tooltip={{ content: "기울게 (⌘I)", ...tooltip }}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_UNDERLINE)}
                icon={<FormatUnderlined />}
                tooltip={{ content: "밑줄 (⌘U)", ...tooltip }}
            />
        </BalloonToolbar>
    );
};

export default BalloonToolbarMarks;
