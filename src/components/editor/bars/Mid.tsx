import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useRecoilState } from "recoil";

import { isMiddlebarOpenState } from "../recoils";

import ITCon from "../middlebar/ITCon";
import ITConUploader from "../middlebar/ITConUploader";

/**
 * 편집페이지에서 가운데 부분
 */
const Mid = () => {
    const [isOpen, setIsOpen] = useRecoilState(isMiddlebarOpenState);

    return (
        <Paper
            sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                minHeight: 30,
            }}
            elevation={0}
        >
            {isOpen ? (
                <>
                    <Box>
                        <Button
                            onClick={() => {
                                setIsOpen((prev) => !prev);
                            }}
                            variant="contained"
                            fullWidth
                        >
                            아이템 태거 닫기
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: "white",
                            display: "flex",
                            minHeight: 30,
                            width: "100%",
                        }}
                    >
                        <Box sx={{ height: 400, width: "100%", flex: 4 }}>
                            <ITCon />
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgb(200,200,200)",
                            }}
                        >
                            <ITConUploader />
                        </Box>
                    </Box>
                </>
            ) : (
                <Button
                    onClick={() => {
                        setIsOpen((prev) => !prev);
                    }}
                    variant="contained"
                    fullWidth
                >
                    아이템 태거 열기
                </Button>
            )}
        </Paper>
    );
};

export default Mid;
