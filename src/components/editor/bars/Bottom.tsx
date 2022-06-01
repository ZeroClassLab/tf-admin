import React from "react";
import Box from "@mui/material/Box";
import SubmitButton from "../sidebar/SubmitButton";

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
                height: "100%",
                width: "100%",
                textAlign: "center",
                m: 1,
                pt: 3,
            }}
        >
            <SubmitButton />
        </Box>
    );
};

export default Bottom;
