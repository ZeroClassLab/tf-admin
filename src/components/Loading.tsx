import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const Loading: React.VFC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
            }}
        >
            <Typography sx={{ mb: 2 }} variant="h3">
                불러오는 중
            </Typography>
            <CircularProgress size={80} />
        </Box>
    );
};

export default Loading;
