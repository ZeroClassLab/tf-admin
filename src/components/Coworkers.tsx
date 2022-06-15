import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TitleGrid from "./main/TitleGrid";

const Coworkers = () => {
    return (
        <Paper
            sx={{
                height: 180,
                p: 2,
                width: 300,
                position: "relative",
                background: `url(/image.png)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: "brightness(0.8) ",
            }}
        />
    );
};

export default Coworkers;
