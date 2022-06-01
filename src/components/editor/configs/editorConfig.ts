import React from "react";
import { EditableProps } from "slate-react/dist/components/editable";

export const E_VALUES = {
    plainText: [
        {
            type: "p",
            children: [
                {
                    text: "",
                },
            ],
        },
    ],
};

export const E_PROPS: EditableProps = {
    style: {
        padding: "15px",
        backgroundColor: "white",
        height: "100%",
    },
    placeholder: "Enter...",
};

export const CONTAINER_PROPS: { style: React.CSSProperties } = {
    style: { minHeight: 500, maxHeight: 500, overflowY: "auto" },
};
