import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { isSurveySavingState } from "./recoils";

const Loading: React.VFC = () => {
    const isSurveySaving = useRecoilValue(isSurveySavingState);
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
                {isSurveySaving ? '저장하는 중' :'불러오는 중'}
            </Typography>
            <CircularProgress size={80} />
        </Box>
    );
};

export default Loading;
