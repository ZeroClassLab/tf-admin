import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import FormEditor from "./FormEditor";
import Side from "./Side";
import Bottom from "./Bottom";
import Top from "./Top";

import "tippy.js/dist/tippy.css";

const FormEditPage = () => {
    return (
        <Box sx={{ m: 3 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {/* top */}
                    <Top />
                </Grid>
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
                    >
                        <FormEditor />
                    </Paper>
                    <Paper>
                        <Bottom />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Side />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormEditPage;
