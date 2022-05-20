import { ELEMENT_DEFAULT } from "@udecode/plate";

export const ELEMENT_H1 = "h1";
export const ELEMENT_H2 = "h2";
export const ELEMENT_H3 = "h3";
export const ELEMENT_H4 = "h4";
export const ELEMENT_H5 = "h5";
export const ELEMENT_H6 = "h6";
export const ELEMENT_PARAGRAPH = "p";

export const KEYS_HEADING = [
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
];

export const KEY_ALIGN = "align";

export const ALIGN_OPTIONS = {
    inject: {
        props: {
            validTypes: [
                ELEMENT_H1,
                ELEMENT_H2,
                ELEMENT_H3,
                ELEMENT_H4,
                ELEMENT_PARAGRAPH,
                ELEMENT_DEFAULT,
            ],
        },
    },
};
