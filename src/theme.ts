import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
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
            fontSize: "1rem",
        },
    },
});

export default theme;
