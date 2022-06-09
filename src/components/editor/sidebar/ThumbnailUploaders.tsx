import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FormThumbnailUploader from "../sidebar/FormThumbnailUploader";
import FormMobileThumbnailUploader from "../sidebar/FormMobileThumbnailUploader";

const ThumnailUploaders = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            <Box sx={{ p: 2, minWidth: 160 }}>
                <Typography sx={{ pb: 1 }} variant="h5">
                    섬네일
                </Typography>
                <FormThumbnailUploader />
            </Box>

            <Box sx={{ p: 2, minWidth: 160 }}>
                <Typography sx={{ pb: 1 }} variant="h5">
                    모바일 섬네일
                </Typography>
                <FormMobileThumbnailUploader />
            </Box>
        </Box>
    );
};

export default ThumnailUploaders;
