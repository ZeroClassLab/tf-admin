import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { isPreviewState } from "../recoils";

const PreviewButton = () => {
    const [isPreview, setIsPreview] = useRecoilState(isPreviewState);
    const handleClick = () => {
        setIsPreview((prev) => !prev);
    };
    return (
        <Box sx={{ m: 2, flex: 1 }}>
            <Button fullWidth variant="contained" onClick={handleClick}>
                {!isPreview ? "미리보기" : "편집하기"}
            </Button>
        </Box>
    );
};

export default PreviewButton;
