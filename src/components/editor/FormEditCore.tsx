import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Side from "./bars/Side";
import Bottom from "./bars/Bottom";
import Top from "./bars/Top";
import Mid from "./bars/Mid";

import EditorWrapper from "./EditorWrapper";

const FormEditCore = () => {
    return (
        <Box sx={{ m: 3 }}>
            <Grid container spacing={1}>
                {/* top */}
                <Grid item xs={12}>
                    <Top />
                </Grid>

                {/* mid */}
                <Grid item xs={12}>
                    <Mid />
                </Grid>

                {/* content */}
                <Grid
                    item
                    xs={12}
                    md={9}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Paper
                        sx={{
                            backgroundColor: "white",
                            display: "block",
                        }}
                        elevation={2}
                    >
                        <EditorWrapper />
                        <Bottom />
                    </Paper>
                </Grid>

                {/* right side */}
                <Grid item xs={12} md={3}>
                    <Side />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormEditCore;
