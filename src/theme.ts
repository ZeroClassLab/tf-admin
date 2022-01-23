import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

//
declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        xs: true; // removes the `xs` breakpoint
        sm: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true;
        mobile: true; // adds the `mobile` breakpoint
    }
}

// Create a theme instance.
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1500,
            mobile: 718,
        },
    },
    palette: {
        primary: {
            main: "#18a383",
        },
        common: {
            black: "#000",
            white: "#fff",
        },
        secondary: {
            main: "#dddddd",
        },
        error: {
            main: red.A400,
        },
        text: {
            primary: "#666666",
            secondary: "#999",
            disabled: "#C1C1C1",
        },
    },

    typography: {
        h1: {
            fontWeight: "bold",
        },
        h2: {
            fontWeight: "bold",
        },
        h3: {
            fontWeight: "bold",
        },
        h4: {
            fontWeight: "bold",
        },
        h5: {
            fontWeight: "bold",
        },
        h6: {
            fontWeight: "bold",
            fontSize: "1.125rem",
        },
        subtitle1: {
            fontSize: "1.125rem",
        },
        fontFamily: [
            "AppleSDGothicNeo",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});

export default theme;
