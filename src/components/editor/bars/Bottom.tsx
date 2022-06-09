import React from "react";
import Box from "@mui/material/Box";
import SubmitButton from "../sidebar/SubmitButton";
import PreviewButton from "../sidebar/PreviewButton";

/**
 * 에디터 페이지에서 아랫부분
 *
 * 현재: 서브밋버튼
 * @returns
 */
const Bottom = () => {
    return (
        <Box
            sx={{
                // height: "100%",
                width: "100%",
                textAlign: "center",
                pt: 2,
            }}
        >
            <Box sx={{ display: "flex", width: "100%" }}>
                <SubmitButton />
                <PreviewButton />
            </Box>
        </Box>
    );
};

export default Bottom;
