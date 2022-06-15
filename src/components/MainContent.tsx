import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TitleGrid from "./main/TitleGrid";
import Coworkers from "./Coworkers";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    autoReloadModeState,
    currentPageState,
    isLoadingState,
} from "./recoils";

interface MainContentProps {
    callbacks?: {
        [key: string]: () => void;
    };
}
const MainContent: React.VFC<MainContentProps> = ({ callbacks }) => {
    const setCurPage = useSetRecoilState(currentPageState);
    const setIsLoading = useSetRecoilState(isLoadingState);
    const [showPic, setShowPic] = useState(false);
    const showOrHideTeamPicture = () => {
        setShowPic((prev) => !prev);
    };
    const [autoReloadMode, setAutoReloadMode] =
        useRecoilState(autoReloadModeState);

    const setAutoReloadModeOppo = (value: boolean) => {
        if (value) {
            localStorage.setItem("autoreload", "true");
        } else {
            localStorage.setItem("autoreload", "");
        }
        setAutoReloadMode(value);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ mt: 1, mb: 4 }}>
                <Grid item xs={12} md={8}>
                    <TitleGrid sx={{ mb: 2 }} text={"Form Service v2.0"} />
                    <Paper
                        sx={{
                            minHeight: 300,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            color={autoReloadMode ? "success" : "warning"}
                            onClick={() =>
                                setAutoReloadModeOppo(!autoReloadMode)
                            }
                        >
                            {autoReloadMode
                                ? "자동 불러오기 활성화"
                                : "자동 불러오기 비활성화"}
                        </Button>
                        <Button
                            onClick={async () => {
                                setIsLoading(true);
                                if (callbacks) {
                                    await callbacks?.surveyReload();
                                }
                                setIsLoading(false);
                            }}
                            disabled={autoReloadMode}
                        >
                            서베이 데이터 불러오기
                        </Button>
                        <Button
                            onClick={async () => {
                                setIsLoading(true);
                                if (callbacks) {
                                    await callbacks?.editorReload();
                                }
                                setIsLoading(false);
                            }}
                            disabled={autoReloadMode}
                        >
                            에디터 데이터 불러오기
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TitleGrid sx={{ mb: 2 }} text={"아카이브"} />

                    <Paper
                        sx={{
                            minHeight: 300,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setCurPage(-44);
                                }}
                            >
                                옛날폼
                            </Button>
                            <Button
                                onClick={() => {
                                    showOrHideTeamPicture();
                                }}
                            >
                                사진보기
                            </Button>
                        </div>
                        {showPic ? (
                            <Coworkers />
                        ) : (
                            <Paper sx={{ width: 300, height: 180 }}></Paper>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MainContent;
