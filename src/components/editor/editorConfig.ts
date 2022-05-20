import { EditableProps } from "slate-react/dist/components/editable";

export const E_VALUES = {
    plainText: [
        {
            type: "p",
            children: [{ text: "" }],
        },
    ],
};

export const E_PROPS: EditableProps = {
    style: {
        padding: "15px",
        backgroundColor: "white",
        // width: "100%",
        height: "400px",
        overflowY: "auto",
    },
    placeholder: "내용을 입력해주세요...",
    // readOnly: true,
};
