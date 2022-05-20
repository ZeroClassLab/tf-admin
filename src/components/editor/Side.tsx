import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import FormThumbnailUploader from "./sidebar/FormThumbnailUploader";
import FormMobileThumbnailUploader from "./sidebar/FormMobileThumbnailUploader";

const Side = () => {
    return (
        <Paper
            sx={{
                height: "100%",
                minHeight: 400,
                width: "100%",
                textAlign: "center",
                pt: 3,
            }}
        >
            <Typography variant="h5">섬네일 설정</Typography>
            <Box sx={{ p: 2 }}>
                <FormThumbnailUploader />
            </Box>
            <Typography variant="h5">모바일 섬네일 설정</Typography>
            <Box sx={{ p: 2 }}>
                <FormMobileThumbnailUploader />
            </Box>
        </Paper>
    );
};

export default Side;
