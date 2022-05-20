import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormEditor from "./FormEditor";

const FormReadPage = () => {
    return (
        <Box sx={{ m: 3 }}>
            <Grid container spacing={1}>
                {/* <TitleGrid text="수정하기" /> */}
                <Grid
                    item
                    xs={12}
                    md={9}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ width: "100%" }}></Box>
                    <Paper
                        sx={{
                            backgroundColor: "white",
                            display: "block",
                        }}
                    >
                        <FormEditor readOnly />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormReadPage;
