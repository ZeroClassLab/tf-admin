import { ColorType } from "@udecode/plate";

/**
 * TODO 회색계열 더 추가하기
 */
const BLACKS: ColorType[] = [
    {
        name: "black_900",
        value: "#000000",
        isBrightColor: false,
    },
    {
        name: "black_800",
        value: "#191919",
        isBrightColor: false,
    },
    {
        name: "black_700",
        value: "#333333",
        isBrightColor: false,
    },
    {
        name: "black_600",
        value: "#666666",
        isBrightColor: false,
    },
    {
        name: "black_500",
        value: "#999999",
        isBrightColor: false,
    },
    {
        name: "grey_500",
        value: "#AEAEAE",
        isBrightColor: false,
    },
    {
        name: "grey_400",
        value: "#BBBBBB",
        isBrightColor: true,
    },
    {
        name: "grey_300",
        value: "#C4C4C4",
        isBrightColor: true,
    },
];

const WHITE: ColorType = {
    name: "white",
    value: "#ffffff",
    isBrightColor: true,
};

const TAG_COLOR: ColorType = {
    name: "tag_color",
    value: "#6DD0B8",
    isBrightColor: true,
};

const TABLE_BACKGROUND_COLOR: ColorType = {
    name: "table_background_color",
    value: "#FAFCFE",
    isBrightColor: true,
};

const TMR_COLORS: ColorType[] = [
    {
        name: "tmr_color",
        value: "#1ECCA2",
        isBrightColor: true,
    },
    {
        name: "tmr_color_mid",
        value: "#8EE5D0",
        isBrightColor: true,
    },
    {
        name: "tmr_color_row",
        value: "#D2F5EC",
        isBrightColor: true,
    },
];

const POINT: ColorType = {
    name: "point_01",
    value: "#83ECD2",
    isBrightColor: true,
};

export const customColorSet: ColorType[] = [
    WHITE,
    ...TMR_COLORS,
    BLACKS[0],
    BLACKS[2],
    BLACKS[3],
    BLACKS[5],
];
