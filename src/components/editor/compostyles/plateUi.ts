import {
    createPlateUI,
    ELEMENT_H1,
    StyledElement,
    withProps,
} from "@udecode/plate";

export const components = createPlateUI({
    [ELEMENT_H1]: withProps(StyledElement, {
        styles: {
            root: {
                fontSize: "30px",
            },
        },
    }),
});
