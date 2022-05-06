import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const RepImage = () => {
    return (
        <Paper
            sx={{
                height: "100%",
                minHeight: 400,
                width: "100%",
                textAlign: "center",
            }}
        >
            <Typography variant="h5">대표이미지 설정</Typography>
        </Paper>
    );
};

export default RepImage;
