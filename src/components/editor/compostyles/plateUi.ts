import {
    createPlateUI,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    StyledElement,
    withProps,
    ELEMENT_PARAGRAPH,
} from "@udecode/plate";
import { withStyledDraggables } from "./withStyleDraggables";

const basicComponents = createPlateUI({
    [ELEMENT_H1]: withProps(StyledElement, {
        styles: {
            root: {
                fontSize: "68px",
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: -2,
                "@media (max-width:600px)": {
                    fontSize: "34px",
                },
            },
        },
    }),
    [ELEMENT_H2]: withProps(StyledElement, {
        styles: {
            root: {
                fontSize: "48px",
                fontWeight: 700,
                lineHeight: 1.33,
                letterSpacing: -2,
                "@media (max-width:600px)": {
                    fontSize: "24px",
                },
            },
        },
    }),
    [ELEMENT_H3]: withProps(StyledElement, {
        styles: {
            root: {
                fontSize: "36px",
                fontWeight: "bold",
                lineHeight: 1.5,
                letterSpacing: -1.5,
                "@media (max-width:600px)": {
                    fontSize: "18px",
                },
            },
        },
    }),
    [ELEMENT_H4]: withProps(StyledElement, {
        styles: {
            root: {
                fontSize: "22px",
                fontWeight: "bold",
                lineHeight: 1.5,
                "@media (max-width:600px)": {
                    fontSize: "22px",
                    lineHeight: 1.5,
                    letterSpacing: 1,
                },
            },
        },
    }),
    [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
        styles: {
            root: {
                fontSize: "18px",
                lineHeight: 1.5,
                letterSpacing: -1,
                color: "#666666",
                "@media (max-width:600px)": {
                    fontSize: "16px",
                    lineHeight: 1.75,
                    letterSpacing: 1,
                },
            },
        },
    }),
});

export const components = basicComponents;
