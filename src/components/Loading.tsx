import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { isSurveySavingState, loadingMessageState } from "./recoils";

const Loading: React.VFC = () => {
    const isSurveySaving = useRecoilValue(isSurveySavingState);
    const loadingMessaage = useRecoilValue(loadingMessageState);
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                flexDirection: "column",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 999,
                backgroundColor: "rgba(100,100,100,0.3)",
                backdropFilter: "blur(5px)",
            }}
        >
            <Typography sx={{ mb: 2 }} variant="h3">
                {isSurveySaving
                    ? "저장하는 중"
                    : loadingMessaage || "불러오는 중"}
            </Typography>
            <CircularProgress size={80} />
        </Box>
    );
};

export default Loading;
